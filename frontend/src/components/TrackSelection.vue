<template>
  <div>
    <b-row class="row gx-12" cols="1">
      <b-col md="6" class="p-1 col d-flex align-items-stretch center">
        <label>
          <div class="color h-100 w-100">
            <input v-model="card" type="radio" value="general" @click="onSelectTrack('general')" />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'general' }">
              <h4>General</h4>
              <p>
                For any and all hackers! Build the perfect hack using hardware, software, and
                collaboration with other tech-lovers, design thinkers, and students - all skill and
                experience levels are welcome!
              </p>
            </b-card>
          </div>
        </label>
      </b-col>

      <!--
        <br />
        <p class="info">
          The following tracks have been filled. However, you can still join the
          waitlist if it's your top choice and we'll let you know weekend-of if
          we have space! Otherwise, you'll be placed in the general track.
        </p>
      -->

      <b-col md="6" class="p-1 col d-flex align-items-stretch">
        <label>
          <div class="color h-100 w-100">
            <input v-model="card" type="radio" value="quantum" @click="onSelectTrack('quantum')" />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'quantum' }">
              <h4>Quantum</h4>
              <p>
                Hackers will delve into the field of quantum computing with exclusive mentors,
                sponsors, and workshops! Hackers will use their knowledge of Python and other
                computing skills on educational and interactive Quantum Track activities. If you've
                been a previous participant of the Quantum track, there will be new, challenging
                prompts for you to tackle!
              </p>
            </b-card>
          </div>
        </label>
      </b-col>
      <b-col md="6" class="p-1 col d-flex align-items-stretch">
        <label>
          <div class="color h-100 w-100">
            <input
              v-model="card"
              type="radio"
              value="data_science"
              @click="onSelectTrack('data_science')"
            />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'data_science' }">
              <h4>Data Science</h4>
              <p>
                The Data Science track introduces beginners to working with data through workshops
                and guided mini-projects. Hackers will explore data cleaning, analysis, and
                visualization to discover meaning and patterns from data!
              </p>
            </b-card>
          </div>
        </label>
      </b-col>
      <b-col md="6" class="p-1 col d-flex align-items-stretch">
        <label>
          <div class="color h-100 w-100">
            <input
              v-model="card"
              type="radio"
              value="machine_learning"
              @click="onSelectTrack('machine_learning')"
            />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'machine_learning' }">
              <h4>Machine Learning</h4>
              <p>
                If you are amazed by AI breakthroughs like ChatGPT and driven to create something
                just as impactful, then this is your track! Dive into hands-on workshops where
                you’ll learn to build and deploy machine learning models, gain proficiency in
                essential ML techniques, and discuss innovations reshaping the AI landscape. By the
                end of this track, you’ll have a portfolio-ready project to showcase!
              </p>
            </b-card>
          </div>
        </label>
      </b-col>

      <b-col md="6" class="p-1 col d-flex align-items-stretch">
        <label>
          <div class="color h-100 w-100">
            <input v-model="card" type="radio" value="app_dev" @click="onSelectTrack('app_dev')" />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'app_dev' }">
              <h4>App Dev</h4>
              <p>
                Ever wondered how to turn your innovative app idea into a reality? Ready to turn
                your concepts into cutting-edge applications? Join the App Dev track - we'll
                introduce you to different aspects of development including the software development
                life cycle, development tools such as Flutter, and full-stack development through
                access to exclusive workshops and mentors as you work on your hack!
              </p>
            </b-card>
          </div>
        </label>
      </b-col>

      <b-col md="6" offset-md="3" class="p-1 col d-flex align-items-stretch">
        <label>
          <div class="color h-100 w-100">
            <input
              v-model="card"
              type="radio"
              value="game_dev"
              @click="onSelectTrack('game_dev')"
            />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'game_dev' }">
              <h4>Game Development</h4>
              <p>
                One of our newest tracks! Explore the realm of cybersecurity and understand various
                aspects of the field through interactive workshops that include discussions of web
                vulnerabilities, real-world applications of combating security weaknesses, and
                ethical decision-making.
              </p>
            </b-card>
          </div>
        </label>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TrackSelection",
  props: {
    default: {
      type: String,
    },
  },
  data() {
    return {
      card: this.default,
      waitlistCard: this.default,
    };
  },
  methods: {
    onSelectTrack(value) {
      this.$emit("picked", value);
    },
    onSelectWaitlistTrack(value) {
      if (this.waitlistCard === value) {
        this.waitlistCard = "";
        this.$emit("waitlisted", "");
      } else {
        this.$emit("waitlisted", value);
      }
    },
  },
};
</script>

<style scoped>
/* Hide radio inputs */
input {
  display: none;
}

/* Make sure each card is clickable and transitions nicely */
.card {
  width: 215px;
  height: 125px;
  cursor: pointer;
  transition: background 0.25s ease-out, color 0.25s ease-out;
}

/* We don't want the background forcibly set to orange on all cards by default,
   so clear out or override .color's default background. */
.color {
  border-radius: 4px;
  background: none;
  /* Remove radial gradient from .color */
}

/* Each card's default state: white background, black text */
.general {
  /* border: 1px solid #fcd8cb; */
  box-sizing: border-box;
  border-radius: 4px;
  background: white;
  /* default white */
  color: black;
}

/* Purple on hover (radial gradient) */
.general:hover {
  background: radial-gradient(
    90.38% 29.85% at 33.49% -2.8%,
    #6e48aa 0.01%,
    #9d50bb 50.52%,
    #9d50bb 100%
  );
  color: white;
}

.general:hover p {
  color: white !important;
}

/* Bright orange when selected (active) */
.general.active {
  background: radial-gradient(
    90.38% 29.85% at 33.49% -2.8%,
    #ffaa6c 0.01%,
    #ff6a37 50.52%,
    #ff6a37 100%
  );
  color: white;
}

/* Keep text white on active */
.general.active p {
  color: white !important;
}

/* Disabled card styling (optional) */
.card-disabled {
  opacity: 0.4 !important;
  border-color: rgb(170, 167, 167, 0.5);
  background-color: rgb(150, 148, 148, 0.25);
  pointer-events: none;
}

h4 {
  font-size: 20px;
}

p {
  font-size: 14px;
  text-align: left;
  margin-bottom: 0.05rem;
}

label {
  width: 100%;
  margin: 0;
}

.info {
  font-size: 1rem;
  text-align: left !important;
}
</style>
