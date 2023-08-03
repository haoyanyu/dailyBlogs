import * as React from 'react';
const ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/;
const source = '{{item => {return item.id;}}}';


const goodsList = [
  { id: '1', alias: '123', img: 'https://123.com', name: '2222'},
  { id: '2', alias: '123', img: 'https://123.com', name: '2222'},
  { id: '3', alias: '123', img: 'https://123.com', name: '2222'},
  { id: '4', alias: '123', img: 'https://123.com', name: '2222'},
];

const matched = source.match(ExpRE) || [];
const expression = matched[1]

const list = new Function('$root', `
  return $root.map(${expression});
`)(goodsList);
console.log('list', list);

const NewFunc = () => {

  return (
    <div>
      <code>函数体这样写： {source}</code>
      <br />
      <code>正则： {`/^\s*\{\{([\s\S]*)\}\}\s*$/`}</code>
      <br />
      <code>结果：{list.join('、')}</code>
    </div>
  )
}

export default NewFunc;