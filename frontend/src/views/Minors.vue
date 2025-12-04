<template>
  <div class="minors-page">
    <div class="big-rectangle">
      <div class="rectangle-title1"></div>
      <div class="rectangle-title2"></div>
      <div class="rectangle-title3"></div>
      <div class="rectangle-title4"></div>
      <div class="text-element">Register for Bitcamp 2026</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Minors",
};
</script>

<style scoped>
.minors-page {
  width: 100%;
  max-width: 1854px;
  height: 5135px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 78px;
  background-image: linear-gradient(#FFAF3F, #FF793F);
  opacity: 1;
  overflow-x: hidden;
}

.big-rectangle {
  width: 930px;
  height: 4979px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  backdrop-filter: blur(220px);
  box-shadow: 0px 20px 90px rgba(0, 0, 0, 0.1);
  opacity: 1;
  position: relative;
}

.rectangle-title {
  width: 828px;
  height: 55px;
  border-bottom: 4px solid rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #FF6F3F;
  box-shadow: 0px 0px 10px 0px #FF6F3FBF;
  opacity: 1;
  margin: 368px auto 0 auto; 
}
.rectangle-title2 {
  width: 828px;
  height: 55px;
  border-bottom: 4px solid rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #FF6F3F;
  box-shadow: 0px 0px 10px 0px #FF6F3FBF;
  opacity: 1;
  margin: 1253px; 
}
.rectangle-title3 {
  width: 828px;
  height: 55px;
  border-bottom: 4px solid rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #FF6F3F;
  box-shadow: 0px 0px 10px 0px #FF6F3FBF;
  opacity: 1;
  margin: 2066px; 
}
.rectangle-title4 {
  width: 828px;
  height: 55px;
  border-bottom: 4px solid rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #FF6F3F;
  box-shadow: 0px 0px 10px 0px #FF6F3FBF;
  opacity: 1;
  margin: 4019px; 
}

.text-element {
  color: #000;
  font-family: Aleo;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.25px;
  width: 591px;
  height: 20px;
  top: 146px;  
  left: 541px;
}

</style>
