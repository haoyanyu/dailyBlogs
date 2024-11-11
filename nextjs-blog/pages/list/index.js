import { Suspense, useState, useDeferredValue, useCallback } from "react";
import { Input, Button } from '@arco-design/web-react';
import { IconStamp } from "@arco-design/web-react/icon";

import Layout from "../../components/layout";
import Filter from "./components/filter";
import ListWithInfiniteScroll from './components/list';
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

  const [data, setData] = useState(listData);

  const loadMore = useCallback(() => {
    console.log(">>>>>>loadMore<<<<<<");
    return new Promise(resolve => {
      setTimeout(() => {
        const newListData = [...data, ...listData.map(item => ({...item, id: item.id + data.length}))]
        setData(newListData);
        resolve(newListData);
      }, 2000)
    })
    
  }, [data]);
  return (
    <Layout title="全部菜谱">
      <Filter />
      <ListWithInfiniteScroll data={data} loadMore={loadMore} />
    </Layout>
  )
}
