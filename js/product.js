// Toggle view options
document.querySelectorAll('.view-options button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.view-options button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        
        // Toggle between grid and list view
        const propertyGrid = document.querySelector('.property-grid');
        if (button.querySelector('.fa-list')) {
            propertyGrid.style.gridTemplateColumns = '1fr';
        } else {
            propertyGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    });
});

// Filter functionality
document.querySelectorAll('.filter-option input').forEach(input => {
    input.addEventListener('change', () => {
        // Filter implementation would go here
        console.log('Filter changed:', input.id, input.checked);
    });
});