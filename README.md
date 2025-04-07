# Location Pinner - Kenya

A web application for pinning and managing locations across Kenya. Users can create accounts, add locations, view other users' locations, and manage their own pins on an interactive map.

> 🚀 **for the live application [Click here](https://in-p.up.railway.app/)**

## Features

- User authentication (admin and regular users)
- Interactive map interface
- Location management (create, view, edit, delete)
- Role-based access control
- Search and filter locations
- Responsive design

## Tech Stack

- **Backend**: Ruby on Rails 8.0
- **Frontend**: React with Inertia.js
- **Styling**: TailwindCSS
- **Database**: SQLite (development), PostgreSQL (production)
- **Map Integration**: Leaflet
- **Build Tool**: Vite

## Prerequisites

- Ruby 3.4.1
- Node.js 18+
- SQLite3
- Git
- Make

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Raymond9734/interview_task.git
cd interview_task
```

2. Run the complete setup using Make:

```bash
make setup
```

This command will:

- Install all Ruby dependencies
- Install all Node.js dependencies
- Create and setup the database
- Run database migrations
- Seed the database with sample data

3. Start the development server:

```bash
make start
```

4. Visit `http://127.0.0.1:3000` in your browser

To stop the server:

```bash
make stop
```

or

```bash
ctrl + c
```

## Available Make Commands

- `make help` - Show all available commands
- `make setup` - Complete project setup
- `make install` - Install all dependencies
- `make start` - Start the development server
- `make stop` - Stop the development server
- `make clean` - Clean temporary files and logs
- `make format` - Format code using RuboCop

## Default Users

After seeding, you can log in with these credentials or register your own account :

- **Admin User**:

  - Email: admin@example.com
  - Password: password123

- **Regular Users**:
  - Email: user1@example.com
  - Password: password123
