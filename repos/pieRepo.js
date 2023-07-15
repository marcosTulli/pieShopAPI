const { rejects } = require('assert');
let fs = require('fs');
const { resolve } = require('path');

const FILE_NAME = './assets/pies.json';

let pieRepo = {
  // Get all
  get: (res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    });
  },

  // Get one
  getById: (id, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pie = JSON.parse(data).find((p) => String(p.id) === id);
        res(pie);
      }
    });
  },

  // Filter
  search: (searchObject, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        if (searchObject) {
          pies = pies.filter(
            (p) =>
              (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name
                ? p.name
                    .toLowerCase()
                    .indexOf(searchObject.name.toLowerCase()) >= 0
                : true)
          );
        }
        res(pies);
      }
    });
  },

  // Add
  insert: (newData, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            rej(err);
          } else {
            res(newData);
          }
        });
      }
    });
  },

  // Patch
  update: (newData, id, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        let pie = pies.find((p) => String(p.id) === id);
        if (pie) {
          Object.assign(pie, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              rej(err);
            } else {
              res(newData);
            }
          });
        }
      }
    });
  },

  // Delete
  delete: (id, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        let index = pies.findIndex((p) => String(p.id) === id);

        if (index != -1) {
          pies.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              rej(err);
            } else {
              res(index);
            }
          });
        }
      }
    });
  },
};

module.exports = pieRepo;
