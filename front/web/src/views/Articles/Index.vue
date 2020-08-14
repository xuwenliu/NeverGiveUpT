<template>
  <div class="articles">
    <Header></Header>
    <mu-row>
      <mu-col span="6" offset="2">
        <mu-card @click="goDetail(item)" class="card" v-for="item in info.list" :key="item._id">
          <div class="cover">
            <img class="cover-img" v-lazy="item.cover" />
          </div>
          <div class="content">
            <div class="title">{{item.title}}</div>
            <mu-card-actions class="sub-title">
              <mu-button flat color="success">查看({{item.views}})</mu-button>
              <mu-button flat color="primary">评论({{item.comment}})</mu-button>
              <mu-button flat color="red">点赞({{item.like}})</mu-button>
              <mu-button flat color="#9e9e9e">{{item.createTime | filterDate}}</mu-button>
            </mu-card-actions>
            <mu-card-text class="text">{{item.introduction}}</mu-card-text>
            <mu-card-actions>
              <mu-button flat color="primary">
                <mu-icon left value="dns"></mu-icon>
                {{item.categories}}
              </mu-button>

              <mu-button flat v-for="sub in item.tags" :key="sub">
                <mu-icon left value="loyalty"></mu-icon>
                {{sub}}
              </mu-button>
            </mu-card-actions>
          </div>
        </mu-card>
        <div v-if="info.totalCount > pageSize" class="pagination">
          <mu-pagination
            raised
            circle
            :total="info.totalCount"
            :current.sync="page"
            :pageSize.sync="pageSize"
            @change="pageChange"
          ></mu-pagination>
        </div>
      </mu-col>
      <mu-col span="2" offset="1">
        <RightConfig showPosition="文章"></RightConfig>
      </mu-col>
    </mu-row>

    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: "articles",
  components: {
    RightConfig,
    Footer,
    Header
  },

  data() {
    return {
      page: 1,
      pageSize: 10,
      info: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.$progress.start();
      const res = await this.$axios.get(
        `/articles?page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.info = res.data;
        this.$progress.done();
      }
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    goDetail(item) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: item._id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.articles {
  padding-top: 64px;
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
      flex: 1;
      border-radius: 0;
      padding: 16px;
      .cover-img {
        width: 240px;
        height: 120px;
        vertical-align: middle;
      }
    }
    .content {
      flex: 2;
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