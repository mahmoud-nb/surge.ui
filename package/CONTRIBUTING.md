# Contributing Guide

Thank you for your interest in contributing to **SurgeUI**!
This document explains how to report issues, request features, and submit pull requests.

## Prerequisites

- Node.js 16+
- Vue.js 3.3+

## Project Structure

- `package/` → Vue components + Typescript + SCSS + tokens
- `docs/` → VitePress documentation

## 🚀 Getting Started

1. Fork the repository

Click **Fork** at the top-right of the GitHub page.

2. Clone your fork locally

```bash
git clone https://github.com/mahmoud-nb/surge.ui.git

cd surge.ui
```

3. Install dependencies

```bash
npm install
```

4. Run the project

```bash
# Development mode
npm run dev

# Storybook
npm run storybook
```

## 🧪 Development Guidelines

### 🎯 Code Style

- Use TypeScript whenever possible.
- Follow the existing code style and project structure.
- Run the linter before committing:

### 🐛 Reporting Issues

If you encounter a bug, please include:

- A clear description of the issue
- Steps to reproduce
- Expected behavior
- Screenshots or console errors (if applicable)
- Environment details (OS, Node version, browser, etc.)

Before opening an issue, please check if one already exists.

### 🌟 Feature Requests

Suggestions are welcome!
When proposing a new feature, explain:

- The problem it solves
- Why it is useful
- Possible implementation ideas


## 🧩 Submitting Pull Requests

1. Create a new branch 

- Ensure you have the latest version:

```bash
git fetch && git pull origin main
```

- **SurgeUI** uses conventional branch name prefixes:

- `feature/` (or `feat/`): For new features
- `bugfix/` (or `fix/`): For bug fixes 

- Use a clear, descriptive branch name:

```bash
# New feature
git checkout -b feat/new-feature-description

# Bug fix
git checkout -b fix/issue-description

```


2. Development Rules

- Write clean, readable code
- Use the existing design tokens
- Ensure full accessibility support
- Do not duplicate or recreate existing components
- Create a Storybook file and documentation for new components


3. Commit and create a Pull Request

**SurgeUI** uses conventional commit messages: 

```bash
# type : feat | fix | style | docs | chore | test | refactor
# scope : (optional) component or composable name
# description : clear description of the issue
# example : fix(Button): correct disabled state styling

<type>(<scope>): <description>

[optional body]

[optional footer]

```

- Run the linter before committing :
```bash
npm run lint:fix
```

- Ensure the build passes :
```bash
npm run build
```

- Add tests or comments if necessary
- Use a clear and concise commit message
- Open a Pull Request targeting the `main` branch


Thank you for helping improve **SurgeUI**! 🙌

