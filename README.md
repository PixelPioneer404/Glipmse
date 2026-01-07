<div align="center">
  <h1>✨ Glimpse</h1>
  <p><strong>Your Personal Visual Discovery & Collection Platform</strong></p>
  <p>Search, explore, and curate stunning photos, videos, and GIFs all in one place.</p>
</div>

---

## 🌟 About

**Glimpse** is a modern, intuitive media discovery application that lets you search and save your favorite visual content from multiple sources. Built with React and powered by real-time API integrations, Glimpse offers a seamless experience for exploring and organizing photos, videos, and GIFs.

## ✨ Features

### 🔍 **Multi-Source Search**
- Search across photos (Unsplash), videos (Pexels), and GIFs (Tenor)
- Real-time search with instant results
- Tab-based navigation for different media types

### 💾 **Smart Collections**
- One-click wishlist/favorite any media
- Persistent storage with localStorage
- View all saved items in a dedicated Collections page
- Synchronized heart icons across all views

### 🎨 **Beautiful UI/UX**
- Clean, modern interface with smooth animations
- Full-screen media viewer with GSAP animations
- Infinite scroll for seamless browsing
- Loading states with Lottie animations
- Responsive grid layouts

### ⚡ **Performance Optimized**
- Centralized data fetching architecture
- Efficient state management with Redux Toolkit
- Automatic synchronization between tabs
- Smart caching and pagination

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Styling & Animation
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP** - Professional-grade animations
- **Lottie** - High-quality vector animations
- **Lucide React** - Beautiful icons
- **RemixIcon** - Icon library

### Data & APIs
- **Axios** - HTTP client for API calls
- **Unsplash API** - High-quality photos
- **Pexels API** - Professional videos
- **Tenor API** - Trending GIFs

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/glimpse.git
   cd glimpse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_UNSPLASH_API_KEY=your_unsplash_api_key
   VITE_PEXELS_API_KEY=your_pexels_api_key
   VITE_TENOR_API_KEY=your_tenor_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── api/              # API integration modules
│   └── mediaApi.js   # Photo, video, GIF API calls
├── components/       # Reusable React components
│   ├── Header.jsx
│   ├── MediaCard.jsx
│   ├── SearchBar.jsx
│   ├── TabLinks.jsx
│   └── ViewImageModal.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Collections.jsx
│   └── NotFound404.jsx
├── tabs/             # Tab view components
│   ├── Photos.jsx
│   ├── Videos.jsx
│   └── Gifs.jsx
├── redux/            # State management
│   ├── store.js
│   └── slices/
│       ├── collections.js
│       ├── serachSlice.js
│       ├── infiniteScrolling.js
│       └── openMediaSlice.js
├── utils/            # Utility functions
│   ├── dataFetcher.js
│   ├── callData.js
│   └── downloadContent.js
├── lottie/           # Animation files
└── assets/           # Static assets
```

## 🎯 Key Features Explained

### Centralized Data Fetching
All API calls are managed through a unified `fetchMediaData()` function that:
- Handles photos, videos, and GIFs uniformly
- Automatically syncs with collection state
- Sets `isAdded` flags based on saved items

### Smart Heart Icon Synchronization
- Heart icons check `collectionArray` directly (not just flags)
- Consistent state across MediaCard and ViewImageModal
- Persists across page refreshes and tab switches

### Infinite Scroll
- Intersection Observer API for efficient loading
- Tab-specific pagination state
- Prevents duplicate requests during loading

## 🎨 Screenshots

*Add your application screenshots here*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rajbeer Saha**

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
