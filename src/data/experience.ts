export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  summary?: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    title: "Technical Lead",
    company: "Inditex",
    location: "Arteixo, Galicia, Spain",
    date: "May 2026 - Present",
    summary: "Leading a core internal platform in the buying and supplier management domain, part of the Inditex Open Platform (IOP) that powers operations across 96 markets.",
    responsibilities: [
      "Drive technical decisions, architecture standards and team growth.",
      "Champion AI adoption as a first-class engineering practice, moving teams from implementation-focused work to higher-value architectural thinking.",
      "Build agentic software factories: autonomous, human-in-the-loop workflows so the team focuses on business understanding and acceptance criteria while agents handle the rest.",
      "API-first development and event-driven systems."
    ],
    technologies: ["Java 25", "Spring Boot 4.x", "Kafka", "Claude Code", "OpenCode", "T3 Code", "MCP", "Agentic Workflows"]
  },
  {
    title: "Senior Software Engineer",
    company: "Capitole",
    location: "Spain",
    date: "September 2022 - May 2026",
    summary: "Client: Inditex. Scalable microservices and distributed systems for one of the world's largest retail platforms, plus a leading role in AI-first development adoption.",
    responsibilities: [
      "Trained developers across several teams on AI-assisted workflows, context engineering and Spec-Driven Development (SDD).",
      "Built internal libraries that integrate AI agents into the development lifecycle through reusable skills and structured workflows.",
      "Enabled a cross-functional model where backend and frontend engineers take on each other's tasks while keeping code quality and security standards.",
      "Designed and built event-driven microservices with Kafka, improving platform scalability and resilience.",
      "Developed reactive applications with Spring Boot and WebFlux for high-throughput, low-latency use cases.",
      "Implemented API-first REST services and rigorous testing practices (JUnit, Karate)."
    ],
    technologies: ["Java 21", "Spring Boot 3.x", "Spring WebFlux", "MongoDB", "Kafka", "Redis", "PostgreSQL", "Docker", "Kubernetes", "AWS EKS", "GitLab CI", "Claude Code", "GitHub Copilot"]
  },
  {
    title: "Software Engineer III",
    company: "dLocal",
    location: "Madrid, Spain",
    date: "May 2023 - April 2025",
    summary: "Built high-volume, low-latency services for dLocal's payment platform, processing transactions across multiple markets, focused on reliability, observability and performance.",
    description: "All-in-one payment platform connecting global merchants to emerging markets in Latin America",
    responsibilities: [
      "Development and maintaining new generation of microservices within the architecture",
      "Implement defined requirements, with a combination of system architecture and programming skills",
      "Design solutions, code, test, and deploy them, while optimizing existing products",
      "Write clear, maintainable code that will perform on multiple platforms",
      "Solve integration problems, prototype and develop custom solutions"
    ],
    technologies: ["Java", "Go", "AWS", "Kafka", "REST APIs", "New Relic", "Docker", "Kubernetes"]
  },
  {
    title: "Software Engineer II",
    company: "dLocal",
    location: "Madrid, Spain",
    date: "August 2021 - April 2023",
    summary: "Developed and maintained core backend services for dLocal's payment processing platform, with event-driven architectures and RESTful APIs in a fast-paced FinTech environment.",
    description: "All-in-one payment platform connecting global merchants to emerging markets in Latin America",
    technologies: ["Java", "Go", "AWS", "Kafka", "REST APIs"]
  },
  {
    title: "Senior Backend Engineer",
    company: "Vortech",
    location: "Remote",
    date: "February 2022 - September 2022",
    description: "ING - Contingent Worker",
    summary: "ING - Contingent Worker",
    responsibilities: [
      "Design, develop and test the code that will shape the different components of the application",
      "Ensure the requirements of functionality, quality and performance",
      "Deliver in Production a working software by giving the best use to technology and development practices",
      "Support Production by analysis and fixing any bugs that occurs"
    ],
    technologies: ["Java 17", "Spring Boot", "RestFul APIs", "Microservices", "Docker", "Kubernetes"]
  },
  {
    title: "Senior Software Engineer",
    company: "Appgate",
    location: "Medellín, Colombia",
    date: "April 2021 - August 2021",
    description: "Secure Access Products & Services",
    summary: "Secure Access Products & Services",
    responsibilities: [
      "Development and maintaining microservices used to manage internal products in the company",
      "Responsible of application security vulnerabilities",
      "Add improvements to our current processes."
    ],
    technologies: ["Java", "ReactJs", "NodeJs", "Microservices", "Docker"]
  },
  {
    title: "Senior Java Developer",
    company: "Yuxi Global",
    location: "Medellín, Colombia",
    date: "October 2020 - April 2021",
    description: "Apex Supply Chain Technologies",
    summary: "Apex Supply Chain Technologies",
    responsibilities: [
      "Development and maintaining Java/Spring Microservices used to manage our online vending and locker systems.",
      "Responsible of application security vulnerabilities",
      "Add improvements to our current processes."
    ],
    technologies: ["Java", "NodeJs", "Blockchain", "Microservices", "Docker", "Kubernetes"]
  },
  {
    title: "Senior Software Engineer",
    company: "Almundo",
    location: "Medellín, Colombia",
    date: "April 2018 - October 2020",
    description: "E-commerce platform",
    summary: "E-commerce platform",
    responsibilities: [
      "Development and implementation of components for the company",
      "Integrated with other components, solved problems across subsystems and products, to produce a final product",
      "DevOps",
      "A/B testing with Google Analytics",
      "Responsible of application security vulnerabilities",
      "Add improvements to our current processes."
    ],
    technologies: ["Java", "Spring Boot", "Spring WebFlux", "RestFul APIs", "Microservices", "Redis", "Kafka", "Docker"]
  },
  {
    title: "Software Architect",
    company: "Ceiba Software",
    location: "Medellín, Colombia",
    date: "August 2016 - April 2018",
    responsibilities: [
      "Known in general the scope of the project, the vision and the general goals, as well as its release plan",
      "Develop software requeriments under the language of required programming and with policies, procedures, and guidelines established by the company for all products",
      "Promote and adequate communication and cooperation environment with the members of the project team",
      "Value the objectives of the project over personal or particular, supporting all team members in the solution of the difficulties"
    ],
    technologies: ["Java", "Spring Boot", "Microservices"]
  },
  {
    title: "Software Developer Advance",
    company: "Heinsohn Business Technology",
    location: "Armenia, Colombia",
    date: "June 2012 - August 2016",
    responsibilities: [
      "Develop software requirements under the language of required programing and with policies, procedures, and guidelines established by the company, for all products",
      "Develop software under the procedures and quality standards established",
      "Serve support in customer service"
    ],
    technologies: ["Java"]
  }
];
