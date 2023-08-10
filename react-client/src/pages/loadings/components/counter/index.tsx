import React, { useState } from 'react';
import classNames from 'classnames';
import './style.scss';

interface IProps {

}

const NumberLoading: React.FC<IProps> = props => {

  const [isActive, setIsActive] = useState(false);

  
  return (
    <>
      加载进度： <div className={classNames('progress', { active: isActive})}></div>
      <div onClick={() => setIsActive(true)}>开始</div>
    </>
    
  )
};

export default NumberLoading;
