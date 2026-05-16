# GigFlow - Smart Leads Dashboard

GigFlow is a full-stack Lead Management Dashboard built using the MERN stack with a clean architecture, robust state management, and a highly responsive professional user experience. It fulfills all the mandatory technical requirements and core features of the Full Stack Internship Assignment.

## 🚀 Live Demo & Repository
- **Repository URL:** [[Provide your GitHub URL here](https://github.com/prashant-pandey-4/Gigflow-Smart-Leads-Dashboard)]
- **Deployment Link:** [[Provide your live link here (if applicable)](https://gigflow-smart-leads-dashboard.vercel.app/)]

## 🛠️ Technology Stack
- **Frontend:** React.js, TypeScript (Strict Mode), TailwindCSS v4, React Router DOM, Axios, Lucide React (Icons).
- **Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, bcryptjs.
- **Tools:** Docker, Vite, ESLint.

## ✨ Core Features Implemented

1. **Secure Authentication System**
   - JWT-based authentication.
   - User Registration (Admin / Sales selection) and User Login.
   - Secure password hashing using `bcryptjs`.
   - Protected routes and Context API based auth state management.

2. **Lead Management (CRUD)**
   - Fields: Name, Email, Status (New, Contacted, Qualified, Lost), Source (Website, Instagram, Referral).
   - Full CRUD functionalities allowing leads to be created, read, updated, and deleted.

3. **Advanced Filtering, Search & Sort**
   - Combine filters for Status and Source.
   - Server-side sorting by Latest/Oldest.
   - Backend `skip` and `limit` pagination (10 records per page).
   - **Debounced Search (500ms delay)** on Name or Email.

4. **Role-Based Access Control (RBAC)**
   - **Admin:** Has full access to view all leads, delete any lead, and export data as CSV.
   - **Sales User:** Can only view and edit leads created by themselves. They cannot delete leads or export to CSV.

5. **Professional User Interface**
   - Clean, highly responsive design built with Tailwind CSS.
   - Loading states (spinners and disabled buttons).
   - Empty states handling ("No leads found").
   - Inline form validations and centralized error handling displayed elegantly using Toast/Alert-like components.
   - Fully custom-designed Modal components bypassing basic browser alerts.

6. **API Standards & Database Modeling**
   - Fully RESTful architecture.
   - Mongoose Validation integrated tightly with Express Error Handlers (400 Bad Request mapped to specific Mongoose validations).
   - Modular MVC (Model-View-Controller) structure in the backend.

7. **Docker Support**
   - Pre-configured `docker-compose.yml` to spin up MongoDB, Backend, and Frontend (via Nginx) containers easily.

## 📁 Folder Structure

### Backend
- `src/controllers/` - Request handling and logic.
- `src/models/` - Mongoose schemas and interfaces.
- `src/routes/` - API route definitions.
- `src/middleware/` - JWT Verification and Role restrictions.
- `src/config/` - DB Connection logic.
- `src/utils/` - Helpers like CSV Export logic.

### Frontend
- `src/pages/` - Main page components (Login, Register, Dashboard).
- `src/components/` - Reusable UI components (LeadModal, ProtectedRoute).
- `src/context/` - Global state context (AuthContext).
- `src/hooks/` - Custom React hooks (useDebounce).
- `src/api/` - Axios instance and interceptors.

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (or modify `.env` to point to MongoDB Atlas)
- Docker (if using Docker setup)

### Method 1: Running Manually

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gigflow
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```
4. Access the app at `http://localhost:5173`

### Method 2: Running with Docker

From the root directory of the project, simply run:
```bash
docker-compose up --build
```
The frontend will be accessible at `http://localhost:3000` and backend at `http://localhost:5000`.

## 📖 API Documentation
Check out the [API_DOCS.md](./API_DOCS.md) file in the root folder for detailed API routes, request parameters, and response structures.
