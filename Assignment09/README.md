# Assignment09 README

## Introduction
This GitHub repository showcases a web application with user authentication, REST API implementation, and a simple navigation structure built using React components.

## Features

1. **User Authentication:**
   - Utilizes usernames and passwords created in a previous assignment for successful login.
   - Validates email and password on the login page, and a post request is sent to `/users/login` on `localhost:8000` (route created in the assignment8 repo).
   - If credentials are correct, it redirects to the homepage; otherwise, it displays an alert.

2. **REST API Structure:**
   - Follows a folder hierarchy for the REST API:
     - `server.js` serves as the entry point.
     - `router.js`, `controller.js`, `service.js`, and `model.js` handle various aspects of API functionality.

3. **React Components:**
   - Includes four pages built with React components: Home, About Us, Jobs, and Contact.
   - Each page has a corresponding route managed by `react-router`.

4. **Reusable Navbar Component:**
   - A reusable navbar component is present on Home, About Us, Jobs, and Contact pages, providing easy navigation between them.

5. **Reusable Card Component:**
   - To ensure consistent material display across all pages, a card component is implemented.
   - The card component accepts three props: `header`, `description`, and `isShowButton`.
   
6. **Jobs Page:**
   - Displays a list of open positions using the map function.
   - Utilizes the card component to present each job with a dynamically displayed button.

## Setup Instructions
1. Clone the repository.
2. Ensure the necessary dependencies are installed.
3. Run the server using `node server.js`.
4. Navigate to `localhost:8000` in your web browser.

## Contributing
Feel free to contribute by forking the repository and creating pull requests. For major changes, please open an issue first to discuss potential changes.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
Special thanks to Aditya Prakash 002725414 for contributions and inspiration.

**Happy Coding!**
