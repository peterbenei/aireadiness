const teamAssessment = {
    title: "How AI-Ready Is My Marketing Team?",
    description: "This assessment helps you evaluate your marketing team's readiness for an AI-transformed industry. Answer each question with a YES or NO based on your honest assessment of your team as a whole.",
    
    categories: [
        {
            name: "Technical Readiness",
            description: "Understanding of AI tools and how well your team can use them in marketing contexts",
            questions: [
                "Does your team demonstrate understanding of basic AI concepts and terminology in daily discussions and planning?",
                "Has your team been trained on AI marketing tools relevant to your business objectives?",
                "Can most team members write effective prompts that consistently produce useful outputs from AI systems?",
                "Does your team consistently demonstrate the ability to evaluate AI outputs for quality, accuracy, and brand alignment?",
                "Has your team established workflows that integrate multiple AI tools to solve complex marketing challenges?"
            ]
        },
        // Add the other 4 categories here
    ],
    
    // Add overall feedback and category feedback here
    
    // Function to generate next steps
    getNextSteps: function(weakestAreas) {
        return [
            // Return appropriate next steps for team leaders
        ];
    }
};
