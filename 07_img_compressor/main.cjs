/**
 * Algoritmo de compresion y convertidor de imagenes
 * @example image-converter -i test.png -o test.webp -w 85 -h 90 -f webp -q 90 
 * @author gabmart1995
 */
const sea = require('node:sea');

// actualizamos el metodo require para que cambie las
// importaciones ESM a commonJS dentro de la ejecucion 
// del Single Executable Application
if (sea.isSea()) {
    const {createRequire} = require('node:module');
    require = createRequire(__filename);
}

const {existsSync} = require('node:fs');
const path = require('node:path');

const {program} = require('commander');
const {default: chalk} = require('chalk');
const {default: ora} = require('ora');
const sharp = require('sharp');

async function main() {
    program
        .version('0.0.1')
        .description('Convertidor de imágenes desde línea de comandos')
        .requiredOption('-i, --input <path>', 'Ruta de la imagen de entrada')
        .option('-o, --output <path>', 'Ruta de la imagen de salida (opcional)')
        .option('-f, --format <type>', 'Formato de salida (jpeg, png, webp, etc.)', 'jpeg')
        .option('-q, --quality <number>', 'Calidad de la imagen (0-100)', '80')
        .option('-w, --width <number>', 'Ancho de la imagen (opcional)')
        .option('-h, --height <number>', 'Alto de la imagen (opcional)')
        .parse(process.argv);

    /** @type {{
        input: string, 
        output: string | undefined,
        format: string,
        quality: string,
        width: number | undefined,
        height: number | undefined
    }} */
    const values = program.opts();

    // validamos las entradas
    if (!existsSync(values.input)) {
        console.error(chalk.red('Error: el archivo de entrada no existe'));
        process.exit(1);
    }

    if (values.quality < 0 || values.quality > 100) {
        console.error(chalk.red('Error: La calidad debe estar entre 0 y 100'));
        process.exit(1);
    }

    // animacion del spinner y genera el archivo en memoria
    const spinner = ora('Procesando imagen ...').start();
    
    // ejecutamos la conversion
    try {
        let outputPath = values.output;

        // en caso de no incluir una ruta de salida
        if (!outputPath) {
            const fileExtension = path.extname(values.input);
            const baseName = path.basename(values.input, fileExtension);

            // establecemos la ruta donde se ejecuto el comando
            outputPath = path.join(path.dirname(values.input), `${baseName}_converted.${values.format}`);
        }
        
        let imageProcessor = sharp(values.input);
    
        // aplicamos la redimensionamiento si se especifica
        if (values.width || values.height) {
            imageProcessor = imageProcessor.resize({
                width: values.width ? Number.parseInt(values.width) : undefined,
                height: values.height ? Number.parseInt(values.height) : undefined,
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        /** @type {sharp.JpegOptions | sharp.PngOptions | sharp.WebpOptions} */
        const formatOptions = {quality: Number.parseInt(values.quality)};

        // validamos el formato y ejecutamos la conversion
        switch(values.format.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
                await imageProcessor.jpeg(formatOptions).toFile(outputPath); 
                break;
            
            case 'png':
                await imageProcessor.png(formatOptions).toFile(outputPath); 
                break;

            case 'webp':
                await imageProcessor.webp(formatOptions).toFile(outputPath);
                break;

            default:
                throw new Error(`Formato no soportado: ${values.format}`);
        }

        spinner.succeed(chalk.green('Conversion aplicada con éxito!'));
        console.log(chalk.blue('Archivo de salida:'), outputPath);

        // se termina la ejecucion del script
        process.exit(0);

    } catch (error) {
        spinner.fail(chalk.red('Error durante la conversion'));

        console.error(chalk.red(error.message));
        process.exit(1);
    }
}

main()
    .catch(console.error);

