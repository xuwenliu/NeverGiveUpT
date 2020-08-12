<template>
  <div class="articles">
    <mu-row>
      <mu-col span="6" offset="2">
        <mu-card @click="goDetail(item)" class="card" v-for="item in list" :key="item">
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
              <mu-button flat color="primary">
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
        <RightConfig></RightConfig>
      </mu-col>
    </mu-row>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";

export default {
  name: "articles",
  components: {
    RightConfig
  },

  data() {
    return {
      page: 1,
      list: 10
    };
  },
  methods: {
    pageChange() {},
    goDetail(item) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: item }
      });
    }
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