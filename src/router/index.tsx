// ─────────────────────────────────────────────
//  Router — Application Routes
//  Central route configuration.
//  All routes listed here, matching the spec.
// ─────────────────────────────────────────────

import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/Home/HomePage'
import { WorkPage } from '../pages/Work/WorkPage'
import { BrandingPage } from '../pages/Branding/BrandingPage'
import { BrandProjectPage } from '../pages/Branding/BrandProjectPage'
import { UIUXPage, VideoEditingPage, AnimationPage, OtherPage } from '../pages/future/CategoryPages'
import { AboutPage } from '../pages/About/AboutPage'
import { ResumePage } from '../pages/Resume/ResumePage'
import { ContactPage } from '../pages/Contact/ContactPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        // Home
        { index: true, element: <HomePage /> },

        // Work
        { path: 'work', element: <WorkPage /> },

        // Branding category
        { path: 'work/branding', element: <BrandingPage /> },

        // Individual brand project pages
        { path: 'work/branding/aticx', element: <BrandProjectPage /> },
        { path: 'work/branding/beautyxtasy', element: <BrandProjectPage /> },
        { path: 'work/branding/crobstacle-india', element: <BrandProjectPage /> },
        { path: 'work/branding/dr-rich-melheim', element: <BrandProjectPage /> },
        { path: 'work/branding/gcode-health', element: <BrandProjectPage /> },
        { path: 'work/branding/jyotsana-classes', element: <BrandProjectPage /> },
        { path: 'work/branding/cardiocure-clinic', element: <BrandProjectPage /> },
        { path: 'work/branding/skincanberra', element: <BrandProjectPage /> },
        { path: 'work/branding/yelux', element: <BrandProjectPage /> },

        // Future categories
        { path: 'work/ui-ux', element: <UIUXPage /> },
        { path: 'work/video-editing', element: <VideoEditingPage /> },
        { path: 'work/animation', element: <AnimationPage /> },
        { path: 'work/other', element: <OtherPage /> },

        // Other top-level pages
        { path: 'about', element: <AboutPage /> },
        { path: 'resume', element: <ResumePage /> },
        { path: 'contact', element: <ContactPage /> },
      ],
    },
  ],
  {
    // Base path — update to '/repo-name/' when deploying to GitHub Pages sub-path
    basename: '/',
  }
)
