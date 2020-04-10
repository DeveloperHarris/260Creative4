<template>
  <div class="collegePage">
    <div class="error" v-if="error">{{error}}</div>
    <div class="collegeInfo">
      <img :src="college.logo" width="20%" />

      <div class="info">
        <div class="name">{{ college.fullName }}</div>

        <div class="location">{{ college.city }}, {{ college.state }}</div>

        <div class="description">{{college.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "College",
  data() {
    return {
      college: "",
      error: ""
    };
  },
  created() {
    this.getCollege();
  },
  methods: {
    async getCollege() {
      try {
        let response = await axios.get(
          "/api/colleges/" + this.$route.params.id
        );
        this.college = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
};
</script>

<style>
.collegeInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 50px 0;
}
</style>