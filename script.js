// Store user data
let userData = {
    name: '',
    email: '',
    company: ''
};

// Current survey state
let currentSurvey = null;
let currentCategory = 0;
let answers = [];

// DOM elements
const registrationSection = document.getElementById('registration-section');
const userTypeSection = document.getElementById('user-type-section');
const surveySection = document.getElementById('survey-section');
const resultsSection = document.getElementById('results-section');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Registration form submission
    if (document.getElementById('registration-form')) {
        document.getElementById('registration-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Store user data
            userData.name = document.getElementById('name').value;
            userData.email = document.getElementById('email').value;
            userData.company = document.getElementById('company').value;
            
            // Show user type selection
            registrationSection.classList.add('hidden');
            userTypeSection.classList.remove('hidden');
        });
    }
    
    // Role card selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            selectUserType(role);
        });
    });
    
    // Navigation buttons
    document.getElementById('prev-btn').addEventListener('click', previousCategory);
    document.getElementById('next-btn').addEventListener('click', nextCategory);
    
    // Action buttons in results
    document.getElementById('share-linkedin').addEventListener('click', shareToLinkedIn);
    document.getElementById('share-twitter').addEventListener('click', shareToTwitter);
    document.getElementById('contact-btn').addEventListener('click', contactUs);
    document.getElementById('restart-btn').addEventListener('click', restartSurvey);
});

// Function to select user type and start appropriate survey
function selectUserType(type) {
    currentSurvey = type;
    userTypeSection.classList.add('hidden');
    surveySection.classList.remove('hidden');
    
    // Initialize the survey
    const survey = type === 'individual' ? individualAssessment : 
                  (type === 'team' ? teamAssessment : organizationAssessment);
    
    document.getElementById('survey-title').textContent = survey.title;
    document.getElementById('survey-description').textContent = survey.description;
    
    // Initialize answers array with empty arrays for each category
    answers = survey.categories.map(() => Array(5).fill(null));
    
    // Show first category
    showCategory(0);
}

// Function to display current category questions
function showCategory(index) {
    currentCategory = index;
    const survey = currentSurvey === 'individual' ? individualAssessment : 
                  (currentSurvey === 'team' ? teamAssessment : organizationAssessment);
    
    const category = survey.categories[index];
    
    // Update progress bar
    const progress = ((index) / survey.categories.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `Dimension ${index + 1} of ${survey.categories.length}`;
    
    // Update category title and description
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-description').textContent = category.description;
    
    // Generate questions
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    
    category.questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionHTML = `
            <p>${qIndex + 1}. ${question}</p>
            <div class="question-options">
                <label class="option-label">
                    <input type="radio" name="q${index}_${qIndex}" value="yes" ${answers[index][qIndex] === true ? 'checked' : ''}>
                    <span class="option-text">YES</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${index}_${qIndex}" value="no" ${answers[index][qIndex] === false ? 'checked' : ''}>
                    <span class="option-text">NO</span>
                </label>
            </div>
        `;
        
        questionDiv.innerHTML = questionHTML;
        questionsContainer.appendChild(questionDiv);
    });
    
    // Update buttons
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').textContent = index === survey.categories.length - 1 ? 'See Results' : 'Next';
}

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
    window.location.href = 'https://anywhere.consulting/contact';
}

// Function to restart the survey
function restartSurvey() {
    // Reset all sections
    resultsSection.classList.add('hidden');
    
    // If using registration form
    if (registrationSection) {
        registrationSection.classList.remove('hidden');
        
        // Clear user data and answers
        userData = { name: '', email: '', company: '' };
        currentSurvey = null;
        currentCategory = 0;
        answers = [];
        
        // Reset form
        document.getElementById('registration-form').reset();
    } else {
        // If bypassing registration form and going straight to type selection
        userTypeSection.classList.remove('hidden');
        
        // Clear survey data
        currentSurvey = null;
        currentCategory = 0;
        answers = [];
    }
}
