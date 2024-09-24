import React from 'react';
import { Input } from "@arco-design/web-react"
import { IconSearch } from "@arco-design/web-react/icon";

interface IProps {
  keyword?: string;
}
const Filter: React.FC = (props: IProps) => {
  return (
    <div>
      <Input
        placeholder="Search"
        allowClear
        height={54}
        addAfter={<IconSearch />}
      />
    </div>
  )
}

export default Filter;
