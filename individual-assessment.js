const individualAssessment = {
    title: "How AI-Ready Am I as a Marketing Professional?",
    description: "This assessment helps you evaluate your personal readiness for an AI-transformed marketing career. Answer each question with a YES or NO based on your honest self-assessment.",
    
    categories: [
        {
            name: "Technical Readiness",
            description: "Understanding of AI tools and how well you can use them in marketing contexts",
            questions: [
                "Can I explain fundamental AI concepts (machine learning, generative AI, natural language processing) to a colleague?",
                "Am I proficient with at least one AI marketing tool that's directly relevant to my current role?",
                "Can I consistently write effective prompts that get me useful results from AI systems?",
                "Do I have a reliable process for evaluating and improving AI outputs before using them in my work?",
                "Have I successfully combined multiple AI tools to create more efficient workflows for myself?"
            ]
        },
        {
            name: "Strategic Readiness",
            description: "Ability to think beyond day-to-day tasks and connect AI capabilities to bigger business goals",
            questions: [
                "Can I explain how specific AI capabilities connect to my team's broader marketing and business objectives?",
                "Have I identified aspects of my marketing work that still require human judgment despite AI advances?",
                "Have I developed approaches in my role that leverage AI strengths while accounting for its limitations?",
                "Can I describe 3+ ways AI is likely to change my specific marketing specialty in the next 1-2 years?",
                "Have I successfully translated an AI capability into a specific marketing advantage in my work?"
            ]
        },
        {
            name: "Creative Readiness",
            description: "Ability to blend human creativity with AI assistance to create distinctive brand experiences",
            questions: [
                "Have I successfully used AI tools to enhance my creative process without sacrificing originality?",
                "Do I have personal guidelines for when to rely on my human creativity versus when to leverage AI assistance?",
                "Can I effectively guide and refine AI-generated creative work to match specific brand voices and objectives?",
                "Have I maintained or enhanced brand distinctiveness in my work while incorporating AI-generated elements?",
                "Do I know how to combine AI efficiency with human emotional intelligence in the content I create?"
            ]
        },
        {
            name: "Talent Readiness",
            description: "Personal skill development and preparation for an AI-enhanced career",
            questions: [
                "Am I actively building my AI knowledge through courses, experimentation, or other structured learning?",
                "Have I identified which of my current skills will remain valuable as AI becomes more prevalent in my role?",
                "Do I have relationships with at least three people I consider AI champions whom I can learn from?",
                "Do I have a personal development plan that accounts for the changing role of AI in my marketing career?",
                "Have I helped create opportunities for AI integration and collaboration in my workplace?"
            ]
        },
        {
            name: "Collaborative Readiness",
            description: "Ability to work with both AI systems and cross-disciplinary human teams",
            questions: [
                "Have I established effective personal workflows that combine my expertise with AI capabilities?",
                "Can I communicate effectively about AI concepts with both technical specialists and creative colleagues?",
                "Have I successfully worked on cross-functional teams where diverse skills were needed for AI projects?",
                "Can I translate technical AI capabilities into practical applications for marketing colleagues?",
                "Do I adapt quickly when new AI tools or capabilities are introduced to my workflow?"
            ]
        }
    ],
    
    // Feedback based on total score (0-25)
    overallFeedback: [
        "You're in the early stages of your AI journey. Your marketing role is at significant risk of disruption. Immediate action is required to develop fundamental AI literacy, establish basic AI workflows, and begin shifting your mindset toward AI-enhanced marketing practices. Focus first on technical literacy and simple use cases that demonstrate quick wins in your current role.",
        
        "You've begun your AI transition but have substantial gaps across multiple dimensions. While you understand AI's impact on marketing, your practical implementation remains limited. Prioritize developing a more strategic approach to your AI adoption and creating a structured personal learning plan. Seek out AI-experienced colleagues who can mentor you through initial implementation challenges.",
        
        "You're actively integrating AI into your marketing work with moderate success. You have strengths in some dimensions but significant opportunities in others. Focus on standardizing your successful practices, addressing specific dimension gaps, and pushing toward more advanced AI applications. Consider how your role might evolve to emphasize the uniquely human skills you bring to AI-enhanced marketing.",
        
        "You've successfully integrated AI across most aspects of your role and are realizing substantial productivity and creative benefits. Focus on refining your approaches, developing specialized expertise in AI applications for marketing, and preparing for emerging AI technologies. Consider positioning yourself as an AI champion who can guide others in your organization.",
        
        "You're at the forefront of AI-enhanced marketing, with strong capabilities across all dimensions. Your career is well-positioned to thrive in an AI-transformed industry. Focus on maintaining your competitive advantage through continuous innovation, mentoring others, and developing proprietary AI applications and workflows that create unique value for your organization or clients."
    ],
    
    // Feedback for each category based on category score (0-5)
    categoryFeedback: [
        // Technical Readiness feedback
        [
            "Your technical readiness is minimal. Begin with fundamental AI concepts and explore basic marketing AI tools like ChatGPT or Canva AI. Start with simple prompts and work on recognizing the difference between effective and ineffective AI outputs.",
            "You have a basic understanding of AI technologies. Continue learning key AI terminology and developing your prompt writing skills. Practice evaluating AI outputs more critically and experiment with one or two AI tools relevant to your specific marketing role.",
            "You have good technical foundations. Focus on building more sophisticated workflows using multiple AI tools together. Deepen your knowledge of specialized marketing AI tools and refine your prompt engineering techniques for consistent results.",
            "Your technical readiness is strong. Work on optimizing your AI workflows and staying current with emerging marketing AI technologies. Consider developing templates and systems that allow you to rapidly implement AI solutions for new marketing challenges.",
            "Your technical readiness is excellent. You can leverage advanced AI capabilities and integrate multiple AI tools into seamless marketing workflows. Focus on staying ahead of emerging trends and potentially contributing to the development of new AI marketing applications."
        ],
        // Strategic Readiness feedback
        [
            "Your strategic AI readiness needs development. Start by identifying specific marketing objectives in your role that could benefit from AI support. Learn to distinguish between tasks that AI can enhance versus those requiring primarily human judgment.",
            "You have basic strategic awareness. Work on developing a more nuanced understanding of AI's strengths and limitations in marketing contexts. Practice connecting AI capabilities to specific business outcomes that matter to your organization.",
            "You have good strategic alignment. Focus on anticipating industry changes driven by AI and developing approaches that maximize AI's potential while acknowledging its boundaries. Work on translating AI capabilities into specific competitive advantages.",
            "Your strategic readiness is strong. Continue developing innovative approaches that leverage AI in your marketing strategy. Practice identifying emerging opportunities where AI can create distinctive value for your organization or clients.",
            "Your strategic readiness is excellent. You demonstrate the ability to fully integrate AI into marketing strategy while maintaining human oversight where it matters most. You're positioned to help define how AI transforms marketing practices in your industry."
        ],
        // Creative Readiness feedback
        [
            "Your creative readiness for AI is just beginning. Start exploring how AI tools can complement creative processes without replacing human creativity. Experiment with using AI for initial ideation while adding your human perspective to refine outputs.",
            "You have basic creative readiness. Work on developing clearer guidelines for when to use AI versus human creativity in your projects. Practice directing AI tools more effectively to achieve specific creative objectives aligned with brand voice.",
            "You have good creative readiness. Continue refining your ability to maintain brand distinctiveness while leveraging AI. Focus on the balance between AI efficiency and human emotional intelligence in your creative work.",
            "Your creative readiness is strong. Work on pushing creative boundaries by finding new ways to combine human intuition with AI capabilities. Develop workflows that maximize creative output while ensuring authentic brand experiences.",
            "Your creative readiness is excellent. You seamlessly blend AI efficiency with human creativity, maintaining brand authenticity while maximizing creative output. You're positioned to redefine creative processes for the AI era in marketing."
        ],
        // Talent Readiness feedback
        [
            "Your talent readiness for the AI era needs attention. Begin by identifying specific learning resources to build your AI knowledge. Determine which of your current skills complement AI capabilities and which may need to evolve.",
            "You have basic talent readiness. Develop a more structured learning plan for building AI skills relevant to marketing. Identify potential mentors in your field who demonstrate strong AI capabilities and reach out to build relationships.",
            "You have good talent readiness. Continue actively developing your AI knowledge through structured learning. Create a clear personal development plan that positions you for success as AI transforms marketing roles.",
            "Your talent readiness is strong. Look for opportunities to lead AI initiatives and mentor others in their AI journey. Continue refining your unique value proposition as a human marketer in an increasingly AI-enhanced landscape.",
            "Your talent readiness is excellent. You're well-positioned to thrive in the AI era with a clear development path and strong relationships with AI innovators. Consider how you might help shape the future of marketing roles and skills in your organization."
        ],
        // Collaborative Readiness feedback
        [
            "Your collaborative readiness in an AI context is emerging. Begin by establishing basic workflows that combine your expertise with simple AI tools. Practice communicating about AI capabilities and limitations with colleagues.",
            "You have basic collaborative readiness. Work on improving communication between technical and marketing perspectives when discussing AI. Seek opportunities to participate in cross-functional projects where you can observe effective human-AI collaboration.",
            "You have good collaborative skills. Continue developing your ability to translate between technical possibilities and marketing objectives. Practice leading small initiatives that require coordination across different skill sets.",
            "Your collaborative readiness is strong. Look for opportunities to lead cross-functional teams working with AI systems. Focus on creating environments where human creativity and AI capabilities complement each other effectively.",
            "Your collaborative readiness is excellent. You effectively bridge human and AI domains, leading diverse teams and adapting smoothly as AI systems evolve. You're positioned to establish best practices for collaborative AI implementation in marketing."
        ]
    ],
    
    // Function to generate next steps
    getNextSteps: function(weakestAreas) {
        return [
            "Review your dimension scores to identify your strengths and priority areas for improvement.",
            `Create a targeted development plan focusing on your weakest dimensions: ${weakestAreas.join(", ")}.`,
            "Set specific, measurable goals with timelines. For example: \"Within 2 months, I will complete a prompt engineering course and build a personal prompt library for my common tasks.\"",
            "Find resources and mentors who can help you develop in your priority areas.",
            "Apply what you learn immediately to your current work, even in small ways. Practice is essential for developing AI readiness.",
            "Reassess regularly (every 3 months recommended) to measure your progress and adjust your development plan.",
            "Share your journey with colleagues to create a collaborative learning environment that benefits everyone."
        ];
    }
};
