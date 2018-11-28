<template>
    <nav v-if="isLogged" class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Rôle : {{user.role}}</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" v-on:click="logout()">Sign out</a>
        </li>
      </ul>
    </nav>
</template>



<script>
    export default {
        name: "NavbarComponent",
        data() {
            return {
                isLogged: false,
                user: {}
            }
        },
        beforeCreate(){
            setInterval(()=>{
                this.isLogged = (localStorage.getItem("jwt")!=null)
            }, 100)
        },
        created(){
            this.user = JSON.parse(localStorage.getItem("user"));
        },
        methods: {
            logout() {
                this.$router.go("login")
                this.isLogged = false
                localStorage.removeItem("user")
                localStorage.removeItem("jwt")
            }
        }
    }
</script>

<style scoped>
/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}



</style>