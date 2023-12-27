# Features

The Sajilo Movie App has the following features:

* Search for movies by title
* Watch movie trailers
* Save movies to a "Watch Later" list
 
# Development Setup for sajilo-movie-app

This document provides guidelines on setting up your development environment for KalaChhetra.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Setting Up the Development Environment

### 1. Clone the Repository

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/Sajilo-Movie-App
```

Replace your-username with your GitHub username.

### 2. Navigate to the Project Directory

```
cd Sajilo-Movie-App
```

### 3. Install Dependencies

```
npm install
```

### 4. Configure Environment Variables

Create a new file named `.env` . This will be used to store sensitive information like API keys and passwords in the format as in `.env.example`

Edit the `.env` file with your configuration values.

### 5. Start the Development Server

Start the development server to test your changes locally.

```
npm start
```

### 6. Open the Development Environment

Open your web browser and navigate to `http://localhost:3000` to view your application.