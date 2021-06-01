<template>
  <div class="social-buttons">
      <a href="https://www.youtube.com/channel/UC-Wo4UqhGUKQEp4o-51VMIw/" target="_blank">
        <div class="blue-circle">
            <img src="../assets/w_youtube.svg" alt="YouTube icon">
          </div>
      </a>
      <a href="https://twitter.com/gotechnica?lang=en" target="_blank">
        <div class="blue-circle">
            <img src="../assets/w_twitter.svg" alt="Twitter icon">
          </div>
      </a>
      <a href="https://www.facebook.com/gotechnica/" target="_blank">
        <div class="purple-circle">
            <img src="../assets/w_facebook.svg" alt="Facebook icon">
        </div>
      </a>
      <a href="https://www.instagram.com/gotechnica/" target="_blank">
        <div class="purple-circle">
            <img src="../assets/w_instagram.svg" alt="Instagram icon">
        </div>
      </a>
      <a href="https://medium.com/gotechnica" target="_blank" >
        <div class="pink-circle">
            <img src="../assets/w_medium.svg" alt="Medium icon">
        </div>
      </a>
      <a href="https://linkedin.com/company/gotechnica" target="_blank">
        <div class="pink-circle">
            <img src="../assets/w_linkedin.svg" alt="LinkedIn icon">
        </div>
      </a>
    </div>
</template>

<script>
export default {
  name: 'SocialLinks',
};
</script>

<style scoped>

.blue-circle, .purple-circle, .pink-circle {
  padding: 8px;
  margin: 0px 10px;
  transition: ease 0.2s;
  background-color: #82ecec;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
}

.blue-circle:hover, .purple-circle:hover, .pink-circle:hover {
  transform: scale(1.06);
}

@media (max-width: 575px) {
  .blue-circle, .purple-circle, .pink-circle {
    margin: 0px 3px;
    padding: 5px;
    width: 40px;
    height: 40px;
  }
}

.blue-circle {
  background-color: #6fcbdc;
}

.purple-circle {
  background-color: #b5a1c4;
}

.pink-circle {
  background-color: #f27aaa;
}

</style>