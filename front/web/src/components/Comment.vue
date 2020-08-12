<template>
  <div class="comemnt clearfix">
    <mu-card-title></mu-card-title>
    <mu-text-field
      class="comment-input"
      placeholder="说点什么..."
      multi-line
      :rows="4"
      full-width
    ></mu-text-field>
    <mu-button class="comment-btn" color="primary">评论</mu-button>
  </div>
</template>
<style lang="less" scoped>
.comment-input {
  padding: 0 16px;
}
.comment-btn {
  margin:0 16px 16px 0;
  float: right;

}
</style>