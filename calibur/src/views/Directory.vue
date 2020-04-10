<template>
  <div class="directory">
    <div class="error" v-if="error">{{ error }}</div>

    <div class="searchBar">
      <input type="text" v-model="search" placeholder="Search.." />
      <input type="submit" @click.prevent="getSearch()" value="Search" />
    </div>

    <div class="content">
      <div v-for="college in colleges" :key="college._id">
        <router-link class="college" :to="{name: 'college', params: { id: college._id}}">
          <img :src="college.logo" width="20%" />

          <div class="info">
            <div class="name">{{ college.fullName }}</div>

            <div class="location">{{ college.city }}, {{ college.state }}</div>

            <div class="description">{{college.description}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "directory",
  data() {
    return {
      colleges: [],
      search: "",
      error: ""
    };
  },
  created() {
    this.getColleges();
  },
  methods: {
    async getColleges() {
      try {
        let response = await axios.get("/api/colleges/all");
        this.colleges = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getSearch() {
      try {
        let response = await axios.get("/api/colleges/?name=" + this.search);
        this.colleges = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
};
</script>

<style>
.searchBar {
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}

.searchBar input {
  flex-grow: 1;
  padding: 2px;
}

.content {
  display: flex;
  flex-direction: column;
}

.college {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px gray solid;
  font-family: "Manrope", sans-serif;
}

.info {
  margin-left: 10px;
}

.name {
  font-weight: bold;
}

.location,
.description {
  font-size: 0.8rem;
}

.location {
  font-style: italic;
  font-weight: 200;
}

.description {
  margin-top: 10px;
}
</style>
