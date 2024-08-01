# Delayed Job Executor

This project is a fullstack application for managing backend tasks or processes. It uses React for the frontend, Node.js with Express for the backend, and Socket.io for real-time updates.

## Project Structure

This is a mono repo containing both the frontend and backend code:

```
delayed-job-executor/
├── frontend/        # React frontend
├── backend/         # Node.js/Express backend
└── README.md
```

## Features

- Create new tasks (jobs)
- List all tasks
- View individual task details and status
- Real-time updates on task progress
- Simulated task processing (5 seconds to 5 minutes duration)
- Tasks involve retrieving random Unsplash images from the food category

## Technologies Used

- Frontend: React
- Backend: Node.js, Express
- Real-time Communication: Socket.io
- Data Storage: File system (JSON)

## Setup Instructions

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/tahahadayat/delayed-job-executor.git
   cd delayed-job-executor
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run start:dev
   ```

   The server will start on `http://localhost:8000`

2. In a new terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

   The React app will start on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## API Endpoints

- `POST /jobs`: Create a new task
- `GET /jobs`: Get a list of all tasks
- `GET /jobs/{id}`: Get details of a specific task

## Time Report

1. Initial Setup: 30 min
   - Setting up the project structure

2. Backend Development: 3~4 hours
   - Implementing Unsplash service for fetching random food photos
   - Creating service for job creation
   - Adding jobs store

3. Real-time Updates Integration: 1 hours
   - Adding Socket.io for job status updates

4. Backend Refinements: 2~2.5 hours
   - Saving complete response data from Unsplash service
   - Retrieving jobs in reverse order
   - Emitting events on new job creation
   - Code refactoring and cleanup

5. Frontend Development: 3~4 hours
   - Updating jobs UI
     - Adding paginated jobs table
     - Creating modal for viewing a job
     - Integrating Socket.io for updating job status
   - Final UI adjustments and testing

6. Documentation and Environment Setup: 30 min
   - Updating example env file
   - Writing and updating README

Total time spent: Approximately 10~12 hours

## System Design Considerations

- Highload: The system is designed to handle multiple pending tasks simultaneously.
- Unstable Internet Connection: The application uses Socket.io for real-time updates, which can handle intermittent connectivity issues.
- Persistence: Task results are saved and can be retrieved later, even after server restarts.

## Future Improvements

- Add more diverse task types beyond image retrieval
- Improve error handling and add more comprehensive logging
- Implement unit and integration tests
- Add ability to cancel or pause ongoing tasks

## User Interface Preview

![sample](https://github.com/user-attachments/assets/d3572d2c-8ae4-4b51-9c89-a28810bdc441)

