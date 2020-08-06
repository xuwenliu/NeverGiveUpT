<template>
  <div class="articles">
    <mu-row>
      <mu-col span="7" offset="1">
        <mu-card class="card" v-for="item in list" :key="item">
          <div class="cover">
            <img class="cover-img" src="../../assets/img/4.jpeg" />
          </div>
          <div>
            <div
              class="title"
            >散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。</div>
            <mu-card-actions class="sub-title">
              <mu-button flat color="success">查看(20)</mu-button>
              <mu-button flat color="primary">评论(20)</mu-button>
              <mu-button flat color="red">点赞(20)</mu-button>
              <mu-button flat color="#9e9e9e">2020-8-25 12:00:00</mu-button>
            </mu-card-actions>
            <mu-card-text class="text">
              文章简介：散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
              调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
              似乎在诉说着-我也可以在漆黑的角落里，找到阴影背后的阳光，
              找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-card-text>
            <mu-card-actions>
              <mu-button flat color="purple">
                <mu-icon left value="dns"></mu-icon>技术
              </mu-button>

              <mu-button flat>
                <mu-icon left value="loyalty"></mu-icon>Vue
              </mu-button>

              <mu-button flat>
                <mu-icon left value="loyalty"></mu-icon>React
              </mu-button>
            </mu-card-actions>
          </div>
        </mu-card>
        <div class="pagination">
          <mu-pagination raised circle :total="50" :current.sync="page" @change="pageChange"></mu-pagination>
        </div>
      </mu-col>
      <mu-col span="2" offset="1">
        <mu-card class="slider-card">
          <mu-avatar class="avatar" size="100">
            <img src="../../assets/img/4.jpeg" alt />
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

        <mu-card class="slider-card card-ad">
          <div class="ad">广告</div>
          <mu-carousel style="height:120px" hide-controls @change="change">
            <mu-carousel-item v-for="item in imgs" :key="item._id">
              <img style="width:100%" :src="item.imgUrl" />
            </mu-carousel-item>
          </mu-carousel>
        </mu-card>

        <mu-card class="slider-card">
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
      </mu-col>
    </mu-row>
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
  name: "articles",
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
  data() {
    return {
      list: 10,
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
.articles {
  padding-top: 64px;
  background: #000;
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      animation: pulse 1s;
    }
    .title {
      padding: 16px 16px 0 16px;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .sub-title {
      display: flex;
      justify-content: flex-end;
    }
    .text {
      padding: 0 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .chip {
      margin-right: 10px;
    }
    .cover {
      width: 100%;
      border-radius: 0;
      padding: 16px;
      .cover-img {
        width: 100%;
        vertical-align: middle;
      }
    }
  }
}

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

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