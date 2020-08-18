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
          <mu-button @click="replay(item)" small color="primary">回复</mu-button>
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
            <mu-button small color="primary">回复</mu-button>
          </mu-card-actions>
        </mu-card>
      </mu-card>
    </div>

    <mu-dialog
      title="评论回复 @昵称"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-text-field
        v-model="replayContent"
        class="comment-input"
        placeholder="说点什么..."
        multi-line
        :rows="4"
        full-width
      ></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok">确定</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      replayContent:'',
    };
  },
  methods: {
    replay(item) {
      console.log(item);
      this.open = true;
    },
    close(){
      this.open = false;
      this.replayContent = '';
    },
    ok(){
      this.close();
    }
  }
};
</script>
<style lang="less" scoped>
.comment-item {
  padding-bottom: 0.53333rem;
  /deep/ .mu-card-text {
    padding-top: 0;
    .who {
      color: #e91e63;
    }
  }
}
.card {
  margin: 0.42667rem 1.06667rem 0 1.06667rem;
  padding-bottom: 0.42667rem;
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