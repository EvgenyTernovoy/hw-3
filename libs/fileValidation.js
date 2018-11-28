module.exports = (fields, files) => {
  if (!fields.name) {
    return {
      status: 'Не указано имя товара',
      err: true
    };
  }

  if (!fields.price) {
    return {
      status: 'Не указана цена',
      err: true
    };
  }

  if (files.photo.name === '' || files.photo.size === 0) {
    return {
      status: 'Не загружена картинка',
      err: true
    };
  }

  return { err: false };
};
