<template>
  <div class="common">
    <!-- :style="{background:`url(${info.categoriesBgImg}) center center no-repeat`,backgroundSize:'cover'}" -->
    <Header :light-index="3"></Header>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="分类"></RightConfig>
    </div>

    <div class="content" :style="{'flex-direction':isPC?'row':'column'}">
      <mu-paper
        class="paper"
        :style="{background:item.color}"
        :z-depth="5"
        v-for="(item) in categories"
        :key="item.name"
        circle
        @click="goDetail(item)"
      >
        <div class="text">
          <span>{{item.name}}</span>
          <span>{{item.articleNum}}</span>
        </div>
      </mu-paper>
    </div>
  </div>
</template>
<script>
import { randomColor } from "@/utils";
import Header from "@/components/Header";
import RightConfig from "@/components/RightConfig";

export default {
  name: "categories",
  components: {
    Header,
    RightConfig
  },
  data() {
    return {
      randomColor: randomColor(),
      categories: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const res = await this.$axios.get("/categories");
      if (res.data) {
        this.categories = res.data.list
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
        name: "categoriesDetails",
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
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.paper {
  width: 2.66667rem;
  height: 2.66667rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: slideInRight 1s;
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
  }
}
</style>