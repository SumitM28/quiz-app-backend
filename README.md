
# Online Quiz API (Cookie-based Authentication)

This is an online quiz API that supports user authentication, quiz management, and question management. The API uses cookie-based authentication and can be tested via the provided Postman collection.

## Features

- User registration and login
- Creating, updating, and deleting quizzes and questions
- Fetching quizzes and questions
- Submitting quiz answers
- Cookie-based authentication for secure API requests

## Requirements

- Node.js (v14+)
- MongoDB
- Postman (for API testing)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SumitM28/quiz-app-backend.git
   cd online-quiz-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file at the root of the project and add the following variables:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/quizdb
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:8080`.

## Using the Postman Collection

1. **Import Postman Collection**:

   Download and import the Postman collection `Online Quiz API (Cookie-based Authentication)` into Postman. You can find it [here](https://github.com/SumitM28/quiz-app-backend/blob/main/Online%20Quiz%20API%20(Cookie-based%20Authentication).postman_collection.json).

2. **Authentication**:

   - Register a new user using the **Register User** request.
   - Log in with the registered credentials using the **Login User** request. The server will set a cookie (`authToken`) in your browser, which is automatically managed by Postman.

3. **Creating Quizzes**:

   After logging in, use the **Create Quiz** request to create new quizzes. Make sure you are authenticated, as this request requires a valid session cookie.

4. **Fetching Quizzes**:

   Use the **Get All Quizzes** or **Get Quiz Details** requests to fetch quizzes from the database.

5. **Submitting a Quiz**:

   After fetching the quiz details, submit your answers using the **Submit Quiz** request.

## Environment Variables in Postman

The Postman collection uses the following environment variables:

- `authToken`: Stores the cookie for authenticated requests.
- `quizId`: Stores the quiz ID for fetching specific quizzes.
- `questionId`: Stores the question ID for managing questions.

Make sure these variables are set correctly while testing the API in Postman.

## Running the Project

1. Start the server using `npm start`.
2. Use Postman to interact with the API as described above.
3. Authentication is required for most quiz and question management requests.

---

For further development, feel free to contribute by submitting pull requests or issues!
