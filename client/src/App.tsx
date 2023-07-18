import React from 'react';
import { marked } from 'marked';

import { markedStr, svgStr, loadingSvgStr } from './constants';

const App = () => {
  const finalHtml = marked.parse(markedStr);
  console.log('finalHtml', finalHtml);
  return (
    <div>
      <p>App</p>
      <p dangerouslySetInnerHTML={{ __html: finalHtml }}></p>
      <p dangerouslySetInnerHTML={{ __html: svgStr }}></p>
      <p dangerouslySetInnerHTML={{ __html: loadingSvgStr }}></p>
    </div>
  )
}

export default App;
