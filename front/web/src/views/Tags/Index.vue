<template>
  <div class="tags">
    <!-- :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <Header :light-index="4"></Header>
    <TagsAnimation></TagsAnimation>
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

export default {
  name: "tags",
  components: {
    TagsAnimation,
    Header
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
                color: randomColor(),
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
.tags {
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
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
  }
}

.tags-wap {
  padding: 0 20px;
  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>