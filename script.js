// Advanced Features: Custom Cursor, Particles, Animations
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000); // Show loading for 2 seconds
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-icon, .category-card, .product-card, .wishlist-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        el.addEventListener('mousedown', () => cursor.classList.add('click'));
        el.addEventListener('mouseup', () => cursor.classList.remove('click'));
    });

    // Particle Background
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    // Create particles every 2 seconds
    setInterval(createParticle, 2000);

    // Initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, Math.random() * 2000);
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Magnetic effect for buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Floating Action Button
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.querySelector('.fab-menu');

    if (fabMain && fabMenu) {
        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
            fabMenu.classList.toggle('show');
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabMain.contains(e.target) && !fabMenu.contains(e.target)) {
                fabMain.classList.remove('active');
                fabMenu.classList.remove('show');
            }
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Typing effect for hero text
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
    }
});

// Product Catalog with Images and Categories
const products = [
    // Electronics (4 products)
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2499,
        oldPrice: 3999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        category: "electronics",
        rating: 4.5,
        reviews: 234,
        reviewList: [
            { user: "John D.", rating: 5, comment: "Excellent sound quality!", date: "2024-01-15" },
            { user: "Sarah M.", rating: 4, comment: "Good battery life.", date: "2024-01-10" }
        ]
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 4999,
        oldPrice: 7999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        category: "electronics",
        rating: 4.8,
        reviews: 567,
        reviewList: [
            { user: "Mike R.", rating: 5, comment: "Amazing features!", date: "2024-01-12" }
        ]
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1299,
        oldPrice: 1999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        category: "electronics",
        rating: 4.2,
        reviews: 98,
        reviewList: []
    },
    {
        id: 4,
        name: "Smart Home Speaker",
        price: 3499,
        oldPrice: 4999,
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400",
        category: "electronics",
        rating: 4.7,
        reviews: 423,
        reviewList: [
            { user: "Emma L.", rating: 5, comment: "Great for home automation.", date: "2024-01-08" }
        ]
    },
    // Fashion (4 products)
    {
        id: 5,
        name: "Running Shoes",
        price: 1899,
        oldPrice: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        category: "fashion",
        rating: 4.3,
        reviews: 189,
        reviewList: [
            { user: "Alex K.", rating: 4, comment: "Comfortable for long runs.", date: "2024-01-05" }
        ]
    },
    {
        id: 6,
        name: "Casual T-Shirt",
        price: 599,
        oldPrice: 999,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
        category: "fashion",
        rating: 4.1,
        reviews: 312,
        reviewList: []
    },
    {
        id: 7,
        name: "Denim Jacket",
        price: 2499,
        oldPrice: 3999,
        image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400",
        category: "fashion",
        rating: 4.6,
        reviews: 156,
        reviewList: [
            { user: "Lisa P.", rating: 5, comment: "Perfect fit!", date: "2024-01-03" }
        ]
    },
    {
        id: 8,
        name: "Wrist Watch",
        price: 1899,
        oldPrice: 2999,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
        category: "fashion",
        rating: 4.4,
        reviews: 89,
        reviewList: []
    },
    // Accessories (4 products)
    {
        id: 9,
        name: "Leather Backpack",
        price: 1599,
        oldPrice: 2499,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
        category: "accessories",
        rating: 4.6,
        reviews: 145,
        reviewList: []
    },
    {
        id: 10,
        name: "Designer Sunglasses",
        price: 999,
        oldPrice: 1499,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        category: "accessories",
        rating: 4.4,
        reviews: 76,
        reviewList: []
    },
    {
        id: 11,
        name: "Laptop Bag",
        price: 1299,
        oldPrice: 1999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        category: "accessories",
        rating: 4.5,
        reviews: 112,
        reviewList: []
    },
    {
        id: 12,
        name: "Wireless Mouse",
        price: 799,
        oldPrice: 1299,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        category: "accessories",
        rating: 4.3,
        reviews: 203,
        reviewList: []
    },
    // Home & Living (4 products)
    {
        id: 13,
        name: "Smart Table Lamp",
        price: 1299,
        oldPrice: 1999,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        category: "home",
        rating: 4.5,
        reviews: 89,
        reviewList: []
    },
    {
        id: 14,
        name: "Coffee Mug Set",
        price: 699,
        oldPrice: 999,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
        category: "home",
        rating: 4.2,
        reviews: 156,
        reviewList: []
    },
    {
        id: 15,
        name: "Wall Clock",
        price: 899,
        oldPrice: 1399,
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
        category: "home",
        rating: 4.4,
        reviews: 67,
        reviewList: []
    },
    {
        id: 16,
        name: "Plant Pot Set",
        price: 599,
        oldPrice: 899,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
        category: "home",
        rating: 4.6,
        reviews: 123,
        reviewList: []
    }
];

