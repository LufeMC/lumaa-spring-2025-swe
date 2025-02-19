# Lumaa Spring 2025 SWE Project

## How to Run the Project

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (https://nodejs.org/)
- npm (Node Package Manager, comes with Node.js)

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/KZhao611/lumaa-spring-2025-swe.git
    cd lumaa-spring-2025-swe
    ```

2. Install dependencies for both frontend and backend:

    ```sh
    # Navigate to the frontend directory and install dependencies
    cd frontend
    npm install

    # Navigate to the backend directory and install dependencies
    cd ../backend
    npm install
    ```

### Running the Project

#### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Start the frontend development server:
    ```sh
    npm run dev
    ```

3. The frontend should now be running at `http://localhost:8000`.

#### Backend

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Set up Environment Variables as shown below

3. Start the backend development server:
    ```sh
    npm run start
    ```

4. The backend should now be running at `http://localhost:3000`.

### Environment Variables

Make sure to set up your environment variables for the backend. Create a `.env` file in the directory with the following content:

```plaintext
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret

