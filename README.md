Based on the content of the provided files, here is a README.md file for your project:

---

````markdown
# Articles Management System

This project is a content management system for creating, storing, and managing articles. It also supports user authentication and role-based access control.

## Features

- **Article Management:** Create, read, update, and delete articles with fields such as title, content, topics, and media.
- **Slug Generation:** Automatically generate URL-friendly slugs for articles based on their titles.
- **User Authentication:** Secure user management system with password hashing and email validation.
- **Role-Based Access:** User roles (admin, user, superadmin) to control access to features.

## Technologies Used

- **Node.js** and **Express.js** for backend development
- **MongoDB** with **Mongoose** for database management
- **bcrypt.js** for secure password hashing
- **slugify** for generating URL-friendly slugs
- **crypto** for secure token generation
- **validator** for input validation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Branko-Rajkovic/articles.git
   cd articles
   ```
````

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create an environment file `.env` and configure the necessary variables with your values:

   ```env
    NODE_ENV=development
    PORT=3000
    DATABASE_PASSWORD=xxxxxxxxxxxxx
    DATABASE=xxxxxxxxxxx(database connection string)
    JWT_SECRET=xxxxxxxxxxxxxxxxx
    JWT_EXPIRES_IN=90
    JWT_COOKIE_EXPIRES=90
    EMAIL_USERNAME=xxxxxxxxxxxxx
    EMAIL_PASSWORD=xxxxxxxxxxxxxx
    EMAIL_HOST=xxxxxxxxxxxxxxx
    EMAIL_PORT=xxxxxxxxxxxxx
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Models

### User Model

The `userModel.js` defines the schema for user data, including:

- **Name, Email, Role:** Basic user information
- **Password Security:** Password hashing and confirmation validation
- **Account Management:** Functions to reset passwords and handle updates

### Article Model

The `articleModel.js` defines the schema for articles, including:

- **Title and Content:** Article details
- **Slug Generation:** URL-friendly slugs
- **Ratings and Metadata:** Optional data for content engagement

## API Endpoints (Sample)

- **User Authentication:** `POST /api/v1/users/login`
- **Article Management:** `POST /api/v1/articles`

Here is a description of the user-related API endpoints, including the protected routes:

---

### **User Endpoints**

## **Public Endpoints**

1. **POST `/signup`**

   - Description: Registers a new user.
   - Request Body:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "yourpassword",
       "passwordConfirm": "yourpassword"
     }
     ```
   - Response: Success message with user details.

2. **POST `/login`**

   - Description: Authenticates an existing user and returns a JWT token.
   - Request Body:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "yourpassword"
     }
     ```

3. **POST `/forgot-password`**

   - Description: Sends a password reset token to the user's email.
   - Request Body:
     ```json
     {
       "email": "john.doe@example.com"
     }
     ```

4. **PATCH `/reset-password/:token`**
   - Description: Resets the user's password using a valid reset token.
   - Request Body:
     ```json
     {
       "password": "newpassword",
       "passwordConfirm": "newpassword"
     }
     ```

---

## **Protected Endpoints (require authentication using JWT)**

1. **PATCH `/update-password`**

   - Middleware: `protect`
   - Description: Allows a logged-in user to change their password.
   - Request Body:
     ```json
     {
       "oldPassword": "oldpassword",
       "password": "newpassword",
       "passwordConfirm": "newpassword"
     }
     ```

2. **PATCH `/update-me`**

   - Middleware: `protect`
   - Description: Allows a logged-in user to update their profile details (except password).
   - Request Body (example):
     ```json
     {
       "name": "Jane Doe",
       "email": "jane.doe@example.com"
     }
     ```

3. **DELETE `/delete-me`**
   - Middleware: `protect`
   - Description: Allows a logged-in user to deactivate their own account.

---

## **Admin Endpoints**

These endpoints likely require additional role-based access control (e.g., admin or superadmin roles):

1. **GET `/`**

   - Description: Retrieves a list of all users.

2. **POST `/`**

   - Description: Creates a new user.

3. **GET `/:id`**

   - Description: Retrieves a specific user by ID.

4. **PATCH `/:id`**

   - Description: Updates a specific user by ID.

5. **DELETE `/:id`**
   - Description: Deletes a specific user by ID.

---

Here is a description of the article-related API endpoints, including protected and restricted routes:

---

### **Endpoints**

1. **GET `/`**

   - Description: Retrieves a list of all articles.
   - Query Parameters (if supported):
     - Filters for categories, topics, or ratings can be handled on the backend.
   - Response: Returns an array of article objects.

2. **POST `/`**
   - Description: Creates a new article.
   - Request Body:
     ```json
     {
       "title": "Sample Article",
       "summary": "This is a brief summary",
       "contentTopics": ["technology", "AI"],
       "paragraphs": ["Paragraph 1 content", "Paragraph 2 content"],
       "lists": ["List item 1", "List item 2"],
       "images": ["image-url-1", "image-url-2"]
     }
     ```
   - Response: Success message with created article details.

---

### **Endpoints for Articles**

1. **GET `/:id`**

   - Description: Retrieves a specific article by its unique ID.
   - URL Parameter:
     - `id`: The unique identifier for the article
   - Response: Article details

2. **PATCH `/:id`**

   - Description: Updates a specific article by its unique ID.
   - URL Parameter:
     - `id`: The unique identifier for the article
   - Request Body (example):
     ```json
     {
       "title": "Updated Article Title",
       "summary": "Updated summary",
       "contentTopics": ["updated", "topic"]
     }
     ```
   - Response: Updated article details

3. **DELETE `/:id`**
   - Middleware: `protect`, `restrictTo('admin', 'superadmin')`
   - Description: Deletes a specific article by its unique ID.
   - URL Parameter:
     - `id`: The unique identifier for the article
   - Authentication & Authorization: Requires a valid JWT and admin or superadmin role.
   - Response: Success message confirming deletion

---

## **Middleware Explanation**

- **`protect`**: Ensures that the user is authenticated using a valid JWT token.
- **`restrictTo('admin', 'superadmin')`**: Grants access only to users with the specified roles (admin or superadmin).

---
