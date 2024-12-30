import ReactDOM from 'react-dom';
import { Component, ReactElement, ReactInstance } from 'react';

const CopyReactDOM = ReactDOM;
const createRoot = CopyReactDOM.createRoot;

const updateUsingClientEntryPoint = (skipWarning?: boolean) => {
  // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
  // Avoid console warning
  if (isObject(CopyReactDOM[__SECRET_INTERNALS__])) {
    CopyReactDOM[__SECRET_INTERNALS__].usingClientEntryPoint = skipWarning;
  }
};

const copyRender = (app: ReactElement, container: Element | DocumentFragment) => {
  updateUsingClientEntryPoint(true);
  const root = createRoot(container);
  updateUsingClientEntryPoint(false);

  root.render(app);

  root._unmount = function () {
    setTimeout(() => {
      root?.unmount?.();
    })
  };
  return root;
}
