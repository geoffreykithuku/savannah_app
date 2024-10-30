## Savannah APP

![CI/CD](https://github.com/geoffreykithuku/savannah_app/actions/workflows/ci.yml/badge.svg)


This project is a web application that allows users to create albums and add photos to their albums. Users can view, edit, and organize their photos. The project leverages TypeScript, React, Context API, and Tailwind CSS. The backend is on a separate repository [here](https://github.com/geoffreykithuku/savannah_task_backend) and is built with Node.js, Express, and MongoDB.

## Live Demo

You can view the live demo [here](https://savannah-app.vercel.app/)


## Features

- Create albums
- Add photos to albums
- View, edit, and edit photo titles
- signup and login
- View all albums
- View all photos
- View all photos in an album
- View your albums and photos
- View all users
- View all albums and photos of a user

## Installation

1. Clone the repository

```bash
git clone https://github.com/geoffreykithuku/savannah_app.git 
```

2. Change into the project directory

```bash
cd savannah_app
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open the application in your browser

```bash
http://localhost:5173
```

Alternatively, you can view the application [here](https://savannah-app.vercel.app/) 



## Project Structure

The project is structured as follows:

- `src`: Contains the source code for the project
  - `components`: Contains all the components used in the project
  - `context`: Contains the context API for the project
  - `pages`: Contains the pages for the project
  - `types`: Contains the types used in the project
  - `hooks`: Contains the custom hooks used in the project
  - `App.tsx`: The main application component
  - `main.tsx`: The entry point for the application
- `public`: Contains the public assets for the project
- `.github/workflows`: Contains the GitHub Actions workflow for the project
- `tailwind.config.js`: The Tailwind CSS configuration file
- `tsconfig.app.json`: The TypeScript configuration file for the project
- `package.json`: The project manifest file 


