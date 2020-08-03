<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }
};
</script>
<style lang="less">
@-webkit-keyframes shake {
  0% {
    height: 50px;
    margin-top: 0;
  }
  50% {
    height: 400px;
    margin-top: -50px;
  }
  100% {
    height: 50px;
    margin-top: 0;
  }
}

@-moz-keyframes shake {
  0% {
    height: 50px;
    margin-top: 0;
  }
  50% {
    height: 400px;
    margin-top: -50px;
  }
  100% {
    height: 50px;
    margin-top: 0;
  }
}

@keyframes shake {
  0% {
    height: 50px;
    margin-top: 0;
  }
  50% {
    height: 400px;
    margin-top: -50px;
  }
  100% {
    height: 50px;
    margin-top: 0;
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -moz-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  50% {
    -moz-transform: rotate(-15deg);
    -ms-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  75% {
    -moz-transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  85% {
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
}
@-moz-keyframes bounce {
  0%,
  100% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -moz-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  50% {
    -moz-transform: rotate(-15deg);
    -ms-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  75% {
    -moz-transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  85% {
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -moz-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  50% {
    -moz-transform: rotate(-15deg);
    -ms-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }
  75% {
    -moz-transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  85% {
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
}

@keyframes drop {
  0% {
    transform: scale(0.5);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(1);
  }
  to {
    transform: scale(0.5);
  }
}
@keyframes rotate {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.1, 0.9);
  }
  75% {
    ransform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>