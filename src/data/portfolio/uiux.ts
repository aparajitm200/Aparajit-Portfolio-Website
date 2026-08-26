import type { PortfolioCategory } from '../../types/portfolio'

export const uiuxCategory: PortfolioCategory = {
  slug: 'ui-ux',
  title: 'UI/UX',
  displayTitle: 'UI/UX Design',
  description:
    'Interface design, user experience, and product design — from wireframes to polished high-fidelity prototypes.',
  shortDescription: 'Interface design & user experience',
  comingSoon: false,
  projects: [
    {
      slug: 'circle-one',
      title: 'CircleOne',
      subtitle: 'Connecting Neighbours Through Design',
      type: 'Product Design',
      description: 'A concept-level solution for urban loneliness by combining hyperlocal feeds, gentle social discovery, and calm visual design.',
      shortDescription: 'Hyperlocal social network concept',
      heroImage: 'images/uiux/circle-one/UI Showcase/01-circleone-splash.png',
      thumbnailImage: 'images/uiux/circle-one/UI Showcase/01-circleone-splash.png',
      year: 2024,
      tags: ['Concept', 'UI/UX', 'Social'],
      sections: [
        {
          id: 'overview',
          title: 'Project Overview',
          description: "What if connecting with your neighbours was as easy as checking your phone, but without the toxicity of global platforms? CircleOne is designed to bridge the gap between digital interaction and physical proximity. It's a hyperlocal social network that limits its radius to your immediate neighbourhood.",
          layout: 'cinematic-overview'
        },
        {
          id: 'insight',
          title: 'Human Insight',
          description: "We live closer together than ever before, yet urban loneliness is at an all-time high. People hesitate to knock on their neighbour's door. Social media connects us globally but isolates us locally.",
          layout: 'default'
        },
        {
          id: 'problem-solution',
          title: 'Problem, Solution & Research at a Glance',
          layout: 'bento-stats',
          contentData: {
            items: [
              {
                iconName: 'ShieldAlert',
                title: 'The Problem',
                description: 'Urban isolation is rising. Neighbours are strangers. Existing apps feel unsafe or overly corporate.'
              },
              {
                iconName: 'Lightbulb',
                title: 'The Solution',
                description: 'A beautifully calm, radius-limited feed that converts digital serendipity into real-world interactions.'
              },
              {
                iconName: 'Users',
                title: 'The Empty Nester Persona',
                description: 'Looking for local community events or a walking buddy without broadcasting to the entire city.'
              },
              {
                iconName: 'Briefcase',
                title: 'The Young Pro Persona',
                description: 'Just moved. Looking to borrow a drill, find a gym partner, or discover hidden cafes nearby.'
              },
              {
                iconName: 'MapPin',
                title: 'Hyperlocal Radius',
                description: 'The app locks interactions to a strict 2km radius to ensure relevance and physical proximity.'
              },
              {
                iconName: 'HeartHandshake',
                title: 'Emotionally Safe',
                description: 'Soft palettes, rounded typography, and verified trust signals designed for older demographics.'
              }
            ]
          }
        },
        {
          id: 'experience-flow',
          title: 'Experience Flow',
          layout: 'flow-steps',
          contentData: {
            steps: [
              {
                step: '1',
                title: 'Hyperlocal Feed',
                description: 'See what people near you are doing in real time. No algorithms, just pure chronological local events.'
              },
              {
                step: '2',
                title: 'Explore Nearby',
                description: 'Discover local activities, garage sales, and verified users in your immediate vicinity.'
              },
              {
                step: '3',
                title: 'Instant Messaging',
                description: 'Direct chat with neighbours. Send secure messages before deciding to meet in person.'
              },
              {
                step: '4',
                title: 'Post Creation',
                description: 'Share images, documents, polls, and videos with a few taps to organize local gatherings.'
              }
            ]
          }
        },
        {
          id: 'design-system',
          title: 'Design System',
          layout: 'design-system',
          contentData: {
            colors: [
              { hex: '#FFFFFF', name: 'Surface Primary' },
              { hex: '#F3F4F6', name: 'Background Base' },
              { hex: '#3B82F6', name: 'Brand Accent' },
              { hex: '#111827', name: 'Text Primary' }
            ],
            typography: [
              { fontName: 'DM Serif Display', sample: 'Connecting Neighbours' },
              { fontName: 'Inter', sample: 'Clear, accessible, and calm UI text.' }
            ]
          }
        },
        {
          id: 'future',
          title: 'Future Scope',
          description: "AI-based neighbour matching to suggest compatible profiles. Local event discovery and meetups inside the app. Neighbourhood safety alerts and verified identity systems. Community groups based on interests and locations."
        }
      ]
    }
  ],
}
