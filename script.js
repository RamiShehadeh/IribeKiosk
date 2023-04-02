document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');

    tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        // Deactivate all buttons and tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Activate the clicked button and its corresponding tab
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// Set the first tab active by default
tabButtons[0].click();
});
