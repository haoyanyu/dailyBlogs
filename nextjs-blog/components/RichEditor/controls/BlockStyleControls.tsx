import React, { useCallback } from "react";

import style from './style.module.css';
import { RichUtils } from "draft-js";


interface IProps {
  label?: string;
  style: string;
  active?: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggle: (params: any) => void;
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const StyleButton = (props: IProps) => {
  // onToggle
  const onToggle = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    props.onToggle(props.style);
  }, [props]);

  let className = style['RichEditor-styleButton'];
  if (props.active) {
    className += ` ${style['RichEditor-activeButton']}`;
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  )
}

const BlockStyleControls = (props: { onToggle?: any; editorState?: any; }) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  
  const handleToggle = useCallback((type: string) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, type)
    props.onToggle(newEditorState, type)
  }, [editorState, props])

  return (
    <div className={style['RichEditor-controls']}>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={handleToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls;
