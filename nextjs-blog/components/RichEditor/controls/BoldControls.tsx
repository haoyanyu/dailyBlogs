import style from './style.module.css';

const BoldControls = (props: { onToggle: any; editorState: any}) => {
  const { onToggle, editorState } = props;

  return (
    <div>
      <span className={style['RichEditor-styleButton']} style={{ fontWeight: 'bold' }} onClick={() => onToggle('BOLD')}>B</span>
      <span className={style['RichEditor-styleButton']} style={{ fontStyle: 'italic' }} onClick={() => onToggle('ITALIC')}>I</span>
    </div>
  )
};

export default BoldControls;
