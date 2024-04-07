import React, { useState, useCallback } from "react";
import { Form, Radio, Button, List } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";

import style from "./style.module.scss";

const splitCsvData = (csvData, splitStr, replaceStr) => {
  let rows = [];
  let cells = [];
  if (splitStr) {
    rows = csvData.split(splitStr);
    cells = rows;
  }
  if (replaceStr) {
    cells = rows.map((item) => item.replace(replaceStr, ""));
  }

  return cells;
};

const groupData = (data, groupSizeParams) => {
  const groupDataAction = (originData, groupSize) => {
    let group = [];
    let count = 1;
    originData.forEach((id, index) => {
      if ((index + 1) % groupSize === 0) {
        group.push(id);
        console.log(
          `%c >>>>>>第${count}组 ${group.length}条<<<<<<`,
          "font-weight: bold",
          group.join(",")
        );
        count++;
        group = [];
      } else {
        group.push(id);
        if (index + 1 === originData.length) {
          console.log(
            `%c >>>>>>第${count}组 最后${group.length}条<<<<<<`,
            "font-weight: bold",
            group.join(",")
          );
        }
      }
    });
  };
  if (!Array.isArray(groupSizeParams)) {
    groupDataAction(data, groupSizeParams);
  } else {
    groupSizeParams.forEach((groupSize, index) => {
      console.log(
        `%c >>>>>>第${index + 1}次分组，每组${groupSize}条数据<<<<<<`,
        "color: #07828B; font-weight: bold; font-size: 14px"
      );
      groupDataAction(data, groupSize);
    });
  }
};

export default function ReadCsv() {
  // 表单值
  const [files, setFiles] = useState([]);
  const [groupSizeOne, setGroupSizeOne] = useState(100);
  const [groupSizeTwo, setGroupSizeTwo] = useState(50);
  const [needGroupTwice, setNeedGroupTwice] = useState(1);

  const handleFileChange = (e) => {
    const files = e.target.files || [];
    setFiles([...files]);
  };

  // 处理表单数据
  const handleSizeChange = useCallback(
    (key) => (value) => {
      if (key === "groupSizeOne") {
        setGroupSizeOne(value);
      }
      if (key === "groupSizeTwo") {
        setGroupSizeTwo(value);
      }
      if (key === "needGroupTwice") {
        setNeedGroupTwice(value);
      }
    },
    []
  );

  // 提交表单
  const handleSubmit = useCallback(() => {
    if (!files.length) return;
    files.forEach((file) => {
      // //读取为二进制
      var reader = new FileReader();
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        var csvStr = reader.result;
        // 提取出每个单元格的数据，获得一个数组
        const datas = splitCsvData(csvStr, "\n", "\r");
        console.log(
          `%c >>>>>>${file.name}的数据为<<<<<<`,
          "color: #CB272D; font-size: 16px",
          datas.join(",")
        );
        groupData(
          datas,
          needGroupTwice ? [groupSizeOne, groupSizeTwo] : groupSizeOne
        );
      };
    });
  }, [files, groupSizeOne, groupSizeTwo, needGroupTwice]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="是否需要分组两次">
        <Radio.Group
          onChange={handleSizeChange("needGroupTwice")}
          defaultValue={1}
        >
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="一级分组大小">
        <Radio.Group
          onChange={handleSizeChange("groupSizeOne")}
          defaultValue="50"
        >
          <Radio value="50">50</Radio>
          <Radio value="100">100</Radio>
        </Radio.Group>
      </Form.Item>

      {!!needGroupTwice && (
        <Form.Item label="二级分组大小">
          <Radio.Group
            onChange={handleSizeChange("groupSizeTwo")}
            defaultValue="50"
          >
            <Radio value="50">50</Radio>
            <Radio value="100">100</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      <Form.Item label="选择文件">
        <div className={style.customUploadWrapper}>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileChange}
            className={style.customUploadInput}
          />
          <Button type="primary" className={style.customUploadButton}>
            <IconPlus />
            点击上传
          </Button>
          {!!files.length && (
            <div className={style.customUploadList}>
              <List
                size="small"
                dataSource={files}
                render={(item) => (
                  <List.Item key={item.name}>{item.name}</List.Item>
                )}
              />
            </div>
          )}
        </div>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Ok
        </Button>
      </Form.Item>
    </Form>
  );
}
