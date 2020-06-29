import React, { useState, useEffect } from 'react';
import UploadImageItem from './UploadImageItem';

const UploadImage = (props) => {
  const initImgs = [
    {
      _id: '',
      imgUrl: '',
      link: '',
      icon: '',
    },
  ];
  const {
    max = 1,
    showImg = true,
    showLink = true,
    showIcon = false,
    showAction = true,
    imgs,
    onChange,
  } = props;
  const [imgsArr, setImgsArr] = useState(() => {
    return imgs ? imgs : initImgs;
  });

  useEffect(() => {
    if (!imgs) return;
    const length = imgs.length;
    // 从后台获取到数据后，第一次渲染，是否显示添加和减少按钮
    imgs.map((item, idx) => {
      if (length < max) {
        item.showReduce = length !== 1;
        item.showAdd = idx === length - 1;
      } else {
        item.showReduce = true;
        item.showAdd = false;
      }
    });
    setImgsArr(imgs);
  }, [imgs]);

  const onItemChange = ({ index, field, value }) => {
    setImgsArr((preImgs) => {
      preImgs[index][field] = value;
      return [...preImgs];
    });
    onChange(imgsArr);
  };

  const onAdd = () => {
    setImgsArr((preImgs) => {
      if (preImgs.length < max) {
        preImgs.map((item) => {
          item.showAdd = false;
          item.showReduce = true;
        });
        preImgs.push({
          imgUrl: '',
          link: '',
          icon: '',
          showReduce: true,
          showAdd: preImgs.length < max - 1,
        });
      }
      preImgs.forEach((item) => {
        if (!showImg) {
          delete item.imgUrl;
        }
        if (!showLink) {
          delete item.link;
        }
        if (!showIcon) {
          delete item.icon;
        }
        return item;
      });
      onChange([...preImgs]);
      return [...preImgs];
    });
  };

  const onRemove = (index) => {
    setImgsArr((preImgs) => {
      if (preImgs.length > 1) {
        preImgs.splice(index, 1);
        preImgs.map((item, idx) => {
          if (preImgs.length - 1 === idx) {
            item.showAdd = true;
            item.showReduce = preImgs.length != 1;
          }
        });
      }
      preImgs.forEach((item) => {
        if (!showImg) {
          delete item.imgUrl;
        }
        if (!showLink) {
          delete item.link;
        }
        if (!showIcon) {
          delete item.icon;
        }
        return item;
      });
      onChange([...preImgs]);
      return [...preImgs];
    });
  };
  return imgsArr
    ? imgsArr.map((item, index) => (
        <UploadImageItem
          key={index}
          {...item}
          index={index}
          showImg={showImg}
          showLink={showLink}
          showIcon={showIcon}
          showAction={showAction}
          onChange={onItemChange}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))
    : null;
};

export default UploadImage;
