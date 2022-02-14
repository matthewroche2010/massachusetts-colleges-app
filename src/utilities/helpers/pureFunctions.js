export const filterArrayOfObjects = (objArray, filter) => {
  return objArray.filter(filterObjectValues(filter));
};

export const filterObjectValues = (filter) => (object) => {
  const values = Object.values(object);
  return values.filter(filterArrayValues(filter)).length > 0;
};

export const filterArrayValues = (filter) => (item) => {
  if (typeof item == 'string') {
    return item.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  }
  if (typeof item == 'number') {
    return item.toString().toLowerCase()
        .indexOf(filter.toLowerCase()) !== -1;
  }
};

export const sortObjectsByProperty = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    const result = (a[property] < b[property]) ?
      -1 :
      (a[property] > b[property]) ?
        1 :
        0;

    return result * sortOrder;
  };
};

export const validateUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(url);
};
