const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database setup
const db = new sqlite3.Database('./ecommerce.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initDatabase();
    }
});

// Initialize database tables
function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        items TEXT NOT NULL, -- JSON string of cart items
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, product_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, product_id)
    )`);
}

// API Routes

// User registration
app.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ error: 'Username or email already exists' });
                    }
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ id: this.lastID, username, email });
            });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user data without password
        const { password_hash, ...userData } = user;
        res.json(userData);
    });
});

// Get user data
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    });
});

// Place order
app.post('/api/orders', (req, res) => {
    const { userId, items, total } = req.body;

    if (!userId || !items || !total) {
        return res.status(400).json({ error: 'User ID, items, and total are required' });
    }

    db.run('INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)',
        [userId, JSON.stringify(items), total],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ id: this.lastID, status: 'pending' });
        });
});

// Get user orders
app.get('/api/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, orders) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        // Parse items JSON
        orders.forEach(order => {
            order.items = JSON.parse(order.items);
        });
        res.json(orders);
    });
});

// Add to wishlist
app.post('/api/wishlist', (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and product ID are required' });
    }

    db.run('INSERT OR IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [userId, productId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Added to wishlist' });
        });
});

// Remove from wishlist
app.delete('/api/wishlist/:userId/:productId', (req, res) => {
    const { userId, productId } = req.params;

    db.run('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Removed from wishlist' });
        });
});

// Get user wishlist
app.get('/api/wishlist/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT product_id FROM wishlist WHERE user_id = ?', [userId], (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(items.map(item => item.product_id));
    });
});

// Add to cart
app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and product ID are required' });
    }

    db.run('INSERT OR REPLACE INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Added to cart' });
        });
});

// Update cart item quantity
app.put('/api/cart/:userId/:productId', (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
        return db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [userId, productId],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json({ message: 'Removed from cart' });
            });
    }

    db.run('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Cart updated' });
        });
});

// Get user cart
app.get('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT product_id, quantity FROM cart WHERE user_id = ?', [userId], (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(items);
    });
});

// Remove from cart
app.delete('/api/cart/:userId/:productId', (req, res) => {
    const { userId, productId } = req.params;

    db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Removed from cart' });
        });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});