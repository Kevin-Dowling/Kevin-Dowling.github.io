document.addEventListener('DOMContentLoaded', () => {
    const tvContainer = document.getElementById('tv-container');
    for (let i = 0; i < 10; i++) { // Example for 10 TVs
        let tv = document.createElement('div');
        tv.className = 'tv';
        // Set background or content for the TV
        tvContainer.appendChild(tv);
    }
});
