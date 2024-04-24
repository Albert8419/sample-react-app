# Sample React App with Next UI

This project, `sample-react-app`, is a modern, responsive front-end application built using [Vite](https://vitejs.dev/) and [Next UI](https://nextui.org/react) for React. It's designed to connect to a custom AQI (Air Quality Index) API to fetch and display air quality data dynamically.

## Features

- **Modern React UI**: Utilizes React 18 for component-based architecture.
- **Styling with Next UI**: Offers a rich set of UI components for building intuitive interfaces.
- **Responsive Design**: Ensures the app looks great on both desktop and mobile devices.
- **AQI API Integration**: Connects to a custom-built AQI API to display real-time air quality data.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm/yarn

## Installation

To set up the project locally, follow these steps:

1. **Open in Codespaces** or clone repository:

   
   git clone https://github.com/Albert8419/aqireact
   cd aqireact

Install dependencies:

npm install

Start the development server:


npm run dev

Visit http://localhost:3000 to view the app.

Connecting to the AQI API

The frontend app is designed to work with the aqi_API built previously with Express. However, your browser may throw a CORS policy error. To address that, we must install CORS and use it in the server.ts file as follows:

Open the aqi_api in Codespaces or locally.

Run the following command in the terminal to install CORS:


npm install cors

Enable CORS in your Express application by adding the following to your server.ts:

typescript
Copy code
import cors from "cors";

app.use(cors());
Ensure the backend server is running and accessible by running:

npm run build

npm run start

Modify the frontend app's API request URLs to point to your AQI API endpoints. In the src/api/actions.ts file, update the API_URL to your server's address:

typescript

API_URL = "http://localhost:5000";

AQI API Documentation

For detailed information on the AQI API endpoints, parameters, and responses, refer to the AQI API Documentation.

License

This project is licensed under the MIT License - see the LICENSE file for details.