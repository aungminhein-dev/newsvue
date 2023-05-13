<template>
    <i class="fa-solid fa-arrow-left p-3" @click="home()"></i>
    <div class="container p-3 d-flex align-items-center justify-content-center" style="height:70vh">
        <div class="row shadow rounded border">
            <div class="col-lg-5">
              <img src="../assets/img/login.jpg" alt="">
            </div>
            <div class="col-lg-6 p-3">
                <form>
                    <h4 class="text-center text-muted">Log In</h4>
                    <h5 class="text-danger p-2 text-center" id="noUser"></h5>

                    <div class="mb-3">

                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label" >Password</label>
                      <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1" required>
                    </div>
                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="button" @click="accountLogin()" class="btn btn-primary">Submit</button>
                                 
                  </form>
            </div>
            <!-- <div class="col-lg-3"></div> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex"
export default {
   name : 'LoginPage',
   data() {
        return {
                user : {
                email : "",
                password : ""
            }
        }
    },
    computed : {
      ...mapGetters(["getToken","getUserData"])
    },
    methods : {
        accountLogin(){
           axios.post('http://localhost:8000/api/user/login',this.user).then((response)=>{
            if(response.data.token == null){
              document.getElementById('noUser').textContent = "This credentials do not match our records!"
            }else {
              this.$store.dispatch("setToken",response.data.token);
              this.$store.dispatch("setUserData",response.data.user);
              this.user.email = "";
              this.user.password = "";
              this.home()
            }
           })
        },
        home(){
          this.$router.push({
            name : 'home'
          })
        },
    }
}
</script>

<style>
form .form-control{
  background:rgba(0,0,0,0.25);
}
form .form-control:focus{
  background:rgba(0,0,0,0.25);
  outline:2px solid rgba(215, 174, 22, 0.693);
  color:white;


}
form label {
  color: black;
  font-weight: 500;
  font-size: 15px;
}
</style>