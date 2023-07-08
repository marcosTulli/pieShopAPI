let fs = require('fs');

const FILE_NAME = './assets/pies.json';

let pieRepo = {
  get: (res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    });
  },
  getById: (id, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pie = JSON.parse(data).find(p => p.id == id);
        res(pie);
      }
    });
  },
  search: (searchObject, res, rej) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        rej(err);
      } else {
        let pies = JSON.parse(data);
        if (searchObject) {
          pies = pies.filter(
            p =>
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
};

module.exports = pieRepo;
