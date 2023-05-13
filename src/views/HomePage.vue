<template>
     <!-- Whats New Start -->
     <div class="d-flex mt-2" v-if="tokenStatus != false">
      <button @click="logout()" class="btn btn-dark ms-2 btn-sm py-2">Log Out <i class="fa-solid fa-power-off"></i></button>


     </div>
     <section class="whats-news-area pt-50 pb-20">
      <div class="container">
        <div class="row" v-if="tokenStatus == false" >
           <div class="col-lg-12 d-flex align-items-center justify-content-center" style="min-height:50vh">
             <div class="">
              <h3 class="text-danger text-uppercase">Please log in to read our news!</h3>
              <button class="btn btn-warning" @click="login()">Log In</button>
              <p>Don't you have an account? <span class="text-primary" style="cursor:pointer" @click="register()">Register here!</span></p>
             </div>
           </div>
         </div>
        <div class="row" style="min-height:50vh" v-if="tokenStatus == true">
          <div class="col-lg-12">
           <div class="row" >
            <div class="row d-flex justify-content-between">
              <div class="col-lg-3 col-md-3">
                <div class="section-tittle mb-30">
                  <h3>Categories</h3>
                </div>
              </div>
              <div class="col-lg-9 col-md-9">
                <div class="properties__button">
                  <!--Nav Button  -->
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab"
                        href="details.htmlnav-home" role="tab" @click="getAllPosts()" aria-controls="nav-home" aria-selected="true">All</a>
                          
                          <a class="nav-item nav-link" id="nav-home-tab" v-for="(category,index) in categoryList" :key="index" data-toggle="tab" @click="getPostByCategory(category.id)"
                          href="#" role="tab" aria-controls="nav-home" aria-selected="false">{{category.title}}</a>                   
                    </div>
                  </nav>
                  <!--End Nav Button  -->
                </div>
              </div>
            </div>
            <div class="row my-4">
              <div class="col-lg-8 col-md-6">
                <div class="align-items-center" v-if="postList.length == 0">
                  <h2 class="text-danger">No such a post right now!</h2>
                </div>
              </div>
              <div class="col-xl-4 col-lg-2 col-md-6">
                  <div class="search-box">
                    <form  class=" d-flex">
                      <input class="form-control me-2" type="text" v-model="searchKey" placeholder="Search" />
                      <p class="ms-2" v-on:keyup.enter="search()" @click="search()"><i class=" mt-3 fas fa-search text-dark"></i></p>
                    </form>
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <!-- Nav Card -->
                <div class="tab-content" id="nav-tabContent">
                  <!-- card one -->
                  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="whats-news-caption">
                      <div class="row">
                       
                        <div class="col-lg-4 col-md-6"  v-for="(post,index) in postList" :key="index">
                          <div class="single-what-news mb-100" @click="newsDetailPage(post.id)" >
                            <div class="what-img">
                              <img :src="post.image" alt="">
                            </div>
                            <span class="text-primary" style="">
                              {{viewCount}}
                            </span>
                            <div class="what-cap bg-gradient">
                              <div class="inline-flex">
                                <a  class="bg-danger p-2 text-uppercase rounded text-white mb-2">{{post.title}}</a>
                               
                              </div>
                              <h6 class="mt-3 text-muted">
                                {{finalDate}}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Nav Card -->
              </div>
           </div>
             
            </div>
          </div>
        </div>

    </section>
    <!-- Whats New End -->

</template>
   
<script>
  import axios from "axios";
  import {mapGetters} from "vuex"
export default {
  name :  'HomePage',
  data() {
    return {
      postList : {},
      categoryList : {},
      searchKey : "",
      tokenStatus : false,
      months : ['Janurary','February','March','April','May','June','July','August','September','October','November','December'],
      finalDate : {},
      
    }
  },
  computed : {
      ...mapGetters(["getToken","getUserData"])
    },
  methods : {
    getAllPosts(){
      

      axios.get('http://localhost:8000/api/allPosts').then((response) =>{
        for(let i=0; i<response.data.post.length; i++){
          if(response.data.post[i] != null){
              
            response.data.post[i].created_at = new Date(response.data.post[i].created_at);

           this.finalDate = this.months[response.data.post[i].created_at.getMonth()] +"-"+response.data.post[i].created_at.getDate()+
           "-"+response.data.post[i].created_at.getFullYear()
            response.data.post[i].image = "http://localhost:8000/storage/"+response.data.post[i].image
          }else{
            response.data.post[i].image = "http://localhost:8000/response_images/not-found.png"
          }
        }
        console.log(response.data.view_count);
        // for(let i= 0;)
        this.postList = response.data.post
      })
    },
    home(){
      this.$router.push({
      name : 'homePage'
    })
  },
  login(){
      this.$router.push({
      name : 'loginPage'
  })
  },
  register(){
      this.$router.push({
      name : 'registerPage'
  })
  },
  logout(){
     this.$store.dispatch("setToken",null)
      location.reload()
  },
    getAllCategory(){
      axios.get('http://localhost:8000/api/allCategory').then((response)=>{
        this.categoryList = response.data.category
      })
    },
    search(){
      let search = {
        key : this.searchKey
      }
      axios.post("http://localhost:8000/api/post/search",search).then((response)=>{
        for(let i=0; i<response.data.searchData.length; i++){
          if(response.data.searchData[i] != null){
            response.data.searchData[i].created_at = new Date(response.data.searchData[i].created_at);

          this.finalDate = this.months[response.data.searchData[i].created_at.getMonth()] +"-"+response.data.searchData[i].created_at.getDate()+"-"+response.data.searchData[i].created_at.getFullYear()      
            response.data.searchData[i].image = "http://localhost:8000/storage/"+response.data.searchData[i].image
          }else{
            response.data.searchData[i].image = "http://localhost:8000/response_images/not-found.png"
          }
          
        }
        this.postList = response.data.searchData;
      })
    },
    getPostByCategory(categoryId){
      let want = {
        key:categoryId
      }
      axios.post("http://localhost:8000/api/category/search",want).then((response)=> {
        for(let i=0; i<response.data.category.length; i++){
          if(response.data.category[i] != null){
            response.data.category[i].image = "http://localhost:8000/storage/"+response.data.category[i].image
          }else{
            response.data.category[i].image = "http://localhost:8000/response_images/not-found.png"
          }
        }
        this.postList = response.data.category
      })
    },
    newsDetailPage(id){
      this.$router.push({
        name: 'postDetail',
        params : {
          newsId : id
        }
      });
  },
  checkToken(){
    if(this.getToken != null && this.getToken != undefined && this.getToken != ""){
      this.tokenStatus = true
    }else {
      this.tokenStatus = false

    }
  }
  },
  mounted() {
    this.checkToken()
    this.getAllPosts()
    this.getAllCategory()
    this.search()
  }
}
</script>
   