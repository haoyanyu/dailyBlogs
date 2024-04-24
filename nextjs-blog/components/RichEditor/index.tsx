import { useState, useCallback, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, Modifier } from 'draft-js';

import { forwardRef, useImperativeHandle } from "react";
import 'draft-js/dist/Draft.css';

import BoldControls from './controls/BoldControls';
import BlockStyleControls from "./controls/BlockStyleControls";
import ColorControls from "./controls/ColorControls";

interface IProps {
  
}

const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const RichEditor: React.FC<IProps> = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  // 富文本
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  
  // toggleBlockType
  const toggleBlockType = useCallback((blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }, [editorState]);

  const handleSetEditorState = useCallback((newEditorState: SetStateAction<EditorState>) => {
    setEditorState(newEditorState)
  }, []);

  // 加粗，斜体
  const handleFontStyle = (keyCommand: string) => {
    
    setEditorState(RichUtils.toggleInlineStyle(editorState, keyCommand))
  }

  const handleColorStyle = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, [])

  // handleKeyCommand
  const handleKeyCommand = useCallback((command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleSetEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getContent: () => {
        console.log(editorState.getCurrentContent())
      }
    }
  })
  useEffect(() => {
    const rawJson = '{"blocks":[{"key":"dg74j","text":"222","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d6hgh","text":"rrrrr","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9dqdj","text":"ttttt","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"279k8","text":"yyyy","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3vst5","text":"uuuu","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
    const contentState = convertFromRaw(JSON.parse(rawJson));
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, []);
  return (
    <div>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <BoldControls onToggle={handleFontStyle} editorState={editorState} />
      <ColorControls onToggle={handleColorStyle} editorState={editorState} />

      <Editor
        customStyleMap={colorStyleMap}
        ref={editorRef}
        editorState={editorState}
        onChange={handleSetEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Enter some text..."
      />
    </div>
    
  )
})

export default RichEditor;
