# Architecture and Code Standards Guide

## 1. Folder Structure

### General Rules
- Maintain a flat and organized folder structure
- Group files by functionality, not by type
- Each component should have its own folder with its tests
- Folder names should be lowercase and use hyphens to separate words
- File names should follow PascalCase for components and camelCase for utilities

### Recommended Structure
```
src/
  assets/          # Static assets (images, fonts, etc.)
  components/       # Reusable components
  constants/       # Application constants
  hooks/           # Custom hooks
  pages/           # Page components
  services/        # Services and API calls
  stores/          # Global application state
  types/           # TypeScript type definitions
  utils/           # Utility functions
```

## 2. Code Standards

### Naming Conventions
- Use descriptive and meaningful names
- Components: PascalCase (e.g., MessageList.tsx)
- Functions and variables: camelCase (e.g., getUserData)
- Interfaces and Types: PascalCase with I prefix for interfaces (e.g., IMessage)
- Constants: UPPER_SNAKE_CASE

### React Components
- One component per file
- Use functional components with hooks
- Props defined using TypeScript interfaces
- Avoid props drilling, use Context or state managers when necessary
- Keep components small and with a single responsibility
- Extract complex logic into custom hooks

### TypeScript
- Use explicit types, avoid 'any'
- Define interfaces for all important data structures
- Use generic types when appropriate
- Keep types in separate files when shared

## 3. Testing

### Testing Rules
- Each component must have its unit tests
- Tests should be descriptive and follow the AAA pattern (Arrange-Act-Assert)
- Use mocks for external services and APIs
- Keep tests simple and focused
- Minimum required coverage: 80%

### Test Structure
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  it('should render correctly', () => {
    // Test
  });

  describe('when specific condition', () => {
    it('should behave as expected', () => {
      // Test
    });
  });
});
```

## 4. State and Data Management

### State Rules
- Use stores for global state
- Use zustand as the global state manager
- Keep state local whenever possible
- Implement caching patterns when necessary
- Document the state structure

### API Services
- Centralize API calls in services
- Use types for requests and responses
- Implement consistent error handling
- Use interceptors for common logic

## 5. Performance

### Optimizations
- Use React.memo for components receiving immutable props
- Implement lazy loading for routes and large components
- Optimize re-renders using useMemo and useCallback appropriately
- Minimize the number of external dependencies

## 6. Styling

### CSS
- Use CSS Modules or styled-components for styles
- Follow BEM methodology if using plain CSS
- Keep styles close to their components
- Use CSS variables for themes and reusable values

## 7. Git and Version Control

### Commits and PRs
- Use atomic and descriptive commits
- Follow Conventional Commits (feat:, fix:, etc.)
- Review code before creating a PR
- Keep PRs small and focused

### Branches
- main: production code
- develop: active development
- feature/*: new features
- fix/*: bug fixes

## 8. Documentation

### Requirements
- Updated README with setup instructions
- Document important architectural decisions
- JSDoc for public functions and components
- Keep changelog updated

## 9. Security

### Best Practices
- Do not expose sensitive information in the code
- Validate user inputs
- Keep dependencies updated
- Implement data sanitization

## 10. CI/CD

### Pipeline
- Run tests automatically
- Verify TypeScript types
- Run linting
- Build and verify the build
- Deploy automatically to test environments

## 11. Accessibility

### Standards
- Comply with WCAG 2.1 Level AA minimum
- Use ARIA attributes when necessary
- Ensure functional keyboard navigation
- Maintain adequate text contrast
- Implement alternative text for images

### Accessibility Testing
- Use tools like Axe or Lighthouse to verify accessibility
- Include accessibility testing in the QA phase
- Fix accessibility issues with the same priority as functional bugs

## 12. Internationalization (i18n)

### Implementation
- Use an i18n system like react-i18next
- Extract all texts to translation files
- Avoid string concatenation to form messages
- Consider cultural aspects like date and number formats
- Support language change without page refresh

## 13. Error Management

### Strategy
- Implement error boundaries to catch rendering errors
- Categorize errors by type and severity
- Display user-friendly error messages
- Log errors in services like Sentry
- Define retry strategies for critical operations
- Handle loading, error, and success states consistently

## 14. Browser Compatibility

### Minimum Requirements
- Support for the latest 2 versions of modern browsers (Chrome, Firefox, Safari, Edge)
- Support for IE11 only if it's a business requirement
- Use polyfills for modern features when necessary
- Test on multiple browsers before deploying to production

## 15. Code Reviews

### Criteria
- The code complies with defined standards
- All tests pass and there is adequate coverage
- No unnecessary code duplication
- The code is readable and maintainable
- Performance and security aspects have been considered
- Functionality meets requirements

### Process
- At least one approver is required before merging
- Resolve all comments before merging
- Use automated tools whenever possible
- Focus on the code, not the person

## 16. Recommended Tools

### Development
- ESLint: JavaScript/TypeScript linting
- Prettier: code formatting
- Husky: pre-commit hooks
- Jest/Vitest: unit testing
- Testing Library: component testing
- Storybook: component documentation

### Deployment
- GitHub Actions / GitLab CI: automation
- Docker: containerization
- Vercel/Netlify: frontend deployment
- Sentry: error monitoring

## 17. Vite Configuration and Usage

### Configuration File (`vite.config.js`/`ts`)
- Keep the configuration file organized and commented.
- Define base path, server proxy, and build options clearly.
- Use environment variables for sensitive or environment-specific settings.

### Environment Variables
- Use Vite's built-in environment variable handling (`import.meta.env`).
- Prefix custom environment variables with `VITE_` to expose them to client-side code.
- Do not commit sensitive keys; use `.env` files and `.env.local`.

### Development Server
- Utilize Vite's fast HMR (Hot Module Replacement) during development.
- Configure server proxy in `vite.config.js` for API requests to avoid CORS issues.

### Build Process
- Use `vite build` for production builds.
- Analyze bundle size using tools like `rollup-plugin-visualizer` if needed.
- Configure code splitting and chunking strategies in `vite.config.js` for optimization.

### Plugin Usage
- Carefully select Vite plugins based on project needs.
- Keep plugin configurations updated and documented.