const fs = require('fs');
const { execSync } = require('child_process');

try {
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
  const sharp = require('sharp');

  sharp('public/logo_transparent.png')
    .webp({ quality: 80 })
    .toFile('public/logo_transparent.webp')
    .then(info => {
      console.log('Successfully converted to webp:', info);
    })
    .catch(err => {
      console.error('Error converting:', err);
    });
} catch (e) {
  console.error(e);
}
