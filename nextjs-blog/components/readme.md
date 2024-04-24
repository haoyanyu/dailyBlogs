## 页面间的公共组件统一放到这里，可以根据页面名称对应创建组件

### EditorState
编辑器的顶级状态对象

包括： 当前文本的状态信息、当前选中的状态信息、前进后退栈、完整的内容、当前最新的更改类型

#### 构造函数的静态方法：都返回editorState
- createEmpty() 创建一个空的编辑器
- createWithContent(contentState, decorator?) 使用已知内容创建编辑器
- create(config) 基于配置生成EditorState对象
- push(editorState: EditorState, contentState: ContentState, changeType: EditorChangeType)
- undo(editorState)
- redo(editorState)
- acceptSelection(editorState: EditorState, selectionState: SelectionState)
- setInlineStyleOverride(editorState: EditorState, inlineStyleOverride: DraftInlineStyle) 格式刷
- set(editorState, options) 

#### 实例方法：
- getCurrentContent(): ContentState 当前编辑器的内容
- getSelection(): SelectionState 选中或光标所在位置的状态
- getCurrentInlineStyle(): DraftInlineStyle 返回当前
- getBlockTree(blockKey): List 返回
- toJS() 返回编辑器的js对象

### ContentState

#### 静态方法
- createFromBlockArray(blocks: ContentBlock[], entityMap?): ContentState 

- createFromText()


#### 实例方法

- createEntity() ?
- getBlockForKey(blockKey): ContentBlock 获取某一行的内容块
- getBlockAfter(blockKey): 获取某行的下一行
- getBlockBefore(blockKey)
- getFirstBlock(): ContentBlock 获取第一行的内容块
- getLastBlock(): ContentBlock 
- getPlainText() 获取纯文字
- getBlockMap() 获取所有的blockMap


### ContentBlock
ContentBlock内容块的完整状态，类似于块级元素；

包括：块的纯文本内容、类型（段落、标题、列表项）、实体、内联样式、深度信息
- getKey() 获取行号
- getType()
- getText() 获取文本内容
- getCharacterList()
- getData()


### selectionState
- getStartKey() 选中内容块的开始key
- getEndKey()
- getEndOffset() 选中区域的结尾在块里的偏移量
- getStartOffset()
- getAnchorKey() 返回选中的块的key, 返回值同getStartKey() ?
- getAnchorOffset() 同getStartOffset()
- getFocusKey()焦点所在行的key，同getStartKey
- getFocusOffset() 光标所在位置，同getStartOffset
- getIsBackward()当前光标位置是否在选中区域的前面，从后往前选会返回true
- isCollapsed() 光标位置和焦点所在位置是否一样，在内容中点一下，获取了焦点，就会返回true
- hasEdgeWithin(blockKey, start, end) 所选位置是否跟参数的范围一致


blockKey: selectionState.getAnchorKey()返回的值
DraftInlineStyle?
