import { useCallback } from 'react';
import style from './index.module.scss';

interface IProps {
  text: string;
  icon?: string;
  onClick?: (params?: any) => void;
}

const ActionBtn: React.FC<IProps> = (props) => {
  const { text, icon, onClick } = props;
  
  // 按钮点击事件
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <div className={style["action-btn"]} onClick={handleClick}>
      <p>{text}</p>
    </div>
  )
}

export default ActionBtn;
