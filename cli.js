#! / usr / bin / env nodo
//
const [, , ...args] = process.argv
const yargs = require('yargs');
const { mdLinks } = require('.');

const path = args[0]

const argv = yargs
    .usage("Usage: md-links <path-to-file> [options]")
    .option('validate', {
        alias: 'v',
        description: 'validate links',
        type: 'boolean',
        mode: false
    })
    .option('stats', {
        alias: 's',
        description: 'basic statistics',
        type: 'boolean',
        mode: false
    })
    .help()
    .alias('help', 'h')
    .argv;
if (!path) {
    console.log('se debe ingresar una ruta valida')
} else {
    if (argv.validate) {
        console.log('estoy validando')
        mdLinks(path, { validate: true })
            .then((links) => {
                links.forEach(link => {
                    console.log(link.file, link.link, link.status, link.statusText);
                })
            })

    }
    if (argv.stats) {
        console.log('estoy haciendo estadisticas')
        mdLinks(path)
            .then((data) => {
                const total = ('Total: ' + data.length)
                const uniqueLink = [...new Set(data.map((link) => link.url))]
                const totalUnique = ('Unique: ' + uniqueLink.length)
                console.log(total, totalUnique)
            })
    }
    if (argv.stats && argv.validate) {
        console.log('estoy haciendo estadisticas y validate')
        mdLinks(path, { validate: true })
            .then((data) => {
                const uniqueLink = [...new Set(data.map((link) => link.link))]
                const totalUnique = uniqueLink.length
                const broken = data.filter((link) => link.statusText !== 'OK')
                console.log('Total: ' + data.length, 'Unique: ' + totalUnique, 'Broken: ' + broken.length)
            })
    }
    if (!argv.validate && !argv.stats) {
        console.log('No quiero validar')
        mdLinks(path, { validate: false })
            .then(console.log)
    }
}

