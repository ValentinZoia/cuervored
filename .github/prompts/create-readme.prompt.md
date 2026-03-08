---
mode: "agent"
description: "Create a comprehensive README.md file for the project"
---

## Role

You're a senior expert software engineer with extensive experience in open source projects and technical documentation. You create README files that are visually appealing, highly informative, well-structured, and demonstrate deep technical understanding.

## Task

1. **Project Analysis**

   - Take a deep breath and thoroughly review the entire project workspace
   - Identify the tech stack, architecture patterns, and key features
   - Understand the project's purpose, challenges solved, and technical highlights

2. **Structure Inspiration**
   Take inspiration from these readme files for structure, tone and content:

   - https://raw.githubusercontent.com/Azure-Samples/serverless-chat-langchainjs/refs/heads/main/README.md
   - https://raw.githubusercontent.com/Azure-Samples/serverless-recipes-javascript/refs/heads/main/README.md
   - https://raw.githubusercontent.com/sinedied/run-on-output/refs/heads/main/README.md
   - https://raw.githubusercontent.com/sinedied/smoke/refs/heads/main/README.md

3. **Required Sections** (in this order)

   ### Header Section

   - Use centered alignment with `<div align='center'>`
   - Dont Include project logo/icon
   - Project title
   - Brief tagline/subtitle describing the project
   - Technology badges showing main stack (TypeScript, frameworks, databases, etc.)
   - Format badges as: `[![TechName](https://img.shields.io/badge/...)](tech-url)`

   ### 🎯 What & Why

   - **What is [Project Name]?**: Clear explanation of what the project does, written in an engaging way that showcases technical sophistication
   - **Why I Built This**: Demonstrate the technical skills and architectural thinking behind the project. Highlight:
     - Architectural patterns used
     - Performance optimizations implemented
     - Security best practices applied
     - Scalability considerations
     - Production-ready features
   - **The Challenge**: Describe the technical challenges solved and constraints addressed

   ### ⚡ Highlights

   - List key technical achievements using emojis for visual categorization
   - Group by type (Architecture, Performance, Security, Real-Time, Observability, etc.)
   - Use colored square emojis (🟪🟨🟦🟫⬜) to group related highlights
   - Format: `- 🟪 Specific Feature/Pattern Name`
   - Focus on impressive technical implementations, not basic features

   ### 👁️ Pages Preview

   - Create this section with just the title
   - Add comment: `<!-- Screenshots to be added -->`
   - Do NOT generate placeholder text or image paths

   ### 🏗️ Architecture

   - Explain the architectural decisions and patterns
   - Include subsections for key architectural components if applicable:
     - Database design patterns (e.g., Cache-Aside Pattern)
     - Event-driven architecture (e.g., Pub/Sub patterns)
     - Infrastructure optimizations
   - Use diagrams descriptions or code examples where relevant
   - Explain WHY certain architectural choices were made, not just WHAT they are

   ### 🛠️ Technology Stack

   - Organize into tables by category:
     - Core Framework
     - API & Real-Time
     - Database & Storage
     - Security
     - Development & Quality
     - Frontend (if applicable)
   - Table format:

```
     | Technology | Version | Purpose | Key Packages |
```

- Include version numbers where relevant
- Add links to getting started guides for complex integrations

### ⭐ Features

- Organize features by domain/module
- Use checkboxes: `- ✅ Feature description`
- Be specific about what's implemented
- Group related features under subheadings

### 🚀 Quick Start

**Prerequisites**

- List required software with version numbers
- Include optional tools (Docker, etc.)

**Installation**

- Provide clear, numbered steps
- Include all necessary commands
- Add configuration steps
- Include Docker Compose instructions if applicable

### 📚 Project Structure

- Show directory tree with descriptions
- Explain the purpose of main directories
- Highlight important architectural separations

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

- **Author:** Valentín Zoia
- **Email:** zoiavalentin.dev@gmail.com
- **LinkedIn:** [Profile](https://linkedin.com/in/valentinzoia)
- **Portfolio:** [Website](https://valentinzoia.vercel.app)

### Footer

- Add: `---`
- Add: `**Built with ❤️ and best practices**`

4. **Style Guidelines**

   - Use GFM (GitHub Flavored Markdown)
   - Use GitHub admonition syntax where appropriate
   - Be technical and detailed, not generic
   - Write in a professional yet engaging tone
   - Use **bold** sparingly for emphasis
   - Use `code blocks` for technical terms, commands, and code
   - Keep emojis minimal and purposeful (mainly in section headers)
   - Write detailed explanations for complex technical concepts
   - Include code examples for architectural patterns when relevant

5. **What NOT to Include**

   - Do NOT create separate sections for: LICENSE, CONTRIBUTING, CHANGELOG (these have dedicated files)
   - Do NOT add placeholder images or fake image paths
   - Do NOT use generic descriptions - be specific about THIS project
   - Do NOT oversimplify technical concepts - assume technical audience

6. **Content Quality**
   - Every section should add value - no filler content
   - Technical explanations should demonstrate deep understanding
   - Code examples should be real and from the project when possible
   - Highlight what makes THIS project technically interesting
   - Be honest about what's implemented vs. planned
