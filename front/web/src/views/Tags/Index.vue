<template>
  <div class="common">
    <!-- :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <Header :light-index="4"></Header>
    <TagsAnimation></TagsAnimation>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="标签"></RightConfig>
    </div>
    <div class="content">
      <div class="tags-wap">
        <mu-chip
          class="tag"
          v-for="(item,index) in tags"
          :key="index"
          :color="item.color"
          @click="goDetail(item)"
        >{{item.name}}({{item.articleNum}})</mu-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { randomColor } from "@/utils";
import TagsAnimation from "@/components/TagsAnimation";
import Header from "@/components/Header";
import RightConfig from "@/components/RightConfig";

export default {
  name: "tags",
  components: {
    TagsAnimation,
    Header,
    RightConfig
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
  .tag {
    margin-right: 0.53333rem;
    margin-bottom: 0.53333rem;
    cursor: pointer;
  }
}
</style>