// User Management
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// API Configuration
const API_BASE = 'http://localhost:3000/api';
let apiAvailable = false;

// Check API availability
async function checkApiAvailability() {
    try {
        const response = await fetch(`${API_BASE}/users/1`, { method: 'GET' });
        apiAvailable = response.status !== 404; // If 404, assume API not running
    } catch (error) {
        apiAvailable = false;
    }
}

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    if (!apiAvailable) return null;
    
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.warn('API request failed:', error);
        return null;
    }
}

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// DOM Elements
const cartCountElements = document.querySelectorAll("#cart-count");
const wishlistCountElements = document.querySelectorAll("#wishlist-count");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Wishlist Count
function updateWishlistCount() {
    const count = wishlist.length;
    wishlistCountElements.forEach(el => {
        el.textContent = count;
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (currentUser && apiAvailable) {
        // Use API
        apiRequest('/cart', {
            method: 'POST',
            body: JSON.stringify({ userId: currentUser.id, productId, quantity: 1 })
        }).then(() => {
            loadUserDataFromApi();
            showToast("Product added to cart!");
        });
    } else {
        // Fallback to localStorage
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1
            });
        }

        updateCartCount();
        showToast("Product added to cart!");
    }
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Add product to cart if not already there
    const existingItem = cart.find(item => item.id === productId);

    if (!existingItem) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
        updateCartCount();
    }

    // Redirect to cart page
    window.location.href = 'cart.html';
}

// Add to Wishlist Function
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = wishlist.find(item => item.id === productId);

    if (existingItem) {
        removeFromWishlist(productId);
        showToast("Removed from wishlist!");
    } else {
        if (currentUser && apiAvailable) {
            // Use API
            apiRequest('/wishlist', {
                method: 'POST',
                body: JSON.stringify({ userId: currentUser.id, productId })
            }).then(() => {
                loadUserDataFromApi();
                showToast("Added to wishlist!");
            });
        } else {
            // Fallback
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            updateWishlistCount();
            showToast("Added to wishlist!");
        }
    }

    // Update the button icon
    const buttons = document.querySelectorAll(`.wishlist-btn[onclick*="addToWishlist(${productId})"]`);
    buttons.forEach(btn => {
        const isInWishlist = wishlist.some(item => item.id === productId);
        btn.classList.toggle('active', isInWishlist);
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
        }
    });
}

// Remove from Wishlist
function removeFromWishlist(productId) {
    if (currentUser && apiAvailable) {
        // Use API
        apiRequest(`/wishlist/${currentUser.id}/${productId}`, {
            method: 'DELETE'
        }).then(() => {
            loadUserDataFromApi();
            showToast("Removed from wishlist!");
        });
    } else {
        // Fallback
        wishlist = wishlist.filter(item => item.id !== productId);
        updateWishlistCount();
        showToast("Removed from wishlist!");
    }
}

