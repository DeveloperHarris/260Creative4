<template>
  <div class="login">
    <div class="registrationForm">
      <div class="registrationHeader">Register</div>
      <div class="registrationName">
        <input type="text" v-model="firstName" placeholder="First" />
        <input type="text" v-model="lastName" placeholder="Last" />
      </div>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="submit" @click.prevent="register()" value="Register" />
    </div>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="message" v-if="registerMessage">{{ registerMessage }}</div>
    <div class="loginForm">
      <div class="loginHeader">Login</div>
      <input type="text" v-model="usernameLogin" placeholder="Username" />
      <input type="password" v-model="passwordLogin" placeholder="Password" />
      <input type="submit" @click.prevent="login()" value="Login" />
    </div>
    <div class="error" v-if="errorLogin">{{ errorLogin }}</div>
    <div class="message" v-if="loginMessage">{{ loginMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: "",
      loginMessage: "",
      registerMessage: ""
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (
        !this.firstName ||
        !this.lastName ||
        !this.username ||
        !this.email ||
        !this.password
      ) {
        return;
      }

      try {
        let response = await axios.post("/api/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$root.$data.user = response.data.user;
        this.registerMessage = "Successfully registered";
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = "";
      this.errorLogin = "";
      if (!this.usernameLogin || !this.passwordLogin) return;
      try {
        let response = await axios.post("/api/users/login", {
          username: this.usernameLogin,
          password: this.passwordLogin
        });
        this.$root.$data.user = response.data.user;
        this.loginMessage = "Successfully logged in.";
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    }
  }
};
</script>

<style>
.message {
  color: green;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

.registrationForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.registrationForm input {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid gray;
  border-radius: 5px;
}

.registrationName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.registrationName > input {
  width: 49%;
}

.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 15px auto;
}

.loginForm input {
  width: 100%;
  padding: 5px;
  margin: 5px;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
