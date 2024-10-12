import { Suspense, useState, useDeferredValue } from "react";
import { Input, Button } from '@arco-design/web-react';
import { IconStamp } from "@arco-design/web-react/icon";

import Layout from "../../components/layout";
import Filter from "./components/filter";
import Content from './components/content';
import { fetchData, listData } from "./data";

function use(promise) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}


const MenuListRenderer = (props) => {
  const { query = '' } = props;
  const albums = use(fetchData(`/search?q=${query}`));

  return (
    <ul>
      {
        albums.map(album => (
          <li key={album.id}>
            {album.title} ({album.year})
          </li>
        ))
      }
    </ul>
  )
};

export default function List() {
  return (
    <Layout title="全部菜谱">
      <Filter />
      <div>
        <Content data={listData} />
      </div>
    </Layout>
  )
}
