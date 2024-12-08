const https = require('https');
const fs = require('fs');
const path = require('path');

const textureUrls = {
    'sun': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004704/frames/730x730_1x1_30p/sun/sun.jpg',
    'mercury': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/mercury_1k_color.jpg',
    'venus': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004830/venus_atmosphere_1k.jpg',
    'earth': 'https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.200412.3x5400x2700.jpg',
    'mars': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/mars_1k_color.jpg',
    'jupiter': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/jupiter_1k.jpg',
    'saturn': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/saturn_1k.jpg',
    'uranus': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/uranus_1k.jpg',
    'neptune': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/neptune_1k.jpg',
    'pluto': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/pluto_1k.jpg'
};

function downloadTexture(name, url) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, `${name}.jpg`);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${name} texture`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

async function downloadAllTextures() {
    try {
        for (const [name, url] of Object.entries(textureUrls)) {
            await downloadTexture(name, url);
        }
        console.log('All textures downloaded successfully!');
    } catch (error) {
        console.error('Error downloading textures:', error);
    }
}

downloadAllTextures();
