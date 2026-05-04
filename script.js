// Sample Products Data
const products = [
    {
        id: 1,
        name: "Smartphone Pro",
        price: "$899",
        emoji: "📱",
        description: "Latest smartphone with AR capabilities"
    },
    {
        id: 2,
        name: "Gaming Laptop",
        price: "$1,299",
        emoji: "💻",
        description: "High-performance laptop for gaming and work"
    },
    {
        id: 3,
        name: "Wireless Speaker",
        price: "$199",
        emoji: "🔊",
        description: "Premium sound quality with AR placement"
    },
    {
        id: 4,
        name: "AR Headphones",
        price: "$349",
        emoji: "🎧",
        description: "Immersive audio with augmented reality features"
    },
    {
        id: 5,
        name: "Tablet Pro",
        price: "$649",
        emoji: "📱",
        description: "Versatile tablet for work and entertainment"
    },
    {
        id: 6,
        name: "Smart Watch",
        price: "$399",
        emoji: "⌚",
        description: "Stay connected with AR notifications"
    }
];

let cart = [];
let currentSelectedProduct = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCart();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-description">${product.description}</div>
                <button class="view-ar-btn" onclick="selectProductForAR(${product.id})">View in AR</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Select a product for AR view
function selectProductForAR(productId) {
    const product = products.find(p => p.id === productId);
    currentSelectedProduct = product;
    
    // Update the AR viewport
    const arViewport = document.getElementById('arViewport');
    arViewport.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">${product.emoji}</div>
            <h3 style="margin-bottom: 0.5rem; color: #111827;">${product.name}</h3>
            <p style="color: #6b7280; margin-bottom: 1rem;">${product.description}</p>
            <p style="color: #6366f1; font-weight: bold; font-size: 1.3rem;">${product.price}</p>
        </div>
    `;
    
    document.getElementById('ar-section').scrollIntoView({ behavior: 'smooth' });
    
    console.log('Product selected for AR:', product);
}

function startAR() {
    if (!currentSelectedProduct) {
        alert('Please select a product first');
        return;
    }
    
    const arViewport = document.getElementById('arViewport');
    arViewport.innerHTML = `
        <div style="text-align: center; animation: pulse 2s infinite;">
            <p style="font-size: 1.2rem; color: #6366f1; font-weight: bold; margin-bottom: 1rem;">🎬 AR Preview Active</p>
            <div style="font-size: 5rem; margin: 2rem 0;">${currentSelectedProduct.emoji}</div>
            <p style="color: #6b7280;">Rotate, zoom, and position the product in your space</p>
            <p style="color: #6b7280; margin-top: 1rem; font-size: 0.9rem;">
                ← → Rotate | + - Zoom | ↑ ↓ Position
            </p>
        </div>
    `;
    
    alert(`AR Preview Started for ${currentSelectedProduct.name}!\n\nUse your mouse to interact:\n- Click and drag to rotate\n- Scroll to zoom\n- Arrow keys to position`);
}
function resetAR() {
    if (!currentSelectedProduct) {
        alert('Please select a product first');
        return;
    }
    
    const arViewport = document.getElementById('arViewport');
    arViewport.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">${currentSelectedProduct.emoji}</div>
            <h3 style="margin-bottom: 0.5rem; color: #111827;">${currentSelectedProduct.name}</h3>
            <p style="color: #6b7280; margin-bottom: 1rem;">${currentSelectedProduct.description}</p>
            <p style="color: #6366f1; font-weight: bold; font-size: 1.3rem;">${currentSelectedProduct.price}</p>
        </div>
    `;
    
    console.log('AR view reset');
}

function addToCart() {
    if (!currentSelectedProduct) {
        alert('Please select a product first');
        return;
    }
    
    const existingItem = cart.find(item => item.id === currentSelectedProduct.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...currentSelectedProduct,
            quantity: 1
        });
    }
    
    saveCart();
    alert(`${currentSelectedProduct.name} added to cart!`);
    console.log('Cart updated:', cart);
}

function saveCart() {
    localStorage.setItem('arshop-cart', JSON.stringify(cart));
    updateCartCount();
}

function loadCart() {
    const savedCart = localStorage.getItem('arshop-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.textContent = `🛒 Cart (${totalItems})`;
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.children[0].value;
    const email = form.children[1].value;
    const message = form.children[2].value;
    
    console.log('Contact form submitted:', { name, email, message });
    
    alert(`Thank you for contacting us, ${name}! We'll get back to you soon.`);
    
    form.reset();
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        console.log('Escape pressed - could close AR view or modal');
    }
    
    if (event.key === 'Enter' && event.ctrlKey) {
        console.log('Ctrl+Enter pressed');
    }
});

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    
    const hero = document.querySelector('.hero');
    if (hero && scrollTop < hero.offsetHeight) {
        hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
    }
});

// Lo
console.log('ARShop loaded successfully!');
console.log('Available products:', products);
