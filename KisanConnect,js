document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Language selector functionality
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        // In a real application, this is where you'd implement language switching
        console.log(`Language changed to: ${selectedLanguage}`);
        alert(`Language changed to: ${selectedLanguage}. This feature is not fully implemented in this demo.`);
    });

    // Add click event listeners to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText === 'Call to Register') {
                alert('Calling to register... This is a demo. In a real application, this would initiate a phone call.');
            } else if (buttonText === 'Join Community') {
                alert('Joining community... This is a demo. In a real application, this would add you to the selected community.');
            } else if (buttonText.includes('1800-KISAN-HELP')) {
                alert('Calling helpline... This is a demo. In a real application, this would initiate a phone call to the helpline.');
            }
        });
    });
});