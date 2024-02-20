import React, { useEffect } from 'react';
import Typed from 'typed.js';

interface IProps {

}

const TypedComponent: React.FC<IProps> = props => {
  // 用于挂载动画的element
  const el = React.useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['This is a JavaScript library', 'This is an ES6 module JavaScript library'],
      smartBackspace: true, // 开头里相同的内容不会再打印
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    }
  }, []);

  return (
    <div>
      <span ref={el}></span>
    </div>
  )
};

export default TypedComponent;
