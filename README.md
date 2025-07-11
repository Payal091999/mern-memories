# Memories - MERN Stack Social Media App

A full-stack MERN (MongoDB, Express, React, Node.js) application where users can create, edit, delete, and like "memories" or posts. This is a beginner-friendly project that demonstrates RESTful API integration, MongoDB data handling, and React with Redux for frontend state management.

## Project Screenshot

![Memories](https://i.ibb.co/Z8Y0CJv/Screenshot-2020-10-30-at-11-10-04.png)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git
- npm or yarn

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Payal091999/project_mern_memories.git
   cd project_mern_memories
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=5001
     ```

4. Start the development servers:
   ```bash
   # Start backend server (in server directory)
   npm start

   # In a new terminal, start frontend (in client directory)
   npm start
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## Deployment Instructions

### Backend Deployment

#### Option 1: Heroku (Recommended)
1. Create a free Heroku account at https://signup.heroku.com/
2. Install Heroku CLI
3. Login to Heroku:
   ```bash
   heroku login
   ```
4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
5. Add MongoDB Atlas connection string as a config var:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   ```
6. Add JWT secret as a config var:
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   ```
7. Deploy the backend:
   ```bash
   git push heroku main
   ```
8. Check the deployment status:
   ```bash
   heroku logs --tail
   ```

#### Option 2: DigitalOcean
1. Create a DigitalOcean droplet
2. Install Node.js and MongoDB
3. Clone the repository
4. Set up environment variables
5. Start the server using PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "memories-api"
   ```

#### Option 3: AWS
1. Create an EC2 instance
2. Install Node.js and MongoDB
3. Clone the repository
4. Set up environment variables
5. Start the server using PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "memories-api"
   ```

### Frontend Deployment

#### Option 1: Netlify (Recommended)

1. **Build the React App**
   - Go to the client folder and run:
   ```bash
   cd client
   npm run build
   ```
   - This will create a build folder at `client/build/` — this is what you'll deploy to Netlify.

2. **Add _redirects File (for React Router)**
   - In `client/public/`, create a file called `_redirects` (no extension) with this content:
   ```
   /*    /index.html   200
   ```
   - This ensures that routes like `/posts` or `/edit/123` don't break.
   - Rebuild after adding the redirects file:
   ```bash
   npm run build
   ```

3. **Deploy to Netlify**
   Now you have 2 options:

   **OPTION 1: Drag-and-Drop (Quickest)**
   - Go to: https://app.netlify.com/drop
   - Drag your entire `client/build/` folder into it
   - Netlify will host it at a new URL (like https://my-app.netlify.app)

   **OPTION 2: Connect GitHub (Recommended)**
   - Push your full project to GitHub
   - Go to https://app.netlify.com
   - Click "Add New Site" → "Import from Git"
   - Choose your repo
   - In Netlify settings:
     - Build command: `npm run build`
     - Publish directory: `client/build`
   - Click Deploy

4. **Additional Configuration**
   - Set environment variables in Netlify dashboard:
     - `REACT_APP_API_URL`: Your backend API URL
     - `REACT_APP_ENV`: Environment mode (production/development)
   - Configure domain settings if needed
   - Set up SSL/TLS certificates (auto-configured by Netlify)

5. **Post-Deployment Steps**
   - Verify the deployment URL in the Netlify dashboard
   - Test all routes and functionality
   - Monitor deployment logs for errors
   - Set up monitoring and analytics if needed

6. **Troubleshooting Common Issues**
   - **404 Errors**: Ensure the `_redirects` file is correctly configured
   - **API Connection**: Verify `REACT_APP_API_URL` is set correctly
   - **Build Errors**: Check build logs in Netlify dashboard
   - **Performance**: Use Netlify Analytics to monitor performance

#### Option 2: Vercel
1. Create a Vercel account at https://vercel.com/signup
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy to Vercel:
   ```bash
   cd client
   vercel
   ```
   - Follow the prompts to set up your project
   - Select your project from the list
   - Set build command: `npm run build`
   - Set output directory: `build`

#### Option 2: Vercel
1. Create a Vercel account
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy to Vercel:
   ```bash
   cd client
   vercel
   ```

### Production Configuration

1. Update API URL in frontend:
   ```javascript
   // In client/src/api/index.js
   const url = 'https://your-backend-url/posts';
   ```

2. Set up SSL/TLS certificates:
   - For Heroku: Auto-configured
   - For DigitalOcean/AWS: Use Let's Encrypt

3. Configure environment variables:
   ```bash
   # For Heroku
   heroku config:set NODE_ENV=production

   # For DigitalOcean/AWS
   export NODE_ENV=production
   ```

### Monitoring and Logging

1. Set up monitoring:
   - Heroku: Use Heroku Metrics
   - DigitalOcean/AWS: Use PM2 monitoring

2. Configure logging:
   ```bash
   # For Heroku
   heroku logs --tail

   # For DigitalOcean/AWS
   pm2 logs
   ```

### Troubleshooting

1. Common issues:
   - MongoDB connection issues
     - Check connection string
     - Verify IP whitelist
   - Port conflicts
     - Change PORT in .env file
   - Missing environment variables
     - Verify .env file

2. Error handling:
   - Check server logs
   - Verify database connection
   - Check API endpoints

## Environment Variables

### Required Environment Variables

1. **Backend Security Variables**
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication
   - `JWT_EXPIRE`: JWT token expiration time (default: 24h)
   - `PASSWORD_SALT_ROUNDS`: Number of bcrypt salt rounds (default: 10)
   - `MAX_LOGIN_ATTEMPTS`: Maximum failed login attempts before lockout (default: 5)
   - `LOCKOUT_DURATION`: Duration of lockout after failed attempts (default: 15m)
   - `RATE_LIMIT_WINDOW`: Rate limiting window in milliseconds (default: 15 minutes)
   - `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window (default: 100)
   - `CORS_ORIGIN`: Allowed origins for CORS (comma-separated list)
   - `CORS_METHODS`: Allowed HTTP methods for CORS (default: GET,POST,PUT,DELETE)
   - `CORS_HEADERS`: Allowed headers for CORS (default: Content-Type,Authorization)
   - `MAX_FILE_SIZE`: Maximum file upload size in bytes (default: 5MB)
   - `ALLOWED_FILE_TYPES`: Allowed file types for uploads (comma-separated list)
   - `PASSWORD_MIN_LENGTH`: Minimum password length (default: 8)
   - `PASSWORD_MAX_LENGTH`: Maximum password length (default: 100)
   - `PASSWORD_COMPLEXITY`: Password complexity requirements (default: uppercase,lowercase,digits,special)

2. **Backend Performance Variables**
   - `PORT`: Port number for the server (default: 5001)
   - `NODE_ENV`: Environment mode (development/production/test)
   - `LOG_LEVEL`: Logging level (debug,info,warn,error)
   - `CACHE_ENABLED`: Enable/disable caching (true/false)
   - `CACHE_PROVIDER`: Cache provider (memory,redis,memcached)
   - `CACHE_TTL`: Cache time-to-live in seconds (default: 3600)
   - `COMPRESSION_THRESHOLD`: Minimum response size for compression (default: 1KB)
   - `REQUEST_TIMEOUT`: Maximum request timeout in milliseconds (default: 30000)
   - `IDLE_TIMEOUT`: Maximum idle timeout in milliseconds (default: 60000)

3. **Frontend Security Variables**
   - `REACT_APP_API_URL`: Backend API URL
   - `REACT_APP_ENV`: Environment mode (development/production/test)
   - `REACT_APP_VERSION`: Application version
   - `REACT_APP_API_TIMEOUT`: API request timeout in milliseconds (default: 30000)
   - `REACT_APP_RETRY_ATTEMPTS`: Number of retry attempts for failed requests (default: 3)
   - `REACT_APP_RETRY_DELAY`: Delay between retry attempts in milliseconds (default: 1000)
   - `REACT_APP_RATE_LIMIT`: Frontend rate limiting enabled (true/false)
   - `REACT_APP_LOG_LEVEL`: Frontend logging level (debug,info,warn,error)
   - `REACT_APP_ERROR_REPORTING`: Error reporting enabled (true/false)
   - `REACT_APP_FEATURE_FLAGS`: Comma-separated list of enabled features
   - `REACT_APP_API_KEY`: API key for external services

4. **Deployment-Specific Variables**
   - `DEPLOYMENT_ENV`: Deployment environment (production,staging,development)
   - `DEPLOYMENT_REGION`: Deployment region (us-east-1,eu-west-1,etc.)
   - `DEPLOYMENT_ZONE`: Deployment zone or availability zone
   - `INSTANCE_ID`: Unique identifier for the instance
   - `CLUSTER_NAME`: Name of the deployment cluster
   - `SERVICE_NAME`: Name of the deployed service
   - `SERVICE_VERSION`: Version of the deployed service
   - `DEPLOYMENT_TIMESTAMP`: Timestamp of deployment
   - `DEPLOYMENT_COMMIT`: Git commit hash of deployed code
   - `DEPLOYMENT_BRANCH`: Git branch of deployed code

### Setting Up Environment Variables

#### For Heroku
1. Set environment variables using Heroku CLI:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set PORT=5001
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN="*"
   heroku config:set RATE_LIMIT_WINDOW=900000
   heroku config:set RATE_LIMIT_MAX_REQUESTS=100
   ```

2. Set frontend variables:
   ```bash
   heroku config:set REACT_APP_API_URL=https://your-backend-url.herokuapp.com
   heroku config:set REACT_APP_ENV=production
   heroku config:set REACT_APP_VERSION=1.0.0
   ```

#### For DigitalOcean/AWS
1. Create a `.env` file in the server directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5001
   NODE_ENV=production
   CORS_ORIGIN="*"
   RATE_LIMIT_WINDOW=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

2. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=https://your-backend-url
   REACT_APP_ENV=production
   REACT_APP_VERSION=1.0.0
   ```

### Security Considerations

1. **Secret Management**
   - Never commit `.env` files to version control
   - Use different secrets for development and production
   - Rotate secrets periodically

2. **Environment Variable Best Practices**
   - Use descriptive variable names
   - Keep sensitive data in environment variables
   - Use fallback values for non-sensitive variables
   - Document all required variables

3. **Example .env Templates**

   ```
   # Production Environment Template
   # Server Environment
   NODE_ENV=production
   PORT=5001
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   JWT_SECRET=production-secret-key-1234567890
   JWT_EXPIRE=24h
   PASSWORD_SALT_ROUNDS=12
   MAX_LOGIN_ATTEMPTS=5
   LOCKOUT_DURATION=900000
   RATE_LIMIT_WINDOW=900000
   RATE_LIMIT_MAX_REQUESTS=100
   CORS_ORIGIN="https://your-production-domain.com"
   CORS_METHODS="GET,POST,PUT,DELETE"
   CORS_HEADERS="Content-Type,Authorization"
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif"
   LOG_LEVEL=info
   CACHE_ENABLED=true
   CACHE_PROVIDER=redis
   CACHE_TTL=3600
   COMPRESSION_THRESHOLD=1024
   REQUEST_TIMEOUT=30000
   IDLE_TIMEOUT=60000

   # Frontend Environment
   REACT_APP_API_URL=https://api.your-production-domain.com
   REACT_APP_ENV=production
   REACT_APP_VERSION=1.0.0
   REACT_APP_API_TIMEOUT=30000
   REACT_APP_RETRY_ATTEMPTS=3
   REACT_APP_RETRY_DELAY=1000
   REACT_APP_RATE_LIMIT=true
   REACT_APP_LOG_LEVEL=info
   REACT_APP_ERROR_REPORTING=true

   # Deployment-Specific
   DEPLOYMENT_ENV=production
   DEPLOYMENT_REGION=us-east-1
   DEPLOYMENT_ZONE=us-east-1a
   INSTANCE_ID=i-1234567890abcdef0
   CLUSTER_NAME=production-cluster
   SERVICE_NAME=memories-api
   SERVICE_VERSION=1.0.0
   DEPLOYMENT_TIMESTAMP=2025-07-11T07:17:00Z
   DEPLOYMENT_COMMIT=abc123def456
   DEPLOYMENT_BRANCH=main
   ```

   ```
   # Development Environment Template
   # Server Environment
   NODE_ENV=development
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/memories
   JWT_SECRET=development-secret-key-1234567890
   JWT_EXPIRE=7d
   PASSWORD_SALT_ROUNDS=10
   MAX_LOGIN_ATTEMPTS=3
   LOCKOUT_DURATION=300000
   RATE_LIMIT_WINDOW=300000
   RATE_LIMIT_MAX_REQUESTS=50
   CORS_ORIGIN="http://localhost:3000"
   CORS_METHODS="GET,POST,PUT,DELETE,OPTIONS"
   CORS_HEADERS="Content-Type,Authorization,X-Requested-With"
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES="*"
   LOG_LEVEL=debug
   CACHE_ENABLED=false
   CACHE_TTL=60
   COMPRESSION_THRESHOLD=0
   REQUEST_TIMEOUT=60000
   IDLE_TIMEOUT=120000

   # Frontend Environment
   REACT_APP_API_URL=http://localhost:5001
   REACT_APP_ENV=development
   REACT_APP_VERSION=1.0.0-dev
   REACT_APP_API_TIMEOUT=60000
   REACT_APP_RETRY_ATTEMPTS=5
   REACT_APP_RETRY_DELAY=2000
   REACT_APP_RATE_LIMIT=false
   REACT_APP_LOG_LEVEL=debug
   REACT_APP_ERROR_REPORTING=false

   # Deployment-Specific
   DEPLOYMENT_ENV=development
   DEPLOYMENT_REGION=local
   DEPLOYMENT_ZONE=local
   INSTANCE_ID=local
   CLUSTER_NAME=development
   SERVICE_NAME=memories-api-dev
   SERVICE_VERSION=1.0.0-dev
   DEPLOYMENT_TIMESTAMP=2025-07-11T07:17:00Z
   DEPLOYMENT_COMMIT=local-dev
   DEPLOYMENT_BRANCH=main
   ```

## Features

- Create, Read, Update, Delete (CRUD) posts

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for hosting MongoDB database)
- Heroku account (for hosting Node.js backend)

### Step 1: Set Up MongoDB Atlas
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Copy the MongoDB connection string
6. Replace `your_password` in the connection string with your actual database password
7. Add the following environment variables to your `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

### Step 2: Deploy to Heroku
1. Create a free Heroku account at https://signup.heroku.com/
2. Install Heroku CLI
3. Login to Heroku:
   ```bash
   heroku login
   ```
4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
5. Add MongoDB Atlas connection string as a config var:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   ```
6. Add JWT secret as a config var:
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   ```
7. Deploy the backend:
   ```bash
   git push heroku main
   ```
8. Check the deployment status:
   ```bash
   heroku logs --tail
   ```

### Step 3: Configure Frontend
1. Update the frontend API URL in `client/src/api/index.js`:
   ```javascript
   const url = 'https://your-heroku-app-name.herokuapp.com/posts';
   ```
2. Build and deploy the frontend to Netlify:
   ```bash
   cd client
   npm run build
   netlify deploy --prod --site your-netlify-site-id
   ```

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Port number for the server (default: 5001)

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