// User and Survey State Management
const state = {
    userData: {
        name: '',
        email: '',
        company: ''
    },
    currentSurvey: null,
    currentCategory: 0,
    answers: []
};

// DOM Element Selectors
const elements = {
    registrationSection: document.getElementById('registration-section'),
    userTypeSection: document.getElementById('user-type-section'),
    surveySection: document.getElementById('survey-section'),
    resultsSection: document.getElementById('results-section')
};

// Initialize Event Listeners
function initializeEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        // Registration Form Submission
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
            registrationForm.addEventListener('submit', handleRegistrationSubmit);
        }

        // Role Card Selection
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', () => selectUserType(card.getAttribute('data-role')));
        });

        // Navigation Buttons
        document.getElementById('prev-btn').addEventListener('click', previousCategory);
        document.getElementById('next-btn').addEventListener('click', nextCategory);

        // Results Action Buttons
        setupResultsActionButtons();
    });
}

// Registration Submission Handler
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    // Store user data
    state.userData.name = document.getElementById('name').value;
    state.userData.email = document.getElementById('email').value;
    state.userData.company = document.getElementById('company').value;
    
    // Show user type selection
    elements.registrationSection.classList.add('hidden');
    elements.userTypeSection.classList.remove('hidden');
}

// Set Up Results Action Buttons
function setupResultsActionButtons() {
    document.getElementById('share-linkedin')?.addEventListener('click', shareToLinkedIn);
    document.getElementById('share-twitter')?.addEventListener('click', shareToTwitter);
    document.getElementById('contact-btn')?.addEventListener('click', contactUs);
    document.getElementById('restart-btn')?.addEventListener('click', restartSurvey);
}

// Select User Type and Start Survey
function selectUserType(type) {
    state.currentSurvey = type;
    elements.userTypeSection.classList.add('hidden');
    elements.surveySection.classList.remove('hidden');
    
    // Select appropriate assessment based on user type
    const survey = type === 'individual' ? individualAssessment : 
                   type === 'team' ? teamAssessment : organizationAssessment;
    
    // Update survey header
    document.getElementById('survey-title').textContent = survey.title;
    document.getElementById('survey-description').textContent = survey.description;
    
    // Initialize answers array
    state.answers = survey.categories.map(() => Array(5).fill(null));
    
    // Show first category
    showCategory(0);
}

// Display Current Category Questions
function showCategory(index) {
    state.currentCategory = index;
    
    // Select appropriate survey based on current type
    const survey = state.currentSurvey === 'individual' ? individualAssessment : 
                   state.currentSurvey === 'team' ? teamAssessment : organizationAssessment;
    
    const category = survey.categories[index];
    
    // Update progress bar
    updateProgressBar(index, survey.categories.length);
    
    // Update category details
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-description').textContent = category.description;
    
    // Generate and display questions
    renderCategoryQuestions(category.questions, index);
    
    // Update navigation buttons
    updateNavigationButtons(index, survey.categories.length);
}

// Update Progress Bar
function updateProgressBar(currentIndex, totalCategories) {
    const progress = ((currentIndex) / totalCategories) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Dimension ${currentIndex + 1} of ${totalCategories}`;
}

// Render Category Questions
function renderCategoryQuestions(questions, categoryIndex) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = questions.map((question, qIndex) => `
        <div class="question">
            <p>${qIndex + 1}. ${question}</p>
            <div class="question-options">
                <label class="option-label">
                    <input type="radio" name="q${categoryIndex}_${qIndex}" value="yes" 
                           ${state.answers[categoryIndex][qIndex] === true ? 'checked' : ''}>
                    <span class="option-text">YES</span>
                </label>
                <label class="option-label">
                    <input type="radio" name="q${categoryIndex}_${qIndex}" value="no" 
                           ${state.answers[categoryIndex][qIndex] === false ? 'checked' : ''}>
                    <span class="option-text">NO</span>
                </label>
            </div>
        </div>
    `).join('');
}

// Update Navigation Buttons
function updateNavigationButtons(index, totalCategories) {
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').textContent = index === totalCategories - 1 ? 'See Results' : 'Next';
}

// Save Answers for Current Category
function saveCurrentCategoryAnswers() {
    const { currentCategory } = state;
    
    const allAnswered = Array.from({length: 5}, (_, qIndex) => {
        const radioName = `q${currentCategory}_${qIndex}`;
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        
        if (selectedRadio) {
            state.answers[currentCategory][qIndex] = selectedRadio.value === 'yes';
            return true;
        }
        return false;
    }).every(Boolean);
    
    return allAnswered;
}

// Navigate to Previous Category
function previousCategory() {
    saveCurrentCategoryAnswers();
    if (state.currentCategory > 0) {
        showCategory(state.currentCategory - 1);
    }
}

// Navigate to Next Category or Show Results
function nextCategory() {
    const allAnswered = saveCurrentCategoryAnswers();
    
    if (!allAnswered) {
        alert('Please answer all questions before proceeding.');
        return;
    }
    
    const survey = state.currentSurvey === 'individual' ? individualAssessment : 
                   state.currentSurvey === 'team' ? teamAssessment : organizationAssessment;
    
    if (state.currentCategory < survey.categories.length - 1) {
        showCategory(state.currentCategory + 1);
    } else {
        showResults();
    }
}

// GitHub Issue Creation
function createGitHubIssue(surveyData) {
    fetch('https://api.github.com/repos/peterbenei/aireadinesssurvey/issues', {
        method: 'POST',
        headers: {
            'Authorization': 'token YOUR_GITHUB_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: `AI Readiness Survey - ${surveyData.name}`,
            body: formatIssueBody(surveyData),
            labels: ['ai-readiness-survey']
        })
    }).catch(error => console.error('GitHub Issue Creation Failed:', error));
}

// Format Issue Body
function formatIssueBody(surveyData) {
    return `[SURVEY_DATA]
NAME: ${surveyData.name}
EMAIL: ${surveyData.email}
COMPANY: ${surveyData.company}
SURVEY_TYPE: ${surveyData.surveyType}
TOTAL_SCORE: ${surveyData.totalScore}
READINESS_LEVEL: ${surveyData.readinessLevel}
DIMENSION_1: ${surveyData.dimensionScores[0]}
DIMENSION_2: ${surveyData.dimensionScores[1]}
DIMENSION_3: ${surveyData.dimensionScores[2]}
DIMENSION_4: ${surveyData.dimensionScores[3]}
DIMENSION_5: ${surveyData.dimensionScores[4]}
[/SURVEY_DATA]`;
}

// Initialize the application
initializeEventListeners();
