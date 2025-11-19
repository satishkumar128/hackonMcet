# AI-Powered Learning Platform - Development Plan

## Overview
Building a comprehensive learning platform with AI-driven skill gap analysis, consistency tracking, and peer matching.

## File Structure Plan

### Pages (8 files total - HARD LIMIT)
1. **src/pages/Index.tsx** - Landing/Dashboard page with overview
2. **src/pages/Dashboard.tsx** - Main student dashboard with progress overview
3. **src/pages/SkillAnalyzer.tsx** - AI skill gap assessment tool
4. **src/pages/ConsistencyTracker.tsx** - Learning streak and goal tracking
5. **src/pages/PeerMatching.tsx** - Peer connection and matching system
6. **src/pages/Resources.tsx** - Personalized learning resources

### Components
7. **src/components/SkillChart.tsx** - Reusable chart component for skill visualization
8. **src/components/StreakCalendar.tsx** - Calendar component for tracking study streaks

### Core Files to Modify
- **src/App.tsx** - Add routing for all pages
- **index.html** - Update title and meta tags

## Implementation Details

### 1. Landing/Dashboard (Index.tsx)
- Hero section with platform introduction
- Quick stats overview (skills tracked, study streak, peer connections)
- Call-to-action buttons to different sections
- Modern gradient design with animations

### 2. Student Dashboard (Dashboard.tsx)
- Progress overview cards
- Recent activity feed
- Quick access to all features
- Personalized AI recommendations

### 3. AI Skill Gap Analyzer (SkillAnalyzer.tsx)
- Interactive skill assessment interface
- Multiple subject categories (Math, Science, Languages, etc.)
- Radar chart visualization of skill levels
- AI-generated recommendations for improvement
- Mock AI analysis with realistic suggestions

### 4. Learning Consistency Tracker (ConsistencyTracker.tsx)
- Study streak counter with fire emoji
- Calendar view showing study days
- Daily/weekly/monthly goal setting
- Progress bars and motivational messages
- Achievement badges

### 5. Peer Matching System (PeerMatching.tsx)
- Student profile cards with skills and interests
- AI-powered matching algorithm (mock)
- Filter by subject, skill level, availability
- Connect/message buttons
- Study group suggestions

### 6. Resource Recommendation Engine (Resources.tsx)
- Personalized learning material cards
- Filter by subject and difficulty
- Video tutorials, articles, exercises
- Bookmarking functionality
- AI-recommended based on skill gaps

### 7. SkillChart Component (SkillChart.tsx)
- Reusable radar/bar chart for skills
- Uses recharts library
- Responsive design
- Color-coded by proficiency level

### 8. StreakCalendar Component (StreakCalendar.tsx)
- Calendar grid showing study activity
- Heat map style visualization
- Hover tooltips with details
- Current streak highlighting

## Technology Stack
- React + TypeScript
- Shadcn-ui components
- Tailwind CSS
- Recharts for data visualization
- React Router for navigation
- LocalStorage for data persistence (mock backend)

## Mock Data Strategy
Since this is a demo without real AI backend:
- Use predefined skill assessment questions
- Generate realistic AI recommendations from templates
- Create sample peer profiles
- Use algorithmic matching based on interests/skills
- Store user progress in localStorage

## Design Principles
- Modern, clean interface with gradients
- Smooth animations and transitions
- Mobile-responsive design
- Accessible color contrasts
- Intuitive navigation