# Memories - MERN Stack Social Media App

A full-stack MERN (MongoDB, Express, React, Node.js) application where users can create, edit, delete, and like "memories" or posts. This is a beginner-friendly project that demonstrates RESTful API integration, MongoDB data handling, and React with Redux for frontend state management.

## Project Screenshot

![Memories](https://i.ibb.co/Z8Y0CJv/Screenshot-2020-10-30-at-11-10-04.png)

## Features

- Create, Read, Update, Delete (CRUD) posts
- Image upload using Base64
- Like functionality
- Post timestamps (via Moment.js)
- Responsive design (Material-UI)
- Backend API with Express and Mongoose
- MongoDB Atlas Cloud Integration
- Redux for global state management
- Ready for adding user authentication (JWT)

## Folder Structure

```
project_mern_memories/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── actions/
│ ├── api/
│ ├── components/
│ ├── constants/
│ ├── reducers/
│ ├── App.js
│ └── index.js
└── server/ # Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env
    └── index.js

## Tech Stack

### Frontend
- React
- Redux
- Material-UI
- Axios
- Moment.js
- React File Base64
- React-Redux

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- body-parser
- cors

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YourUsername/project_mern_memories.git
cd project_mern_memories

2️⃣ Setup Backend
bash
cd server
npm install
📝 Create a .env file in the /server folder:
ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the server:
bash
npm start
________________________________________
3️⃣ Setup Frontend
Open a new terminal tab/window:
bash
cd client
npm install
npm start
🌐 Visit: http://localhost:3000
________________________________________

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /posts   | Fetch all posts |
| POST   | /posts   | Create a new post |
| PUT    | /posts/:id | Update a post |
| DELETE | /posts/:id | Delete a post |
| PATCH  | /posts/:id/likePost | Like a post |

## 🧑‍💻 Author

- **Payal Bera**
- [LinkedIn](https://linkedin.com/in/your-linkedin)
- [GitHub](https://github.com/your-github)

## 📜 License

This project is licensed under the MIT License.

## 💡 Future Improvements

- JWT-based user authentication and authorization
- Commenting system for posts
- Pagination for better performance
- User profile pages
- Advanced search functionality
- Real-time updates using WebSocket
- Mobile-responsive improvements
- Unit tests and integration tests
- CI/CD pipeline setup
- Docker containerization

## 📝 Project Status

This project is currently in development. Pull requests are welcome!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

For detailed documentation, check out the [Wiki](https://github.com/your-username/project_mern_memories/wiki)

## 🙌 Acknowledgments

This project would not have been possible without the guidance and inspiration from the developer community. Special thanks to:

JavaScript Mastery for their clear and beginner-friendly MERN Stack tutorials.

The contributors behind open-source tools like React, Node.js, Express, MongoDB, and Material-UI that power this application.

MongoDB Atlas for providing free cloud database hosting.

Everyone who contributes to open-source documentation, community forums, and developer Q&A platforms like Stack Overflow.

Your work makes learning and building as a developer possible — thank you! 💙