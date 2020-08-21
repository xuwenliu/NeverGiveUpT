<template>
  <div class="prev-next">
    <div class="prev" @click="goDetails(prev)" v-if="prev">上一篇： {{prev.title}}</div>
    <div class="next" @click="goDetails(next)" v-if="next">下一篇： {{next.title}}</div>
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
  color: #5e35b1;
  font-size: 0.24rem;
  .prev{
    cursor: pointer;
    padding: 5px 0;
  }
  .next {
    cursor: pointer;
    padding: 5px 0;
  }
}
</style>