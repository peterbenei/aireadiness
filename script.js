// No registration form needed anymore as Tally handles it
// Event listening function
document.addEventListener('DOMContentLoaded', function() {
    // Role card selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            selectUserType(role);
        });
    });
});
// Function to save answers for current category
function saveCurrentCategoryAnswers() {
    const category = currentCategory;
    
    let allAnswered = true;
    
    for (let qIndex = 0; qIndex < 5; qIndex++) {
        const radioName = `q${category}_${qIndex}`;
        const radioButtons = document.getElementsByName(radioName);
        let answered = false;
        
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                answers[category][qIndex] = radioButton.value === 'yes';
                answered = true;
                break;
            }
        }
        
        if (!answered) {
            allAnswered = false;
        }
    }
    
    return allAnswered;
}

// Function to navigate to previous category
function previousCategory() {
    saveCurrentCategoryAnswers();
    if (currentCategory > 0) {
        showCategory(currentCategory - 1);
    }
}

// Function to navigate to next category or show results
function nextCategory() {
    const allAnswered = saveCurrentCategoryAnswers();
    
    if (!allAnswered) {
        alert('Please answer all questions before proceeding.');
        return;
    }
    
    const survey = currentSurvey === 'individual' ? individualAssessment : 
                  (currentSurvey === 'team' ? teamAssessment : organizationAssessment);
    
    if (currentCategory < survey.categories.length - 1) {
        showCategory(currentCategory + 1);
    } else {
        showResults();
    }
}

// Function to calculate scores and show results
function showResults() {
    surveySection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Calculate scores for each category
    const scores = answers.map(categoryAnswers => {
        return categoryAnswers.filter(answer => answer === true).length;
    });
    
    // Calculate total score
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    
    // Get feedback based on survey type
    let readinessLevel, overallFeedback, categoryFeedback, nextSteps;
    const survey = currentSurvey === 'individual' ? individualAssessment : 
                  (currentSurvey === 'team' ? teamAssessment : organizationAssessment);
    
    // Determine readiness level
    const levelIndex = Math.min(Math.floor(totalScore / 5), 4);
    overallFeedback = survey.overallFeedback[levelIndex];
    
    if (currentSurvey === 'individual') {
        readinessLevel = totalScore <= 5 ? "AI Novice" :
                        totalScore <= 10 ? "AI Aware" :
                        totalScore <= 15 ? "AI Adapting" :
                        totalScore <= 20 ? "AI Proficient" : "AI Leader";
    } else if (currentSurvey === 'team') {
        readinessLevel = totalScore <= 5 ? "AI Novice Team" :
                        totalScore <= 10 ? "AI Aware Team" :
                        totalScore <= 15 ? "AI Adapting Team" :
                        totalScore <= 20 ? "AI Proficient Team" : "AI Leader Team";
    } else {
        readinessLevel = totalScore <= 5 ? "AI Novice Organization" :
                        totalScore <= 10 ? "AI Aware Organization" :
                        totalScore <= 15 ? "AI Adapting Organization" :
                        totalScore <= 20 ? "AI Proficient Organization" : "AI Leader Organization";
    }
    
    // Get category-specific feedback
    categoryFeedback = scores.map((score, index) => {
        // Adjust score to be 0-based index for the array
        const feedbackIndex = Math.max(0, Math.min(score - 1, 4));
        return score === 0 ? survey.categoryFeedback[index][0] : survey.categoryFeedback[index][feedbackIndex];
    });
    
    // Find the weakest areas
    const weakestAreas = [];
    const minScore = Math.min(...scores);
    survey.categories.forEach((category, index) => {
        if (scores[index] === minScore) {
            weakestAreas.push(category.name);
        }
    });
    
    // Get next steps
    nextSteps = survey.getNextSteps(weakestAreas);
    
    // Display results
    document.getElementById('readiness-level').textContent = readinessLevel;
    document.getElementById('total-score').textContent = `Your Total Score: ${totalScore}/25`;
    document.getElementById('overall-feedback').textContent = overallFeedback;
    
    // Display dimension results
    const dimensionResults = document.getElementById('dimension-results');
    dimensionResults.innerHTML = '<h2>Dimension Scores</h2>';
    
    scores.forEach((score, index) => {
        dimensionResults.innerHTML += `
            <div class="dimension-card">
                <h3>${survey.categories[index].name}: ${score}/5</h3>
                <p>${categoryFeedback[index]}</p>
            </div>
        `;
    });
    
    // Display next steps
    const nextStepsContainer = document.getElementById('next-steps');
    nextStepsContainer.innerHTML = '<h2>Recommended Next Steps</h2>';
    
    nextSteps.forEach(step => {
        nextStepsContainer.innerHTML += `<div class="next-step">${step}</div>`;
    });
    
    // Create radar chart
    createRadarChart(scores, survey.categories);
    
    // Prepare for social sharing
    prepareSharing(readinessLevel, totalScore);
}

// Function to create radar chart
function createRadarChart(scores, categories) {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    
    // Prepare data
    const labels = categories.map(category => category.name);
    
    if (window.resultChart) {
        window.resultChart.destroy();
    }
    
    // Create new chart
    window.resultChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Your Score',
                data: scores,
                backgroundColor: 'rgba(227, 44, 30, 0.2)',
                borderColor: 'rgba(227, 44, 30, 1)',
                pointBackgroundColor: 'rgba(227, 44, 30, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(227, 44, 30, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Function to prepare social sharing
function prepareSharing(readinessLevel, totalScore) {
    window.sharingData = {
        level: readinessLevel,
        score: totalScore,
        surveyType: currentSurvey
    };
}

// Function to share to LinkedIn
function shareToLinkedIn() {
    const shareText = `I took the Horizon 01 AI Readiness Assessment and scored ${window.sharingData.score}/25 - ${window.sharingData.level}! Assess your own AI readiness at: `;
    const shareUrl = window.location.href;
    
    // Create the LinkedIn sharing URL
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    
    // Open in a new window
    window.open(linkedInUrl, '_blank');
}

// Function to share to Twitter
function shareToTwitter() {
    const shareText = `I scored ${window.sharingData.score}/25 on the Horizon 01 AI Readiness Assessment - ${window.sharingData.level}! How AI-ready are you?`;
    const shareUrl = window.location.href;
    
    // Create the Twitter sharing URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    
    // Open in a new window
    window.open(twitterUrl, '_blank');
}

// Function to handle contact button
function contactUs() {
    // Redirect to your contact page - UPDATE THIS URL TO YOUR ACTUAL CONTACT PAGE
    window.location.href = 'https://yourdomain.com/contact?subject=AI%20Readiness%20Assessment%20Results';
}

// Function to restart the survey
function restartSurvey() {
    // Reset all sections
    resultsSection.classList.add('hidden');
    registrationSection.classList.remove('hidden');
    
    // Clear user data and answers
    userData = { name: '', email: '', company: '' };
    currentSurvey = null;
    currentCategory = 0;
    answers = [];
    
    // Reset form
    document.getElementById('registration-form').reset();
}
