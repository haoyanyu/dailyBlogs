## 页面间的公共组件统一放到这里，可以根据页面名称对应创建组件

### Editor组件
#### props属性
- editorState EditorState实例，用来存储编辑器的所有信息；必传
- onChange 接受参数editorState；必传
- placeholder 编辑区域的文案提示
- blockRendererFn？传入一个contentBlock, 返回一个包含自定义属性的组件
- blockRenderMap 自定义块级元素类型的渲染映射；通过 blockRenderMap，定义不同类型的块级元素在编辑器中的展示方式和行为。
- blockRendererFn: 传入一个contentBlock, 通过使用 blockRendererFn，您可以更灵活地控制每个块级元素在 Draft.js 编辑器中的展示方式

- blockStyleFn 接受contentBlock参数，可以定义样式
- customStyleFn: 用于根据内容中的实体（Entity）和内联样式（inline style）来动态生成自定义样式。通过 customStyleFn，您可以为不同类型的实体或内联样式应用不同的样式效果。

- customStyleMap 自定义的样式
定义自定义样式映射，可以根据特定的样式名称为文本提供自定义样式。这个属性允许您在编辑器中应用自定义的行内样式，以实现更丰富的文本编辑功能。

具体作用包括：

自定义文本样式：通过customStyleMap属性，您可以定义一系列自定义的文本样式，例如颜色、背景色、字体大小等，然后在编辑器中应用这些样式到相应的文本内容上。

渲染样式效果：当用户在编辑器中选择特定文本并应用了自定义样式时，customStyleMap会根据样式名称将对应的样式渲染到编辑器中，使用户能够直观地看到所应用的样式效果。

增强编辑器功能：通过自定义样式映射，您可以扩展Draft.js编辑器的功能，使用户能够以更灵活的方式编辑文本内容，如添加标记、高亮显示等。


- keyBindingFn 根据按键事件返回对应的 Draft.js 命令，用于自定义键盘快捷键绑定

#### 实例方法
- focus()
- blur()

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
