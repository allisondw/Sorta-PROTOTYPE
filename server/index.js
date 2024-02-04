const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');
const db = require('./database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/data', express.static(path.join(__dirname, 'data')), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    next();
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './data');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

app.post('/api/save', upload.single('image'), async (req, res) => {
    const { sortingThreshold, colorChannel, sortingDirection, dimensions } = JSON.parse(req.body.settings);
    const imageUrl = `/data/${req.file.filename}`; 
    const id = req.body.id;

    const dimensionsValue = JSON.stringify(dimensions);

    try {
      const query = `
        INSERT INTO image_settings (id, imageUrl, sortingThreshold, colorChannel, sortingDirection, dimensions)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await db.execute(query, [id, imageUrl, sortingThreshold, colorChannel, sortingDirection, dimensionsValue]);

      res.status(200).json({ message: 'Image and settings saved', id: id, imageUrl, dimensionsValue });
    } catch (error) {
      console.error('Error saving image and settings:', error);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/api/gallery', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT id, imageUrl FROM image_settings');
      res.json(rows);
    } catch (error) {
      console.error("Error in /api/gallery:", error);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/api/details/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await db.execute('SELECT * FROM image_settings WHERE id = ?', [id]);
  
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).send('Settings not found');
      }
    } catch (error) {
      console.error("Error in /api/details/:id:", error);
      res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const [rows] = await db.execute('SELECT imageUrl FROM image_settings WHERE id = ?', [id]);
        if (rows.length > 0) {
            const imageUrl = rows[0].imageUrl;
            const filePath = path.join(__dirname, imageUrl);
            fs.unlinkSync(filePath);

            await db.execute('DELETE FROM image_settings WHERE id = ?', [id]);

            res.send({ message: 'Image and settings deleted successfully' });
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error("Error deleting image and settings:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/register', async (req, res) => {
    const { firstName, email, password } = req.body;
    const [users] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
        return res.status(409).send('Email already in use');
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    try {
        await db.execute('INSERT INTO users(firstName, email, passwordHash) VALUES (?, ?, ?)', [firstName, email, passwordHash]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering new user: ', error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});