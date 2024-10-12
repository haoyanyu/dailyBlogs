import React from 'react';
import { IconMore } from '@arco-design/web-react/icon';
import { Popover } from '../../pages/easter-egg/components/popover';

interface IProps {
  maxVisible?: number;
  trigger?: 'click' | 'hover';
  children?: React.ReactNode[];
}
const Operations: React.FC<IProps> = (props) => {
  const { children, maxVisible = 3 } = props;

  // 将子元素分割成两部分：可见部分和隐藏部分
  const visibleChildren = React.Children.toArray(children).slice(0, maxVisible);
  const hiddenChildren = React.Children.toArray(children).slice(maxVisible);

  return (
    <>
      {visibleChildren}
      {
        hiddenChildren.length > 0 && (
          <Popover content={<div>{hiddenChildren}</div>} position="bottom" trigger="click">
            <IconMore />
          </Popover>
        )
      }
    </>
  )
}

export default Operations;
