<template>
  <div>
    <b-row class="row gx-12" cols="1">
      <b-col md="6" offset-md="3" class="p-1 col d-flex align-items-stretch center">
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
    </b-row>
    <!--
    <br />
    <p class="info">
      The following tracks have been filled. However, you can still join the waitlist if it's your
      top choice and we'll let you know weekend-of if we have space! Otherwise, you'll be placed in
      the general track.
    </p>
    -->
    <b-row class="row gx-12" cols="1">
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
              value="machine_learning"
              @click="onSelectTrack('machine_learning')"
            />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'machine_learning' }">
              <h4>Machine Learning</h4>
              <p>
                If you're wowed by recent AI advancements like ChatGPT, then this is the track for
                you! We will expand upon specialized learning experiences by hosting a series of
                workshops with content related to building and hosting ML models, unsupervised
                learning, and discussions of recent AI advancements.
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
                your concepts into cutting-edge applications? One of our new tracks - we'll
                introduce you to different aspects of development including the software development
                life cycle, development tools such as Flutter, and full-stack development through
                access to exclusive workshops and mentors as you work on your hack!
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
              value="cybersecurity"
              @click="onSelectTrack('cybersecurity')"
            />
            <b-card class="h-100 w-100 general" :class="{ active: card === 'cybersecurity' }">
              <h4>Cybersecurity</h4>
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
input {
  display: none;
}

.card {
  width: 215px;
  height: 125px;
  cursor: pointer;
  transition: 0.25s;
}

.color {
  border-radius: 4px;
  background: radial-gradient(
    90.38% 29.85% at 33.49% -2.8%,
    #ffaa6c 0.01%,
    #ff6a37 50.52%,
    #ff6a37 100%
  );
}

.card-body {
  padding: 0.75rem;
}

.general {
  border: 1px solid #fcd8cb;
  box-sizing: border-box;
  border-radius: 4px;
  background: white;
  transition: background 0.25s;
  transition-timing-function: ease-out;
}

.general.active {
  color: white;
  background: none;
}

.general:hover {
  color: white;
  background: #ffaf3f;
}

.general:hover p,
.general.active p {
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
  font-size: 20px;
}

p {
  font-size: 14px;
  text-align: left;
  justify-content: left;
  margin-bottom: 0.05rem;
}

label {
  width: 100%;
  margin: 0s;
}

.info {
  font-size: 1rem;
  text-align: left !important;
}
</style>
