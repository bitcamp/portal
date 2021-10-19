<template>
<b-row class="m-n1">

  <b-col md="12" class="p-1 d-flex align-items-stretch">
  <label>
      <input type="radio" v-model="card" value="general">
      <b-card class="h-100 w-100 general" :class="{ 'active': card === 'general'}">
        <h4>General</h4>
        <p>For any and all hackers! All skill levels welcome. The full technica experience!</p>
      </b-card>
  </label>
  </b-col>

  <!-- <b-col md="3" class="p-1 d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="research" @click="onClickCard('research')">
    <b-card class="h-100 w-100 research" :class="{ 'active': card === 'research'}">
      <h4>Research</h4>
      <p>Unfortunately, this track is closed. Beginners are still welcome in the General track!</p>
    </b-card>
  </label>
  </b-col>
  
  <b-col md="3" class="p-1 d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="beginner" @click="onClickCard('beginner')" :disabled="true">
    <b-card class="h-100 w-100 beginner card-disabled" :class="{ 'active': card === 'beginner'}" >
      <h4>Beginner</h4>
      <p>Unfortunately, this track is closed. Beginners are still welcome in the General track!</p>
    </b-card>
  </label>
  </b-col>
  
  <b-col md="3" class="p-1 d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="hardware" @click="onClickCard('hardware')" :disabled="true">
    <b-card class="h-100 w-100 hardware card-disabled" :class="{ 'active': card === 'hardware'}">
      <h4>Hardware</h4>
      <p>Unfortunately, this track is closed. You can still use hardware in the General track!</p>
    </b-card>
  </label>
  </b-col> -->

</b-row>
</template>

<script>
export default {
  name: 'TrackSelection',
  props: {
    default: {
      type: String
    }
  },
  data() {
    return {
      card: this.default,
    }
  },
  methods: {
    onClickCard(value) {
      this.$emit('picked', value);
    }
  }
};
</script>

<style scoped>

input {
  display: none;
}

.card {
  height: 100%;
  width: 100%;
  border-radius: 0.6rem;
  border-width: 0.2rem;
  cursor: pointer;
  transition: 0.25s;
}

.card-body {
  padding: 0.75rem;
}

.general {
  border-color: rgba(111, 204, 220, 0.75);
}
.general:hover, .general.active {
  border-color: rgb(111, 203, 220);
  background-color: rgba(111, 204, 220, 0.75);
}

.research {
  border-color: rgba(181, 161, 196, 0.75);
}
.research:hover, .research.active {
  border-color: rgb(181, 161, 196);
  background-color: rgba(181, 161, 196, 0.75);
}

.beginner {
  border-color: rgb(242, 122, 170);
}
.beginner:hover, .beginner.active {
  border-color: rgb(242, 122, 170);
  background-color: rgba(242, 122, 170, 0.75);
}

.hardware {
  border-color: rgb(160, 214, 180);
}
.hardware:hover, .hardware.active {
  border-color: rgb(160, 214, 180);
  background-color: rgba(160, 214, 180, 0.75);
}

.card-disabled {
  opacity: 0.4 !important;
  border-color: rgb(170, 167, 167, 0.5);
  background-color: rgb(150, 148, 148, 0.25);
  pointer-events: none;
}

h4 {
  font-size: 1.25rem;
}

p {
  font-size: 0.9rem;
  text-align: left;
  justify-content: left;
  margin-bottom: 0.05rem;
}

label {
  width: 100%;
  margin: 0;
}

</style>