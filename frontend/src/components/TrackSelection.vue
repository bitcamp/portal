<template>
<b-row class="row gx-12">

    <!-- <b-col md="12" class="p-1 d-flex align-items-stretch">
    <label>
        <input type="radio" v-model="card" value="general">
        <b-card class="h-100 w-100 general" :class="{ 'active': card === 'general'}">
          <h4>General</h4>
          <p>For any and all hackers! All skill levels welcome. The full technica experience!</p>
        </b-card>
    </label>
    </b-col> -->
  
  <b-col md="3" class="p-1 col d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="general" @click="onClickCard('general')">
    <b-card class="general" :class="{ 'active': card === 'general'}">
      <h4>General</h4>
      <p>For any and all hackers! All skill levels welcome. The full Bitcamp experience!</p>
    </b-card>
  </label>
  </b-col>
  
  
  
  <b-col md="3" class="p-1 col d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="hardware" @click="onClickCard('hardware')">
    <b-card class="general" :class="{ 'active': card === 'hardware'}">
      <h4>Hardware</h4>
      <p>For any and all hackers! All skill levels welcome. The full Bitcamp experience!</p>
    </b-card>
  </label>
  </b-col>

  <b-col md="3" class="p-1 col d-flex align-items-stretch">
  <label>
    <input type="radio" v-model="card" value="quantum" @click="onClickCard('quantum')">
    <b-card class="general" :class="{ 'active': card === 'quantum'}" >
      <h4>Quantum</h4>
      <p>For any and all hackers! All skill levels welcome. The full Bitcamp experience!</p>
    </b-card>
  </label>
  </b-col>

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
  width: 215px;
  height: 125px;
  cursor: pointer;
  transition: 0.25s;
  
}

.card-body {
  padding: 0.75rem;
}

.general {
  border: 1px solid #FCD8CB;
  box-sizing: border-box;
  border-radius: 4px;
}
.general:hover, .general.active {
  
  background: radial-gradient(90.38% 29.85% at 33.49% -2.8%, #FFAA6C 0.01%, #FF6A37 50.52%, #FF6A37 100%);
  color: white !important;
  
}

/* .research {
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
} */

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
  margin: 0s;
}

</style>