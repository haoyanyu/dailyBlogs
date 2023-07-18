import React from 'react';
import { marked } from 'marked';

import { markedStr, svgStr, loadingSvgStr } from 'src/constants';

const MarkedCom = () => {
  const finalHtml = marked.parse(markedStr);
  console.log('finalHtml', finalHtml);
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: finalHtml }}></p>
      <p dangerouslySetInnerHTML={{ __html: svgStr }}></p>
      <p dangerouslySetInnerHTML={{ __html: loadingSvgStr }}></p>
    </>
  )
};

export default MarkedCom;
