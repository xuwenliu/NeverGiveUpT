<template>
  <div class="about">
    <Header :light-index="5" background="#000"></Header>
    <AboutAnimation></AboutAnimation>

    <div class="content">
      <mu-card class="card" :style="{marginTop:isPC?'100px':'0'}">
        <mu-card-header>
          <mu-paper v-if="isPC" class="avatar-box" circle :z-depth="5">
            <img class="avatar" v-lazy="avatar" />
          </mu-paper>
          <mu-button v-if="info.showResume" :color="randomColor">
            个人简历
            <mu-icon right value="arrow_forward"></mu-icon>
          </mu-button>
        </mu-card-header>
        <mu-carousel hide-indicators hide-controls @change="change">
          <mu-carousel-item v-for="item in info.imgs" :key="item._id">
            <img v-lazy="item.imgUrl" />
          </mu-carousel-item>
        </mu-carousel>
        <mu-card-text>{{info.desc}}</mu-card-text>
        <div class="tags">
          <mu-chip
            class="tag"
            v-for="(item, index) in info.tags"
            :key="item.name"
            :color="item.color"
            @delete="remove(index)"
            delete
          >{{item.name}}</mu-chip>
          <mu-button color="primary" v-if="info.tags && info.tags.length === 0" @click="reset">reset</mu-button>
        </div>
      </mu-card>
    </div>
  </div>
</template>
<script>
import AboutAnimation from "@/components/AboutAnimation";
import { randomColor } from "@/utils";
import Header from "@/components/Header";

export default {
  name: "about",
  components: {
    AboutAnimation,
    Header
  },
  data() {
    return {
      avatar: this.avatar,
      randomColor: randomColor(),
      info: {}
    };
  },
  mounted() {
    this.createdBalls();
    this.getInfo();
  },

  methods: {
    async getInfo() {
      this.$progress.start();
      const res = await this.$axios.get("/about");
      if (res.data) {
        this.info = res.data;
        this.info.tags = this.info.tags.map(item => {
          return {
            name: item,
            color: randomColor()
          };
        });
        this.$progress.done();
      }
    },
    createdBalls() {
      this.randomColor = randomColor();
    },
    change() {
      this.createdBalls();
    },
    remove(index) {
      this.info.tags.splice(index, 1);
    },
    reset() {
      this.getInfo();
    }
  }
};
</script>
<style lang="less" scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .content {
    padding-top: 64px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .mu-card-header {
      display: flex;
      justify-content: flex-end;
      height: 50px;
    }
    .avatar-box {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
.tags {
  padding: 16px;
  .tag {
    margin-bottom: 16px;
    margin-right: 16px;
  }
}
.mu-carousel {
  height: 200px;
  margin-top: 20px;
}
.mu-carousel-item > img {
  width: 100%;
  height: 100%;
}
.card {
  max-width: 375px;
  margin: 0 auto;
  animation: backInUp 2s;
  background: rgba(255, 255, 255, 0.5);
}

@-webkit-keyframes backInUp {
  0% {
    -webkit-transform: translateY(1200px) scale(0.7);
    transform: translateY(1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateY(0) scale(0.7);
    transform: translateY(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes backInUp {
  0% {
    -webkit-transform: translateY(1200px) scale(0.7);
    transform: translateY(1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateY(0) scale(0.7);
    transform: translateY(0) scale(0.7);
    opacity: 0.7;
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
</style>