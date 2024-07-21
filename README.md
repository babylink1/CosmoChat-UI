# CosmoChat UI Rex
 
This repository contains a React application for a Chat interface integrated with Firebase and OpenAI. This file provides an overview of the Chat component and Activity component, highlighting their functionalities and usage.

## Chat Component

The Chat component facilitates real-time messaging and interaction with a backend API using Firebase and OpenAI.

- Features:

    - Real-time Messaging: Allows users to send and receive messages in real-time.
    Integration with OpenAI: Utilizes OpenAI's GPT-3.5 model to generate responses based on user prompts.
    - Dynamic UI: Responsive design using Material-UI (@mui) components.
    Session Management: Manages chat sessions dynamically based on user interactions.

- Setup:

  - Dependencies:
        Ensure all dependencies are installed using npm install.

  - Configuration:
        Set up Firebase configuration (firebaseConfig) in your environment variables or directly in the code.
        Configure OpenAI API key (API_KEY) in your environment variables.

  - Usage:
        Adjust paths for components (UserMessage, RexMessage, ChatStyles, etc.) and API modules (api) as per your project structure.

- Implementation Details:

    - Firestore Integration: Stores chat messages in Firestore under specific user sessions.
    - Media Query Handling: Uses useMediaQuery from Material-UI for responsive design.
    - Event Handling: Listens for scroll events (handleScroll) and submission events (handleSubmit).

## Activity Component

The Activity component displays statistical data and historical chat sessions from the backend API.
- Features:

    - Data Visualization: Renders chat activity using BarChart from @mui/x-charts.
    - Session Management: Fetches session details and displays them dynamically.
    - Loading State: Provides feedback with CircularProgress while data is being fetched.

- Usage:

    Adjust styles (ActivityStyles, AllStyles) and paths for components (ChatHistory) based on your project structure.
    Ensure API endpoints (/sessions) match your backend implementation.
