import React from 'react';

interface BaseNoticeState {
  notices: {[key: string]: any}[];
  position?: string;
}

const getId = (props) => {
  if (props.id) {
    return props.id;
  } else {
    return `hyy_notice_id${Math.random().toFixed(10).slice(2)}`;
  }
}
class BaseNotice extends React.Component<any, BaseNoticeState> {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
      position: 'topCenter',
    }

    this.remove = this.remove.bind(this);
  }

  add = (noticeProps) => {
    const id = getId(noticeProps);

    const oldNotices = this.state.notices;

    if (noticeProps.id && ~oldNotices.findIndex((item) => item.id === noticeProps.id)) {
      this.update(noticeProps);
    } else {
      this.setState({
        notices: [...oldNotices.concat({
          ...noticeProps,
          id,
        })],
        position: noticeProps.position,
      })
    }
    return id;
  }

  update = (noticeProps) => {
    const updatedNotices = this.state.notices.map(item => {
      return item.id === noticeProps.id ? noticeProps : item
    });
    console.log(">>>>>>updatedNotices<<<<<<", updatedNotices);
    this.setState({
      notices: [...updatedNotices]
    })
  }

  remove(id: string) {
    const newNotices = this.state.notices.filter(item => item.id !== id)
    this.setState({
      notices: [...newNotices],
    })
  }

  clear = () => {
    this.setState({
      notices: []
    })
  }
}

export default BaseNotice;
