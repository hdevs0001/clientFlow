# ClientFlow

**ClientFlow** is a full-stack client relationship and business management application built with **Next.js, TypeScript, Prisma, PostgreSQL, and NextAuth**.

The goal of ClientFlow is to provide a centralized workspace where businesses can manage their clients, projects, tasks, communication, documents, and business activity from one application.

> 🚧 **Project Status:** Actively developed

---

## ✨ Features

### 👥 Client Management

* Create and manage client records
* Store client contact information
* View individual client details
* Organize client-related information in one place
* Track client activity and relationships

### 📁 Project Management

* Create and manage projects
* Associate projects with clients
* Track project progress
* Organize project-related tasks and information

### ✅ Task Management

* Create tasks
* Assign tasks
* Track task status
* Manage task-related information
* Keep project work organized

### 📊 Dashboard & Analytics

ClientFlow provides a centralized dashboard for viewing important business information.

The application uses **Recharts** for data visualization and reporting.

Examples include:

* Client statistics
* Project information
* Task activity
* Business performance data
* Visual reports and charts

### 🔐 Authentication

Authentication is implemented using **NextAuth/Auth.js** with Prisma integration.

The application uses:

* NextAuth
* Prisma Adapter
* Session-based authentication
* Protected application areas

### 📄 PDF Generation

ClientFlow uses **React PDF Renderer** to generate PDF documents directly from the application.

This can be used for generating business-related documents and reports.

### 📧 Email

The project includes **Resend** for email-related functionality.

This allows the application to integrate transactional/business email workflows.

### 🌓 UI & Theme

The interface uses a modern component-based UI system built with:

* Tailwind CSS
* shadcn/ui
* Radix UI
* Lucide React
* Sonner
* next-themes
* Motion

The UI is designed to be responsive and suitable for a modern SaaS dashboard.

---

# 🏗️ Architecture

ClientFlow follows a modern full-stack Next.js architecture.

```text
                         ┌──────────────────────┐
                         │       Client         │
                         │   Browser / User     │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │       Next.js        │
                         │   App Router         │
                         ├──────────────────────┤
                         │ Pages / UI           │
                         │ Server Components    │
                         │ API Routes           │
                         │ Server Actions       │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │   NextAuth   │  │    Prisma    │  │    Resend    │
          │ Authentication│ │     ORM      │  │    Email     │
          └──────────────┘  └──────┬───────┘  └──────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │    PostgreSQL    │
                           │     Database     │
                           └──────────────────┘
```

---

# 🛠️ Tech Stack

| Technology             | Purpose                    |
| ---------------------- | -------------------------- |
| **Next.js 16**         | Full-stack React framework |
| **React 19**           | User interface             |
| **TypeScript**         | Type-safe development      |
| **Prisma 6**           | Database ORM               |
| **PostgreSQL**         | Relational database        |
| **NextAuth / Auth.js** | Authentication             |
| **Tailwind CSS 4**     | Styling                    |
| **shadcn/ui**          | UI components              |
| **Radix UI**           | Accessible UI primitives   |
| **Lucide React**       | Icons                      |
| **Recharts**           | Charts and analytics       |
| **React PDF Renderer** | PDF generation             |
| **Resend**             | Email                      |
| **Zod**                | Validation                 |
| **Motion**             | UI animations              |
| **Sonner**             | Toast notifications        |

The dependency versions and available npm scripts are defined in the repository's `package.json`.

---

# 📂 Project Structure

The main project is organized around the Next.js App Router and supporting application modules.

```text
clientFlow/
│
├── app/                    # Next.js App Router
│   ├── ...
│
├── components/             # Reusable UI components
│   ├── ...
│
├── hooks/                  # Custom React hooks
│
├── lib/                    # Shared utilities and application logic
│
├── prisma/                 # Prisma schema and database configuration
│
├── public/                 # Static assets
│
├── src/
│   └── pdf/                # PDF-related functionality
│
├── auth.ts                 # Authentication configuration
├── proxy.ts                # Request/proxy handling
├── middleware.ts           # Middleware configuration
│
├── next.config.ts          # Next.js configuration
├── prisma.config.ts        # Prisma configuration
├── components.json         # UI component configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Dependencies and scripts
└── README.md
```

---

# 🔄 Application Flow

A typical request inside ClientFlow follows this flow:

```text
User
 │
 ▼
Next.js UI
 │
 ▼
Authentication / Authorization
 │
 ▼
Server-side application logic
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL
 │
 ▼
Prisma
 │
 ▼
Next.js
 │
 ▼
Updated UI
```

For authenticated users:

```text
Login
  │
  ▼
NextAuth
  │
  ▼
Session
  │
  ▼
Protected Application
  │
  ├── Clients
  ├── Projects
  ├── Tasks
  ├── Dashboard
  ├── Reports
  └── Documents
```

---

# 🗄️ Database

ClientFlow uses **PostgreSQL** as its relational database and **Prisma ORM** as the database access layer.

Prisma is responsible for:

* Database schema management
* Type-safe database queries
* Database client generation
* Application-to-database communication

The Prisma files are located in:

```text
prisma/
```

The generated Prisma client is created during the production build.

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="your_postgresql_connection_string"

AUTH_SECRET="your_auth_secret"

