const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressLogo() {
  const logoPath = path.join(__dirname, 'public', 'logo_transparent.png');
  const tempPath = path.join(__dirname, 'public', 'logo_temp.png');
  
  if (fs.existsSync(logoPath)) {
    console.log('Compressing logo...');
    await sharp(logoPath)
      .resize({ width: 300, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(tempPath);
      
    fs.renameSync(tempPath, logoPath);
    console.log('Logo compressed successfully!');
  } else {
    console.log('Logo not found at ' + logoPath);
  }
}

compressLogo().catch(console.error);
