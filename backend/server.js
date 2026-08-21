const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_sederhana'
});

// Endpoint LOGIN (Custom API)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, results) => {
        if (results.length > 0) {
            res.json({ success: true, message: 'Login Berhasil!' });
        } else {
            res.status(401).json({ success: false, message: 'Email atau Password Salah!' });
        }
    });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));