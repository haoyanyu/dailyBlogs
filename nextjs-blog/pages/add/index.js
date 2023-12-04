import { useRouter } from 'next/router';
import { Button } from "@arco-design/web-react";

import Layout from '../../components/layout';

export default function Add() {

  const router = useRouter()
  const { pathname, query } = router

  const isEdit = query.menuId;

  return (
    <Layout title={`${isEdit ? '编辑' : '新增'}菜谱`}>
      <div>
      <Button type='primary'>Primary</Button>
      </div>
    </Layout>
  )
}