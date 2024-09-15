# Foodie - Food Ordering Website

**Foodie** is a food ordering web application that allows users to browse menus, place orders, manage cart items, submit reviews, and much more. The website provides a seamless experience for users with OTP-based login, discounts, reviews, and other essential features. Built with a modern tech stack, it integrates a React frontend with a Django backend.

## Features

- **User Authentication**: Users can sign up and log in using their phone numbers and OTP.
- **Menu Browsing**: Browse through different restaurants and menus with filters and sorting options.
- **Cart System**: Add items to the cart, manage quantities, and place orders.
- **Discounts**: View featured discounts, combo deals, flash sales, and apply discount codes.
- **Reviews & Ratings**: Users can submit reviews and rate items after placing an order.
- **Admin Panel**: Manage menu items, discounts, and orders via the Django admin dashboard.

## Technologies Used

### Frontend
- **React.js**: For building the user interface and handling client-side routing.
- **Axios**: For making API requests to the Django backend.
- **Bootstrap (via CDN)**: For responsive design and styling.
- **React Router**: For routing between different pages (Home, Menu, Cart, About, Contact).
- **CSS**: For custom styling and animations.

### Backend
- **Django**: For handling server-side logic, database management, and APIs.
- **SQLite**: For managing the database (configurable based on environment).
- **Django REST Framework**: For creating RESTful APIs to interact with the frontend.
- **Django Model**: Custom models for managing users, reviews, menu items, discounts, and orders.

### Other Tools
- **Postman**: For API testing and debugging.
- **Git**: Version control for tracking changes and collaboration.

## Installation

### Backend (Django)

1. Clone the repository:
    ```bash
    git clone https://github.com/darshangohil46/food_ordering_website.git
    cd food_ordering_website
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

4. Create a superuser for the Django admin panel:
    ```bash
    python manage.py createsuperuser
    ```
    - Fill correct phone end email id (phone number is verified by Twillo)

5. Run the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. Navigate to the frontend directory:
    ```bash
    cd food_ordering_website
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the app in your browser:
    ```
    http://localhost:3000
    ```

## Project Structure

### Backend (Django)

- `models.py`: Contains database models for users, orders, menu items, reviews, etc.
- `views.py`: API views for handling requests and sending responses to the frontend.
- `urls.py`: Defines URL routes for different API endpoints.
- `serializers.py`: Serializes data between the Django models and React frontend.
- `settings.py`: Configuration file for database, middleware, and installed apps.

### Frontend (React)

- `src/components/`: Contains reusable React components such as `Header`, `Footer`, `MenuList`, `Cart`, etc.
- `src/pages/`: Contains page components such as `Home`, `Menu`, `Discounts`, `Account`, and `Contact`.
- `src/services/`: Contains Axios services for making API calls to the Django backend.
- `src/App.js`: The main app component that handles routing.
- `src/index.js`: Entry point for the React app.

## API Endpoints

### Authentication

- **POST** `/api/check-phone/` – check phone number is valid or not.
- **POST** `/api/send-otp/` – Send an OTP for phone number verification.

### Menu

- **GET** `/api/menu/` – Retrieve a list of available menu items.

### Reviews

- **POST** `/api/submit-reviews/` – Submit a new review for a menu item.
- **GET** `/api/reviews/` – Retrieve reviews.

## Future Enhancements

- Add payment gateway integration for online payments.
- Implement order history for users to track previous orders.
- Add location-based search for restaurants.

## Contribution

Contributions are welcome! Please fork the repository and create a pull request to contribute.

## License

This project is licensed under the MIT License.