// Show Toast Notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add("show"), 10);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show Wishlist Modal
function showWishlist() {
    // Remove existing modal
    const existingModal = document.querySelector(".wishlist-modal");
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement("div");
    modal.className = "wishlist-modal";
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeWishlistModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-heart"></i> My Wishlist</h2>
                <button onclick="closeWishlistModal()" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${wishlist.length === 0 ? 
                    '<div class="empty-wishlist"><i class="far fa-heart"></i><p>Your wishlist is empty</p><p>Add items you love to your wishlist!</p></div>' :
                    wishlist.map(item => `
                        <div class="wishlist-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <p>₹${item.price.toLocaleString('en-IN')}</p>
                            </div>
                            <div class="item-actions">
                                <button onclick="addToCart(${item.id}); closeWishlistModal()" class="btn btn-primary">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                                <button onclick="buyNow(${item.id})" class="btn buy-now-btn">
                                    <i class="fas fa-bolt"></i> Buy Now
                                </button>
                                <button onclick="removeFromWishlist(${item.id}); showWishlist()" class="remove-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => modal.classList.add("show"), 10);
}

// Close Wishlist Modal
function closeWishlistModal() {
    const modal = document.querySelector(".wishlist-modal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

// Show Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Remove existing modal
    const existingModal = document.querySelector(".product-modal");
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.className = "product-modal";
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProductModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.name}</h2>
                <button onclick="closeProductModal()" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="product-detail-grid">
                    <div class="product-image-large">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info-detail">
                        <div class="rating" style="color: #ffc107; font-size: 1.2rem; margin-bottom: 15px;">
                            ${getStarRating(product.rating)}
                            <span style="color: #636e72; margin-left: 10px;">(${product.reviews} reviews)</span>
                        </div>
                        <p class="price" style="font-size: 1.5rem; margin-bottom: 20px;">
                            ₹${product.price.toLocaleString('en-IN')}
                            ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                        </p>
                        <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 20px;">
                            ${product.name} - High quality product from our ${product.category} collection. Perfect for your needs.
                        </p>
                        <div class="product-actions">
                            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal()">Add to Cart</button>
                            <button class="btn buy-now-btn" onclick="buyNow(${product.id})">Buy Now</button>
                            <button class="btn" onclick="addToWishlist(${product.id}); closeProductModal()">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
                <div class="reviews-section">
                    <h3>Customer Reviews</h3>
                    ${product.reviewList.length === 0 ? 
                        '<p>No reviews yet. Be the first to review!</p>' :
                        product.reviewList.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <strong>${review.user}</strong>
                                    <div class="rating">${getStarRating(review.rating)}</div>
                                    <span class="review-date">${review.date}</span>
                                </div>
                                <p>${review.comment}</p>
                            </div>
                        `).join('')
                    }
                    ${currentUser ? `
                        <div class="add-review" style="margin-top: 20px; padding: 20px; background: var(--bg-light); border-radius: 10px;">
                            <h4>Write a Review</h4>
                            <form onsubmit="submitReview(event, ${product.id})">
                                <div style="margin-bottom: 10px;">
                                    <label>Rating:</label>
                                    <select id="review-rating-${product.id}" required>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <textarea id="review-comment-${product.id}" placeholder="Write your review..." rows="3" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
                                <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Submit Review</button>
                            </form>
                        </div>
                    ` : '<p style="margin-top: 20px; color: var(--text-light);">Please login to write a review.</p>'}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add("show"), 10);
}

