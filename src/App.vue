<template>
 <!-- Header Start -->
 
<!-- Header End -->
    
  <main>
      <!-- Whats New Start -->
      <router-view></router-view>
  </main>
</template>
<script>
   setInterval(()=>{
    let clock = document.querySelector("#clock")
   let date = new Date();

   let hours = date.getHours()
   let minutes = date.getMinutes()
   let seconds = date.getSeconds()
   let day_night = 'AM'

   if(hours > 12){
    day_night = 'PM'
    hours = hours-12;
   }
   if(hours < 10){
    hours = "0"+ hours;
   }
   if(minutes < 10){
    minutes = "0"+ minutes;
   }
   if(seconds < 10){
    seconds = "0"+ seconds;
   }
   clock.textContent = hours +":"+ minutes +":"+ seconds + " " + day_night
   })

  import {mapGetters} from "vuex"
  export default {
    data(){
      return {
        tokenStatus : false
      }
    },
    computed : {
      ...mapGetters(["getToken","getUserData"])
    },
    methods : {
      checkToken(){
        if(this.getToken != null && this.getToken != undefined && this.getToken != ""){
          this.tokenStatus = true
        }else {
          this.tokenStatus = false

        }
      },
      logout(){
        this.$store.dispatch("setToken",null)
        location.reload()
      },
    },
    mounted(){
      this.checkToken()
    }
  }
</script>
<style>
.wrapper {
  width: 150px;
  height: 50px;
  position: relative;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 3;
  box-shadow: 10px 10px 15px  rgba(0,0,0,0.2);

}
.mystyle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
  top: 3px;
  left: 3px;
  bottom: 3px;
  right: 3px;
  background: rgb(21, 20, 20);
  border-radius: 10px;
  color:white;
  z-index: 9;

}
.wrapper::after{
  content : '';
  background: linear-gradient(100deg,rgb(208, 255, 0),rgb(0, 221, 255),rgb(128, 0, 128));
  width: 200px;
  height: 300px;
  position: absolute;
  z-index: 2;
  filter: brightness(1.5);
  animation : spin 3s linear infinite;
}
@keyframes spin {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}

</style>