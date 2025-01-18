// cart.js

// Initialize cart from localStorage or empty array if none exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Debug log to check if cart is loaded
console.log('Initial cart:', cart);

// Add click event listeners to all buy buttons
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.s-btnn');
    
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const parentRow = this.closest('.row');
            const itemName = parentRow.querySelector('h3').textContent;
            const itemPrice = parseInt(parentRow.querySelector('.price h6').textContent.replace('Rp', ''));
            
            addToCart({
                name: itemName,
                price: itemPrice
            });
        });
    });
});

// Add item to cart
function addToCart(item) {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated:', cart); // Debug log
    
    // Show feedback to user
    alert(`${item.name} added to cart!`);
}