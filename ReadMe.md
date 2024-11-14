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