function closeProductModal() {
    const modal = document.querySelector(".product-modal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

function submitReview(event, productId) {
    event.preventDefault();
    
    if (!currentUser) {
        showToast("Please login to submit a review!");
        return;
    }

    const rating = parseInt(document.getElementById(`review-rating-${productId}`).value);
    const comment = document.getElementById(`review-comment-${productId}`).value;

    const product = products.find(p => p.id === productId);
    if (product) {
        product.reviewList.push({
            user: currentUser.name,
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0]
        });
        product.reviews++;
        // Recalculate average rating
        const totalRating = product.reviewList.reduce((sum, r) => sum + r.rating, 0);
        product.rating = (totalRating / product.reviewList.length).toFixed(1);
        
        showToast("Review submitted successfully!");
        closeProductModal();
        // Re-render products to update ratings
        loadFeaturedProducts();
        loadAllProducts();
    }
}

// User Authentication Functions
function showAuthModal(type = 'login') {
    // Remove existing modal
    const existingModal = document.querySelector(".auth-modal");
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.className = "auth-modal";
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeAuthModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-user"></i> ${type === 'login' ? 'Login' : 'Sign Up'}</h2>
                <button onclick="closeAuthModal()" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <form onsubmit="handleAuth(event, '${type}')">
                    ${type === 'signup' ? `
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                    ` : ''}
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 15px;">
                        ${type === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div style="text-align: center; margin-top: 15px;">
                    ${type === 'login' ? 
                        '<a href="#" onclick="showAuthModal(\'signup\'); return false;">Don\'t have an account? <span style="color: var(--primary-color); font-weight: bold;">Sign Up</span></a>' :
                        '<a href="#" onclick="showAuthModal(\'login\'); return false;">Already have an account? <span style="color: var(--primary-color); font-weight: bold;">Login</span></a>'
                    }
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add("show"), 10);
}

function closeAuthModal() {
    const modal = document.querySelector(".auth-modal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

function handleAuth(event, type) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (type === 'signup') {
        const name = document.getElementById('name').value;
        
        if (apiAvailable) {
            // Use API
            apiRequest('/users/register', {
                method: 'POST',
                body: JSON.stringify({ username: name, email, password })
            }).then(user => {
                if (user) {
                    currentUser = user;
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    migrateLocalDataToApi();
                    showToast("Account created successfully!");
                    closeAuthModal();
                    updateUserUI();
                } else {
                    showToast("Registration failed. Please try again.");
                }
            });
        } else {
            // Fallback to localStorage
            if (users.find(u => u.email === email)) {
                showToast("User already exists!");
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                orders: []
            };
            
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            
            showToast("Account created successfully!");
            closeAuthModal();
            updateUserUI();
        }
        
    } else {
        // Login
        if (apiAvailable) {
            apiRequest('/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            }).then(user => {
                if (user) {
                    currentUser = user;
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    loadUserDataFromApi();
                    showToast("Logged in successfully!");
                    closeAuthModal();
                    updateUserUI();
                } else {
                    // Fallback to localStorage
                    const localUser = users.find(u => u.email === email && u.password === password);
                    if (localUser) {
                        currentUser = localUser;
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        showToast("Logged in successfully!");
                        closeAuthModal();
                        updateUserUI();
                    } else {
                        showToast("Invalid email or password!");
                    }
                }
            });
        } else {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                currentUser = user;
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                showToast("Logged in successfully!");
                closeAuthModal();
                updateUserUI();
            } else {
                showToast("Invalid email or password!");
            }
        }
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateUserUI();
    showToast("Logged out successfully!");
}

// Migrate local data to API
async function migrateLocalDataToApi() {
    if (!apiAvailable || !currentUser) return;
    
    // Migrate cart
    for (const item of cart) {
        await apiRequest('/cart', {
            method: 'POST',
            body: JSON.stringify({ userId: currentUser.id, productId: item.id, quantity: item.qty })
        });
    }
    
    // Migrate wishlist
    for (const item of wishlist) {
        await apiRequest('/wishlist', {
            method: 'POST',
            body: JSON.stringify({ userId: currentUser.id, productId: item.id })
        });
    }
    
    // Clear local data after migration
    cart = [];
    wishlist = [];
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    updateCartCount();
    updateWishlistCount();
}

// Load user data from API
async function loadUserDataFromApi() {
    if (!apiAvailable || !currentUser) return;
    
    // Load cart
    const apiCart = await apiRequest(`/cart/${currentUser.id}`);
    if (apiCart) {
        cart = apiCart.map(item => ({
            id: parseInt(item.product_id),
            qty: item.quantity,
            ...products.find(p => p.id === parseInt(item.product_id))
        })).filter(item => item.name); // Filter out invalid products
    }
    
    // Load wishlist
    const apiWishlist = await apiRequest(`/wishlist/${currentUser.id}`);
    if (apiWishlist) {
        wishlist = apiWishlist.map(productId => 
            products.find(p => p.id === parseInt(productId))
        ).filter(item => item);
    }
    
    updateCartCount();
    updateWishlistCount();
    loadCart();
}

function updateUserUI() {
    const userIcon = document.querySelector('.nav-icon.user-icon');
    if (currentUser) {
        userIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        userIcon.title = `Logged in as ${currentUser.name}`;
        userIcon.onclick = () => showUserMenu();
    } else {
        userIcon.innerHTML = '<i class="far fa-user"></i>';
        userIcon.title = "My Account";
        userIcon.onclick = () => showAuthModal('login');
    }
}

function showUserMenu() {
    // Simple dropdown or modal for user actions
    const menu = document.createElement("div");
    menu.className = "user-menu";
    menu.innerHTML = `
        <div class="user-menu-overlay" onclick="closeUserMenu()"></div>
        <div class="user-menu-content">
            <div class="user-info">
                <h4>${currentUser.name}</h4>
                <p>${currentUser.email}</p>
            </div>
            <div class="user-actions">
                <button onclick="showOrderHistory()">Order History</button>
                <button onclick="logout()">Logout</button>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
    setTimeout(() => menu.classList.add("show"), 10);
}

function closeUserMenu() {
    const menu = document.querySelector(".user-menu");
    if (menu) {
        menu.classList.remove("show");
        setTimeout(() => menu.remove(), 300);
    }
}

function showOrderHistory() {
    closeUserMenu();
    
    if (!currentUser || !currentUser.orders || currentUser.orders.length === 0) {
        showToast("No orders found!");
        return;
    }

    // Create order history modal
    const modal = document.createElement("div");
    modal.className = "order-history-modal";
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeOrderHistoryModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-history"></i> Order History</h2>
                <button onclick="closeOrderHistoryModal()" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${currentUser.orders.map(order => `
                    <div class="order-item">
                        <div class="order-header">
                            <h4>Order #${order.id}</h4>
                            <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                            <span class="order-status">${order.status}</span>
                        </div>
                        <div class="order-items">
                            ${order.items.map(item => `
                                <div class="order-product">
                                    <img src="${item.image}" alt="${item.name}">
                                    <div>
                                        <h5>${item.name}</h5>
                                        <p>Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="order-total">
                            <strong>Total: ₹${order.total.toLocaleString('en-IN')}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => modal.classList.add("show"), 10);
}

function closeOrderHistoryModal() {
    const modal = document.querySelector(".order-history-modal");
    if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

// Render Star Rating
function getStarRating(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Render Products
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productList.map(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        return `
        <div class="product-card">
            <div class="product-image-container" onclick="showProductDetails(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); addToWishlist(${product.id})" title="${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                    <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 onclick="showProductDetails(${product.id})" style="cursor: pointer;">${product.name}</h3>
                <div class="rating" style="color: #ffc107; font-size: 0.9rem; margin-bottom: 10px;">
                    ${getStarRating(product.rating)}
                    <span style="color: #636e72; margin-left: 5px;">(${product.reviews})</span>
                </div>
                <p class="price">
                    ₹${product.price.toLocaleString('en-IN')}
                    ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                </p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="buy-now" onclick="buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// Load Featured Products (4 products - one from each unique category)
function loadFeaturedProducts() {
    // Get featured products from categories (6 products total)
    const categories = ['electronics', 'fashion', 'accessories', 'home'];
    let featuredProducts = [];

    // Add 2 products from electronics and fashion categories
    const priorityCategories = ['electronics', 'fashion'];
    priorityCategories.forEach(category => {
        const categoryProducts = products.filter(p => p.category === category);
        // Add up to 2 products from each priority category
        for (let i = 0; i < Math.min(2, categoryProducts.length); i++) {
            if (!featuredProducts.find(fp => fp.id === categoryProducts[i].id)) {
                featuredProducts.push(categoryProducts[i]);
            }
        }
    });

    // Add 1 product from remaining categories
    const remainingCategories = ['accessories', 'home'];
    remainingCategories.forEach(category => {
        const product = products.find(p => p.category === category);
        if (product && !featuredProducts.find(fp => fp.id === product.id)) {
            featuredProducts.push(product);
        }
    });

    // Limit to 6 products
    featuredProducts = featuredProducts.slice(0, 6);

    renderProducts(featuredProducts, "featured-products");
}

// Filter Products by Category
function filterProducts(category) {
    if (category === 'all') {
        window.location.href = 'products.html';
    } else {
        window.location.href = `products.html?category=${category}`;
    }
}

// Load All Products (for products page) with Pagination
let currentPage = 1;
const productsPerPage = 9;

function loadAllProducts() {
    const container = document.getElementById("product-list");
    const paginationContainer = document.getElementById("pagination");
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    currentPage = parseInt(urlParams.get('page')) || 1;

    // Set active category button
    const categoryButtons = document.querySelectorAll('.category-filter .btn');
    categoryButtons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.style.background = '#ddd';
    });
    if (category) {
        const activeBtn = document.querySelector(`.category-filter .btn[onclick*="filterProducts('${category}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('btn-primary');
            activeBtn.style.background = '';
        }
    } else {
        const allBtn = document.querySelector('.category-filter .btn[onclick*="filterProducts(\'all\')"]');
        if (allBtn) {
            allBtn.classList.add('btn-primary');
            allBtn.style.background = '';
        }
    }

    let filteredProducts = products;
    
    // Filter by search if provided
    if (search) {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
        
        // Update page title to show search results
        const pageTitle = document.querySelector('.section-title');
        if (pageTitle) {
            pageTitle.textContent = `Search Results for "${search}"`;
        }
    }
    
    // Filter by category if provided
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // If pagination containers exist, show paginated products
    if (container) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
        const pageProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Render products for current page
        container.innerHTML = pageProducts.map(product => {
            const isInWishlist = wishlist.some(item => item.id === product.id);
            return `
            <div class="product-card">
                <div class="product-image-container" onclick="showProductDetails(${product.id})" style="cursor: pointer;">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); addToWishlist(${product.id})" title="${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3 onclick="showProductDetails(${product.id})" style="cursor: pointer;">${product.name}</h3>
                    <div class="rating" style="color: #ffc107; font-size: 0.9rem; margin-bottom: 10px;">
                        ${getStarRating(product.rating)}
                        <span style="color: #636e72; margin-left: 5px;">(${product.reviews})</span>
                    </div>
                    <p class="price">
                        ₹${product.price.toLocaleString('en-IN')}
                        ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                    </p>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="buy-now" onclick="buyNow(${product.id})">
                            <i class="fas fa-bolt"></i> Buy Now
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        // Render pagination controls
        if (paginationContainer && totalPages > 1) {
            let paginationHTML = `
                <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 50px; flex-wrap: wrap;">
            `;
            
            // Previous button
            if (currentPage > 1) {
                paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="btn" style="background: var(--primary-color); color: white;">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>`;
            }
            
            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (i === currentPage) {
                    paginationHTML += `<span style="padding: 10px 20px; background: var(--primary-color); color: white; border-radius: 50px;">${i}</span>`;
                } else {
                    paginationHTML += `<button onclick="changePage(${i})" class="btn" style="background: #ddd;">${i}</button>`;
                }
            }
            
            // Next button
            if (currentPage < totalPages) {
                paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="btn" style="background: var(--primary-color); color: white;">
                    Next <i class="fas fa-chevron-right"></i>
                </button>`;
            }
            
            paginationHTML += `</div>`;
            paginationContainer.innerHTML = paginationHTML;
        }
    } else {
        // Fallback for non-paginated pages
        renderProducts(filteredProducts, "product-list");
    }
}

// Change Page
function changePage(page) {
    const urlParams = new URLSearchParams(window.location.search);
    let url = 'products.html?';
    
    if (urlParams.get('category')) {
        url += `category=${urlParams.get('category')}&`;
    }
    if (urlParams.get('search')) {
        url += `search=${urlParams.get('search')}&`;
    }
    
    url += `page=${page}`;
    window.location.href = url;
}

// Get current page from URL
function getCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page')) || 1;
}

// Subscribe Newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    if (email) {
        showToast("Successfully subscribed to newsletter!");
        event.target.reset();
    }
}

