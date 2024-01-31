const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const upload = multer({ dest: 'uploads/' });


app.post('/api/save', upload.single('image'), (req, res) => {
  const id = req.body.id;
  const settings = JSON.parse(req.body.settings);
  const image = req.file;
  const timestamp = new Date();

  const savedDetails = {
    ...settings, 
    timestamp: timestamp 
  };

  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  const imagePath = path.join(dataDir, `${id}.png`);
  fs.renameSync(image.path, imagePath);

  const settingsPath = path.join(dataDir, `${id}-settings.json`);
  fs.writeFileSync(settingsPath, JSON.stringify(savedDetails, null, 2));

  

  res.status(200).json({ message: 'Image and settings saved', id: id, time: timestamp });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});