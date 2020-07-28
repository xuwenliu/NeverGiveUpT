<template>
  <div
    class="index"
    :style="{background:`url(${info.homeBgImg}) center center no-repeat`,backgroundSize:'cover'}"
  >
    <div class="content">
      <img :class="{rotate:info.avatarRotate}" :src="info.avatar" alt />
      <p class="desc">{{info.introduction}}</p>
    </div>
  </div>
</template>
<script>
let timer = 0;
let i = 0;

export default {
  name: "index",
  data() {
    return {
      info: {
        homeBgImg: "https://xuwenliu.github.io/img/index.jpg",
        avatar: "https://xuwenliu.github.io/img/avatar.jpg",
        avatarRotate: true,
        introductionTarget: "There is a kind of call to eat together.",
        introduction: "",
        effects: false
      }
    };
  },
  mounted() {
    this.$progress.start();
    if (this.info.effects) {
      this.typing();
    } else {
      this.info.introduction = this.info.introductionTarget;
    }
    this.$progress.done();

  },
  methods: {
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .content {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 18px;
    color: #fff;
    font-weight: 500;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }
    img.rotate {
      -webkit-animation: rotate 3s linear infinite;
      animation: rotate 3s linear infinite;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    transition: all 3s;
  }
}
</style>