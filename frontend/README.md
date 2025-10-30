# Mini Project Manager

A full-stack project management application with .NET 9 and React + TypeScript.

## Features

- 🔐 JWT Authentication (Register/Login)
- 📁 Project Management (CRUD)
- ✅ Task Management with completion tracking
- 🤖 Smart Scheduler API for automatic task planning
- 📱 Responsive design with Tailwind CSS
- 🔒 Secure user data isolation

## Tech Stack

**Backend:**
- .NET 9
- Entity Framework Core
- SQLite Database
- JWT Authentication
- RESTful API

**Frontend:**
- React 18
- TypeScript
- React Router v6
- Axios
- Tailwind CSS

## Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js 18+
- Git

### Backend Setup
```bash
cd backend
dotnet restore
dotnet run
```

Backend runs on: http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project details
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `POST /api/projects/{projectId}/schedule` - Generate task schedule

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Smart Scheduler

The Smart Scheduler API automatically plans your tasks based on:
- Available hours
- Due dates (priority scoring 1-5)
- Task creation order

### Example Request:
```json
POST /api/projects/1/schedule
{
  "totalHoursAvailable": 40,
  "startDate": "2025-10-31"
}
```

## Project Structure
```
mini-project-manager/
├── backend/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── ProjectManager.csproj
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── package.json
└── README.md
```

## Environment Variables

### Backend (appsettings.json)
```json
{
  "Jwt": {
    "Key": "your-secret-key-minimum-32-characters",
    "Issuer": "ProjectManagerAPI",
    "Audience": "ProjectManagerClient"
  }
}
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment

### Backend (Render)
1. Push to GitHub
2. Create Web Service on Render
3. Build command: `dotnet publish -c Release -o out`
4. Start command: `dotnet out/ProjectManager.dll`
5. Add environment variables

### Frontend (Vercel)
1. Push to GitHub
2. Create project on Vercel
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Update API URL in production

## License

This project was created as part of PLC Home Coding Assignment - October 2025.

## Author

Aditya Gupta
22105125
PEC ECE