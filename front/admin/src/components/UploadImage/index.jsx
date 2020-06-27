import React, { useState, useRef } from 'react';

import UploadImageItem from './UploadImageItem';
const UploadImage = (props) => {
  const { max = 1, imgs, onChange } = props;
  const [imgsArr, setImgsArr] = useState(
    imgs || [
      {
        imgUrl: '',
        link: '',
      },
    ],
  );

  const onAdd = () => {
    setImgsArr((preImgs) => {
      if (preImgs.length < max) {
        preImgs.map((item) => (item.showAdd = false));
        preImgs.push({
          imgUrl: '',
          link: '',
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
        preImgs.map((item, idx) => {
          if (preImgs.length - 1 === idx) {
            item.showAdd = true;
          }
        });
      }
      onChange([...preImgs]);
      return [...preImgs];
    });
  };

  return imgsArr.map((item, index) => (
    <UploadImageItem
      key={index}
      {...item}
      hideIcon={true}
      onAdd={onAdd}
      onRemove={() => onRemove(index)}
    />
  ));
};

export default UploadImage;

