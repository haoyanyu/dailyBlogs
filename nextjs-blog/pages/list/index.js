import { Suspense, useState, useDeferredValue } from "react";
import { Input, Button } from '@arco-design/web-react';
import { IconStamp } from "@arco-design/web-react/icon";

import Layout from "../../components/layout";
import Filter from "./components/filter";
import ContentItem from './components/content';
import { fetchData } from "./data";

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
  const listData = [{
    title: '好吃的雪花酥',
    description: '从***学来的',
    tryTimes: 3,
    success: 2,
    failed: 1,
    pictures: [],
    id: 1,
  },
  {
    title: '好吃的雪花酥',
    description: '从***学来的',
    tryTimes: 3,
    success: 2,
    failed: 1,
    pictures: [],
    id: 2,
  }];
  return (
    <Layout title="全部菜谱">
      <Filter />
      <div>
        <ContentItem data={listData} />
      </div>
    </Layout>
  )
}
