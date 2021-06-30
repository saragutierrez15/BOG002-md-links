const { readFiles, getLinks, validateLinks } = require('./functions.js')

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

module.exports = { mdLinks }