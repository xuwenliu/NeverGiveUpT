<template>
  <div class="categories">
    <TagsAnimation></TagsAnimation>
    <!-- :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <div class="content">
      <mu-paper v-if="isPC" :z-depth="5" class="box">
        <mu-list>
          <mu-sub-header class="header">标签-{{info.name}}({{info.totalCount}})</mu-sub-header>
          <div v-for="(item,index) in info.list" :key="index">
            <mu-list-item>
              <mu-ripple
                @click="goArticlesDetails(item)"
                style="width:100%"
                color="red"
                :opacity="0.5"
              >
                <mu-list-item-title class="item">
                  <span class="title">{{item.title}}</span>
                  <span>{{item.createTime | filterDate}}</span>
                </mu-list-item-title>
              </mu-ripple>
            </mu-list-item>

            <mu-divider />
          </div>
        </mu-list>

        <div v-if="info.totalCount > pageSize" class="pagination">
          <mu-pagination
            raised
            :total="info.totalCount"
            :current.sync="page"
            :pageSize.sync="pageSize"
            @change="pageChange"
          ></mu-pagination>
        </div>
      </mu-paper>

      <div class="more" v-else :style="{height:moreHeight}">
        <div class="sub-title">标签-{{info.name}}({{info.totalCount}})</div>

        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <div v-for="(item,index) in info.list" :key="index">
              <mu-list-item>
                <mu-ripple
                  @click="goArticlesDetails(item)"
                  style="width:100%"
                  color="rgb(156, 39, 176)"
                  :opacity="0.5"
                >
                  <mu-list-item-title class="item">
                    <span class="title">{{item.title}}</span>
                    <span>{{item.createTime | filterDate}}</span>
                  </mu-list-item-title>
                </mu-ripple>
              </mu-list-item>
              <mu-divider />
            </div>
          </mu-list>
        </mu-load-more>
      </div>

      <mu-button v-show="!isPC" @click="$router.go(-1)" class="search-fab" small fab color="#fff">
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import TagsAnimation from "@/components/TagsAnimation";

export default {
  name: "tagsDetails",
  components: {
    TagsAnimation
  },
  data() {
    return {
      moreHeight: window.innerHeight - 64 + "px",
      page: 1,
      pageSize: 10,
      isPC: this.isPC,
      info: {},
      refreshing: false,
      loading: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const id = this.$route.query.id;
      const res = await this.$axios.get(
        `/tags/details?id=${id}&page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.info = res.data;
        this.$progress.done();
      }
    },
    pageChange(page) {
      this.page = page;
      this.getInfo();
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 1;
        this.getInfo();
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.page += 1;
        this.getInfo();
      }, 2000);
    },
    goArticlesDetails(item) {
      this.$router.push({
        name: "articlesDetails",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.categories {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .content {
    padding-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .box {
      width: 50%;
      background: rgba(255, 255, 255, 0.5);
      .header {
        font-size: 24px;
        color: #333;
      }
      .item {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        color: #555;
        .title {
          display: inline-block;
          width: 70%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .pagination {
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
}

.more {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ccc;
    .title {
      display: inline-block;
      width: 70%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.sub-title {
  position: absolute;
  top: 20px;
  right: 26px;
  color: #ccc;
}
.search-fab {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
}
</style>