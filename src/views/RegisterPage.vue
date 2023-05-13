<template>
    <i class="fa-solid fa-arrow-left p-3" @click="home()"></i>
    <div class="container">
        <div class="row p-5">
            <div class="col-lg-3"></div>
            <div class="col-lg-6 col-md-8 p-lg-5">
                <form>
                    <h4 class="text-center text-dark ">Register</h4>
                    <hr>
                    <span class="text-danger" v-if="userCheckInvalid == true">Register failed! please fill all fields!</span>
                    <div class="mb-3">
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label" >Name</label>
                        <input v-model="user.name" type="text" class="form-control" required>
                      </div>

                      <label for="exampleInputEmail1" class="form-label">Email address</label> <br>
                      <span class="text-danger" v-if="duplicateEmail == true">The email has already taken!</span>
                      <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                      
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label" >Phone</label>
                      <input v-model="user.phone" type="phone" class="form-control" required>
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label" >Address</label>
                      <input v-model="user.address" type="text" class="form-control" required>
                    </div>

                    <div class="mb-3">
                      <div class="col-md-7 mb-4">
                        <label for="">Gender</label>
                        <select id="inputState"  v-model="user.gender" class="form-select" name="gender">
                            <option value="male" class="fs-6">Male</option>
                            <option value="female" class="fs-6">Female</option>
                        </select>
                    </div>
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label" >Password</label>
                      <input v-model="user.password" type="password" class="form-control" required>
                    </div>

                    <button type="button" @click="accountRegister()" class="btn btn-primary w-100">Register</button>
                                 
                  </form>
            </div>
            <div class="col-lg-3"></div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex"
export default {
   name : 'RegisterPage',
   data() {
        return {
                user : {
                name: "",
                email : "",
                phone : "",
                address: "",
                gender: "",
                password : ""
            },
            userCheckInvalid : false,
            duplicateEmail : false
        }
    },
    computed : {
      ...mapGetters(["getToken","getUserData"])
    },
    methods : {
        accountRegister(){
            if(this.user.name != "",
            this.user.email != "",
            this.user.phone != "",
            this.user.address != "",
            this.user.gender != "",
            this.user.password != "") {
                axios.post('http://localhost:8000/api/user/register',this.user).then((response)=>{
                  if(response.data.message){
                    this.duplicateEmail = true
                  }
                    if(response.data.token == null){
                      this.userCheckInvalid = true
                    }else {
                    this.store.dispatch("setToken",response.data.token);
                    this.$store.dispatch("setUserData",response.data.user);
                    this.home()
                    }
                })
            }else{
              this.userCheckInvalid = true
            }
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

</style>