<template>
  <div class="articles">
    <Header :light-index="1"></Header>
    <div class="content">
      <div class="left">
        <mu-card
          :style="{width:isPC?'80%':'90%'}"
          class="card"
          v-for="item in info.list"
          :key="item._id"
        >
          <div v-if="isPC" class="cover">
            <img class="cover-img" v-lazy="item.cover" />
          </div>
          <div class="card-box">
            <div class="title" @click="goDetail(item)">{{item.title}}</div>
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="info">查看({{item.views}})</mu-button>
              <mu-button class="cursor-default" flat color="error">评论({{item.comment}})</mu-button>
              <mu-button class="cursor-default" flat color="primary">点赞({{item.like}})</mu-button>
              <mu-button
                class="cursor-default"
                flat
                color="#9e9e9e"
              >{{item.createTime | filterDate}}</mu-button>
            </mu-card-actions>
            <mu-card-text class="text">{{item.introduction}}</mu-card-text>
            <mu-card-actions>
              <mu-button flat class="chip cursor-default" color="primary">
                <mu-icon left value="dns"></mu-icon>
                {{item.categories}}
              </mu-button>

              <mu-button flat class="chip cursor-default" v-for="sub in item.tags" :key="sub">
                <mu-icon left value="loyalty"></mu-icon>
                {{sub}}
              </mu-button>
            </mu-card-actions>
          </div>
        </mu-card>
      </div>
      <div v-if="isPC" class="right">
        <RightConfig showPosition="文章"></RightConfig>
      </div>
    </div>

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
      isPC: this.isPC,
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
      const loading = this.$loading();

      const res = await this.$axios.get(
        `/articles?page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.info = res.data;
        this.$progress.done();
        loading.close();
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
  .content {
    padding-bottom: 0.53333rem;
    display: flex;
    .left {
      flex: 9;
      .card {
        width: 80%;
        margin: 0.42667rem auto 0;
        display: flex;
        flex-wrap: wrap;
        border-radius: 5px;
        &:hover {
          animation: pulse 1s;
        }
        .title {
          padding: 0.42667rem 0.42667rem 0 0.42667rem;
          font-size: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          cursor: pointer;
        }
        .sub-title {
          display: flex;
          flex-wrap: wrap;
        }
        .text {
          padding: 0 0.42667rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .chip {
          margin-right: 0.26667rem;
        }
        .cover {
          flex: 1;
          border-radius: 0;
          padding: 0.42667rem;
          .cover-img {
            object-fit: cover;
            width: 100%;
            height: 4.26667rem;
            vertical-align: middle;
          }
        }
        .card-box {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
    .right {
      flex: 3;
      display: flex;
      justify-content: center;
    }
  }

  .box {
    justify-content: center !important;
    padding-bottom: 0.53333rem;
  }
}

.pagination {
  margin: 0.53333rem 0;
  display: flex;
  justify-content: center;
}
</style>