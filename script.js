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
        const radioButtons = document.getElementsByName
