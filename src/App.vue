<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast("删除");
    }
  }
};
</script>
<style lang="less">
html,
body {
  height: 100%;
}
::-webkit-scrollbar {
  width: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
input {
  border: none;
  border-bottom: 1px solid #f2f2f2;
  background-color: transparent;
  padding-left: 5px;
  margin-top: 5px;
  border-radius: 0;
  font-size: 14px;
  -webkit-appearance: none;
}

input[type="text"]:focus {
  outline: none;
  border-bottom: 1px solid #64b3ed;
}
input[type="password"]:focus {
  outline: none;
  border-bottom: 1px solid #64b3ed;
}
input[type="number"]:focus {
  outline: none;
  border-bottom: 1px solid #64b3ed;
}
::-webkit-input-placeholder {
  color: #cbd5e0;
}
</style>
