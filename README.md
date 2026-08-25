# Aparajit Singh — Portfolio

This is the source code for Aparajit Singh's interactive portfolio website, built with React, Vite, and TypeScript.

## Project Structure

The project is structured to make updating and editing content as simple as possible.

- `src/data/portfolio/`: **Source of Truth for Content**. To update the projects shown on the website, edit the files in this directory (`branding.ts`, `future.ts`, `index.ts`). You do not need to touch the UI components to add new projects.
- `src/pages/`: Contains the main page components (`Home`, `About`, `Work`, `Branding`, `Project`).
- `src/components/`: Reusable UI components and animations.
- `src/styles/`: Global CSS and Design Tokens (`index.css`).
- `public/images/`: Store all static imagery (thumbnails, hero banners) here.

## How to Add or Edit Projects

### 1. Adding a Project
To add a project to an existing category (e.g., "Branding"):
1. Place the project's images into the `public/images/` directory.
2. Open the corresponding data file (e.g., `src/data/portfolio/branding.ts`).
3. Add a new object to the `projects` array following the existing format:
```typescript
{
  slug: 'new-project',
  title: 'New Project Title',
  subtitle: 'Project Subtitle',
  type: 'Project Type (e.g., Brand Identity)',
  description: 'Full description of the project...',
  shortDescription: 'Short summary for cards',
  heroImage: 'images/brands/hero.jpg',
  thumbnailImage: 'images/brands/thumbnail.jpg',
  year: 2024,
  tags: ['Tag 1', 'Tag 2'],
  // For standard projects, add more images to show in the detailed view
  images: [
    'images/brands/img-1.jpg',
    'images/brands/img-2.jpg'
  ],
  // For video/animation projects, you can add a YouTube embed link instead
  embedUrl: 'https://www.youtube.com/embed/XXXXXX'
}
```
The website will automatically pick up the new project, render its thumbnail in the grid, and create its dedicated project page at `/work/branding/new-project`.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start the local development server (usually on http://localhost:5173)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Technologies Used

- **React 18**
- **TypeScript**
- **Vite**
- **React Router v6**
- **GSAP** (for complex scroll and stagger animations)
- **Framer Motion** (for page transitions)
- **Vanilla CSS** (with extensive custom variables for design tokens)
