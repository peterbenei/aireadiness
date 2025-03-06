// Configuration file for AI-Readiness Assessment - CEO / Enterprise Version

// Categories and questions for CEOs assessing their entire organization
const categories = [
    {
        name: "Strategic AI Readiness",
        description: "Alignment of AI initiatives with overall business strategy and goals",
        questions: [
            "Has your organization incorporated AI into its long-term strategic planning?",
            "Does your executive team have a clear vision for how AI will transform your business model?",
            "Have you identified and prioritized business areas where AI can provide the greatest competitive advantage?",
            "Do you have metrics in place to measure the ROI and business impact of AI initiatives?",
            "Has your organization allocated sufficient budget and resources specifically for AI transformation?"
        ]
    },
    {
        name: "Organizational Readiness",
        description: "Structure, culture, and governance to support enterprise-wide AI adoption",
        questions: [
            "Is there clear ownership and accountability for AI initiatives across your organization?",
            "Does your organizational structure support cross-functional collaboration on AI projects?",
            "Has your organization established ethical guidelines and governance for responsible AI use?",
            "Do you have change management processes in place to support the transition to AI-enhanced operations?",
            "Does your company culture embrace experimentation, learning, and adaptation required for AI success?"
        ]
    },
    {
        name: "Data Readiness",
        description: "Quality, accessibility, and governance of data required for AI implementation",
        questions: [
            "Does your organization have high-quality, accessible data to fuel AI applications?",
            "Have you established robust data governance practices across the enterprise?",
            "Are your data systems and infrastructure capable of supporting advanced AI applications?",
            "Do you have processes in place to ensure data privacy, security, and compliance with regulations?",
            "Can your organization efficiently integrate data across different business units and systems?"
        ]
    },
    {
        name: "Technical Readiness",
        description: "Technology infrastructure, tools, and capabilities for enterprise AI implementation",
        questions: [
            "Does your organization have the necessary technical infrastructure to support AI deployment?",
            "Have you established standardized processes for AI development, testing, and deployment?",
            "Does your organization effectively balance build vs. buy decisions for AI capabilities?",
            "Have you implemented systems for monitoring and maintaining AI solutions over time?",
            "Can your technical teams effectively scale AI solutions from pilots to enterprise-wide implementation?"
        ]
    },
    {
        name: "Talent Readiness",
        description: "Skills, training, and human capital to support organization-wide AI transformation",
        questions: [
            "Does your organization have sufficient AI expertise across technical and business roles?",
            "Have you implemented company-wide AI literacy training appropriate to different roles?",
            "Does your talent acquisition strategy prioritize AI and data science capabilities?",
            "Have you established clear career paths that incorporate AI skills development?",
            "Are your leaders equipped to manage teams in an AI-augmented work environment?"
        ]
    }
];

// Overall assessment feedback based on total score (0-25)
const overallFeedbackTexts = [
    // 0-5 points: AI Novice Organization
    "Your organization is in the earliest stages of AI readiness, with significant gaps across all dimensions. There is an urgent need to develop basic AI capabilities to avoid competitive disadvantage. Begin by creating awareness at the executive level, establishing basic data infrastructure, and identifying initial use cases where AI could provide strategic value. Without immediate action, your organization risks falling behind as competitors embrace AI transformation.",
    
    // 6-10 points: AI Aware Organization
    "Your organization has begun its AI journey but faces substantial challenges across multiple dimensions. While there's awareness of AI's potential impact, implementation remains limited and uncoordinated. Prioritize developing a cohesive AI strategy aligned with business objectives, establishing data governance practices, and building initial technical capabilities. Focus on quick wins that demonstrate value while developing longer-term transformation plans.",
    
    // 11-15 points: AI Adapting Organization
    "Your organization is actively integrating AI into operations with moderate success. There are strengths in some dimensions but significant opportunities in others. Focus on coordinating AI initiatives across business units, standardizing successful practices, and developing comprehensive governance frameworks. Address specific dimension gaps while scaling successful pilot projects to enterprise-wide implementation. Consider how organizational structure might evolve to better support AI-driven operations.",
    
    // 16-20 points: AI Proficient Organization
    "Your organization has successfully integrated AI across multiple functions and is realizing substantial business benefits. You have established strong foundations in most dimensions of AI readiness. Focus on optimizing your AI operations, developing centers of excellence, and preparing for emerging AI technologies. Consider how your organization can pioneer industry-leading AI applications that create sustainable competitive advantage. Ensure consistent implementation of best practices across all business units.",
    
    // 21-25 points: AI Leader Organization
    "Your organization is at the forefront of AI transformation, with exceptional capabilities across all dimensions. You're well-positioned to use AI as a key differentiator in your industry. Focus on maintaining your competitive advantage through continuous innovation and developing proprietary AI applications that transform your industry. Your organization has the opportunity to establish market leadership through AI-driven business model innovation and to shape industry standards for responsible, effective AI implementation."
];

