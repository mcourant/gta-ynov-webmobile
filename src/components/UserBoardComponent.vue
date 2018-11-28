<template>
    <div>
      <navbar-component></navbar-component>
    
      <div class="container-fluid">
          <div class="row">
              <sidebar-component @clicked="onMenuChange" ></sidebar-component>
              <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <router-view></router-view>
              </main>
          </div>
      </div>
    </div>
</template>

<script>
import SidebarComponent from "./SidebarComponent"
import NavbarComponent from "./NavbarComponent";
export default {
  name: "UserBoardComponent",
  components: {
    SidebarComponent,
    NavbarComponent
  },
  data() {
    return {
      msg: "The commoners"
    };
  },
  methods: {
    onMenuChange(menu) {
      console.log(menu);
    }
  }
};
</script>

<style scoped>
</style>