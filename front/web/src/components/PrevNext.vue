<template>
  <div class="prev-next clearfix">
    <mu-tooltip class="prev" v-if="prev" placement="top" :content="prev.title">
      <mu-button @click="goDetails(prev)">
        <mu-icon left value="arrow_back"></mu-icon>上一篇
      </mu-button>
    </mu-tooltip>
    <mu-tooltip class="next" v-if="next" placement="top" :content="next.title">
      <mu-button @click="goDetails(next)" color="primary">
        下一篇
        <mu-icon right value="arrow_forward"></mu-icon>
      </mu-button>
    </mu-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    prev: {
      type: Object
    },
    next: {
      type: Object
    }
  },
  methods: {
    goDetails(item) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: item._id }
      });
      location.reload();
      document.body.scrollIntoView();
    }
  }
};
</script>
<style lang="less" scoped>
.prev-next {
  .prev {
    float: left;
  }
  .next {
    float: right;
  }
}
</style>