<template>
  <div class="footer">
    <div>{{footer.copyright}}</div>
    <div>{{footer.extra}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footer: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const res = await this.$axios.get("/header");
      if (res.data) {
        this.footer = res.data.footer;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
  color: #fff;
  text-align: center;
  font-size: 0.26667rem;
  margin: 30px 0;
}
</style>