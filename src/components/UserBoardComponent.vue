<template>
    <div class="container-fluid">
        <div class="row">
            <sidebar-component></sidebar-component>
        </div>
    </div>
</template>

<script>
import SidebarComponent from "./SidebarComponent";
export default {
  name: "UserBoardComponent",
  components: {
    SidebarComponent
  },
  data() {
    return {
      msg: "The commoners"
    };
  }
};
</script>

<style scoped>
</style>