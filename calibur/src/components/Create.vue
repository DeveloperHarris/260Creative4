<template>
  <div class="create">
    <div class="collegeCreation">
      <div class="collegeCreationHeader">Create Collegiate Esport Entry</div>
      <div class="collegeCreationInput">
        <input type="text" v-model="fullName" placeholder="Full Name" />
        <input type="text" v-model="shortName" placeholder="Short Name" />
        <input type="text" v-model="abbreviation" placeholder="Abbreviation" />
        <input type="text" v-model="city" placeholder="City" />
        <input type="text" v-model="state" placeholder="State" />
        <input type="text" v-model="logo" placeholder="Logo" />
        <textarea v-model="description" placeholder="Description" />
        <input type="text" v-model="website" placeholder="Website" />
        <input type="text" v-model="founded" placeholder="Founded" />
        <input type="submit" value="Submit" @click.prevent="postCollege" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "create",
  data() {
    return {
      fullName: "",
      shortName: "",
      abbreviation: "",
      city: "",
      state: "",
      logo: "",
      description: "",
      website: "",
      supportedGames: [],
      founded: "",
      college: "",
      error: ""
    };
  },
  methods: {
    async postCollege() {
      try {
        let response = await axios.post("/api/colleges/", {
          fullName: this.fullName,
          shortName: this.shortName,
          abbreviation: this.abbreviation,
          city: this.city,
          state: this.state,
          logo: this.logo,
          description: this.description,
          website: this.website,
          supportedGames: this.supportedGames,
          founded: Date.now
        });
        this.college = response.data.college;
      } catch (error) {
        this.error = error.response.data.message;
        this.college = null;
      }
    }
  }
};
</script>

<style>
.collegeCreationHeader {
  text-align: center;
}

.collegeCreationInput {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.collegeCreationInput > * {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
