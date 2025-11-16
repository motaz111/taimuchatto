# TaimuChatto

TaimuChatto is a full-stack chat application that allows users to communicate in real-time. This project is built using the MERN stack and other modern web technologies.

## 🧋 Key Features

*   **Real-time Messaging:** Send and receive messages instantly using Socket.io.
*   **User Authentication:** Secure registration and login system using JWT (JSON Web Tokens).
*   **Profile Management:** Users can view and manage their profile information.
*   **User Search:** Ability to search for and find other users within the platform.
*   **Responsive Design:** Works seamlessly across desktop and mobile devices.
*   **Modern UI/UX:** Clean interface built with Tailwind CSS.

## 🚀 Technologies Used

*   **Frontend:**
    *   [React.js](https://reactjs.org/) - Modern JavaScript library for building user interfaces
    *   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
    *   [Vite.js](https://vitejs.dev/) - Next-generation frontend build tool
    *   [Socket.io Client](https://socket.io/docs/v4/client-api/) - Real-time bidirectional event-based communication
*   **Backend:**
    *   [Node.js](https://nodejs.org/) - JavaScript runtime environment
    *   [Express.js](https://expressjs.com/) - Web application framework for Node.js
    *   [MongoDB](https://www.mongodb.com/) (with Mongoose) - NoSQL database and ODM
    *   [Socket.io](https://socket.io/) - Real-time engine for cross-platform communication
    *   [JSON Web Token (JWT)](https://jwt.io/) - For secure authentication and authorization
    *   [Bcrypt.js](https://www.npmjs.com/package/bcrypt) - For password hashing
    *   [Dotenv](https://www.npmjs.com/package/dotenv) - For environment variable management

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB (either local installation or cloud Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bondanbanuaji/taimuchatto.git
    cd taimuchatto
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables from the `example.env`:
    ```env
    PORT=5000
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_strong_jwt_secret"
    JWT_EXPIRE="7d"
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory if needed for any frontend-specific variables.

### How to Run

1.  **Start the Backend Server:**
    Open a terminal in the `backend` directory and run:
    ```bash
    npm start
    # or if using nodemon for development
    npm run dev
    ```
    The server will run on `http://localhost:5000` (or your specified port).

2.  **Start the Frontend Application:**
    Open another terminal in the `frontend` directory and run:
    ```bash
    npm run dev
    ```
    The React application will run on `http://localhost:5173` (or another available port).

## 📁 Project Structure

```
taimuchatto/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Authentication and validation middleware
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   └── assets/          # Static assets
│   ├── public/
│   ├── package.json
│   └── .env
├── README.md
└── LICENSE
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 🐛 Known Issues

*   Occasional connection issues with Socket.io in unstable network conditions
*   UI responsiveness could be improved on certain mobile devices

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Bondan Banuaji**
*   GitHub: [bondanbanuaji](https://github.com/bondanbanuaji)
