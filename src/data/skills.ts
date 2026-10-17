export interface SkillGroup {
    title: string;
    highlight?: boolean;
    skills: string[];
}

export const skillsData: SkillGroup[] = [
    {
        title: "AI & Agents",
        highlight: true,
        skills: ["Agentic AI Development", "AI-First Development", "AI Agents", "Agentic Software Factories", "Human-in-the-Loop Workflows", "Context Engineering", "Spec-Driven Development", "Prompt Engineering", "Testing LLM", "AI Productivity", "MCP", "Claude Code", "OpenCode", "T3 Code", "LangChain", "Ollama"]
    },
    {
        title: "Technical Leadership",
        skills: ["Technical Leadership", "Architecture Ownership", "Mentoring & Team Growth", "AI Adoption", "Delegation", "Agile (Scrum, Kanban)", "Communication"]
    },
    {
        title: "Backend",
        skills: ["Java 25", "Spring Boot 4.x", "Spring WebFlux", "Kotlin", "Go", "Python", "Node.js", "TypeScript", "REST APIs", "Software Testing", "Unit & Integration Testing"]
    },
    {
        title: "Architecture",
        skills: ["Software Architecture", "Event-Driven Architecture", "Microservices", "Distributed Systems", "Clean Architecture & Design Patterns", "Hexagonal Architecture", "SOLID Principles", "Separation of Concerns", "Software Craftsmanship", "Software architecture for applications with AI"]
    },
    {
        title: "Cloud & Data",
        skills: ["AWS", "Google Cloud Platform", "Docker", "Kubernetes", "CI/CD", "DevOps", "Kafka", "RabbitMQ", "Redis", "MongoDB", "Observability", "New Relic", "ELK Stack"]
    }
];
