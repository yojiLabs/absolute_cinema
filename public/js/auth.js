document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const formId = this.dataset.tab + 'Form';
            document.getElementById(formId).classList.add('active');
        });
    });

    // Form submissions (would add actual form handling here later)
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login submitted');
        // login logic here
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Signup submitted');
        // signup logic here
    });

    // Set max birthdate to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('signupBirthdate').max = today;
});