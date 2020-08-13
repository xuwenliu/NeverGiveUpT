<template>
  <div class="about">
    <AboutAnimation></AboutAnimation>
    <!-- <mu-carousel hide-indicators hide-controls @change="change" style="position:fixed;height:100%">
      <mu-carousel-item v-for="item in info.imgs" :key="item._id">
        <img :src="item.imgUrl" />
      </mu-carousel-item>
    </mu-carousel>-->

    <div class="content">
      <mu-card class="card" :style="{width: isPC? '100%':'80%'}">
        <mu-card-header>
          <mu-paper class="avatar-box" circle :z-depth="5">
            <img class="avatar" :src="info.avatar" />
          </mu-paper>
          <mu-button v-if="info.showResume" :class="{fixed:!isPC}" :color="randomColor">
            个人简历
            <mu-icon right value="arrow_forward"></mu-icon>
          </mu-button>
        </mu-card-header>

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
// import about from "@/assets/img/about.jpg";
// import archive from "@/assets/img/archive.jpg";
// import index from "@/assets/img/index.jpg";

// import about_1 from "@/assets/img/wap_category.jpg";
// import about_2 from "@/assets/img/wap_tags.jpeg";
// import about_3 from "@/assets/img/wap_index.jpg";
import AboutAnimation from "@/components/AboutAnimation";
import { randomColor } from "@/utils";
export default {
  name: "about",
  components: {
    AboutAnimation
  },
  data() {
    return {
      randomColor: randomColor(),
      info: {
        // avatar: "https://xuwenliu.github.io/img/avatar.jpg",
        // aboutBgImg: about,
        // tags: ["Vue", "React", "node.js", "Angular", "Umi"],
        // showResume: true,
        // desc:
        //   "    50元跟着胖哥学一年，掌握程序的学习方法。 也许你刚步入IT\n行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，\n也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需\n要一个强力的队友，你需要一个资深老手，你需要一个随时可\n以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业\n走了12年，从后端、前端到移动端都从事过。",
        // imgs: [
        //   {
        //     _id: "5f1ff64eabe2afa928d57d88",
        //     imgUrl: this.isPC ? about : about_1,
        //     link: "https://www.baidu.com"
        //   },
        //   {
        //     _id: "5f1ff64eabe2afa928d57d89",
        //     imgUrl: this.isPC ? archive : about_2,
        //     link: "https://www.jd.com"
        //   },
        //   {
        //     _id: "5f1ff64eabe2afa928d57d8a",
        //     imgUrl: this.isPC ? index : about_3,
        //     link: ""
        //   }
        // ]
      }
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
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
        border-radius: 50%;
      }
    }
    .fixed {
      position: fixed;
      top: 10px;
      right: 10px;
      transition: all 2s;
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