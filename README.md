# Personal Notes & Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with search, filtering, and URL metadata fetching capabilities.

## Features

- **Notes Management**: Create, edit, delete, and organize personal notes with tags
- **Bookmarks Management**: Save, edit, delete, and organize bookmarks with automatic URL metadata fetching
- **Search & Filter**: Search through notes and bookmarks by content, title, or tags
- **Tag System**: Organize content with customizable tags
- **Favorites**: Mark notes and bookmarks as favorites for quick access
- **Auto-fetch Metadata**: Automatically fetch page titles and descriptions from URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant updates across the interface

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/UI components
- TanStack Query for state management
- React Hook Form for form handling
- Wouter for routing

### Backend
- Node.js with Express.js
- TypeScript
- In-memory storage for development
- REST API with proper validation
- Zod for schema validation
- URL metadata fetching

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-notes-bookmark-manager
