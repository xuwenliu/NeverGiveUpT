<template>
  <div class="common">
    <Header :light-index="4"></Header>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="标签详情"></RightConfig>
    </div>
    <!-- :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <div class="content">
      <mu-paper v-if="isPC" :z-depth="5" class="pc-box">
        <mu-list>
          <mu-sub-header class="header">标签-{{info.name}}({{info.totalCount}})</mu-sub-header>
          <div v-for="(item,index) in info.list" :key="index">
            <mu-list-item>
              <mu-ripple
                @click="goArticlesDetails(item)"
                style="width:100%;cursor:pointer"
                color="#00e676"
                :opacity="0.5"
              >
                <mu-list-item-title class="item">
                  <span class="title">{{item.title}}</span>
                  <span>{{item.createTime | filterDate}}</span>
                </mu-list-item-title>
              </mu-ripple>
            </mu-list-item>
            <mu-divider v-if="info.list.length !==1" />
          </div>
        </mu-list>

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
      </mu-paper>

      <!-- wap-loadmore -->
      <div class="wap-box" v-else :style="{height:moreHeight}">
        <div class="sub-title">标签-{{info.name}}({{info.totalCount}})</div>
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <div v-for="(item,index) in list" :key="index">
              <mu-list-item>
                <mu-ripple
                  @click="goArticlesDetails(item)"
                  style="width:100%;cursor:pointer"
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

      <!-- wap-展示返回按钮 -->
      <mu-button v-show="!isPC" @click="$router.go(-1)" class="back-fab" small fab color="#fff">
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import RightConfig from "@/components/RightConfig";

export default {
  name: "tagsDetails",
  components: {
    Header,
    RightConfig,
  },
  data() {
    return {
      moreHeight: window.innerHeight - 64 + "px",
      page: 1,
      pageSize: this.isPC ? 10 : 15,
      list: [],
      isPC: this.isPC,
      info: {},
      refreshing: false,
      loading: false,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const id = this.$route.query.id;
      const res = await this.$axios.get(
        `/tags/details?id=${id}&page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.info = res.data;
        const result = res.data.list;
        if (this.page === 1) {
          this.list = result;
        } else {
          this.list = this.list.concat(result);
        }
        this.$progress.done();
        loading.close();
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
          id: item.id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
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
}
</style>