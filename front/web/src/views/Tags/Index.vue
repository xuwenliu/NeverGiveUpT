<template>
  <div class="tags">
    <!-- :style="{background:`url(${info.tagsBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <TagsAnimation></TagsAnimation>
    <div class="content">
      <div v-if="isPC" class="waves">
        <i
          :style="{
            background:item.color,
            '-webkit-animation': `shake 1s ${0.02857 * (index+1)}s infinite`
            }"
          v-for="(item,index) in tags"
          :key="index"
          @click="goDetail(item)"
        >{{item.name}}({{item.articleNum}})</i>
      </div>
      <div v-else class="tags-wap">
        <mu-chip
          :style="{
            '-webkit-animation': `${item.randomAnimation} 2s ${0.02857 * (index+1)}s infinite`
            }"
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
import { randomColor, randomNum } from "@/utils";
import TagsAnimation from "@/components/TagsAnimation";
const arr = ["bounce", "drop", "rotate"];

export default {
  name: "tags",
  components: {
    TagsAnimation
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
                randomAnimation: arr[randomNum(0, 3)]
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
  background: #000;
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

.waves {
  position: absolute;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    display: inline-block;
    height: 50px;
    width: 20px;
    margin-right: 20px;
    background: skyblue;
    writing-mode: vertical-lr;
    text-align: center;
    color: #fff;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
}

.tags-wap {
  padding: 0 20px;
  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
    // animation: drop 5s linear infinite;
    cursor: pointer;
  }
}
</style>