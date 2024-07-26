# Cristy Craft API

Welcome to the Cristy Craft API repository. This project is a Node.js-based API built with Express and TypeScript, designed to provide a robust and scalable backend service. The API is structured to integrate with Auth0 for authentication and Stripe for payment processing, ensuring a secure and efficient user experience.

## Features

- Express.js as the core framework.
- Integration with Auth0 for secure authentication.
- Stripe integration for seamless payment processing.
- Code quality ensured by ESLint.
- Development efficiency with Nodemon.

## Prerequisites

To run this project, you'll need Node.js installed on your system. The project uses Node.js version `21.7.3`. You can manage multiple versions of Node.js on your machine with [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm).

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CristyTech/crafts-api.git
   cd crafts-api
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
Create a .env file in the root directory and fill it with the necessary environment variables.

4. **Start the server:**

    - For Development environment:

        ```bash
        npm run dev
        ```

    - For qa environment:

        ```bash
        npm run qa
        ```

    - For productoon environment:

        ```bash
        npm run production
        ```

5. **Linting:**

    - ESLint is configured for linting.

    - To check for linting errors:

        ```bash
        npm run eslint
        ```

    - To automatically fix linting errors:

        ```bash
        npm run eslint-fix
        ```
