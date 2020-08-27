<template>
  <div class="common">
    <Header :light-index="2"></Header>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="归档"></RightConfig>
    </div>
    <div class="content">
      <vue-timeline-update
        v-for="(item,index) in list"
        :key="item.year"
        :date="new Date(item.createTime * 1000)"
        :title="item.year"
        :description="item.title"
        icon="alarm"
        color="green"
        :is-last="index === list.length - 1"
      >
        <vue-timeline-update
          v-for="(sub,idx) in item.list"
          :key="sub._id"
          :title="sub.createTime | filterDate('MM-DD')"
          :date="new Date(sub.createTime * 1000)"
          :description="sub.title"
          :icon="sub.icon"
          @click="goDetail(sub)"
          :color="sub.color"
          :is-last="idx === item.list.length - 1"
        ></vue-timeline-update>
      </vue-timeline-update>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import RightConfig from "@/components/RightConfig";
import { randomNum } from "@/utils";
const colors = [
  "black",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "turquoise",
  "white"
];
const icons = {
  技术: "code",
  生活: "local_cafe",
  照片: "photo",
  其他: "more"
};
export default {
  name: "archive",
  components: {
    Header,
    Footer,
    RightConfig
  },
  data() {
    return {
      isPC: this.isPC,
      list: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();
      const res = await this.$axios.get("/archives");

      if (res.data) {
        const list = res.data;

        list.map(item => {
          item.year = new Date(item.createTime * 1000).getFullYear();
          item.color = colors[randomNum(1, 8)];
          item.icon = icons[item.categories];
          return item;
        });
        const couponInstance = list.reduce((all, cur) => {
          all[cur.year] = all[cur.year] ? all[cur.year].concat(cur) : [cur];
          return all;
        }, {});
        const result = [];
        for (let i in couponInstance) {
          result.push({
            year: i,
            list: couponInstance[i]
          });
        }
        this.list = result.reverse();
        this.$progress.done();
        loading.close();
      }
    },
    goDetail(item) {
      this.$router.push({
        name: "articlesDetails",
        query: {
          id: item._id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /deep/ .gb-vue-timeline-update__left {
    display: none;
  }
  /deep/ .gb-vue-timeline-update__right {
    .gb-vue-timeline-update__information {
      .gb-vue-timeline-update__meta {
        display: none;
      }
    }
  }
  /deep/ .gb-base-icon {
    color: #00e676;
  }
}
</style>