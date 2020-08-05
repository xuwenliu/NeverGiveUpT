<template>
  <canvas ref="canvas" style="width:100%"></canvas>
</template>
<script>
import { index_fullScreenAnimation } from "@/utils";
export default {
  mounted() {
    index_fullScreenAnimation(this.$refs.canvas);
  }
};
</script>