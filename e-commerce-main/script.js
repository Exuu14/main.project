// Sample product data
const products = [
    {
        id: 1,
        name: "Baggy Jeans",
        price: 23,
        image: "images/model1.jpg",

    },
    {
        id: 2,
        name: " baggy Jeans",
        price: 14.99,
        image: "images/Ripped.jpg",
    },
    {
        id: 3,
        name: "Strap shirt",
        price: 10,
        image : "images/model3.jpg",
    },
    {
        id: 4,
        name: "Gray shirt",
        price: 3.99,
        image :"images/model4a.jpg",
    },
    {
        id: 5,
        name: "Hoddie",
        price: 7,
        image :"images/hoodie.jpg",
       },  
       
     {
        id: 6,
        name: "Plain  black shirt",
        price: 2,
        image : "images/gongyo.jpg",
       },

       {
        id: 7,
        name: "Sando",
        price: 4.99,
        image :"images/cha.jpg",
       },  
       {
        id: 8,
        name: "wind breaker",
        price: 7.35,
        image :"images/parkbogum.jpg",
       },  
       
       
];

// Shopping cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartIcon = document.querySelector('.cart-icon');
const closeCartBtn = document.querySelector('.close-cart');

// Display products
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showCart();
}

// Remove from cart functionality
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity functionality
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

// Update cart display
function updateCart() {
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);
}

// Show/hide cart sidebar
function showCart() {
    cartSidebar.classList.add('active');
}

function hideCart() {
    cartSidebar.classList.remove('active');
}

// Event listeners
cartIcon.addEventListener('click', showCart);
closeCartBtn.addEventListener('click', hideCart);

// Close cart when clicking outside
document.addEventListener('inactive', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        hideCart();
    }
});

// Initialize the page
displayProducts();
updateCart(); 

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
            // Slider functionality
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dot');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            let currentSlide = 0;
            
            // Function to update the slider
            function updateSlider() {
                // Remove active class from all slides and dots
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Add active class to current slide and dot
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            // Next button click event
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            });
            
            // Previous button click event
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
            });
            
            // Dot click events
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentSlide = index;
                    updateSlider();
                });
            });
            
            // Auto-play slider
            setInterval(function() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }, 3000); // Change slide every 5 seconds
        });
        
 document.querySelector('.check-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert('Thank you for your purchase! Total: ₱' + cartTotal.toLocaleString());
  cart = [];
  updateCartDisplay();
  updateCounter();
  cartTab.classList.remove('active');
  overlay.classList.remove('active');
});

cartTab.addEventListener('click', () => {
  cartTab.classList.toggle('active');
  overlay.classList.toggle('active');
});
// Checkout button click event
checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert('Thank you for your purchase! Total: $' + totalAmount.toFixed(2));
    
    // Clear the cart
    cart = [];
    updateCart();
});
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert('Thank you for your purchase! Total: $' + totalAmount.toFixed(2));
    
    // Clear the cart
    cart = [];
    updateCart();
}
    alert('Thank you for your purchase!');
    cart = []; 
    updateCart();
;