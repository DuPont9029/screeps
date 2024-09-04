function generatePixels() {
    const CPU_THRESHOLD = 10000; // Soglia di CPU necessaria per generare un pixel

    if (Game.cpu.bucket >= CPU_THRESHOLD) {
        Game.cpu.generatePixel();
        console.log('Pixel generated. current cpu in cpu bucket: ' + Game.cpu.bucket);
    }
    else {
        console.log('Unable to generate a pixel, \n current cpu bucket is: ' + Game.cpu.bucket + '/10.000');
    }
}

module.exports = generatePixels;