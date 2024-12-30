import React from 'react';
import { IconInfoCircle, IconCheckCircle, IconCloseCircle, IconExclamationCircle, IconLoading } from '@arco-design/web-react/icon';

interface IState {}

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  id?: string;
  content: string | React.ReactNode;
  onClose?: (id: string) => void;
  type?: string;
  update?: boolean;
  showIcon?: boolean;
}

class MessageItem extends React.Component<IProps, IState> {

  static defaultProps = {
    type: 'info',
    showIcon: true,
    noticeType: 'message',
    duration: 3000,
  }

  timer: any;

  constructor(props) {
    super(props);
  }

  removeTimer = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  startTimer = () => {
    const { duration, onClose, id } = this.props;
    if (duration > 0) {
      this.timer = window.setTimeout(() => {
        onClose && onClose(id);
        this.removeTimer()
      }, duration)
    }
  }

  renderIcon = (type: string) => {
    let content: React.ReactNode;
    switch (type) {
      case 'info':
        content = <IconInfoCircle />;
        break;
      case 'success':
        content = <IconCheckCircle />;
        break;
      case 'error':
        content = <IconCloseCircle />;
        break;
      case 'warning':
        content = <IconExclamationCircle />;
        break;
      case 'loading':
        content = <IconLoading />;
        break;
      default:
        break;
    }
    return <span className='hyy-message-inner_icon'>{content}</span>;
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    
  }

  componentDidMount(): void {
    this.startTimer();
  }

  componentWillUnmount(): void {
    this.removeTimer();
  }

  render() {
    const { content, type, position, showIcon, style } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <div className={`hyy-message-inner hyy-message-inner-${type}`} style={style}>
          {
            showIcon && this.renderIcon(type)
          }
          <div className='hyy-message-inner_content'>{content}</div>
        </div>
      </div>
    )
  }
}

export default MessageItem;