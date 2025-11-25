# Copilot Instructions

This document outlines the project structure, coding conventions, and best practices for this React TypeScript web application.

## Project Structure

### Component Organization

- **Major components** get their own folder under `src/` with the following structure:
  - `ComponentName/`
    - `ComponentName.tsx` (main component file)
    - `ComponentName.css` (only if styling is needed)
    - Helper/sub-components in the same folder (without separate folders)
    - Types defined within `ComponentName.tsx` or in a types file within the component folder

- **Common/reusable components** belong in `src/components/`
- **Common types** belong in `src/types/`
- **CSS files are created only when needed** — avoid creating empty or unnecessary stylesheets

### Example Structure

```
src/
├── types/
│   ├── project-types.ts
│   └── recipe-types.ts
├── components/
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   └── Sidebar.css
│   └── Header/
│       ├── Header.tsx
│       └── Header.css
├── pages/
│   ├── Home/
│   │   ├── HomePage.tsx
│   │   └── HomePage.css
│   └── WeddingRegistry/
│       ├── WeddingRegistry.tsx
│       └── WeddingRegistry.css
└── index.css
```

## CSS Guidelines

### Color Management

- Use pre-made colors from `index.css` as the source of truth
- Add new colors to `index.css` as needed (define them with CSS custom properties)
- Never hardcode colors directly in component stylesheets

### Light/Dark Mode Support

- Always account for light and dark mode in styles
- Use CSS custom properties to switch between light and dark variants
- Example approach in `index.css`:
  ```css
  :root {
    --color-text: #fff;
    --color-bg: #1a1a1a;
  }
  
  [data-theme="light"] {
    --color-text: #000;
    --color-bg: #fff;
  }
  ```

### Nested CSS

- Use nested CSS (modern CSS nesting) for better organization and readability
- Example:
  ```css
  .component {
    padding: 1rem;
    
    &header {
      font-size: 1.5rem;
      
      &--active {
        color: var(--color-primary);
      }
    }
    
    &content {
      margin-top: 1rem;
    }
  }
  ```

### Semantic HTML/CSS

- Prefer semantic HTML elements when practical (e.g., `<button>`, `<section>`, `<article>`, `<nav>`)
- Don't force semantics if it complicates the implementation unnecessarily
- Use CSS classes for styling and state management

## TypeScript Guidelines

- Define types within the component file unless they're meant to be shared across multiple components
- Move commonly used types to `src/types/`
- Use `index.ts` files for clean exports from component folders

## Import Conventions

- Use folder-level exports via `index.ts` for cleaner imports:
  ```typescript
  // Instead of:
  import { Button } from '../components/Button/Button';
  
  // Prefer:
  import { Button } from '../components/Button';
  ```

## Responsive Design

### Mobile-First Approach

- Build with mobile in mind first, then enhance for larger screens
- Use CSS media queries to add complexity/layout changes as screen size increases
- Test regularly on mobile devices and use browser dev tools to simulate different screen sizes

### Layout Considerations

- Use flexible layouts like flexbox and grid instead of fixed widths
- Use relative units (`rem`, `em`, `%`) instead of fixed pixels when possible
- Ensure touch targets are at least 44-48px for mobile usability
- Avoid horizontal scrolling on mobile unless absolutely necessary

### Responsive Media Queries

- Define breakpoints in `index.css` using CSS custom properties if helpful
- Common breakpoints: mobile-first, then tablet (768px+), then desktop (1024px+)
- Example:
  ```css
  .component {
    padding: 1rem;
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
    
    @media (min-width: 1024px) {
      padding: 3rem;
    }
  }
  ```

### Container Queries

- Consider using CSS container queries for self-contained component responsiveness when appropriate

## General Best Practices

- Keep components focused and single-purpose
- Extract helper components into the same folder rather than creating unnecessary subfolders when
  they are only used by one main component and are simple enough
- Test changes in both light and dark modes AND across multiple screen sizes before committing
- Use consistent naming: PascalCase for components and types, camelCase for files and variables