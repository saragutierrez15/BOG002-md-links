const { readFiles, getLinks, validateLinks } = require('./functions.js')

const route = '/home/user/Documentos/BOG002-md-links/test/files/prueba2.md'


const mdLinks = (path, options = { validate: true }) => {
  readFiles(path)
    .then(data => {
      return getLinks(data)     
    })
    .then(data => {  
      if (options.validate){    
      return validateLinks(data) 
      }else{
        console.log(data)
        return data
      }   
    })
    .catch(() => {
      console.log('No se puede completar la funcion MDlinks')
    })
}
mdLinks(route,{ validate: true})
