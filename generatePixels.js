function generatePixels(control, print) {
    const CPU_THRESHOLD = 5000; // Soglia di CPU necessaria per generare un pixel

    if (Game.cpu.bucket >= CPU_THRESHOLD && control===true) {
        Game.cpu.generatePixel();
        console.log('Pixel generated.');
    } else if (print) {
        console.log('Not enough CPU to generate a pixel, \n current cpu bucket is: ' + Game.cpu.bucket + '/5000' + '\n consent to generate is: ' + control);
    }
}

module.exports = generatePixels;