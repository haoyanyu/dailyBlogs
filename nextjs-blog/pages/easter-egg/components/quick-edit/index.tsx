import React, { useRef, useCallback, useMemo, useState } from 'react';
import { Input } from '@arco-design/web-react';
import { IconEdit } from "@arco-design/web-react/icon";

import Popover from '../popover/index';

interface IProps {
  previewContent?: React.ReactNode;
  value?: string | number;
  mode?: 'normal' | 'pop';
  editContent?: React.ReactNode;
  popProps?: any;
  popContent?: React.ReactNode;
  popTitle?: string;
  onCancel?: (params?: any) => void;
  onConfirm?: (params?: any) => void;
}

/**
 * 一个快速编辑组件
 * 内容 + icon，点击icon后，可以唤起编辑面板；
 * 接受previewContent参数，表示预览的内容；不传的话就只展示一个icon;
 * 接受参数mode，表示模式；normal为默认值，表示在当前位置展示input，失焦后恢复预览并展示最新内容；
 *    mode为pop时，表示点击后展示pop弹层，在弹层中展示input，弹层中有取消、确定按钮，点击确定后应用最新值；
 * 接受editContent参数，可自定义编辑面板的内容；
 * 组件完成编辑后，会调用onConfirm事件；完成编辑包括：input失焦、点击确定按钮
 * 接受一些pop的通用属性
 */
function QuickEdit(props: IProps) {
  const {
    previewContent,
    value,
    mode = 'normal',
    editContent,
    popProps,
    popContent,
    popTitle,
    onCancel,
    onConfirm,
  } = props;

  const IconRef = useRef<any>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [editValue, setEditValue] = useState(String(value));

  const handleInputSubmit = useCallback(() => {
    setIsEdit(false);
    onConfirm && onConfirm(editValue);
  }, [editValue, onConfirm])

  const toggleEditStatus = useCallback(() => {
    setIsEdit(true);

  }, [])

  const renderEditContent = useMemo(() => {
    // 判断editContent是否是有效的reactNode
    if (React.isValidElement(editContent)) {
      return editContent;
    }
    return (
      <div className='edit-content'>
        <Input placeholder='请输入内容' value={editValue} onChange={(value) => setEditValue(value)} onPressEnter={handleInputSubmit} />
      </div>
    )
  }, [editContent, editValue, handleInputSubmit])

  return (
    <div className='quick-edit-wrapper'>
      {
        // 编辑状态且常规模式下，不展示预览内容
        (isEdit && mode === 'normal') ? null : (
          <div className='preview-wrapper'>
            {previewContent}
            <IconEdit onClick={toggleEditStatus} ref={IconRef} />
          </div>
        )
      }
      
      {
        isEdit && (
          <div className='edit-wrapper'>
            {
              mode === 'normal' ? (
                <div className='normal-wrapper'>
                  {renderEditContent}
                </div>
              ) : (
                <Popover
                  visible={isEdit}
                  content={(
                    <div className='pop-wrapper'>
                      <div className='pop-title'>{popTitle}</div>
                      {renderEditContent}
                    </div>
                  )}
                  onVisibleChange={() => setIsEdit(false)}
                  anchor={IconRef.current}
                >
                </Popover>
              )
            }
          </div>
        )
      }
    </div>
  );
}


export default function QuickEditor() {
  const [value, setValue] = useState('123');
  const previewContent = <span>{value}</span>;

  return (
    <div>
      <QuickEdit value={value} previewContent={previewContent} onConfirm={setValue} />
      <QuickEdit
        value={value}
        previewContent={previewContent}
        onConfirm={setValue}
        mode='pop'
        popTitle="设置"
      />
    </div>
  );
}
