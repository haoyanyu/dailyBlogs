import { useCallback } from "react";

import style from './style.module.css';

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

const StyleButton = (props: { onToggle: (arg0: any) => void; style: any; active: any; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  // onToggle
  const onToggle = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
      props.onToggle(props.style);
  }, []);

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

  return (
    <div className={style['RichEditor-controls']}>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls;
