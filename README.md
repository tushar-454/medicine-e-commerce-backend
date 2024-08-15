# Medicine E-Commerce Backend

This repository contains the backend code for the Medicine E-Commerce project. It serves as the server-side component that handles the logic and data management for the e-commerce platform.

## Project Description

The Medicine E-Commerce project aims to provide a convenient platform for users to purchase medicines online. It allows users to browse through a wide range of medicines, add them to their cart, and complete the purchase securely. The backend is responsible for handling user authentication, managing product inventory, processing payments, and generating order details.

## Technology

The backend of the Medicine E-Commerce project is built using the following technologies:

- Node.js: A JavaScript runtime environment that allows us to run server-side code.
- Express.js: A web application framework for Node.js that simplifies the process of building APIs.
- MongoDB: A NoSQL database used for storing and retrieving data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB that provides a straightforward way to interact with the database.

## How to Run Locally

To run the Medicine E-Commerce backend locally, you will need to follow these steps:

1. Make sure you have Node.js installed on your computer. You can check the version by running the following command in your terminal:

```bash
node -v
```

Ensure that the version displayed is 20 or higher. If you don't have Node.js installed or have an older version, please download and install the latest version from the official Node.js website.

2. Once you have Node.js installed and verified the version, you can proceed with the next steps to run the Medicine E-Commerce backend locally.

3. Clone the repository to your local machine:

```bash
 git clone -b local --single-branch https://github.com/tushar-454/medicine-e-commerce-backend.git
```

4. Navigate to the project directory:

```bash
cd medicine-e-commerce-backend
```

5. Install the package manager & Nodemon globally:

```bash
npm install -g yarn
yarn global add nodemon
```

6. Install the dependencies:

```bash
yarn
```

7. Start the server:

```bash
yarn start
```

The server will start running on `http://localhost:4000`.

That's it! You can now start making API requests to the Medicine E-Commerce backend.
