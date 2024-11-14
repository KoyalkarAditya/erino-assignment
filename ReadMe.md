# Project Name

This project consists of a backend and frontend that communicate with each other. The backend uses Prisma and PostgreSQL as the database.

## Setup

### Backend

1. Navigate to the backend directory and install the backend dependencies:

   cd backend
   npm install

2. Create a `.env` file in the backend directory that contains your PostgreSQL database URL. If you have Docker installed, you can copy the `.env.example` to `.env` and run the following command to start a PostgreSQL container:

   cp .env.example .env
   docker run -d -p 5432:5432 --name erino -e POSTGRES_PASSWORD="mysecretpassword" postgres

### Push Migrations to the Database

In the backend directory, run the following commands to push your Prisma migrations to the database:

npx prisma migrate dev
npx prisma generate

### Run the Backend

To start the backend, run:

npm run dev

### Frontend

1. Next, navigate to the frontend directory and install the frontend dependencies:

   cd ../frontend
   npm install

2. To run the frontend, use:

   npm run dev

Now, both your backend and frontend should be running, and you can interact with the application.

# Project Description

This project is a contact management application that allows users to create, update, delete, and paginate through their contact list efficiently. Built with a robust backend using Prisma and PostgreSQL for managing data, and a Vite powered frontend .

## Key Features

- Create, Update, and Delete Contacts: Users can seamlessly add new contacts, modify existing ones, and delete any contact as needed.
- Pagination: The contact list is paginated to improve user experience, allowing users to view contacts in pages rather than all at once.
- Data Fetching with React Query: Using React Query for data fetching, caching, and synchronization ensures that the frontend stays updated with minimal lag and enables real-time responsiveness.
- Type Safety with TypeScript: TypeScript is used throughout the codebase to ensure type safety, reduce runtime errors, and facilitate code reusability by providing strong typing and interfaces.

## Tech Stack

- Frontend: Vite, React, React Query, TypeScript
- Backend: Node.js, Prisma, PostgreSQL
- Database: PostgreSQL with Prisma ORM
