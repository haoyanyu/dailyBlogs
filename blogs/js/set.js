/**
 * set 方法
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */

const set = function(obj, path, value) {
  // obj为false时，不进行处理；
  return !obj ? obj : baseSet(obj, path, value);
};

function baseSet(obj, path, value) {
  if (!isObject(value)) {
    return obj;
  }
  // 处理路径
  const pathArr = castPath(path);
  const lastIndex = pathArr.length - 1;
  const pathLen = pathArr.length;
  let curIndex = 0;
  let result = obj;

  while (result != null && curIndex < pathLen) {
    let key = pathArr[curIndex];
    let newValue = result[key];

    if (curIndex === lastIndex) {
      newValue = value;
    } else {
      newValue = isObject(newValue) ? newValue : (isIndex(pathArr[curIndex + 1]) ? [] : {});
    }
    result[key] = newValue;
    result = result[key];
    curIndex++;
  }
  return obj;
}

/**
 * 处理路径
 * @param {string | array} path 
 * @return {array}
 */
function castPath(path) {
  const isArray = Array.isArray(path);
  let tempPathArr = path;
  if (!isArray) {
    // 如果路径是字符串则拆分路径为数组
    tempPathArr = path.split('.');
  }
  const len = tempPathArr.length;
  let index = 0;
  let pathArr = [];
  const reg = /\[(\d+)\]/g;
  while(index < len) {
    const str = tempPathArr[index].replace(reg, '.$1');
    pathArr = pathArr.concat(str.split('.'));
    index++;
  }
  return pathArr;
}

/**
 * 
 * @param {string | number} key 
 * @returns 
 */
function isIndex(key) {
  const type = typeof key;
  const reg = /^(?:0|[1-9]\d*)$/;
  if (type === 'number') {
    return true;
  }
  return reg.test(key);
}

/**
 * 检查是否是对象
 * @param {any} value 
 */
function isObject(value) {
  // 判断类型
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

var object = { 'a': [{ 'b': { 'c': 3 } }] };
const obj = set(object, 'a[0].b.c', 4);
console.log('>>>>>>>> obj <<<<<<<<', obj);
