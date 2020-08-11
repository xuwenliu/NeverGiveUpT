<template>
  <div class="comment-list">
    <div class="comment-item">
      <mu-card class="card" v-for="item in 5" :key="item">
        <mu-card-header title="昵称" sub-title="2020-09-03">
          <mu-avatar slot="avatar">
            <img src="../assets/img/4.jpeg" />
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>{{item}}散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。</mu-card-text>
        <mu-card-actions>
          <mu-button small color="purple">回复</mu-button>
        </mu-card-actions>

        <mu-card class="card sub-card" v-for="item in 5" :key="item">
          <mu-card-header title="昵称" sub-title="2020-09-03">
            <mu-avatar slot="avatar">
              <img src="../assets/img/4.jpeg" />
            </mu-avatar>
          </mu-card-header>
          <mu-card-text>
            <span class="who">@昵称已经来了</span>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
            似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
            找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
          </mu-card-text>
          <mu-card-actions>
            <mu-button small color="purple">回复</mu-button>
          </mu-card-actions>
        </mu-card>
      </mu-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.comment-item {
  padding-bottom: 20px;
  /deep/ .mu-card-text {
    padding-top: 0;
    .who {
      color: #e91e63;
    }
  }
}
.card {
  margin: 16px 40px 0 40px;
  padding-bottom: 16px;
  box-shadow: none;
  border-radius: 0;
}
.sub-card {
  border-left: 1px dashed purple;
  border-bottom: 1px dashed purple;
  box-shadow: none;
  border-radius: 0;
}
</style>