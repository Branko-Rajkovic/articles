````markdown
# Articles Management System

This project is a content management system for creating, storing, and managing articles. It also supports user authentication and role-based access control.

## Features

- **Article Management:** Create, read, update, and delete articles with fields such as title, content, topics, and media.
- **User Authentication:** Secure user management system with password hashing and email validation.
- **Role-Based Access:** User roles (admin, user, superadmin) to control access to features.

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
      PORT=<port>
      DATABASE_PASSWORD=<your databse password>
      DATABASE=<your database connection string>
      JWT_SECRET=<it should be at elaset 32 characters long>
      JWT_EXPIRES_IN=90
      JWT_COOKIE_EXPIRES=90
      MAILTRAP_USERNAME=<username of your Mailtrap test account>
      MAILTRAP_PASSWORD=<password of your Mailtrap test account>
      MAILTRAP_HOST=<Mailtrap host>
      MAILTRAP_PORT=<Mailtrap port>
      EMAIL_FROM=<your email address - to be shown in your automatic emails>
      BREVO_HOST=<Brevo host>
      BREVO_LOGIN=<Your Brevo login>
      BREVO_PASSWORD=<Your Brevo password>
   ```

## Environment Variables Explained

### NODE_ENV=development

Specifies the environment the Node.js application is running in. To run the application in production, run in terminal: npm run start:prod

### PORT=<port>

Specifies the port number on which the application will run.

### DATABASE_PASSWORD=<your database password>

Stores the password to connect to your database securely.

### DATABASE=<your database connection string>

Contains the full connection string for your database, including host, port, and database name. This tutorial guides you through creating an Atlas cluster, connecting to it : https://www.mongodb.com/docs/atlas/getting-started/

### JWT_SECRET=<it should be at least 32 characters long>

A secure secret key used to sign and verify JSON Web Tokens (JWTs). It must be long and complex to maintain security.

### JWT\*EXPIRES_IN=90

Specifies the expiration period. It is converted in authController.js in days : prosess.env.JWT*EXPIRES_IN \* 24 * 60 \_ 60 \_ 1000

### JWT_COOKIE_EXPIRES=90

Specifies the expiration period for JWT cookies (in days).

### MAILTRAP_USERNAME=<username of your Mailtrap test account>

/////////////////////////////////////////////////
Sign up for a Mailtrap account and create a new inbox.
Retrieve your SMTP credentials from the Mailtrap inbox settings.
/////////////////////////////////////////////////
The username for your Mailtrap account. Mailtrap is used to test email functionality in development environments.

### MAILTRAP_PASSWORD=<password of your Mailtrap test account>

The password for the Mailtrap SMTP.

### MAILTRAP_HOST=<Mailtrap host>

The Mailtrap server host in your SMTP credentials.

### MAILTRAP_PORT=<Mailtrap port>

The port number for connecting to the Mailtrap service in your SMTP credentials.

### EMAIL_FROM=<your email address - to be shown in your automatic emails>

Defines the sender's email address for automatic emails from the application.

### BREVO_HOST=<Brevo host>

The host address for Brevo (formerly Sendinblue), a transactional email service.

/////////////////////////////////////////////////
Create an account for Brevo.
Log in to your account
Click on your Profile and go to “SMTP & API”
/////////////////////////////////////////////////

### BREVO_LOGIN=<Your Brevo login>

The login username in SMPT section.

### BREVO_PASSWORD=<Your Brevo password>

The Master password in SMPT section.

4. Run the application from terminal in development environment:
   ```bash
   npm start
   ```
   Run the application in production environment:
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
       "subtitles": ["technology", "AI"],
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
       "subtitles": ["updated", "topic"]
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
