// pay.js

import { database, ref, push } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    setupCheckoutButton();
});

// Display cart items (previous code remains the same)
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const checkoutMain = document.querySelector('.checkout-main');
    checkoutMain.innerHTML = '';
    
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'main-product';
        productDiv.innerHTML = `
            <h3>${item.name}</h3>
            <h5>Rp${item.price.toLocaleString()}</h5>
            <h5>Jumlah: ${item.quantity}</h5>
        `;
        checkoutMain.appendChild(productDiv);
    });
    
    updateTotals();
}

// Calculate and update totals
function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11;
    const shipping = 5000;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
}

// Update totals display
function updateTotals() {
    const totals = calculateTotals();
    
    const checkoutPrices = document.querySelector('.checkout-prices');
    checkoutPrices.innerHTML = `
        <h4>Subtotal:</h4>
        <h4>Rp${totals.subtotal.toLocaleString()}</h4>
        <h4>PPN (11%):</h4>
        <h4>Rp${Math.round(totals.tax).toLocaleString()}</h4>
        <h4>Shipping:</h4>
        <h4>Rp${totals.shipping.toLocaleString()}</h4>
    `;
    
    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerHTML = `
        <h2>Total: Rp${Math.round(totals.total).toLocaleString()}</h2>
        <a class="checkout-btn">Checkout</a>
    `;
}

// Setup checkout button handler
function setupCheckoutButton() {
    document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);
}

// Handle checkout process
async function handleCheckout() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const totals = calculateTotals();
        
        // Create order object
        const order = {
            items: cart,
            subtotal: totals.subtotal,
            tax: Math.round(totals.tax),
            shipping: totals.shipping,
            total: Math.round(totals.total),
            orderDate: new Date().toISOString(),
            status: 'pending'
        };

        // Save to Firebase
        const orderRef = ref(database, 'orders');
        await push(orderRef, order);

        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success message
        alert('Order placed successfully!');
        
        // Refresh the display
        displayCartItems();
        
        // Optional: Redirect to homepage or order confirmation page
        // window.location.href = '/';

    } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again.');
    }
}