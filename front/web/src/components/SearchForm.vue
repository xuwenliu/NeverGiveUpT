<template>
  <div class="register-form">
    <mu-dialog
      :width="isPC?'400px':'auto'"
      max-width="100%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-auto-complete
        action-icon="search"
        label-float
        :data="fruits"
        :max-search-results="5"
        v-model="keyword"
        open-on-focus
        full-width
      ></mu-auto-complete>
      <mu-button slot="actions" small flat @click="clear">取消</mu-button>
      <mu-button slot="actions" small flat color="primary" @click="submit">搜索</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
const fruits = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Blood Orange",
  "Cantaloupe",
  "Currant",
  "Cherry",
  "Cherimoya",
  "Cloudberry",
  "Coconut",
  "Cranberry",
  "Clementine",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Goji berry",
  "Gooseberry",
  "Grape",
  "Grapefruit",
  "Guava",
  "Honeydew",
  "Huckleberry",
  "Jabouticaba",
  "Jackfruit",
  "Jambul",
  "Jujube",
  "Juniper berry",
  "Kiwi fruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Lychee",
  "Nectarine",
  "Mango",
  "Marion berry",
  "Melon",
  "Miracle fruit",
  "Mulberry",
  "Mandarine",
  "Olive",
  "Orange",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Physalis",
  "Plum",
  "Pineapple",
  "Pumpkin",
  "Pomegranate",
  "Pomelo",
  "Purple Mangosteen",
  "Quince",
  "Raspberry",
  "Raisin",
  "Rambutan",
  "Redcurrant",
  "Salal berry",
  "Satsuma",
  "Star fruit",
  "Strawberry",
  "Squash",
  "Salmonberry",
  "Tamarillo",
  "Tamarind",
  "Tomato",
  "Tangerine",
  "Ugli fruit",
  "Watermelon"
];

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    }
  },
  data() {
    return {
      isPC: this.isPC,
      fruits,
      keyword: ""
    };
  },
  methods: {
    submit() {
      this.clear();
    },
    clear() {
      this.keyword = "";
      this.$emit("toggle", false);
    }
  }
};
</script>
<style lang="less" scoped>
</style>