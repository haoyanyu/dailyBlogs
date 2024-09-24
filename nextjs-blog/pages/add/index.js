import React, { useId } from 'react';
import { Button, Form, Input, Upload, Modal } from '@arco-design/web-react';
import { useRef, useCallback } from 'react';

import RichEditor from '../../components/RichEditor';
import Layout from '../../components/layout';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

export default function Add() {
  const formRef = useRef();

  const menuId = useId();

  // handleValuesChange
  const handleValuesChange = useCallback((changeValue, values) => {
    console.log('handleValuesChange', changeValue, values);
  }, []);

  // handlePreview
  const handlePreview = useCallback(() => {
    Modal.info({
      title: '预览',
      content: '',
    });
  }, []);

  return (
    <Layout title="新增菜谱">
      <div>
        <Form ref={formRef} onValuesChange={handleValuesChange} layout="horizontal">
          <FormItem field="title" rules={[{ required: true }]}>
            <Input placeholder="菜谱叫啥？"></Input>
          </FormItem>
          {/* <FormItem label="封面图">
            <Upload
              listType="picture-card"
              name="cover"
              onPreview={handlePreview}
            ></Upload>
          </FormItem> */}
          {/* <FormItem label="主图">
            <Upload
              listType="picture-card"
              name="steps"
              onPreview={handlePreview}
            ></Upload>
          </FormItem> */}
          <FormItem field="content" rules={[{ required: true }]}>
            {/* <RichEditor /> */}
            <TextArea placeholder="完整的步骤和技巧" />
          </FormItem>
          <RichEditor />
        </Form>
        <Button type="primary">okk</Button>
      </div>
    </Layout>
  );
}

function example4(leftTime) {
  let t = leftTime;
  function start() {
    requestAnimationFrame(() => {
      t = t - 1000;
      setTimeout(() => {
        console.log(t);
        start();
      }, 1000);
    });
  }
  start();
}
