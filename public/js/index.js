// Sample movie data (from tmdb api later)
const sampleMovies = [
    { id: 1, title: "The Godfather", year: 1972, rating: 4.8, poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Parasite", year: 2019, rating: 4.6, poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
    { id: 3, title: "Inception", year: 2010, rating: 4.5, poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg" },
    { id: 4, title: "Pulp Fiction", year: 1994, rating: 4.7, poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
    { id: 5, title: "The Shawshank Redemption", year: 1994, rating: 4.9, poster: "https://m.media-amazon.com/images/I/81ScTKtWJrL._AC_SL1500_.jpg" },
    { id: 6, title: "Spirited Away", year: 2001, rating: 4.6, poster: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { id: 7, title: "The Dark Knight", year: 2008, rating: 4.7, poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg" },
    { id: 8, title: "12 Angry Men", year: 1957, rating: 4.8, poster: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg" }
];

// Function to create a movie card element
function createMovieCard(movie) {
    return `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">
                    <span class="like">💓</span> ${movie.rating}/5
                </div>
            </div>
        </div>
    `;
}

// Function to render movies to the DOM
function renderMovies() {
    const recentlyAdded = document.getElementById('recentlyAdded');
    const popularMovies = document.getElementById('popularMovies');
    const watchlist = document.getElementById('watchlist');
    
    // Clear existing content
    recentlyAdded.innerHTML = '';
    popularMovies.innerHTML = '';
    watchlist.innerHTML = '';
    
    // Add movies to each section (in a real app, these would be different sets)
    sampleMovies.slice(0, 6).forEach(movie => {
        recentlyAdded.innerHTML += createMovieCard(movie);
    });
    
    // Shuffle array for variety
    const shuffled = [...sampleMovies].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 6).forEach(movie => {
        popularMovies.innerHTML += createMovieCard(movie);
    });
    
    sampleMovies.slice(2, 8).forEach(movie => {
        watchlist.innerHTML += createMovieCard(movie);
    });
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    setupThemeToggle();
    
    // would fetch movie data from an API here
    // sample:
    // fetch('/api/movies/recent')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process and render data
    //     });
});