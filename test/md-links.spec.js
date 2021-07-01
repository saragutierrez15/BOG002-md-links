const { validateLinks, getLinks, readFiles } = require('../functions.js');
const { readFileSync } = require('fs');

const array = [{
  file: './test/files/',
  url: 'https://nodejs.org/api/path.html',
  text: 'path'
}]
const array2 = [{
  file: './test/files/',
  url: 'https://nodejs.org/ap37rnxeu3829?i/path.html',
  text: 'path'
}]
const route = readFileSync('test/files/prueba.md', { encoding: 'utf8' });
const route2 = 'test/files/prueba2.md'

describe('Read files ', () => {
  it('debe retornar el texto del archivo', () => {
    readFiles(route2)
      .then((data) => {
        expect(data).toBe('Hola soy un texto de prueba para la funcion readFiles')
      })
  });
});

describe('obtener links ', () => {
  it('debe retornar el link', () => {
    expect(getLinks(route, true)).toEqual([{
      file: './test/files/',
      url: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown'
    }])
  });
});

describe('validate links ', () => {
  it('el status deberia ser 200', () => {
    const validate = validateLinks(array)
    return validate
      .then((data) => {
        expect(data[0].status).toBe(200)
      })
  });
  it('el status deberia ser 404', () => {
    const invalidate = validateLinks(array2)
    return invalidate
    .then((data) => {      
      expect(data[0].status).toBe(404)
    })
  })
});
