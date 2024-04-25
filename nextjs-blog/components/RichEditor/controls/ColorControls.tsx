import { EditorState, Modifier, RichUtils } from "draft-js";
import React, { useCallback } from "react";

var COLORS = [
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
    display: 'inline-block',
    width: '18px',
    height: '18px',
  },
};

interface IProps {
  style: string;
  active?: boolean;
  onToggle: (params?: any) => void
}

const StyleButton = (props: IProps) => {
  let style = { ...styles.styleButton, backgroundColor: props.style } as any;
  if (props.active) {
    style.border = '1px solid #5890ff';
  }
  return (
    <span style={style} onMouseDown={(e) => {e.preventDefault(); props.onToggle(props.style)}}></span>
  )
}


const ColorControls = (props: { editorState: any; onToggle: any; }) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  
  // handleToggle
  const handleToggle = useCallback((color: string) => {
    const selectionState = editorState.getSelection();
    const nextContentState = COLORS.reduce((contentState, item) => {
      return Modifier.removeInlineStyle(contentState, selectionState, item.style)
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
    
    const currentStyle = editorState.getCurrentInlineStyle();

    if (selectionState.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state: EditorState, color: string) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    if (!currentStyle.has(color)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color)
    }

    onToggle(nextEditorState)
  
  }, [editorState, onToggle]);

  return (
    // @ts-ignore
    <div style={styles.controls}>
      {
        COLORS.map(type => (
          <StyleButton key={type.style} onToggle={handleToggle} style={type.style} active={currentStyle.has(type.style)} />
        ))
      }
    </div>
  )
};

export default ColorControls;