// Search Products
function searchProducts(query) {
    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    return searchResults;
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Search Functions
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const searchInput = document.getElementById('navbar-search');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Search Suggestions Functionality
let currentSuggestionIndex = -1;
let suggestions = [];

function handleSearchInput(event) {
    const query = event.target.value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById('search-suggestions');

    if (!suggestionsContainer) return;

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    currentSuggestionIndex = -1;
    suggestions = [];

    if (query.length < 2) {
        suggestionsContainer.classList.remove('show');
        return;
    }

    // Filter products based on query
    const matchingProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 suggestions

    if (matchingProducts.length === 0) {
        suggestionsContainer.innerHTML = '<div class="no-suggestions">No products found</div>';
        suggestionsContainer.classList.add('show');
        return;
    }

    // Create suggestion items
    matchingProducts.forEach((product, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.dataset.index = index;
        suggestionItem.onclick = () => selectSuggestion(product.id);

        suggestionItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="suggestion-image">
            <div class="suggestion-info">
                <h4 class="suggestion-name">${highlightMatch(product.name, query)}</h4>
                <p class="suggestion-price">₹${product.price}</p>
                <p class="suggestion-category">${product.category}</p>
            </div>
        `;

        suggestionsContainer.appendChild(suggestionItem);
        suggestions.push(product);
    });

    suggestionsContainer.classList.add('show');
}

function handleSearchKeydown(event) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const suggestionItems = suggestionsContainer ? suggestionsContainer.querySelectorAll('.suggestion-item') : [];

    if (!suggestionsContainer || !suggestionsContainer.classList.contains('show')) {
        if (event.key === 'Enter') {
            performSearch();
        }
        return;
    }

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, suggestionItems.length - 1);
            updateSuggestionHighlight(suggestionItems);
            break;
        case 'ArrowUp':
            event.preventDefault();
            currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
            updateSuggestionHighlight(suggestionItems);
            break;
        case 'Enter':
            event.preventDefault();
            if (currentSuggestionIndex >= 0 && suggestions[currentSuggestionIndex]) {
                selectSuggestion(suggestions[currentSuggestionIndex].id);
            } else {
                performSearch();
            }
            break;
        case 'Escape':
            hideSuggestions();
            break;
    }
}

function updateSuggestionHighlight(suggestionItems) {
    suggestionItems.forEach((item, index) => {
        if (index === currentSuggestionIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

function selectSuggestion(productId) {
    window.location.href = `products.html?product=${productId}`;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
        currentSuggestionIndex = -1;
        suggestions = [];
    }
}

// Hide suggestions when clicking outside
document.addEventListener('click', (event) => {
    const searchContainer = document.querySelector('.search-container');
    const suggestionsContainer = document.getElementById('search-suggestions');

    if (searchContainer && suggestionsContainer && !searchContainer.contains(event.target)) {
        hideSuggestions();
    }
});

// Load Cart
function loadCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    const emptyCart = document.querySelector(".empty-cart");

    if (cart.length === 0) {
        if (container) container.innerHTML = '';
        if (emptyCart) emptyCart.style.display = "block";
        if (totalEl) totalEl.innerHTML = '';
        return;
    }

    if (emptyCart) emptyCart.style.display = "none";

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item" style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin-right: 20px;">
                <div style="flex: 1;">
                    <h4>${item.name}</h4>
                    <p style="color: #ff6b35; font-weight: bold;">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity(${item.id}, -1)" style="padding: 5px 12px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" style="padding: 5px 12px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">+</button>
                </div>
                <div style="margin-left: 20px; font-weight: bold;">
                    ₹${(item.price * item.qty).toLocaleString('en-IN')}
                </div>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 15px; padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    if (totalEl) {
        totalEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <h3>Total Amount</h3>
                <h3 style="color: #ff6b35;">₹${total.toLocaleString('en-IN')}</h3>
            </div>
            <button onclick="checkout()" class="btn btn-primary" style="width: 100%; margin-top: 20px; padding: 15px; font-size: 1.1rem;">
                Proceed to Checkout
            </button>
        `;
    }
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            loadCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    loadCart();
    showToast("Item removed from cart");
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    if (!currentUser) {
        showToast("Please login to checkout!");
        return;
    }

    // Populate checkout summary
    const summaryEl = document.getElementById("checkout-summary");
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    summaryEl.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (x${item.qty})</span>
            <span>₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        </div>
    `).join('') + `
        <div class="checkout-item checkout-total">
            <span>Total</span>
            <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
    `;

    // Pre-fill user info if available
    if (currentUser) {
        document.getElementById("full-name").value = currentUser.name || '';
        document.getElementById("email").value = currentUser.email || '';
    }

    // Show modal
    document.getElementById("checkout-modal").classList.add("show");
}

// Close Checkout Modal
function closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.remove("show");
}

// Handle Checkout Form Submit
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById("full-name").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                zip: document.getElementById("zip").value,
                state: document.getElementById("state").value,
                country: document.getElementById("country").value,
                cardNumber: document.getElementById("card-number").value,
                expiry: document.getElementById("expiry").value,
                cvv: document.getElementById("cvv").value,
                cardName: document.getElementById("card-name").value
            };

            // Basic validation
            if (!formData.fullName || !formData.email || !formData.address || !formData.cardNumber) {
                showToast("Please fill in all required fields!");
                return;
            }

            // Simulate payment processing
            showToast("Processing payment...");
            
            try {
                const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                
                // Save order to database
                const orderData = {
                    user_id: currentUser.id,
                    items: JSON.stringify(cart),
                    total: total
                };

                const response = await fetch(`${API_BASE}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    showToast("Order placed successfully!");
                    cart = [];
                    updateCartCount();
                    loadCart();
                    closeCheckoutModal();
                } else {
                    showToast("Failed to place order. Please try again.");
                }
            } catch (error) {
                console.error('Checkout error:', error);
                showToast("Payment failed. Please check your connection.");
            }
        });
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
    updateUserUI();
    loadFeaturedProducts();
    loadAllProducts();
    loadCart();

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Handle Checkout Form Submit
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById("full-name").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                zip: document.getElementById("zip").value,
                state: document.getElementById("state").value,
                country: document.getElementById("country").value,
                cardNumber: document.getElementById("card-number").value,
                expiry: document.getElementById("expiry").value,
                cvv: document.getElementById("cvv").value,
                cardName: document.getElementById("card-name").value
            };

            // Basic validation
            if (!formData.fullName || !formData.email || !formData.address || !formData.cardNumber) {
                showToast("Please fill in all required fields!");
                return;
            }

            // Simulate payment processing
            showToast("Processing payment...");
            
            try {
                const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                
                // Save order to database
                const orderData = {
                    user_id: currentUser.id,
                    items: JSON.stringify(cart),
                    total: total
                };

                const response = await fetch(`${API_BASE}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    showToast("Order placed successfully!");
                    cart = [];
                    updateCartCount();
                    loadCart();
                    closeCheckoutModal();
                } else {
                    showToast("Failed to place order. Please try again.");
                }
            } catch (error) {
                console.error('Checkout error:', error);
                showToast("Payment failed. Please check your connection.");
            }
        });
    }

    // 3D Animations for product cards
    const productCards = document.querySelectorAll('.product-card');

    // Scroll animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        observer.observe(card);

        // Flip animation on mouse enter
        card.addEventListener('mouseenter', () => {
            card.classList.add('flip');
        });

        card.addEventListener('animationend', () => {
            card.classList.remove('flip');
        });
    });
});

