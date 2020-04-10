<template>
  <div id="app">
    <router-link to="/">
      <div class="logo">
        <img width="100%" src="../public/logo.png" />
        <div class="subtitle">Collegiate Esports Directory</div>
      </div>
    </router-link>
    <div id="nav">
      <router-link to="/">Directory</router-link>
      <router-link to="/dashboard">{{ this.$root.$data.user ? "Dashboard" : "Login"}}</router-link>
    </div>
    <router-view />
    <footer>
      Github:
      <a id="repoLink" href="https://github.com/DeveloperHarris/260Creative4">Repo</a>
    </footer>
  </div>
</template>

<style>
@media only screen and (min-width: 500px) {
  #app {
    width: 500px;
    margin: 0 auto;
  }
}

* {
  box-sizing: border-box;
}

#app {
}

.logo {
  display: block;
  width: 50%;
  margin: 0 auto;
}

.subtitle {
  font-size: 0.7rem;
  text-align: center;
  font-family: "Manrope", sans-serif;
}

#nav {
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: black;
}

#repoLink {
  text-decoration: underline;
  color: blue;
}
</style>
