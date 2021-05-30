<template>
  <div class="about">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <h1>Thanks for registering!</h1>
        <p class= "purple-text" > <!-- making paragraphs have larger margins than header -->
          You will be sent a confirmation email for your registration. Keep in touch with Technica by following us on social media or joining our Community listerv!
        </p>
        <p class= "purple-text"> <!-- making paragraphs have larger margins than header -->
          Welcome to the TechniFAM. Get ready for the best weekend you've ever had.
        </p>
        <span class="dot dot1"></span>
        <span class="dot dot2"></span>
        <span class="dot dot3"></span>
        <br>
        <span class="dot dot1"></span>
        <span class="dot dot2"></span>
        <span class="dot dot3"></span>

      </b-card>
    </b-container>
  </div>
</template>

<style scoped>
.dot {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  display: inline-block;
}

.dot1 {
  background-color: var(--muted-cyan);
}

.dot2 {
  background-color: var(--lavender);
}

.dot3 {
  background-color: var(--rose);
}
</style>
