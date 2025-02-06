# Fetch Dog Shelter App

## 🐶 Overview

Fetch Dog Shelter App is a web-based application that helps users find adoptable dogs based on breed, age, and location. Users can browse a list of available dogs, mark favorites, and generate a match with their perfect furry friend.

### 🌐 Live Demo

🔗 [Fetch Dog Shelter App](https://fetch-dog-shelter-app.onrender.com/)

## 💁️ Project Structure

```
src/
 ├── assets/                # Static assets like images
 ├── components/            # Reusable UI components
 │   ├── BreedFilter.js
 │   ├── DogCard.js
 │   ├── DogGrid.js
 │   ├── LogoutButton.js
 │   ├── MatchDisplay.js
 │   ├── PaginationControls.js
 │   ├── SortButtons.js
 ├── pages/                 # Page-level components
 │   ├── Login/
 │   │   ├── index.js
 │   │   ├── Login.css
 │   ├── Search/
 │   │   ├── index.js
 │   │   ├── Search.css
 ├── services/              # API service layer
 │   ├── apiService.js
 ├── App.js                 # Main application file
 ├── index.js               # Entry point
```

## 🚀 Features

- 🔍 **Search Dogs**: Users can filter dogs by breed.
- 💖 **Favorite Dogs**: Users can mark favorite dogs.
- 🎯 **Matchmaking**: The system generates a match based on selected favorites.
- 🔒 **User Authentication**: Simple login with name and email.
- 🔄 **Pagination**: Fetch paginated dog lists.

## 🔧 Tech Stack

- **Frontend**: React.js, React Router
- **UI Components**: Material UI, Styled-Components, Emotion
- **State Management**: React Hooks
- **HTTP Requests**: Axios
- **Toast Notifications**: React-Toastify
- **API**: Fetch Dog Shelter API
- **Hosting**: Render

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fetch-dog-shelter-app.git
   cd fetch-dog-shelter-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## 🎯 Usage

1. Login using your **Name** and **Email**.
2. Browse dogs and filter by breed.
3. Mark your favorites.
4. Click **Generate Match** to find your best match.
5. Logout when you're done!

## 💡 Future Improvements

- 📌 Implement a backend authentication system.
- 📷 Add more images and details for dogs.
- 🐾 Improve matchmaking algorithm.
- 🌎 Enable geolocation-based searches.

## 🤝 Contributing

Contributions are welcome! If you have ideas or find issues, feel free to open an issue or submit a pull request.

## 📄 License

MIT License © 2024 Fetch Dog Shelter App
