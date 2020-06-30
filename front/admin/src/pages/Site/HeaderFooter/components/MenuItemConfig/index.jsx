import React, { useState } from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import './index.less';

const MenuItemConfig = (props) => {
  const [params, setParams] = useState(() => {
    return {
      ...props,
    };
  });

  const handlChangeToggle = (status) => {
    setParams((preState) => {
      return {
        ...preState,
        status,
      };
    });
  };
  const mouseToggle = (deletable) => {
    const { editable } = params;
    if (editable) {
      setParams((preState) => {
        return {
          ...preState,
          deletable,
        };
      });
    }
  };
  console.log('params', params);
  return (
    <div
      className="item-config"
      onMouseEnter={() => mouseToggle(true)}
      onMouseLeave={() => mouseToggle(false)}
    >
      <Input
        value={params.name}
        disabled={params.disabled}
        style={{ flex: 1 }}
        placeholder="名称"
      />
      <Input
        value={params.router}
        disabled={params.disabled}
        style={{ flex: 1, marginLeft: 10 }}
        placeholder="路由"
      />
      <InputNumber
        value={params.sort}
        disabled={params.disabled}
        min={-9999}
        max={9999}
        parser={(value) => value.replace(/[^\d]/, '')}
        style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
        placeholder="排序"
      />
      <Switch
        checkedChildren="启用"
        unCheckedChildren="停用"
        checked={params.status}
        disabled={params.disabled}
        onChange={(checked) => handlChangeToggle(checked)}
      />

      <div className="item-config-close">
        {params.deletable && (
          <CloseCircleTwoTone className="item-config-close-btn" twoToneColor="#ff4d4f" />
        )}
      </div>
    </div>
  );
};

export default MenuItemConfig;
