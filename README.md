# Contact Management REST API (MERN Stack)

A simple full-stack Contact Management application built with Node.js, Express, MongoDB, and Vanilla JavaScript.  
This project includes user authentication (JWT), protected routes, and a fully functional CRUD system with search and pagination.

---

## Features

- User Registration and Login (JWT Authentication)
- Protected API routes
- Create, Read, Update, Delete contacts
- Search contacts by name (case-insensitive)
- Pagination support
- User-specific data (each user sees only their contacts)
- Simple frontend dashboard (Vanilla JS)

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- express-async-handler

### Frontend
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

---

## Project Structure
Contact-Management-REST-API-MERN-Stack-Contact-Management-REST-API-MERN-Stack/
│
├── controllers/
│ ├── contactController.js
│ └── userController.js
│
├── middleware/
│ └── authMiddleware.js
│
├── models/
│ ├── Contact.js
│ └── User.js
│
├── routes/
│ ├── contactRoutes.js
│ └── userRoutes.js
│
└── frontend/
  ├── index.html
  ├── dashboard.html
  ├── app.js
  └── style.css


---

## Installation

### 1. Clone the repository
https://github.com/mhshanto007/Contact-Management-REST-API-MERN-Stack.git


### 2. Install dependencies
npm install


### 3. Setup environment variables

Create a `.env` file in the root:
PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://127.0.0.1:27017/mydb

---

## Run the Project

### Start MongoDB
mongod --dbpath ~/mongodb-data

### Run server
npm run dev

Server will run on:
http://localhost:3000

---

## API Endpoints

### Auth Routes

| Method | Endpoint              | Description         |
|--------|----------------------|---------------------|
| POST   | /api/users/register  | Register user       |
| POST   | /api/users/login     | Login user          |

---

### Contact Routes (Protected)

All routes require:
Authorization: Bearer <token>

| Method | Endpoint        | Description             |
|--------|-----------------|-------------------------|
| GET    | /contacts       | Get all contacts        |
| GET    | /contacts/:id   | Get single contact      |
| POST   | /contacts       | Create contact          |
| PUT    | /contacts/:id   | Update contact          |
| DELETE | /contacts/:id   | Delete contact          |

---

## Working Flow

1. User registers or logs in
2. Server generates a JWT token
3. Token is stored in browser localStorage
4. Frontend sends token in Authorization header
5. Backend middleware verifies token
6. User-specific contacts are fetched from MongoDB
7. User can:
   - Add contact
   - Edit contact
   - Delete contact
   - Search contacts
   - Navigate using pagination

---

## Frontend Flow

- `index.html` handles login and registration
- `dashboard.html` shows contacts
- `app.js` handles:
  - API calls
  - DOM updates
  - Pagination
  - Search
- Token is stored in `localStorage`

---

## Key Concepts Used

- REST API design
- JWT authentication
- Middleware protection
- MongoDB schema relationships (User → Contacts)
- Pagination using skip and limit
- Regex-based search
- CRUD operations
- Separation of concerns (MVC pattern)

---

## Future Improvements

- Add validation (Joi / express-validator)
- Improve UI (React or modern framework)
- Add loading states and error handling in frontend
- Add sorting and filtering
- Deploy to cloud (Render / Railway / Vercel)

---

## Author

Md. Mahedi Hassan  
GitHub: https://github.com/mhshanto007

---

## License

This project is open-source and available under the MIT License.