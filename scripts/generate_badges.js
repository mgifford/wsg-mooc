const fs = require('fs');
const path = require('path');

const BADGES_DIR = path.join(__dirname, '../assets/badges');

const tracks = [
    { id: 'fed', name: 'Front-end', color: '#2D74DA', text: 'FED' },
    { id: 'uxd', name: 'UX Design', color: '#7E2DDA', text: 'UXD' },
    { id: 'vis', name: 'Visual', color: '#DA2D85', text: 'VIS' },
    { id: 'con', name: 'Content', color: '#2DDA85', text: 'CON' }
];

tracks.forEach(track => {
    // Sustainable SVG: Simple shapes, low precision, text.
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="90" fill="${track.color}" stroke="white" stroke-width="5"/>
  <path d="M100 10 L100 190 M10 100 L190 100" stroke="white" stroke-width="1" opacity="0.2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="40" font-weight="bold" fill="white">${track.text}</text>
  <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="white">${track.name}</text>
  
  <!-- Accessibility -->
  <title>Badge for ${track.name} Track</title>
</svg>`.trim();

    const fileName = `badge-${track.id}.svg`;
    fs.writeFileSync(path.join(BADGES_DIR, fileName), svgContent);
    console.log(`Generated: ${fileName}`);
});
