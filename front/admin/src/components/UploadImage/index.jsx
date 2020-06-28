import React, { useState, useEffect } from 'react';

import UploadImageItem from './UploadImageItem';
const UploadImage = (props) => {
  const initImgs = [
    {
      _id: '',
      imgUrl: '',
      link: '',
    },
  ];
  const { max = 1, imgs, onChange, showImg, showLink, showIcon, showAction } = props;

  const [imgsArr, setImgsArr] = useState(imgs);

  useEffect(() => {
    onChange(imgsArr);
  }, []);

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
          showReduce: true,
          showAdd: preImgs.length < max - 1,
        });
      }
      onChange([...preImgs]);
      return [...preImgs];
    });
  };

  const onRemove = (index) => {
    setImgsArr((preImgs) => {
      if (preImgs.length > 1) {
        preImgs.splice(index, 1);
        console.log(preImgs);
        preImgs.map((item, idx) => {
          if (preImgs.length - 1 === idx) {
            item.showAdd = true;
            item.showReduce = preImgs.length != 1;
          }
        });
      }
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
