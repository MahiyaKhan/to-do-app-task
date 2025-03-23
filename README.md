Trello-Style Todo Board
A Kanban-style task management application built with React that allows users to manage their tasks visually across different stages of completion.
Features

Kanban-style board with three columns (Pending, In Progress, Completed)
Drag and drop functionality to move tasks between columns
Create, read, update, and delete tasks
Responsive design that works on both desktop and mobile devices
Integration with DummyJSON API for backend operations

Tech Stack

React.js
React DnD (for drag and drop functionality)
Vite (for build and development)
CSS (for styling)
DummyJSON API (for mock backend)

Installation
Clone the repository:
bashCopygit clone https://github.com/yourusername/todo-board-app.git
cd todo-board-app
Install dependencies:
bashCopynpm install
Start the development server:
bashCopynpm run dev
Building for Production
To build the application for production:
bashCopynpm run build
Deployment
The application is configured to be deployed on GitHub Pages. To deploy:

Update the vite.config.js file with your repository name:

javascriptCopyexport default defineConfig({
plugins: [react()],
base: '/your-repo-name/',
})

Run the deploy script:

bashCopynpm run deploy
Project Structure
Copy/src
/components - TaskBoard.jsx # Main component that manages the board layout - TaskColumn.jsx # Column component that contains task cards - TaskCard.jsx # Individual task card component - TaskModal.jsx # Modal for editing tasks - AddTaskForm.jsx # Form for adding new tasks - Header.jsx # Application header

- App.jsx # Main application component
- App.css # Application styles
- main.jsx # Entry point
  Approach
  State Management
  The application uses React's built-in useState hook for state management. The main state objects are:

tasks: Array of all tasks fetched from the API
isLoading: Boolean to track API loading state
error: State for storing any API errors

API Integration
The application interacts with the DummyJSON API for CRUD operations:

GET /todos: Fetch all tasks
POST /todos/add: Create a new task
PUT /todos/:id: Update a task
DELETE /todos/:id: Delete a task

Drag and Drop
React DnD is used to implement the drag and drop functionality:

TaskCard component is set up as a drag source
TaskColumn component is set up as a drop target
When a card is dropped in a different column, the status is updated via API

Trade-offs and Improvements
Trade-offs

Local State vs. Global State: For simplicity, the application uses local state management. For larger applications, a global state management solution like Redux or Context API would be more appropriate.
Real-time Updates: The application doesn't implement real-time updates. In a production environment, WebSockets or polling might be used to keep the board in sync across multiple users.
Error Handling: Basic error handling is implemented, but a more robust solution with retry logic and detailed user feedback would be valuable in production.

Potential Improvements

Authentication: Add user authentication to allow multiple users with their own boards.
Advanced Filtering: Implement filtering and searching capabilities for tasks.
Persistence: Add local storage support to persist the board state between page reloads.
Custom Lanes: Allow users to create and customize their own lanes/columns.
Task Details: Expand task properties to include due dates, priorities, attachments, etc.
Optimistic UI Updates: Implement optimistic updates to improve perceived performance.
Unit and Integration Tests: Add comprehensive test coverage.
Accessibility: Enhance keyboard navigation and screen reader support.

License
MIT
