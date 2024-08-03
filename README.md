
# Angular Frontend for Django Blog Application

## Overview

This is the frontend of the Django blog application, built with Angular. The application allows users to interact with the backend API to register, log in, create, update, and manage blog posts and comments.

## Project Structure

- **`src/app/`**: Contains the main application components, services, and modules.
  - **`components/`**: Reusable components like login, register etc...
  - **`services/`**: Contains Angular services for interacting with the backend API.
  - **`models/`**: Defines TypeScript interfaces for data models like `Post` and `Comment`.
  - **`app-routing.module.ts`**: Manages routing between different application views.

- **`environments/`**: Contains environment-specific configuration files.
  - **`environment.ts`**: Development environment settings.
  - **`environment.prod.ts`**: Production environment settings.

- **`angular.json`**: Configuration file for the Angular CLI.
- **`package.json`**: Lists project dependencies and scripts for building and running the project.
- **`tsconfig.json`**: TypeScript configuration file.

## Setup and Running the Project

1. **Clone the Repository:**
   ```
   git clone https://github.com/Moolfel/frontent-blog-app.git
   cd frontent-blog-app
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```
Ensure You Have the Correct Node.js Version: Make sure you have Node.js version 16 installed on your machine. You can check your Node.js version by running:

```
   node -v
```

3. **Run the Development Server:**
   ```bash
   ng serve
   ```

   The application will be accessible at `http://localhost:4200/`.

## Features

- **User Registration and Login:** Users can register and log in to the application.
- **Post Management:** Users can view, create, edit, and delete blog posts.
- **Comment Management:** Users can view, add, and manage comments on posts.
- **Responsive Design:** The application is designed to be responsive and works on different screen sizes.
