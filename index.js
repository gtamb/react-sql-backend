const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

//creating backend
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//the MySQL db connection 
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'db_practice345',
    database: 'practice_database'
});

db.connect((err) =>{
    if(err) {
        console.error("Db connection failed: " + err.stack );
        return;
    }
    console.log('Connected to MySQL db.');
});

//API endpoint -> fetch users

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err){
            res.status(500).send(err);
            console.error("Error fetching users: " + err.stack);
        }
        else{
            res.json(results);
        }
    });
});

//API endpoint -> add a new user
app.post('/users', (req, res) => {
    const{name, email} = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            res.status(500).send(err);
            console.error("Error adding user: " + err.stack);
        } else {
            res.json({id: results.insertId, name, email});
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

