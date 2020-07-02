import React, { useState, useRef } from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

import './index.less';

const MenuItemConfig = (props) => {
  const { onChange, onRemove } = props;

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
    onChange('status', status);
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

  const onChangeValue = (e, field) => {
    if (field !== 'sort') {
      e.persist();
      const value = e.target.value.slice(0, 50);
      setParams((preState) => {
        return {
          ...preState,
          [field]: value,
        };
      });
      onChange(field, value);
    } else {
      setParams((preState) => {
        return {
          ...preState,
          [field]: e,
        };
      });
      onChange(field, e);
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
        value={params.menuName}
        disabled={params.disabled}
        style={{ flex: 1 }}
        placeholder="名称"
        onChange={(e) => onChangeValue(e, 'menuName')}
      />
      <Input
        value={params.router}
        disabled={params.disabled}
        style={{ flex: 1, marginLeft: 10 }}
        placeholder="路由"
        onChange={(e) => onChangeValue(e, 'router')}
      />
      <InputNumber
        value={params.sort}
        disabled={params.disabled}
        min={-9999}
        max={9999}
        parser={(value) => value.replace(/[^\d-]/, '')}
        style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
        placeholder="排序"
        onChange={(e) => onChangeValue(e, 'sort')}
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
          <CloseCircleTwoTone
            onClick={onRemove}
            className="item-config-close-btn"
            twoToneColor="#ff4d4f"
          />
        )}
      </div>
    </div>
  );
};

export default MenuItemConfig;
