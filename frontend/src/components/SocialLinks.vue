<template>
  <div class="social-buttons">
      <a href="https://www.youtube.com/channel/UC_F_7Hv3SAUcQBubYWD-2BA" target="_blank">
        <div class="red-circle">
            <img src="../assets/w_youtube.svg" alt="YouTube icon">
          </div>
      </a>
      <a href="https://twitter.com/bitcmp?lang=en" target="_blank">
        <div class="red-circle">
            <img src="../assets/w_twitter.svg" alt="Twitter icon">
          </div>
      </a>
      <a href="https://www.facebook.com/bitcmp/" target="_blank">
        <div class="orange-circle">
            <img src="../assets/w_facebook.svg" alt="Facebook icon">
        </div>
      </a>
      <a href="https://www.instagram.com/bitcamp/" target="_blank">
        <div class="orange-circle">
            <img src="../assets/w_instagram.svg" alt="Instagram icon">
        </div>
      </a>
      <a href="https://bitcmp.medium.com/" target="_blank" >
        <div class="yellow-circle">
            <img src="../assets/w_medium.svg" alt="Medium icon">
        </div>
      </a>
      <a href="https://www.linkedin.com/company/bitcamp/" target="_blank">
        <div class="yellow-circle">
            <img src="../assets/w_linkedin.svg" alt="LinkedIn icon">
        </div>
      </a>
      <!-- <a href="https://www.tiktok.com/@bitcamp_umd" target="_blank">
        <div class="pink-circle">
            <img src="../assets/w_linkedin.svg" alt="TikTok icon">
        </div>
      </a> -->
    </div>
</template>

<script>
export default {
  name: 'SocialLinks',
};
</script>

<style scoped>

.red-circle, .orange-circle, .yellow-circle {
  padding: 8px;
  margin: 0px 10px;
  transition: ease 0.2s;
  background-color: #82ecec;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
}

.red-circle:hover, .orange-circle:hover, .yellow-circle:hover {
  transform: scale(1.06);
}

@media (max-width: 575px) {
  .red-circle, .orange-circle, .yellow-circle {
    margin: 0px 3px;
    padding: 5px;
    width: 40px;
    height: 40px;
  }
}

.red-circle {
  background-color: #FF3F46;
}

.orange-circle {
  background-color: #FF6F3F;
}

.yellow-circle {
  background-color: #FFAF3F;
}

</style>