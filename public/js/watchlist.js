// Status information
const statusInfo = {
    plan_to_watch: { text: "Plan to Watch", color: "#4a6bdf" },
    watching: { text: "Watching", color: "#f39c12" },
    completed: { text: "Completed", color: "#2ecc71" },
    on_hold: { text: "On Hold", color: "#9b59b6" },
    dropped: { text: "Dropped", color: "#e74c3c" }
};

// Sample movie database (will come from tmdb API later in prod)
const movieDatabase = [
    {
        id: 101,
        title: "Dune: Part Two",
        year: 2024,
        poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 102,
        title: "Oppenheimer",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
    },
    {
        id: 103,
        title: "The Creator",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BOTA1NjBjNzUtYTAyYy00YzViLTlmMjItZDFkYzliNWJlZGE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 104,
        title: "Past Lives",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BOTg3ZjYwZjMtMDc3MC00YzFjLThkMDYtNDVmNDYxY2I4ZTUyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 105,
        title: "Barbie",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 106,
        title: "Killers of the Flower Moon",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BMWM3YzM2NGMtYjU0Mi00YjA0LTgyYjQtNDBjYzIyMzdjZDk4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 107,
        title: "The Holdovers",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BZDA2YTY5YjItYzY1Zi00YTk0LThkZDMtOWFkZmI3N2JkOTJlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 108,
        title: "Poor Things",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BNGIyYWMzNjMtNDI3Zi00ZGUzLWIxMmQtZjJiNTJkMTU3NTYxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"
    }
];

// Sample watchlist data
let watchlist = [
    {
        id: 101,
        title: "Dune: Part Two",
        year: 2024,
        poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
        status: "plan_to_watch",
        priority: "high",
        notes: "Can't wait for this sequel!",
        addedDate: "2023-12-15"
    },
    {
        id: 102,
        title: "Oppenheimer",
        year: 2023,
        poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
        status: "completed",
        priority: "medium",
        notes: "Amazing performance by Cillian Murphy",
        addedDate: "2023-07-20"
    }
];

// DOM Elements
const watchlistGrid = document.getElementById('watchlistGrid');
const emptyWatchlist = document.getElementById('emptyWatchlist');
const addMovieModal = document.getElementById('addMovieModal');
const addMovieBtn = document.getElementById('addMovieBtn');
const emptyAddBtn = document.getElementById('emptyAddBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const movieSearch = document.getElementById('movieSearch');
const searchResults = document.getElementById('searchResults');

// Function to render watchlist
function renderWatchlist() {
    watchlistGrid.innerHTML = '';
    
    if (watchlist.length === 0) {
        emptyWatchlist.style.display = 'block';
        return;
    }
    
    emptyWatchlist.style.display = 'none';
    
    watchlist.forEach(movie => {
        const status = statusInfo[movie.status];
        
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.dataset.id = movie.id;
        movieCard.innerHTML = `
            ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title}" class="movie-poster">` : 
              `<div class="movie-poster" style="background-color: #ddd; display: flex; align-items: center; justify-content: center; color: #777;">No Image</div>`}
            <div class="status-badge" style="background-color: ${status.color}">
                ${status.text}
                <div class="status-options">
                    ${Object.entries(statusInfo).map(([key, value]) => `
                        <div class="status-option" data-status="${key}" style="color: ${value.color}">
                            ${value.text}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="movie-actions">
                <button class="action-btn delete-btn" data-id="${movie.id}">🗑️</button>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-year">${movie.year}</div>
            </div>
        `;
        
        watchlistGrid.appendChild(movieCard);
    });
    
    // Add event listeners to status options
    document.querySelectorAll('.status-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(option.closest('.movie-card').dataset.id);
            const newStatus = option.dataset.status;
            updateMovieStatus(movieId, newStatus);
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(btn.dataset.id);
            deleteMovie(movieId);
        });
    });
    
    // Add click event to movie cards
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = parseInt(card.dataset.id);
            // In a real app, this would navigate to movie details
            console.log('View movie details for ID:', movieId);
        });
    });
}

