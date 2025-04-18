// Sample data for user reviews (will use tmdb api later in prod)
const userReviews = [
    {
        id: 1,
        movie: {
            id: 3,
            title: "Inception",
            year: 2010,
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
        },
        rating: 5,
        content: "Christopher Nolan's masterpiece that blurs the line between dreams and reality. The visual effects are stunning, and the concept is mind-bending. DiCaprio delivers one of his best performances. The ending still has me debating with friends years later.",
        date: "2023-05-15",
        likes: 128,
        isFeatured: true
    },
    {
        id: 2,
        movie: {
            id: 7,
            title: "The Dark Knight",
            year: 2008,
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        },
        rating: 4.5,
        content: "Heath Ledger's Joker is one of the greatest performances in cinema history. The movie redefined what a superhero film could be - dark, complex, and philosophical. The pacing is perfect, and the action sequences are breathtaking.",
        date: "2023-04-22",
        likes: 245,
        isFeatured: true
    },
    {
        id: 3,
        movie: {
            id: 1,
            title: "The Godfather",
            year: 1972,
            poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
        },
        rating: 5,
        content: "The epitome of cinematic perfection. Brando and Pacino deliver legendary performances. The wedding scene alone is a masterclass in storytelling. This is one of those rare films that actually deserves all the hype it gets.",
        date: "2023-03-10",
        likes: 312,
        isFeatured: true
    },
    {
        id: 4,
        movie: {
            id: 8,
            title: "12 Angry Men",
            year: 1957,
            poster: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg"
        },
        rating: 4,
        content: "A brilliant study of human nature and prejudice. The confined setting creates incredible tension. Henry Fonda is superb as the voice of reason. The black-and-white cinematography adds to the stark realism.",
        date: "2023-02-18",
        likes: 87,
        isFeatured: false
    },
    {
        id: 5,
        movie: {
            id: 2,
            title: "Parasite",
            year: 2019,
            poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
        },
        rating: 4.5,
        content: "Bong Joon-ho's genre-defying masterpiece. The tonal shifts are handled brilliantly, and the social commentary is razor-sharp. That basement scene will haunt me forever. Deserved every Oscar it won.",
        date: "2023-01-05",
        likes: 176,
        isFeatured: true
    }
];

// Function to create a review card element
function createReviewCard(review) {
    return `
        <div class="review-card" data-id="${review.id}" data-rating="${review.rating}" data-date="${review.date}" data-likes="${review.likes}">
            <div class="review-header">
                <div class="review-movie">
                    <img src="${review.movie.poster}" alt="${review.movie.title}" class="review-movie-poster">
                    <div class="review-movie-info">
                        <div class="review-movie-title">${review.movie.title}</div>
                        <div class="review-movie-year">${review.movie.year}</div>
                    </div>
                </div>
            </div>
            <div class="review-rating">
                <span class="like">💓</span> ${review.rating}/5
                ${review.isFeatured ? '<span style="margin-left: 1rem; color: var(--accent-color); font-size: 0.8rem;">★ Featured</span>' : ''}
            </div>
            <div class="review-content">
                ${review.content}
            </div>
            <div class="review-date">
                ${new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div class="review-actions">
                <div class="review-action">
                    <span class="review-action-icon">👍</span>
                    <span>${review.likes}</span>
                </div>
                <div class="review-action">
                    <span class="review-action-icon">💬</span>
                    <span>24</span>
                </div>
                <div class="review-action">
                    <span class="review-action-icon">✏️</span>
                    <span>Edit</span>
                </div>
            </div>
        </div>
    `;
}

// Function to render reviews
function renderReviews(reviews = userReviews) {
    const reviewsContainer = document.getElementById('reviewsList');
    const emptyState = document.getElementById('emptyReviews');

    if (reviews.length > 0) {
        reviewsContainer.innerHTML = reviews.map(createReviewCard).join('');
        emptyState.style.display = 'none';
    } else {
        reviewsContainer.innerHTML = '';
        emptyState.style.display = 'block';
    }
}

// Function to filter reviews
function filterReviews() {
    const sortBy = document.getElementById('sortBy').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;

    let filteredReviews = [...userReviews];

    // Apply rating filter
    if (ratingFilter !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            Math.floor(review.rating) === parseInt(ratingFilter)
        );
    }

    // Apply year filter
    if (yearFilter !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            new Date(review.date).getFullYear() === parseInt(yearFilter)
        );
    }

    // Apply sorting
    switch (sortBy) {
        case 'newest':
            filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'highest':
            filteredReviews.sort((a, b) => b.rating - a.rating);
            break;
        case 'lowest':
            filteredReviews.sort((a, b) => a.rating - b.rating);
            break;
        case 'popular':
            filteredReviews.sort((a, b) => b.likes - a.likes);
            break;
    }

    renderReviews(filteredReviews);
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
    renderReviews();
    setupThemeToggle();

    // Set up filter event listeners
    document.getElementById('sortBy').addEventListener('change', filterReviews);
    document.getElementById('ratingFilter').addEventListener('change', filterReviews);
    document.getElementById('yearFilter').addEventListener('change', filterReviews);

    // would fetch user reviews from an API here
    // sample:
    // fetch('/api/users/me/reviews')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process and render reviews
    //     });
});