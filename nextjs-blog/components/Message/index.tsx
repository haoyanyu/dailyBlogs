import React from 'react';
import cs from 'classnames';
import { createRoot } from 'react-dom/client';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import BaseNotice from './notice';
import MessageItem from './components/MessageItem';


const messageTypes = ['info', 'success', 'warning', 'error'];
let maxCount;
let prefixCls;
let duration = 3000;
let container;
let rtl;
let closable;
let messageInstance: {
  top: {
    instance?: Message;
    pending?: Promise<null>; // 干嘛用的呢？
  }
} = {};

export interface MessageType {
  (): void;
}

export interface MessageProps {
  style?: React.CSSProperties;
  className?: string | string[];
  content: React.ReactNode | string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  id?: string;
  position?: 'top' | 'bottom';
  closable?: boolean;
  closeIcon?: React.ReactNode;
  type?: string;
}

function addInstance(noticeProps) {
  const _noticeProps = {
    position: 'top',
    duration,
    ...noticeProps,
  };

  const { position } = _noticeProps;
  let id;

  const { instance, pending } = messageInstance[position] || {};

  if (instance || pending) {
    const add = () => {
      const notices = instance.state.notices;
      const updated = notices.find((notice) => notice.id === noticeProps.id);

      const _mergerProps = {
        ..._noticeProps,
        update: updated,
      };

      if (notices.length >= maxCount) {
        // if (updated) {
        //   instance.add({
        //     ..._mergerProps,
        //     id: updated.id,
        //   });
        // } else {
        //   notices.shift();

        // }
      } else {
        id = instance.add(_mergerProps);
      }
    };

    if (instance) {
      add();
    } else if (pending?.then) {
      pending.then(() => {
        add();
        messageInstance[position].pending = null;
      })
    }
  } else {
    const div = document.createElement('div');
    (container || document.body).appendChild(div);
    messageInstance[position] = {};
    messageInstance[position].pending = new Promise((resolve) => {
      const root = createRoot(div);
      root.render(
        <Message
          ref={(instance) => {
            if (!messageInstance[position]) {
              messageInstance[position] = {};
            }
            messageInstance[position].instance = instance;
            id = instance?.add(_noticeProps);
            resolve(null);
          }}
        />
      );
    })
  }

  const result = () => {
    return messageInstance[position].instance.remove(id);
  };

  return result;
}

class Message extends BaseNotice {
  static info: (config: MessageProps | string) => MessageType;
  static success: (config: MessageProps | string) => MessageType;
  static warning: (config: MessageProps | string) => MessageType;
  static error: (config: MessageProps | string) => MessageType;

  static clear: () => void = () => {
    Object.values(messageInstance).forEach(({ instance }) => {
      instance?.clear();
    })
  }

  static addInstance = addInstance;

  remove = (id: string) => {
    const noticeItem = this.state.notices.find(item => item.id === id);
    if (noticeItem) {
      this.update({
        ...noticeItem,
        style: { ...noticeItem.style, opacity: 0 }
      })
    }

    setTimeout(() => {
      super.remove(id);
    }, 300)
  };

  render() {
    // const { position } = this.props;
    const { notices, position } = this.state;
    return (
      <div className={cs('hyy-message-wrapper', `hyy-message-wrapper-${position}`)}>
        <TransitionGroup component={null}>
          {
            notices.map(notice => (
              <CSSTransition
                key={notice.id}
                timeout={300}
                classNames="fadeMessage"
              >
                <MessageItem
                  {...notice}
                  onClose={this.remove}
                />
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </div>
    )
  }
}

messageTypes.forEach((type) => {
  Message[type] = (noticeProps: any) => {
    const props = typeof noticeProps === 'string' ? { content: noticeProps } : noticeProps;
    return addInstance({
      ...props,
      type,
    })
  }
})

export default Message;
