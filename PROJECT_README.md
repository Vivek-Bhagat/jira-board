# Jira Board Application

A mini Jira-board like application built with Angular 18+ featuring drag-and-drop task management.

## Features

✅ **Login Page**
- Dummy credentials authentication
- Email: `admin@test.com`
- Password: `admin123`
- Auto-redirect to board on successful login

✅ **Jira Board**
- 4 Columns: To Do, In Progress, Need Review, Completed
- Task count display for each column
- Responsive grid layout

✅ **Add Task Feature**
- Click "+" button to open modal
- Form fields: Task ID, Task Title, Description, Column
- Form validation
- Add tasks to specific columns

✅ **Drag & Drop**
- Powered by Angular CDK
- Drag tasks between columns
- Reorder tasks within columns
- Smooth animations

✅ **LocalStorage Persistence**
- Tasks persist across browser sessions
- Authentication state preserved

## Technology Stack

- **Framework**: Angular 18+ (standalone components)
- **Language**: TypeScript (ES6/ES7+)
- **Styling**: SCSS with modern CSS features
- **Drag & Drop**: Angular CDK
- **State Management**: RxJS with BehaviorSubject
- **Storage**: Browser LocalStorage API

## Architecture & Design

### Clean Code Practices
- **Modular Components**: Separation of concerns with dedicated components
- **Service Layer**: Business logic separated from UI components
- **Type Safety**: Full TypeScript interfaces and enums
- **Reactive Programming**: Observable patterns for state management
- **Guard Protection**: Route protection with auth guards

### File Structure
```
src/app/
├── components/
│   ├── login/          # Login page component
│   ├── board/          # Main board component
│   └── task-modal/     # Add task modal component
├── services/
│   ├── auth.ts         # Authentication service
│   └── task.ts         # Task management service
├── guards/
│   └── auth-guard.ts   # Route guard for authentication
├── models/
│   ├── task.model.ts   # Task and Column interfaces
│   └── user.model.ts   # User interfaces
└── app.routes.ts       # Application routing
```

### Key Design Patterns
- **Singleton Services**: Using `providedIn: 'root'`
- **Observer Pattern**: RxJS observables for state updates
- **Strategy Pattern**: Drag and drop with Angular CDK
- **Guard Pattern**: Route protection
- **Repository Pattern**: LocalStorage abstraction

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Steps

1. **Navigate to project directory**
```bash
cd jira-board
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:4200
```

## Usage

### Login
1. Navigate to `http://localhost:4200`
2. Use the demo credentials or click "Fill Demo Credentials"
   - Email: `admin@test.com`
   - Password: `admin123`
3. Click "Sign In"

### Managing Tasks

#### Add a Task
1. Click the "+" button on any column
2. Fill in the form:
   - **Task ID**: Unique identifier (e.g., TASK-001)
   - **Task Title**: Brief description
   - **Description**: Detailed description
   - **Column**: Select destination column
3. Click "Add Task"

#### Move Tasks
- **Drag & Drop**: Click and drag tasks between columns
- **Reorder**: Drag tasks up/down within same column

#### View Tasks
- Each task card shows:
  - Task ID badge
  - Task title
  - Description (truncated)
  - Creation date

### Logout
- Click "Logout" button in the header
- Redirects to login page
- Clears authentication state

## Code Quality Features

### TypeScript
- Strict type checking enabled
- Interface-driven development
- Enum for column types
- No `any` types used

### Component Design
- Standalone components (modern Angular)
- Input/Output decorators for communication
- OnDestroy cleanup for subscriptions
- TrackBy functions for performance

### Services
- Pure business logic
- No direct DOM manipulation
- Comprehensive JSDoc comments
- Error handling

### Styling
- BEM-like naming convention
- SCSS variables for theming
- Responsive design
- Smooth animations and transitions

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Persistence
- Tasks are automatically saved to LocalStorage
- Authentication state persists across sessions
- Data survives page refreshes
- Clear LocalStorage to reset data

## Future Enhancements
- Edit/Delete tasks
- Task priority levels
- Due dates and assignees
- Search and filter
- Backend API integration
- User authentication system
- Dark mode support

## License
This project is created for educational purposes.

## Author
Built as an internship assignment demonstrating Angular development skills.
