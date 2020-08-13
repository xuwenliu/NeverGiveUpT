<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <div class="index">
      <div class="content">
        <p>{{info.introduction}}</p>
      </div>
    </div>
  </div>
</template>
<script>
let timer = 0;
let i = 0;
import IndexAnimation from "@/components/IndexAnimation";
export default {
  name: "index",
  components: {
    IndexAnimation
  },
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const res = await this.$axios.get("/home");

      if (res.data) {
        this.info = {
          ...res.data,
          introductionTarget: res.data.introduction
        };
        this.$progress.done();
        if (this.info.effects) {
          this.typing();
        } else {
          this.info.introduction = this.info.introductionTarget;
        }
      }
    },
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .content {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 18px;
    color: #fff;
    font-weight: 500;
  }
}
</style>