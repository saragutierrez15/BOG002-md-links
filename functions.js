const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');

const route = './test/files/'


//Estamos haciendo el array de rutas 
files = fs.readdirSync(route);

let filesArr = []
files.forEach(file => {
  if (path.extname(file) == ".md")
    filesArr.push(path.resolve(route, file));
})
//console.log(filesArr)
//const newFilesArr = filesArr.map(item=>{
// console.log(item) 
//})


//volvemos las rutas en absolutas
const cambiandoRutas = path.resolve(route, 'prueba.md')
//console.log(cambiandoRutas)

//leemos los documentos 
const readFiles = (route) => {
  return new Promise((resolve) => {
    readFile = fs.readFile(route, 'utf8', (err, data) => {
      if (err) {
        console.log('No existen archivos validos')
        return
      }
      resolve(data)
    });
  });
}

//obtenemos los links del documento 

const getLinks = (path) => {
  const getLink = markdownLinkExtractor(path, true)
  const array = []
  getLink.forEach(link => {
    if (link.href.startsWith("http")) {
      const url = link.href
      const text = link.text
      const objectLinks = {
        file: route,
        url: url,
        text: text,
      }
      array.push(objectLinks)
    }
  });  
  return array
}

validateLinks = (links) => {
  const arrPromisesAxios = links.map(link => {
    return axios.get(link.url)  
    .then((response) => {
      console.log({file: route, link: link.url,text: link.text, status:response.status, statusText: 'OK'})
      return {
        file: route, 
        link: link.url,
        text: link.text, 
        status:response.status, 
        statusText: 'OK'
      }      
    })
    .catch((error) => {
      console.log({file: route, link: link.url, text: link.text,status:error.response.status, statusText: 'FAIL'})
      return {
        file: route, 
        link: link.url, 
        text: link.text,
        status:error.response.status, 
        statusText: 'FAIL'
      }   
    })
  })
  return Promise.all(arrPromisesAxios)//.then((results) => results.forEach((result) => console.log(result))); 
}

module.exports = {
  readFiles,
  getLinks,
  validateLinks
};