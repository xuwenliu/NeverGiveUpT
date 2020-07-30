<template>
  <div
    class="about"
    :style="{background:`url(${info.aboutBgImg}) center center no-repeat`,backgroundSize:'cover'}"
  >
    <div class="content">
      <mu-card :style="{width: isPC? '100%':'80%'}" style="max-width: 375px; margin: 0 auto;">
        <mu-card-header>
          <mu-paper class="avatar-box" circle :z-depth="5">
            <img class="avatar" :src="info.avatar" />
          </mu-paper>
          <mu-button color="success">
            个人简历
            <mu-icon right value="arrow_forward"></mu-icon>
          </mu-button>
        </mu-card-header>

        <mu-carousel v-if="isPC" hide-indicators style="height:250px">
          <mu-carousel-item v-for="item in info.imgs" :key="item._id">
            <img :src="item.imgUrl" />
          </mu-carousel-item>
        </mu-carousel>
        <mu-card-text>{{info.desc}}</mu-card-text>
      </mu-card>
    </div>
  </div>
</template>
<script>
import about from "@/assets/img/about.jpg";

export default {
  name: "about",
  data() {
    return {
      info: {
        avatar: "https://xuwenliu.github.io/img/avatar.jpg",
        aboutBgImg: about,
        tags: ["Vue", "React"],
        showResume: true,
        desc:
          "    50元跟着胖哥学一年，掌握程序的学习方法。 也许你刚步入IT\n行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，\n也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需\n要一个强力的队友，你需要一个资深老手，你需要一个随时可\n以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业\n走了12年，从后端、前端到移动端都从事过。",
        imgs: [
          {
            _id: "5f1ff64eabe2afa928d57d88",
            imgUrl: "https://xuwenliu.github.io/img/about.jpg",
            link: "https://www.baidu.com"
          },
          {
            _id: "5f1ff64eabe2afa928d57d89",
            imgUrl: "https://xuwenliu.github.io/img/index.jpg",
            link: "https://www.jd.com"
          },
          {
            _id: "5f1ff64eabe2afa928d57d8a",
            imgUrl: "https://xuwenliu.github.io/img/avatar.jpg",
            link: ""
          }
        ]
      }
    };
  },
  created() {
    this.$progress.start();
  }
};
</script>
<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 64px;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /deep/ .mu-card-header {
      display: flex;
      justify-content: flex-end;
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
  }
}
</style>