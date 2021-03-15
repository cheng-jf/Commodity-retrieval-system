<template>
  <div id="app">
        <h2>欢迎使用简易商品检索系统</h2>
        <Search msg=" 欢迎使用简易商品搜索系统 "/>
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Search
  }
}
</script>
