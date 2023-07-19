import React from 'react';
import { marked } from 'marked';

import { markedStr, svgStr, loadingSvgStr } from 'src/constants';

const MarkedCom = () => {
  const finalHtml = marked.parse(markedStr);
  
  return (
    <>
      <p>原字符为： {JSON.stringify(markedStr)}</p>
      ------
      <p>转成html如下：</p>
      <p>{finalHtml}</p>
      ------
      <p dangerouslySetInnerHTML={{ __html: finalHtml }}></p>
      {/* <p dangerouslySetInnerHTML={{ __html: svgStr }}></p> */}
      {/* <p dangerouslySetInnerHTML={{ __html: loadingSvgStr }}></p> */}
    </>
  )
};

export default MarkedCom;
