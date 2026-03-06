# 🚀 AI Resume Builder - Frontend

A modern, full-stack capable React application that empowers users to create professional, ATS-friendly resumes in minutes using **Generative AI**.

## 🌟 Key Features

-   **🤖 AI-Powered Content:** Instantly generate professional summaries, experience bullet points, and skills using Groq AI (via custom backend).
-   **⚡ Real-Time Preview:** Live updates allow users to see changes immediately as they type.

-   **🔐 Secure Authentication:** Integrated with **Clerk** for seamless Google/Email sign-in and session management.
-   **📄 PDF Export:** One-click download to save the resume as a high-quality PDF.
-   **📱 Responsive Design:** Fully optimized for desktop and tablet editing.
-   **🔄 Rich Text Editing:** Intuitive forms for Personal Details, Experience, Education, and Skills.

---

## 🛠️ Tech Stack

-   **Framework:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (Fast Build Tool)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
-   **State Management:** React Context API
-   **Routing:** React Router DOM v6
-   **Authentication:** [Clerk](https://clerk.com/)
-   **HTTP Client:** Axios
-   **Icons:** Lucide React

---

## 📂 Project Structure

frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── components/          → Reusable UI pieces
│   │   ├── common/          → Shared components (Button, Input, etc.)
│   │   ├── layout/          → Layout components (Navbar, Sidebar, etc.)
│   │   └── resume/          → Resume-specific components
│   │
│   ├── pages/               → Full pages (one per route)
│   │   ├── auth/            → Login, Register pages
│   │   ├── dashboard/       → Dashboard page
│   │   ├── resume/          → Resume builder page
│   │   ├── ai/              → AI features pages
│   │   └── jobs/            → Job tracker page
│   │
│   ├── context/             → React Context (global state)
│   │
│   ├── services/            → API calls (axios)
│   │
│   ├── App.jsx              → Main app component
│   ├── App.css              → Global styles
│   └── main.jsx             → Entry point
│
├── .env
├── package.json
├── index.html
└── vite.config.js




How Frontend Connects to Backend

React (Frontend)                    Express (Backend)
     │                                     │
     │  User clicks "Login"                │
     │       ↓                             │
     │  Login Page sends                   │
     │  axios.post("/api/auth/login")      │
     │       ↓                             │
     │  ─── HTTP Request ──────────►       │
     │  { email, password }                │
     │                                     │
     │                              Auth Controller
     │                              checks password
     │                              generates JWT
     │                                     │
     │  ◄── HTTP Response ─────────        │
     │  { token, user }                    │
     │       ↓                             │
     │  Store token in localStorage        │
     │  Redirect to Dashboard              │
     │                                     │