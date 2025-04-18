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

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Track scroll position
    let isAtBottom = true;

    // Auto-scroll to bottom of chat
    function scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
        isAtBottom = true;
        document.getElementById('scrollToBottomBtn').classList.remove('visible');
    }

    // Check scroll position
    function checkScrollPosition() {
        const container = document.getElementById('messagesContainer');
        const btn = document.getElementById('scrollToBottomBtn');
        const threshold = 100; // pixels from bottom
        const { scrollTop, scrollHeight, clientHeight } = container;
        isAtBottom = scrollHeight - (scrollTop + clientHeight) < threshold;
        
        // Show/hide scroll-to-bottom button
        if (isAtBottom) {
            btn.classList.remove('visible');
        } else {
            btn.classList.add('visible');
        }
    }

    // Initialize scroll events
    document.getElementById('messagesContainer').addEventListener('scroll', checkScrollPosition);
    document.getElementById('scrollToBottomBtn').addEventListener('click', scrollToBottom);
    
    // Add sample message (in a real app, this would be API calls)
    function addMessage(text, isUser) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <p>${text}</p>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Handle send button click
    sendButton.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, true);
            userInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addMessage("I'm analyzing your request... Here are some recommendations based on your preferences.", false);
                scrollToBottom();
            }, 1000);
        }
    });
    
    // Handle Enter key (but allow Shift+Enter for new lines)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    // Handle suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            addMessage(chip.textContent, true);
            
            // Simulate bot response
            setTimeout(() => {
                addMessage("Great choice! Let me think about some recommendations for you...", false);
                scrollToBottom();
            }, 1000);
        });
    });
    
    // Handle recommendation buttons
    document.querySelectorAll('.add-to-watchlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieTitle = e.target.closest('.recommendation-info').querySelector('.recommendation-title').textContent;
            alert(`Added "${movieTitle}" to your watchlist`);
        });
    });
    
    document.querySelectorAll('.more-info').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieTitle = e.target.closest('.recommendation-info').querySelector('.recommendation-title').textContent;
            alert(`Showing more info about "${movieTitle}"`);
        });
    });
    
    // Initial scroll to bottom
    scrollToBottom();
});