// Individual category feedback based on category scores (0-5)
const categoryFeedbackTexts = [
    // Strategic AI Readiness feedback (index 0)
    [
        "Your organization's strategic AI readiness is minimal. Begin by educating your executive team on AI's potential business impact. Identify 1-2 specific business challenges where AI could provide value and develop small-scale pilot projects to demonstrate potential ROI.",
        "Your organization has basic strategic awareness of AI. Develop a more comprehensive AI strategy with clear objectives aligned to business goals. Establish preliminary metrics to measure AI impact and allocate dedicated resources to high-potential AI initiatives.",
        "Your organization has good strategic alignment with AI. Focus on integrating AI planning more deeply into your overall business strategy. Refine your measurement frameworks and ensure consistent executive sponsorship across AI initiatives.",
        "Your organization's strategic AI readiness is strong. Develop more innovative approaches to AI-driven business transformation. Ensure AI initiatives are prioritized at the board level and consider how emerging AI capabilities might enable new business models.",
        "Your organization's strategic AI readiness is exceptional. Position your company to lead industry-wide transformation through AI innovation. Focus on capturing sustainable competitive advantage through proprietary AI applications and developing new AI-first business models that could disrupt your industry."
    ],
    // Organizational Readiness feedback (index 1)
    [
        "Your organization's structural readiness for AI is minimal. Begin by establishing clear ownership for initial AI initiatives. Identify cultural barriers to AI adoption and develop change management approaches to address resistance. Create basic ethical guidelines for AI development.",
        "Your organization has basic organizational preparation for AI. Focus on creating more effective cross-functional collaboration mechanisms for AI projects. Develop more comprehensive governance frameworks and foster a more experimental mindset throughout the organization.",
        "Your organization has good organizational structure for AI. Establish more robust change management processes specifically designed for AI transformation. Strengthen your AI governance and focus on building a more adaptive organizational culture.",
        "Your organization's structural readiness for AI is strong. Refine your AI governance to address emerging ethical considerations. Optimize organizational structures to fully support AI innovation and ensure consistent practices across all business units.",
        "Your organization's structural readiness for AI is exceptional. Your governance frameworks and organizational design are optimally aligned for AI-driven transformation. Focus on becoming an industry leader in responsible AI practices and fostering an innovation culture that consistently generates breakthrough AI applications."
    ],
    // Data Readiness feedback (index 2)
    [
        "Your organization's data readiness is minimal. Begin by assessing your current data assets and quality. Establish basic data governance practices and identify critical gaps in your data infrastructure that would prevent successful AI implementation.",
        "Your organization has basic data foundations. Focus on improving data quality and accessibility across the enterprise. Strengthen data governance practices and address regulatory compliance issues more comprehensively. Begin breaking down data silos between departments.",
        "Your organization has good data capabilities. Implement more advanced data integration across business units. Refine your data governance framework and ensure data infrastructure can scale to support growing AI demands.",
        "Your organization's data readiness is strong. Focus on making data a truly strategic asset with world-class governance. Implement advanced monitoring of data quality and develop innovative approaches to deriving AI-ready insights from diverse data sources.",
        "Your organization's data readiness is exceptional. Your data assets are optimally structured for AI applications with industry-leading governance practices. Focus on pioneering new approaches to data utilization that could create unique competitive advantages through proprietary data assets."
    ],
    // Technical Readiness feedback (index 3)
    [
        "Your organization's technical readiness for AI is minimal. Begin by assessing your current technical infrastructure against basic AI requirements. Identify critical gaps and develop a prioritized roadmap for building essential AI capabilities.",
        "Your organization has basic technical foundations for AI. Standardize your development and deployment processes for AI solutions. Focus on establishing more effective build vs. buy decision frameworks and implementing basic monitoring systems for AI applications.",
        "Your organization has good technical capabilities for AI. Enhance your infrastructure to better support scaling AI from pilots to enterprise-wide deployment. Implement more comprehensive testing and monitoring frameworks for AI systems.",
        "Your organization's technical readiness for AI is strong. Optimize your technical infrastructure for maximum AI performance at scale. Develop center-of-excellence capabilities for AI development and deployment across the enterprise.",
        "Your organization's technical readiness for AI is exceptional. Your technical infrastructure and development practices are optimally aligned for advanced AI implementation. Focus on pioneering innovative technical approaches that could establish new industry standards for AI excellence."
    ],
    // Talent Readiness feedback (index 4)
    [
        "Your organization's talent readiness for AI is minimal. Begin by assessing current AI capabilities across your workforce. Identify critical skill gaps and develop basic AI literacy programs for key teams. Consider strategic hiring or partnerships to quickly access essential AI expertise.",
        "Your organization has basic talent foundations for AI. Implement more structured AI training programs customized to different roles. Develop clearer recruitment strategies for AI talent and begin establishing AI-focused career development paths.",
        "Your organization has good talent capabilities for AI. Enhance your company-wide AI literacy programs and develop more comprehensive skills development frameworks. Ensure leadership teams are equipped to guide AI-augmented workforces.",
        "Your organization's talent readiness for AI is strong. Optimize your approach to developing and retaining top AI talent. Implement innovative training and development programs that ensure continuous skill evolution as AI technologies advance.",
        "Your organization's talent readiness for AI is exceptional. Your workforce has the optimal mix of technical and business AI capabilities with industry-leading development programs. Focus on becoming an employer of choice for top AI talent and developing thought leadership that influences industry-wide talent practices."
    ]
];

