<template>
  <div id="app">
    <navbar-component></navbar-component>
    <router-view></router-view>
  </div>
</template>

<script>

import NavbarComponent from "./components/NavbarComponent";
export default {
  name: 'app',
  components: {
      NavbarComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*
 * Utilities
 */

.border-top {
    border-top: 1px solid #e5e5e5;
}

.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

body {
    font-size: .875rem;    
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

</style>
