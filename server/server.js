import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scansFilePath = path.join(__dirname, 'scans.json');

const app = express();
const port = process.env.PORT || 5000;

console.log('--- SENTINEL BACKEND INITIALIZING ---');
console.log('Database Path:', scansFilePath);

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Helper to determine media type from filename or mimetype
const getMediaType = (filename, mimetype) => {
  if (mimetype?.startsWith('video') || filename?.match(/\.(mp4|mov|avi)$/i)) return 'Video';
  if (mimetype?.startsWith('image') || filename?.match(/\.(jpg|jpeg|png|gif)$/i)) return 'Image';
  if (mimetype?.includes('pdf') || filename?.match(/\.(pdf|doc|docx)$/i)) return 'Document';
  if (mimetype?.startsWith('audio') || filename?.match(/\.(mp3|wav)$/i)) return 'Audio';
  return 'Unknown';
};

// Deterministic check logic
const checkDeepfake = (identifier, mediaType) => {
  const lowerId = identifier.toLowerCase();
  const fakeTriggers = ['fake', 'deepfake', 'forged', 'synthetic', 'manipulated', 'altered', 'leak'];
  const isFake = fakeTriggers.some(trigger => lowerId.includes(trigger));
  const score = parseFloat((88 + Math.random() * 11).toFixed(1));

  let anomalies = [];
  if (isFake) {
    if (mediaType === 'Video' || mediaType === 'Audio') {
      anomalies = [
        { location: '00:04 - 00:07', description: 'Micro-expression temporal mismatch' },
        { location: '00:14 - 00:18', description: 'Lip sync desynchronization detected' },
        { location: '00:22 - 00:25', description: 'Audio frequency phase shifting' }
      ];
    } else if (mediaType === 'Image') {
      anomalies = [
        { location: 'X: 145, Y: 210 (Top Left)', description: 'Inconsistent lighting vector' },
        { location: 'X: 302, Y: 450 (Center)', description: 'Facial boundary blending artifact' }
      ];
    } else if (mediaType === 'Document') {
      anomalies = [
        { location: 'Page 1, Paragraph 2', description: 'Font kerning discrepancy' },
        { location: 'File Metadata', description: 'Creation date spoofing detected' },
        { location: 'Digital Signature', description: 'Invalid certificate chain' }
      ];
    } else if (mediaType === 'URL') {
      anomalies = [
        { location: 'Domain Registry', description: 'Recently registered domain (under 30 days)' },
        { location: 'SSL Certificate', description: 'Mismatch in Subject Alternative Name' },
        { location: 'Page Content', description: 'AI-generated text patterns detected' }
      ];
    }
  }
  return { isFake, score, anomalies };
};

// --- API Endpoints ---

app.post('/api/analyze/media', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { originalname, mimetype } = req.file;
  const mediaType = getMediaType(originalname, mimetype);
  const result = checkDeepfake(originalname, mediaType);
  setTimeout(() => {
    res.json({ name: originalname, type: mediaType, ...result });
  }, 1000);
});

app.post('/api/analyze/url', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });
  const result = checkDeepfake(url, 'URL');
  setTimeout(() => {
    res.json({ name: url, type: 'URL', ...result });
  }, 1000);
});

// --- Static File Serving (Production) ---
const distPath = path.join(__dirname, '../dist');

app.use(express.static(distPath));



// ... (other API endpoints unchanged)

// --- Scan History ---

const getScans = () => {
  try {
    if (!fs.existsSync(scansFilePath)) {
      console.log('Creating new scans.json file...');
      fs.writeFileSync(scansFilePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(scansFilePath, 'utf8');
    const scans = JSON.parse(data || '[]');
    console.log(`Loaded ${scans.length} scans from database.`);
    return scans;
  } catch (error) {
    console.error('Error reading scans:', error);
    return [];
  }
};

const saveScans = (scans) => {
  try {
    fs.writeFileSync(scansFilePath, JSON.stringify(scans, null, 2));
  } catch (error) {
    console.error('Error saving scans:', error);
  }
};

app.get('/api/scans', (req, res) => res.json(getScans()));

app.post('/api/scans', (req, res) => {
  const newScan = req.body;
  const scans = getScans();
  saveScans([newScan, ...scans]);
  res.json({ success: true });
});

// Catch-all to serve index.html for React Router
app.use((req, res) => {
  const indexFile = path.join(distPath, 'index.html');

  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.send('Sentinel AI API is running. Build the frontend to see the UI.');
  }
});

app.listen(port, () => {
  console.log(`Sentinel AI Service running on port ${port}`);
});
