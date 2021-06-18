const { readFiles, getLinks, validateLinks } = require('./functions.js')

const route = '/home/user/Documentos/BOG002-md-links/test/files/prueba2.md'


const mdLinks = (path, options) => {
  readFiles(path)
    .then(data => {
      return getLinks(data)     
    })
    .then(data => {      
      return validateLinks(data)      
    })
    .catch(() => {
      console.log('No se puede completar la funcion MDlinks')
    })
}
mdLinks(route)
