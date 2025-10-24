# BlogSite - Full Stack Blog Application

A modern, full-stack blog application built with Spring Boot and React, featuring user authentication, blog management, likes, and comments functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**
  - Secure user registration and login
  - JWT-based authentication
  - Password encryption using BCrypt

- **Blog Management**
  - Create and publish blog posts
  - Search blogs by title
  - View all blogs
  - Individual blog detail view

- **Social Features**
  - Like/unlike blog posts
  - Comment on blogs
  - View comment counts
  - User-specific interactions

- **Responsive UI**
  - Modern, clean interface
  - Dark theme design
  - Mobile-friendly layout

## 🛠️ Tech Stack

### Backend

- **Framework:** Spring Boot 3.5.3
- **Language:** Java 21
- **Security:** Spring Security + JWT (JSON Web Tokens)
- **Database:** MySQL
- **ORM:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven
- **Additional Libraries:**
  - Lombok (for reducing boilerplate code)
  - JJWT (for JWT token generation and validation)
  - BCrypt (for password encryption)

### Frontend

- **Framework:** React 19.1.0
- **Build Tool:** Vite 7.0.4
- **Routing:** React Router DOM 7.6.3
- **Styling:** Tailwind CSS 4.1.11
- **Icons:** Lucide React 0.525.0
- **HTTP Client:** Fetch API
- **Package Manager:** npm

### Development Tools

- **Backend:**
  - Spring Boot DevTools
  - Maven Compiler Plugin
  - Spring Boot Configuration Processor

- **Frontend:**
  - ESLint (code linting)
  - Vite Plugin React
  - PostCSS

## 🏗️ Architecture

### Backend Architecture

```
src/main/java/com/blog/BlogSite/
├── Config/
│   └── SecurityConfig.java          # Security & CORS configuration
├── Controller/
│   ├── ControllerHub.java           # Blog-related endpoints
│   └── SecurityController.java      # Authentication endpoints
├── Model/
│   ├── Person.java                  # User entity
│   ├── Detail.java                  # Blog entity
│   ├── Comment.java                 # Comment entity
│   ├── Like.java                    # Like entity
│   ├── AuthResponseDTO.java         # Authentication response
│   └── SearchRequest.java           # Search request DTO
├── Repo/
│   ├── PersonRepo.java              # User repository
│   ├── DetailRepo.java              # Blog repository
│   ├── CommentRepo.java             # Comment repository
│   └── LikeRepo.java                # Like repository
├── Services/
│   ├── PersonServices.java          # User business logic
│   ├── BlogServices.java            # Blog business logic
│   ├── JWTServices.java             # JWT token management
│   ├── JWTFilter.java               # JWT authentication filter
│   ├── CustomerServices.java        # UserDetailsService implementation
│   └── PersonPrinciple.java         # UserDetails implementation
└── BlogSiteApplication.java         # Main application class
```

### Frontend Architecture

```
src/
├── Components/
│   ├── Signup.jsx                   # User registration
│   ├── Login.jsx                    # User login
│   ├── Header.jsx                   # Navigation header
│   ├── AddBlog.jsx                  # Create blog post
│   ├── ShowAllBlogs.jsx             # List all blogs
│   ├── ShowBlog.jsx                 # Individual blog view
│   └── SearchBlog.jsx               # Search functionality
├── assets/                          # Static assets
├── App.jsx                          # Root component
├── main.jsx                         # Application entry point
└── index.css                        # Global styles
```

## 📦 Prerequisites

### Backend Requirements

- Java Development Kit (JDK) 21 or higher
- Maven 3.9.x or higher
- MySQL 8.0 or higher

### Frontend Requirements

- Node.js 20.19.0 or 22.12.0 or higher
- npm 8.0 or higher

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BlogSite
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE blogdb;
```

### 3. Backend Setup

```bash
# Navigate to the root directory
cd BlogSite

# Install dependencies (Maven will download them)
./mvnw clean install

# Or on Windows
mvnw.cmd clean install
```

### 4. Frontend Setup

```bash
# Navigate to the frontend directory
cd blog_frontend/frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.application.name=BlogSite

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/blogdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# JWT Secret Key (change this in production!)
jwt.secret=your_secure_secret_key_minimum_256_bits
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8080` for the backend API. If your backend runs on a different port, update the API URLs in the component files.

### CORS Configuration

The backend is configured to allow requests from `http://localhost:5173` (Vite's default port). Update `SecurityConfig.java` if your frontend runs on a different port.

## 🏃 Running the Application

### Start the Backend

```bash
# From the root directory
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

### Start the Frontend

```bash
# From blog_frontend/frontend directory
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/signin` | User login | No |
| GET | `/name/{id}` | Get username by ID | Yes |

### Blog Operations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/allBlog` | Get all blogs | Yes |
| GET | `/getBlog/{id}` | Get blog by ID | Yes |
| POST | `/addBlog` | Create new blog | Yes |
| POST | `/search` | Search blogs by title | Yes |

### Social Features

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/like/{id}` | Toggle like on blog | Yes |
| GET | `/getlike/{id}` | Get like count | Yes |
| POST | `/comment/{id}` | Add comment | Yes |
| GET | `/getComment/{id}` | Get comments | Yes |

## 📁 Project Structure

### Database Schema

**Person (Signup Table)**
- `id` (Primary Key)
- `name` (Username)
- `password` (Encrypted)

**Detail (Blog Table)**
- `id` (Primary Key)
- `title`
- `description`

**Comment Table**
- `id` (Primary Key)
- `blogid` (Foreign Key)
- `userid` (Foreign Key to Person)
- `comments`

**Like Table**
- `id` (Primary Key)
- `titleid` (Foreign Key to Detail)
- `userid` (Foreign Key to Person)
- `likes` (Count)
- Unique constraint on (userid, titleid)

## 💡 Usage

### 1. Register a New Account

- Navigate to the signup page
- Enter username and password
- Click "Submit"

### 2. Login

- Go to the login page
- Enter credentials
- You'll receive a JWT token (stored in localStorage)

### 3. Create a Blog Post

- Click "Add Blog" in the navigation
- Enter title and description
- Submit the form

### 4. Interact with Blogs

- View all blogs on the home page
- Like blogs by clicking the heart icon
- Add comments to blogs
- Search for specific blogs

## 🔒 Security

### Authentication Flow

1. User registers/logs in with credentials
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Token is sent with every authenticated request in Authorization header
5. Backend validates token using JWTFilter

### Security Features

- Password encryption using BCrypt
- JWT-based stateless authentication
- Protected API endpoints
- CORS configuration for frontend
- Unique constraint on like table (prevents duplicate likes)

### Security Best Practices

- Change the JWT secret key in production
- Use HTTPS in production
- Implement token refresh mechanism
- Add rate limiting
- Implement input validation
- Use environment variables for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🚧 Future Enhancements

- [ ] Add edit and delete functionality for blogs
- [ ] Implement blog categories/tags
- [ ] Add user profile pages
- [ ] Implement real-time notifications
- [ ] Add image upload for blogs
- [ ] Implement pagination
- [ ] Add comment editing/deletion
- [ ] Implement token refresh mechanism
- [ ] Add password reset functionality
- [ ] Implement email verification

## 📞 Support

For support, please open an issue in the repository.

---
