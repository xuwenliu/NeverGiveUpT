<template>
  <div
    class="common"
    :style="{background:`url(https://xuwenliu.github.io/img/archive.jpg) center center no-repeat`,backgroundSize:'cover'}"
  >
    <Header :light-index="4" background="transparent"></Header>
    <div class="custom-footer">
      <Footer></Footer>
    </div>

    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="标签"></RightConfig>
    </div>
    <div class="content">
      <div class="tags-wap" :style="{width:isPC?'70%':'100%'}">
        <span v-for="(item,index) in tags" :key="index">
          <mu-chip
            v-if="item.articleNum > 0"
            class="tag"
            :color="item.color"
            @click="goDetail(item)"
          >{{item.name}}({{item.articleNum}})</mu-chip>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { randomColor } from "@/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import RightConfig from "@/components/RightConfig";
export default {
  name: "tags",
  components: {
    Header,
    RightConfig,
    Footer
  },
  data() {
    return {
      isPC: this.isPC,
      tags: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const res = await this.$axios.get("/tags");
      if (res.data) {
        this.tags = res.data.list
          ? res.data.list.map(item => {
              return {
                ...item,
                color: randomColor()
              };
            })
          : [];
        this.$progress.done();
        loading.close();
      }
    },

    goDetail(item) {
      this.$router.push({
        name: "tagsDetails",
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
  padding-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
}

.tags-wap {
  padding: 0 0.53333rem;
  width: 70%;
  .tag {
    margin-right: 0.53333rem;
    margin-bottom: 0.53333rem;
    cursor: pointer;
  }
}

</style>