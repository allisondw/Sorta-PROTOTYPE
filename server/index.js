const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');

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

const upload = multer({ dest: 'uploads/' });


const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

app.post('/api/save', upload.single('image'), (req, res) => {
  const id = req.body.id;
  const settings = JSON.parse(req.body.settings);
  const image = req.file;
  const timestamp = new Date();

  const savedDetails = {
    ...settings, 
    timestamp: timestamp 
  };
  
  const imagePath = path.join(dataDir, `${id}.png`);
  fs.renameSync(image.path, imagePath);

  const settingsPath = path.join(dataDir, `${id}-settings.json`);
  fs.writeFileSync(settingsPath, JSON.stringify(savedDetails, null, 2));

  res.status(200).json({ message: 'Image and settings saved', id: id, time: timestamp });
});


app.get('/api/gallery', (req, res) => {
    try {
        const files = fs.readdirSync(dataDir);
        const images = files.filter(file => file.endsWith('.png')).map(file => {
            return {
                id: path.basename(file, '.png'),
                imageUrl: `/data/${file}`, 
            };
        });
        res.json(images);
    } catch (error) {
        console.error("Error in /api/gallery:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/settings/:id', (req, res) => {
    const settingsPath = path.join(dataDir, `${req.params.id}-settings.json`);
    if (fs.existsSync(settingsPath)) {
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        res.json(settings);
    } else {
        res.status(404).send('Settings not found');
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});