// Function to calculate overall readiness level based on total score
function getOverallReadinessLevel(totalScore) {
    if (totalScore <= 5) return "AI Novice Organization";
    if (totalScore <= 10) return "AI Aware Organization";
    if (totalScore <= 15) return "AI Adapting Organization";
    if (totalScore <= 20) return "AI Proficient Organization";
    return "AI Leader Organization";
}

// Function to get overall feedback based on total score
function getOverallFeedback(totalScore) {
    const index = Math.min(Math.floor(totalScore / 5), 4);
    return overallFeedbackTexts[index];
}

// Function to get category feedback based on category score
function getCategoryFeedback(categoryIndex, score) {
    // Adjust score to be 0-based index for the array (score of 1 gives index 0, score of 5 gives index 4)
    const feedbackIndex = Math.max(0, Math.min(score - 1, 4));
    return categoryFeedbackTexts[categoryIndex][feedbackIndex];
}

// Function to generate next steps based on assessment results
function generateNextSteps(scores) {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const weakestAreas = [];
    
    // Find the categories with the lowest scores
    const minScore = Math.min(...scores);
    categories.forEach((category, index) => {
        if (scores[index] === minScore) {
            weakestAreas.push(category.name);
        }
    });
    
    // Generate personalized next steps for CEOs
    const nextSteps = [
        "1. Share these assessment results with your executive team to align on AI transformation priorities.",
        `2. Develop a comprehensive AI strategy addressing your critical gaps in: ${weakestAreas.join(", ")}.`,
        "3. Establish an enterprise-wide AI governance structure with clear ownership and accountability.",
        "4. Allocate appropriate budget and resources for AI initiatives, prioritizing areas with highest business impact.",
        "5. Create organization-wide metrics to track AI readiness progress and business outcomes.",
        "6. Implement a communication strategy to build awareness and buy-in for AI transformation across all levels.",
        "7. Consider bringing in external expertise to accelerate development in your weakest readiness dimensions."
    ];
    
    return nextSteps;
}

// Example usage:
// const scores = [3, 4, 2, 5, 3]; // Sample scores for each category
// const totalScore = scores.reduce((sum, score) => sum + score, 0);
// console.log(`Overall Organization Readiness Level: ${getOverallReadinessLevel(totalScore)}`);
// console.log(`Overall Organization Feedback: ${getOverallFeedback(totalScore)}`);
// console.log("Category Feedback:");
// scores.forEach((score, index) => {
//     console.log(`${categories[index].name}: ${getCategoryFeedback(index, score)}`);
// });
// console.log("Next Steps for CEOs:");
// generateNextSteps(scores).forEach(step => console.log(step));
