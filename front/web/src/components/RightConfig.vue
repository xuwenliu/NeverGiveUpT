<template>
  <div>
    <mu-card v-if="!hideIntroduction" class="slider-card">
      <mu-avatar class="avatar" size="100">
        <img src="../assets/img/4.jpeg" alt />
      </mu-avatar>
      <div class="title">NeverGiveUpT</div>
      <div class="desc">专注于WEB和移动前端开发</div>
      <div class="tags">
        <mu-chip
          class="chip"
          v-for="item in tagsArr"
          :key="item.name"
          :color="item.color"
        >{{item.name}}</mu-chip>
      </div>
      <div class="friend-link-box">
        <p class="friend-link-title">友情链接</p>
        <div class="friend-links">
          <mu-button
            v-for="item in links"
            :key="item.icon"
            class="link"
            fab
            small
            :color="item.color"
          >
            <mu-icon :value="item.icon"></mu-icon>
          </mu-button>
        </div>
      </div>
    </mu-card>

    <mu-card v-if="!hideAd" class="slider-card card-ad">
      <div class="ad">广告</div>
      <mu-carousel style="height:120px" hide-controls>
        <mu-carousel-item v-for="item in imgs" :key="item._id">
          <img style="width:100%" :src="item.imgUrl" />
        </mu-carousel-item>
      </mu-carousel>
    </mu-card>

    <mu-card v-if="!hideRecommend" class="slider-card">
      <div class="friend-link-box">
        <p class="friend-link-title">电影推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in tagsArr"
              :key="item.name"
              :color="item.color"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">电视剧推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in tagsArr"
              :key="item.name"
              :color="item.color"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">音乐推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in tagsArr"
              :key="item.name"
              :color="item.color"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>
    </mu-card>
  </div>
</template>
<script>
import about from "@/assets/img/about.jpg";
import archive from "@/assets/img/archive.jpg";
import index from "@/assets/img/index.jpg";

import about_1 from "@/assets/img/wap_category.jpg";
import about_2 from "@/assets/img/wap_tags.jpeg";
import about_3 from "@/assets/img/wap_index.jpg";
import { randomColor } from "@/utils";
export default {
  props: {
    hideAd: {
      type: Boolean,
      default: false
    },
    hideIntroduction:{
      type: Boolean,
      default: false
    },
    hideRecommend:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    tagsArr() {
      return this.tags.map(item => {
        return {
          name: item,
          color: randomColor()
        };
      });
    }
  },
  mounted() {},
  data() {
    return {
      tags: ["Vue", "4年经验", "自由职业", "文章20篇", "博客访问300次"],
      imgs: [
        {
          _id: "5f1ff64eabe2afa928d57d88",
          imgUrl: this.isPC ? about : about_1,
          link: "https://www.baidu.com"
        },
        {
          _id: "5f1ff64eabe2afa928d57d89",
          imgUrl: this.isPC ? archive : about_2,
          link: "https://www.jd.com"
        },
        {
          _id: "5f1ff64eabe2afa928d57d8a",
          imgUrl: this.isPC ? index : about_3,
          link: ""
        }
      ],
      links: [
        {
          color: "primary",
          icon: ":mudocs-icon-custom-github",
          url: "https://xuwenliu.github.com"
        },
        {
          color: "pink",
          icon: "android",
          url: ""
        },
        {
          color: "indigo",
          icon: "remove",
          url: ""
        },
        {
          color: "teal",
          icon: "add",
          url: ""
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.slider-card {
  position: relative;
  margin-top: 16px;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
  .avatar {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
  .title {
    font-size: 20px;
    color: purple;
  }
  .desc {
    font-size: 14px;
    margin: 10px 0;
  }
  .tags {
    .chip {
      margin: 0 10px 10px 0;
    }
  }
  .friend-link-box {
    .friend-link-title {
      position: relative;
      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .friend-links {
      display: flex;
      justify-content: space-around;
    }
  }
  .ad {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
    font-size: 12px;
  }
}
.card-ad {
  padding: 8px;
}
</style>