// Function to search movies
function searchMovies(query) {
    if (!query || query.trim() === '') {
        searchResults.innerHTML = '<div class="no-results">Search for movies to add to your watchlist</div>';
        return;
    }
    
    // Show loading state
    searchResults.innerHTML = '<div class="loading">Searching...</div>';
    
    // Simulate API call delay
    setTimeout(() => {
        const searchTerm = query.toLowerCase();
        const results = movieDatabase.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.year.toString().includes(searchTerm)
        ).filter(movie => 
            !watchlist.some(w => w.id === movie.id)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No movies found</div>';
            return;
        }
        
        searchResults.innerHTML = '';
        results.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'search-result-item';
            movieElement.dataset.id = movie.id;
            movieElement.innerHTML = `
                ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title}" class="search-result-poster">` : 
                  '<div class="search-result-poster" style="background-color: #ddd; display: flex; align-items: center; justify-content: center;">No Image</div>'}
                <div class="search-result-info">
                    <div class="search-result-title">${movie.title}</div>
                    <div class="search-result-year">${movie.year}</div>
                </div>
                <button class="btn btn-primary add-btn" data-id="${movie.id}">Add</button>
            `;
            searchResults.appendChild(movieElement);
        });
        
        // Add event listeners to add buttons
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const movieId = parseInt(btn.dataset.id);
                addMovieToWatchlist(movieId);
            });
        });
        
        // Add click event to entire result item
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const movieId = parseInt(item.dataset.id);
                addMovieToWatchlist(movieId);
            });
        });
    }, 500); // Simulate network delay
}

// Function to add movie to watchlist
function addMovieToWatchlist(movieId) {
    const movie = movieDatabase.find(m => m.id === movieId);
    if (!movie) return;
    
    // Add to watchlist with default status
    watchlist.push({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        status: "plan_to_watch",
        priority: "medium",
        addedDate: new Date().toISOString().split('T')[0]
    });
    
    renderWatchlist();
    closeMovieModal();
    
    // would save to backend here later in prod
    // fetch('/api/watchlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         movieId: movie.id,
    //         status: "plan_to_watch",
    //         priority: "medium"
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     watchlist.push(data);
    //     renderWatchlist();
    //     closeMovieModal();
    // });
}

// Function to update movie status
function updateMovieStatus(movieId, newStatus) {
    const movieIndex = watchlist.findIndex(m => m.id === movieId);
    if (movieIndex !== -1) {
        watchlist[movieIndex].status = newStatus;
        renderWatchlist();
        
        // would update the backend here later in prod
        // fetch(`/api/watchlist/${movieId}/status`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ status: newStatus })
        // });
    }
}

// Function to delete movie
function deleteMovie(movieId) {
    if (confirm('Are you sure you want to remove this movie from your watchlist?')) {
        watchlist = watchlist.filter(m => m.id !== movieId);
        renderWatchlist();
        
        // would delete from backend here later in prod
        // fetch(`/api/watchlist/${movieId}`, { method: 'DELETE' })
        // .then(() => {
        //     watchlist = watchlist.filter(m => m.id !== movieId);
        //     renderWatchlist();
        // });
    }
}

// Function to open modal
function openMovieModal() {
    movieSearch.value = '';
    searchResults.innerHTML = '<div class="no-results">Search for movies to add to your watchlist</div>';
    addMovieModal.style.display = 'flex';
    movieSearch.focus();
}

// Function to close modal
function closeMovieModal() {
    addMovieModal.style.display = 'none';
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
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
    renderWatchlist();
    setupThemeToggle();
    
    // Event listeners
    addMovieBtn.addEventListener('click', openMovieModal);
    emptyAddBtn.addEventListener('click', openMovieModal);
    closeModal.addEventListener('click', closeMovieModal);
    cancelBtn.addEventListener('click', closeMovieModal);
    
    // Search input event listener
    movieSearch.addEventListener('input', (e) => {
        searchMovies(e.target.value);
    });
    
    // Close modal when clicking outside
    addMovieModal.addEventListener('click', (e) => {
        if (e.target === addMovieModal) {
            closeMovieModal();
        }
    });
    
    // would fetch watchlist from backend here later in prod
    // fetch('/api/watchlist')
    //     .then(response => response.json())
    //     .then(data => {
    //         watchlist = data;
    //         renderWatchlist();
    //     });
});