# Who Wants to Be a Millionaire

## Project Overview

A full-featured implementation of the classic "Who Wants to Be a Millionaire" quiz game built using Next.js, TypeScript, and modern web technologies. This application provides an interactive gaming experience with question progression, score tracking, and responsive design.

## Features

- Classic Gameplay: 12-question progression system
- Multiple Choice: Four answer options with single correct answer
- Responsive Design: Optimized for all device types and screen sizes
- JSON Configuration: Easy game customization through configuration files
- Extensible Architecture: Modular design for feature expansion
- Results Display: Comprehensive game outcome presentation
- Full TypeScript Support: Complete type safety and IntelliSense
- Unit Testing: Comprehensive test coverage with Jest
- Code Quality: ESLint with Airbnb configuration
- Git Hooks: Pre-commit quality assurance

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Static type checking
- **ESLint** - Code linting and formatting
- **Jest** - Unit testing framework
- **Husky** - Git hooks management
- **lint-staged** - Pre-commit file checking

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Initialize Git hooks:

```bash
npm run prepare
```

4. Verify installation

```bash
npm run lint
npm test
```

## Development

### Start development server on port 3000

```bash
npm run dev
```

Navigate to http://localhost:3000

## Run tests to ensure functionality:

```bash
npm test
```

### Check code quality

```bash
npm run lint
```

## Project Structure

```
quizz-game/
├── src/                          # Source code directory
│   ├── __tests__/               # Test files
│   ├── app/                     # Next.js app directory
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page component
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── common/              # Reusable UI components
│   ├── context/                 # React Context providers
│   ├── types                   # TypeScript type definitions
│   └── gameConfig.json          # Game configuration
├── public/                      # Static assets
│   ├── images/                  # Image files
│   └── favicon.ico              # Site favicon
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── jest.config.js              # Jest testing configuration
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration
```

## Game Configuration

The game uses a JSON configuration file located at `src/gameConfig.json` to define questions, answers, and prize structure.

### Формат конфігурації

```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "answer": ["London"],
      "prize": 100
    }
  ]
}
```

### Customization Options

- **Multiple Correct Answers**: Add multiple indices to `answer` array
- **Variable Options**: Modify `options` array length


## Extensions

To add new features:
1. Create new types in `src/types`
2. Add components to the appropriate folders
3. Update configuration if necessary
4. Add tests for the new functionality
