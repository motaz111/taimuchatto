# TaimuChatto

TaimuChatto is a full-stack chat application that allows users to communicate in real-time. This project is built using the MERN stack and other modern web technologies.

## ✨ Key Features

*   **Real-time Messaging:** Send and receive messages instantly using Socket.io.
*   **User Authentication:** Secure registration and login system using JWT (JSON Web Tokens).
*   **Profile Management:** Users can view and manage their profile information.
*   **User Search:** Ability to search for and find other users within the platform.

## 🚀 Technologies Used

*   **Frontend:**
    *   [React.js](https://reactjs.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Socket.io Client](https://socket.io/docs/v4/client-api/)
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [MongoDB](https://www.mongodb.com/) (with Mongoose)
    *   [Socket.io](https://socket.io/)
    *   [JSON Web Token (JWT)](https://jwt.io/) for authentication

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

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
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_strong_jwt_secret"
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

### How to Run

1.  **Start the Backend Server:**
    Open a terminal in the `backend` directory and run:
    ```bash
    npm start
    # or if using nodemon
    # nodemon src/index.js
    ```
    The server will run on `http://localhost:5000` (or your specified port).

2.  **Start the Frontend Application:**
    Open another terminal in the `frontend` directory and run:
    ```bash
    npm run dev
    ```
    The React application will run on `http://localhost:5173` (or another available port).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