# Add provider credentials if configured
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Resend
RESEND_API_KEY="your_resend_api_key"
```

> **Important:** Never commit `.env` files or production secrets to GitHub.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/hdevs0001/clientFlow.git
```

Move into the project:

```bash
cd clientFlow
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create:

```text
.env
```

and add the required database, authentication, and email configuration.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Set up the database

If you are using Prisma migrations:

```bash
npx prisma migrate dev
```

If the project already contains the required database schema/migrations, make sure your `DATABASE_URL` points to the correct PostgreSQL database before running the application.

---

## 6. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the development server                       |
| `npm run build` | Generate Prisma Client and create production build |
| `npm run start` | Start the production server                        |
| `npm run lint`  | Run ESLint                                         |

The repository currently defines these scripts in `package.json`.

---

# 🏭 Production Build

To create a production build:

```bash
npm run build
```

The build script performs:

```text
Prisma Generate
      │
      ▼
Next.js Build
      │
      ▼
Production Application
```

Then start the production server:

```bash
npm run start
```

---

# 🧪 Development Workflow

A typical development workflow is:

```bash
# Clone
git clone https://github.com/hdevs0001/clientFlow.git

# Enter project
cd clientFlow

# Install dependencies
npm install

# Configure environment
# Create .env

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

# 📊 Dashboard & Reporting

ClientFlow uses **Recharts** to create data-driven visualizations.

```text
Database
    │
    ▼
Prisma
    │
    ▼
Server-side Data
    │
    ▼
React Components
    │
    ▼
Recharts
    │
    ▼
Dashboard / Reports
```

This allows business information to be represented through charts and visual reports instead of only displaying raw data.

---

# 📄 PDF Workflow

The application uses `@react-pdf/renderer` for PDF generation.

The PDF-related implementation is located under:

```text
src/pdf/
```

A simplified workflow is:

```text
Application Data
      │
      ▼
PDF Components
      │
      ▼
React PDF Renderer
      │
      ▼
Generated PDF
```

---

# 🎨 UI Architecture

ClientFlow uses reusable React components instead of building every page from scratch.

```text
Page
 │
 ├── Layout
 │
 ├── Navigation
 │
 ├── UI Components
 │      ├── Buttons
 │      ├── Forms
 │      ├── Dialogs
 │      ├── Tables
 │      └── Cards
 │
 └── Business Components
        ├── Client
        ├── Project
        ├── Task
        └── Dashboard
```

The project uses Tailwind CSS, shadcn/Radix UI components, Lucide icons, Motion animations, and Sonner notifications.

---

# 🔒 Security Considerations

The application uses several technologies that support secure application development:

* NextAuth for authentication
* Prisma for type-safe database access
* Zod for input validation
* Environment variables for secrets
* Server-side processing through Next.js
* Protected application routes

When deploying the application, use production-grade secrets and never expose private credentials in client-side code.

---

# ☁️ Deployment

ClientFlow can be deployed as a Next.js application.

A typical deployment architecture is:

```text
                    Internet
                       │
                       ▼
                 ┌───────────┐
                 │  Vercel   │
                 │  Next.js  │
                 └─────┬─────┘
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
        ┌───────────┐     ┌───────────┐
        │ PostgreSQL│     │  Resend   │
        │ Database  │     │   Email   │
        └───────────┘     └───────────┘
```

The repository also contains a deployed application URL listed by GitHub:

**Live Demo:** https://client-flow-dusky.vercel.app/

---

# 🧠 What This Project Demonstrates

ClientFlow is not just a UI project. It demonstrates several full-stack development concepts:

### Frontend

* React
* Next.js App Router
* TypeScript
* Responsive UI
* Reusable components
* Form handling
* Client/server component architecture
* Data visualization

### Backend

* Next.js server-side functionality
* API/application logic
* Authentication
* Authorization
* Input validation
* Email integration

### Database

* PostgreSQL
* Prisma ORM
* Relational data modeling
* Database migrations
* Type-safe queries

### Application Architecture

* Full-stack Next.js architecture
* Authentication flow
* Database abstraction
* Reusable component architecture
* Server/client separation

---

# 🗺️ Future Improvements

Possible future improvements include:

* [ ] Role-based access control
* [ ] Advanced client search and filtering
* [ ] Project activity timeline
* [ ] Real-time notifications
* [ ] File/document management
* [ ] Improved analytics
* [ ] Automated email workflows
* [ ] Docker support
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] Production monitoring
* [ ] Audit logging

---


# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Run linting

```bash
npm run lint
```

5. Commit your changes

```bash
git commit -m "feat: add your feature"
```

6. Push the branch

```bash
git push origin feature/your-feature
```

7. Open a Pull Request

---

# 👨‍💻 Author

**hdevs0001**

GitHub:

https://github.com/hdevs0001

Project Repository:

https://github.com/hdevs0001/clientFlow

---





## ⭐ Project Summary

**ClientFlow** is a full-stack CRM and business management application built with modern web technologies.

It combines:

```text
Next.js
   +
React
   +
TypeScript
   +
NextAuth
   +
Prisma
   +
PostgreSQL
   +
Tailwind CSS
   +
shadcn/ui
   +
Recharts
   +
Resend
```

into a single application for managing clients, projects, tasks, reporting, documents, and business workflows.
