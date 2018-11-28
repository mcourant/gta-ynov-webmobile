<template>

<div>
    <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
        <div class="alert alert-danger" v-if="error">
          <strong>Error!</strong> Email or password incorrect
        </div>
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input name="email" id="email" type="text" class="form-control" placeholder="email" v-model="email" required autofocus>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input name="password" id="password" type="password" class="form-control" placeholder="password" v-model="password" required>
					</div>
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-right login_btn" @click="handleSubmit">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</div>

</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      error:false
    };
  },
  methods: {
    handleSubmit(e) {
      let that = this
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("https://gta-ynov-webmobile-api.herokuapp.com/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            let role = response.data.user.role;
            console.log(response.data.user)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                switch (role) {
                  case "drh":
                    this.$router.push("dashboard");
                    break;
                  case "responsable":
                    this.$router.push("dashboard");
                    break;
                  case "salarie":
                    this.$router.push("dashboard");
                    break;
                  default:
                    break;
                }
              }
            }
          })
          .catch(function(error) {
            that.error = true
            console.log(error.response.data);
          });
      }else{
        this.error=true
      }
    }
  }
};
</script>

<style scoped>
/* Made with love by Mutiullah Samim*/

@import url("https://fonts.googleapis.com/css?family=Numans");

.container {
  height: 100vh;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>