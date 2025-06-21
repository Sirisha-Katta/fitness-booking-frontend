# My React Frontend

This project is a React application that provides a user interface for managing classes and bookings. It includes features for user authentication, class listings, and booking management.

## Project Structure

```
my-react-frontend
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── components          # Contains all React components
│   │   ├── Auth           # Authentication components
│   │   │   ├── Login.jsx   # Login form component
│   │   │   └── Signup.jsx  # Signup form component
│   │   ├── Classes        # Classes listing component
│   │   │   └── ClassesList.jsx # Displays available classes
│   │   ├── Bookings       # Bookings management component
│   │   │   └── BookingsPage.jsx # Allows users to view bookings
│   │   ├── User           # User-related components
│   │   │   └── UserIcon.jsx # Displays user icon and links
│   │   └── TimezoneFilter # Timezone selection component
│   ├── App.jsx            # Main application component
│   ├── index.jsx          # Entry point for the React application
│   └── api               # API call functions
│       └── api.js         # Contains API call methods
├── package.json           # npm configuration file
├── .gitignore             # Files and directories to ignore by Git
└── README.md              # Project documentation
```

## Features

1. **User Authentication**: Users can sign up and log in to access the application.
2. **Class Listings**: After logging in, users can view all available classes based on their selected timezone.
3. **Bookings Management**: Users can view their bookings by entering their email address.
4. **Timezone Selection**: Users can filter classes and bookings based on different timezones.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-react-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate to the login or signup page to authenticate.
- After logging in, you can view available classes and manage your bookings.
- Use the timezone filter to adjust the displayed classes and bookings according to your preferred timezone.

## API Endpoints

- **POST /login**: Authenticate user and return a token.
- **POST /signup**: Register a new user.
- **GET /classes**: Retrieve a list of available classes.
- **GET /bookings**: Retrieve bookings for a specific user based on their email.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.# fitness_booking_frontend
# fitness_booking_frontend
# fitness-booking-frontend
