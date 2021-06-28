const { readFiles, getLinks, validateLinks } = require('./functions.js')

//const route = '/home/user/Documentos/BOG002-md-links/README.md'


const mdLinks = (path, options = { validate: false }) => {
  return readFiles(path)
    .then(getLinks)
    .then(data => {      
      if (options.validate) {        
        return validateLinks(data)
      } else {        
        return Promise.resolve(data)
      }
    })
    .catch(() => {
      console.log('No se puede completar la funcion MDlinks')
    })
}
//mdLinks(route, { validate: true })
//.then(console.log)
//
module.exports = { mdLinks }