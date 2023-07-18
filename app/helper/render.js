const e = require('express');
const fs = require('fs');

const render = (fileName) => {
  return new Promise((resolve, reject) => {
    const path = `./pages/${fileName}.html`;
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};
const renderHtml = (fileName) => {
  return new Promise((resolve, reject) => {
    const path = `client/dist/index.html`;
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};

module.exports = {
  renderHtml,
  render,
};