# Barako 9-Ball Tournament Management System

## Project Overview

A mobile-optimized Next.js-based tournament management system for 9-ball billiards competitions with live streaming capabilities, player management, and real-time match tracking. Fully responsive design optimized for mobile-first usage.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel (with GitHub integration)
- **Streaming**: OBS Studio compatible

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx               # Home page (redirects to tournament)
│   ├── tournament/page.tsx    # Tournament management
│   ├── players/page.tsx       # Player management (75 players)
│   ├── standby/page.tsx       # Tournament countdown timer
│   └── live-match/page.tsx    # Live match display
├── components/
│   └── Navigation.tsx         # Main navigation component
└── contexts/
    └── LiveContext.tsx        # Global live state management
```

## Key Features

### 1. Mobile-First Navigation System

- **Pages**: Tournament (→ Standby), Players, Standby, Live Match
- **Mobile Menu**: Hamburger menu for mobile devices
- **Desktop Menu**: Traditional horizontal navigation
- **Live Toggle**: Button to hide/show navigation for clean streaming
- **Context**: Global state management for live mode
- **Logo**: Small logo (30px) in header next to title

### 2. Tournament Page (`/tournament`)

- **Tournament Cards**: Display tournament info with status badges
- **Create Tournament**: Modal with form fields (mobile-optimized)
- **Status Colors**: Ongoing (green), Upcoming (blue), Completed (gray)
- **Features**: Name, date, participants, prize money
- **Mobile Layout**: Responsive grid (1 column mobile, 2 tablet, 3 desktop)
- **Mobile Buttons**: Full-width buttons with reduced padding

### 3. Players Page (`/players`)

- **75 Players Total**: 3-column layout (25 + 25 + 25)
- **Real Player Names**: 56 actual players + 19 placeholders
- **Player Data**: Name, email, phone, skill level, rating, stats
- **Add Player**: Modal with photo upload, name, ranking points
- **Color Coding**: Blue, green, purple avatars per column
- **Mobile Optimized**: Consistent column widths and responsive table headers
- **Touch-Friendly**: Proper touch targets for mobile interaction

### 4. Standby Page (`/standby`)

- **Tournament Title**: "Barako 9-Ball Tournament" (3-line mobile layout)
  - Line 1: "Barako 9-Ball Tournament"
  - Line 2: "Double Elimination"
  - Line 3: "Snooker Zone"
- **Countdown Timer**: Persistent across navigation
- **Time Selection**: Dropdown (12 PM - 8 PM, 30-min intervals)
- **Controls**: Start, Pause, Resume, Reset buttons
- **Persistence**: localStorage for timer state
- **Mobile Optimized**: Smaller fonts, reduced button padding, responsive layout

### 5. Live Match Page (`/live-match`)

- **Live Toggle**: "GO LIVE" / "LIVE" button
- **Player Display**: Dave vs Joel with scores
- **Background**: Transparent for clean streaming
- **Mobile Layout**:
  - Live button and 9 balls on **left side vertically**
  - Large centered logo (120px)
  - Mobile-optimized score display
- **Desktop Layout**:
  - Live button and 9 balls on **right side vertically**
  - Logo in bottom-left corner
- **UI Elements**:
  - Purple gradient score container
  - Player avatars (👨👩)
  - **9-Ball Tournament**: Balls 1-9 with proper colors
  - LIVE indicator (pulsating red gradient)
  - OBS integration instructions

## Player Roster (75 Total)

### Real Players (56):

Adrian, AJ, Aldrin, Aldwin, Alfie, AllanC, Anthony, Arys, Boj, Brandon, Clarke, Dave, Dennis, Dunn, Ebet, Ed, Erwin, Gem, Hans, Hervin, Huber, Ivan, Jarland, Joemz, Joelski, Johner, Jonas, Joey, JP, Khristian, Louie, Louie S., Marlon, Nikko, Owen, Padi, Patrick, Renz, Reymund, Richard, Robbie, Sherwin, Shierwin, Siva, Ted, Terrel, Varan, VJ, Warren, Topher, Dennel, Jerome, Emerson, Tom, Jun, Chito

### Placeholders (19):

Player 58-75

## Key Components

### LiveContext.tsx

```typescript
interface LiveContextType {
  isLive: boolean;
  setIsLive: (isLive: boolean) => void;
}
```

- Global state for live mode
- Controls navigation visibility
- Shared across all pages

### Navigation.tsx

- Conditional rendering based on live state
- Hides when `isLive` is true
- Clean streaming experience

### Live Match Features

- **Transparent Background**: Perfect for OBS streaming
- **Live Button**: Toggle between "GO LIVE" and "LIVE" states
- **Pulsating Animation**: When live mode is active
- **Player Names**: Dave vs Joel
- **Billiards Balls**: 1-10 with proper colors
- **Gradient Score Container**: Red to blue

## Mobile-First Design Guidelines

- **Tailwind CSS**: Canonical class names (shrink-0, bg-linear-to-r)
- **Responsive Design**: Mobile-first approach with breakpoints
- **Breakpoints**: `sm:` (640px+) for tablet/desktop
- **Touch Targets**: Minimum 44px for all interactive elements
- **Color Scheme**: Blue/red theme for competition
- **Transparent Backgrounds**: For streaming compatibility
- **Font Sizes**: Responsive sizing (smaller on mobile, larger on desktop)
- **Viewport Meta**: Proper mobile rendering with `width=device-width, initial-scale=1.0`

## Deployment Setup

1. **GitHub Repository**: Connected to Vercel
2. **Automatic Deployments**: Every push to main branch
3. **Environment**: Production-ready build
4. **Domain**: Vercel provides live URL

## OBS Studio Integration

1. **Browser Source**: Add Vercel URL
2. **Interact Button**: Click to activate live mode
3. **Clean Stream**: Transparent background, no navigation
4. **Live Indicator**: Pulsating red button for status

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

## Key Files to Remember

- `src/app/live-match/page.tsx` - Main streaming page
- `src/contexts/LiveContext.tsx` - Global state
- `src/app/players/page.tsx` - Player management
- `src/app/standby/page.tsx` - Countdown timer
- `src/app/layout.tsx` - Root layout with navigation

## Replication Steps

1. Create Next.js project with TypeScript and Tailwind
2. Set up the 4 main pages (Tournament, Players, Standby, Live Match)
3. Create LiveContext for global state management
4. Implement mobile-first navigation with hamburger menu
5. Add 75 players with real names and placeholder data
6. Create countdown timer with localStorage persistence
7. Build live match page with transparent background
8. Implement 9-ball tournament layout (9 balls, not 10)
9. Add mobile optimizations (responsive fonts, touch targets, layouts)
10. Set up Vercel deployment with GitHub integration
11. Configure custom domain with CNAME DNS record
12. Test OBS Studio integration for streaming

## Mobile Optimization Features

- **Hamburger Menu**: Mobile navigation with slide-down menu
- **Responsive Typography**: Smaller fonts on mobile, larger on desktop
- **Touch-Friendly Buttons**: Minimum 44px touch targets
- **Mobile Layouts**: Different layouts for mobile vs desktop
- **Viewport Configuration**: Proper mobile rendering
- **9-Ball Tournament**: Optimized for 9-ball (not 10-ball) competitions
- **Custom Domain Support**: CNAME DNS configuration for subdomains

## Technical Notes

- All random data generation uses deterministic methods (no Math.random in render)
- ESLint compliant with proper TypeScript types
- Mobile-first responsive design
- Professional streaming-ready interface
- Easy to extend with more players or features
- Next.js Image optimization for logos and avatars
- Tailwind CSS with canonical class names
