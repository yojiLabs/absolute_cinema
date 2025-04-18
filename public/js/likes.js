// Sample data for liked movies and reviews (from tmdb api later in prod)
const likedMovies = [
    { id: 1, title: "The Godfather", year: 1972, rating: 4.8, poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Parasite", year: 2019, rating: 4.6, poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
    { id: 5, title: "The Shawshank Redemption", year: 1994, rating: 4.9, poster: "https://m.media-amazon.com/images/I/81ScTKtWJrL._AC_SL1500_.jpg" }
];

const likedReviews = [
    {
        id: 1,
        movie: {
            id: 3,
            title: "Inception",
            year: 2010,
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
        },
        user: {
            id: 42,
            name: "FilmCritic101",
            avatar: "FC"
        },
        rating: 5,
        content: "Christopher Nolan's masterpiece that blurs the line between dreams and reality. The visual effects are stunning, and the concept is mind-bending. DiCaprio delivers one of his best performances.",
        date: "2023-05-15",
        likes: 128,
        isLiked: true
    },
    {
        id: 2,
        movie: {
            id: 7,
            title: "The Dark Knight",
            year: 2008,
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        },
        user: {
            id: 87,
            name: "CinemaLover",
            avatar: "CL"
        },
        rating: 4.5,
        content: "Heath Ledger's Joker is one of the greatest performances in cinema history. The movie redefined what a superhero film could be - dark, complex, and philosophical.",
        date: "2023-04-22",
        likes: 245,
        isLiked: true
    }
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

// Function to create a review card element
function createReviewCard(review) {
    return `
        <div class="review-card" data-id="${review.id}">
            <div class="review-header">
                <div class="review-movie">
                    <img src="${review.movie.poster}" alt="${review.movie.title}" class="review-movie-poster">
                    <div class="review-movie-info">
                        <div class="review-movie-title">${review.movie.title}</div>
                        <div class="review-movie-year">${review.movie.year}</div>
                    </div>
                </div>
                <div class="review-user">
                    <div class="review-user-avatar" style="background-color: ${getRandomColor()}">
                        ${review.user.avatar}
                    </div>
                    <div class="review-user-name">${review.user.name}</div>
                </div>
            </div>
            <div class="review-rating">
                <span class="like">💓</span> ${review.rating}/5
            </div>
            <div class="review-content">
                ${review.content}
            </div>
            <div class="review-date">
                ${new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div class="review-actions">
                <div class="review-like active">
                    <span class="like">💓</span>
                    <span class="review-like-count">${review.likes}</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to generate random colors for avatars
function getRandomColor() {
    const colors = ['#e53935', '#8e24aa', '#3949ab', '#039be5', '#00897b', '#7cb342', '#fdd835', '#fb8c00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to render liked content
function renderLikedContent() {
    const likedMoviesContainer = document.getElementById('likedMovies');
    const emptyMoviesState = document.getElementById('emptyMovies');
    const likedReviewsContainer = document.getElementById('likedReviews');
    const emptyReviewsState = document.getElementById('emptyReviews');

    // Render liked movies
    if (likedMovies.length > 0) {
        likedMoviesContainer.innerHTML = likedMovies.map(createMovieCard).join('');
        emptyMoviesState.style.display = 'none';
    } else {
        likedMoviesContainer.innerHTML = '';
        emptyMoviesState.style.display = 'block';
    }

    // Render liked reviews
    if (likedReviews.length > 0) {
        likedReviewsContainer.innerHTML = likedReviews.map(createReviewCard).join('');
        emptyReviewsState.style.display = 'none';
    } else {
        likedReviewsContainer.innerHTML = '';
        emptyReviewsState.style.display = 'block';
    }
}

// Tab switching functionality
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show the corresponding content
            if (tab.dataset.tab === 'movies') {
                document.getElementById('movies-tab').style.display = 'block';
                document.getElementById('reviews-tab').style.display = 'none';
            } else {
                document.getElementById('movies-tab').style.display = 'none';
                document.getElementById('reviews-tab').style.display = 'block';
            }
        });
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
    renderLikedContent();
    setupTabs();
    setupThemeToggle();
    
    // would fetch liked content from an API here
    // sample:
    // fetch('/api/likes/movies')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process and render liked movies
    //     });
    
    // fetch('/api/likes/reviews')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process and render liked reviews
    //     });
});