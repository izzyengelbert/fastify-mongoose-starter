import { decapitalizedFirstLetter } from './stringModifier';

const APIGenerator = (valueName, apis, callback = null, toLowerCase = false) => {
  const values = {};
  Object.keys(apis).forEach((key) => {
    if (!apis[key]) return;
    const value = apis[key][valueName];
    if (value) {
      Object.keys(value).forEach((propName) => {
        const newPropName = toLowerCase ? decapitalizedFirstLetter(propName) : propName;
        values[newPropName] = callback !== null ? callback(value[propName]) : value[propName];
      });
    }
  });
  return values;
};

export default APIGenerator;
