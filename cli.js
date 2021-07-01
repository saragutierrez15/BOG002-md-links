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
    console.log('enter a route')
} else {
    if (argv.stats && argv.validate) {       
        mdLinks(path, { validate: true })       
            .then((data) => { 
                const total = data.length               
                const uniqueLink = [...new Set(data.map((link) => link.link))]
                const Unique = uniqueLink.length
                const searchbroken = data.filter((link) => link.statusText !== 'OK')
                const broken = searchbroken.length
                console.table({total, Unique, broken})
            })
    } else 
    if (argv.validate) {        
        mdLinks(path, { validate: true })
            .then((links) => {
                links.forEach(link => {
                    console.log(link.file, link.link, link.status, link.statusText);
                })
            })
    } else
    if (argv.stats) {       
        mdLinks(path)
            .then((data) => {
                const total = (data.length)
                const uniqueLink = [...new Set(data.map((link) => link.url))]
                const Unique = (uniqueLink.length)
                console.table({total, Unique})
            })
    }
    
    else {        
        mdLinks(path, { validate: false })
            .then(console.log)
    }
}

