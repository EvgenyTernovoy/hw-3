const db = require('../model/db');
const config = require('../config');
const validation = require('../libs/fileValidation');
const fs = require('fs');
const util = require('util');
const _path = require('path');
const formidable = require('formidable');

const rename = util.promisify(fs.rename);


module.exports = (req) => new Promise((resolve, reject) => {
  const form = formidable.IncomingForm();
  const path =  _path.join(process.cwd(), config.upload.path);

  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  form.uploadDir = path;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return resolve({message: err});
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return resolve({message: valid.status});
    }

    const fileName = _path.join(path, files.photo.name);

    rename(files.photo.path, fileName).then(() => {

      db.get('products')
        .push({
          src: `${config.upload.file}/${files.photo.name}`,
          name: fields.name,
          price: fields.price
        })
        .write();

      return resolve({message: 'Продукт успешно добавлен'});
    }).catch(err => {
      console.error(err);
      return resolve({message: err});
    });
  });
});
