<template>
    <!-- About US Start -->
    <div class="about-area" style="height:100%">
        <div class="container">
                <!-- Hot Aimated News Tittle-->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="trending-tittle">
                            <strong>Trending now</strong>
                            <!-- <p>Rem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
                            <div class="trending-animated">
                                <ul id="js-news" class="js-hidden">
                                    <li class="news-item">Bangladesh dolor sit amet, consectetur adipisicing elit.</li>
                                    <li class="news-item">Spondon IT sit amet, consectetur.......</li>
                                    <li class="news-item">Rem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
               <div class="row">
                    <div class="col-lg-8">
                        <!-- Trending Tittle -->
                        <div class="about-right mb-90">
                            <div class="about-img">
                                <img :src="posts.image" alt="">
                            </div>
                            <div class="section-tittle mb-30 pt-30 text-uppercase">
                                <h3>{{posts.title}}</h3>
                            </div>
                            <div class="about-prea">
                                <p class="about-pera1 mb-25 fs-5">{{posts.description}}</p>  
                            </div> 
                            <div class="about-prea">
                                <p class="about-pera1 mb-25 fs-4 text-black">{{finalDate}} | {{timeDetails}}</p>  
                                <h6 class="text-muted">{{viewCount}} Views</h6>

                            </div> 
                        </div>
                        <!-- From -->
                         <div class="form-group my-3">
                            <button onclick="history.back()"  class="button button-contactForm boxed-btn">Back</button>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <!-- Section Tittle -->
                        <div class="section-tittle mb-40">
                            <h3>Follow Us</h3>
                        </div>
                        <!-- Flow Socail -->
                        <div class="single-follow mb-45">
                            <div class="single-box">
                                <div class="follow-us d-flex align-items-center">
                                    <div class="follow-social">
                                        <a href="#"><img src="assets/img/news/icon-fb.png" alt=""></a>
                                    </div>
                                    <div class="follow-count">  
                                        <span>8,045</span>
                                        <p>Fans</p>
                                    </div>
                                </div> 
                                <div class="follow-us d-flex align-items-center">
                                    <div class="follow-social">
                                        <a href="#"><img src="assets/img/news/icon-tw.png" alt=""></a>
                                    </div>
                                    <div class="follow-count">
                                        <span>8,045</span>
                                        <p>Fans</p>
                                    </div>
                                </div>
                                    <div class="follow-us d-flex align-items-center">
                                    <div class="follow-social">
                                        <a href="#"><img src="assets/img/news/icon-ins.png" alt=""></a>
                                    </div>
                                    <div class="follow-count">
                                        <span>8,045</span>
                                        <p>Fans</p>
                                    </div>
                                </div>
                                <div class="follow-us d-flex align-items-center">
                                    <div class="follow-social">
                                        <a href="#"><img src="assets/img/news/icon-yo.png" alt=""></a>
                                    </div>
                                    <div class="follow-count">
                                        <span>8,045</span>
                                        <p>Fans</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- New Poster -->
                        <div class="news-poster d-none d-lg-block">
                            <img src="assets/img/news/news_card.jpg" alt="">
                        </div>
                    </div>
               </div>
        </div>
    </div>
    <!-- About US End -->
  </template>

<script>
import axios from "axios";
import {mapGetters} from "vuex"
export default {
    name:"NewsDetail",
    data() {
        return {
            postId : 0,
            posts : {},
            finalDate : {},
            months : ['Janurary','February','March','April','May','June','July','August','September','October','November','December'], 
            dayy : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], 
            timeDetails : {},
            viewCount : 0 
        }
    },
    computed : {
      ...mapGetters(["getToken","getUserData"])
    },
    methods : {
        loadPost(id){
            let post = {
                postId : id
            }
            axios.post('http://localhost:8000/api/post/detail',post).then((response)=> {
                response.data.post.created_at = new Date( response.data.post.created_at)

                this.finalDate = this.months[response.data.post.created_at.getMonth()] +"-"
                +response.data.post.created_at.getDate()+"-"+response.data.post.created_at.getFullYear();
                 
                this.timeDetails = this.dayy[response.data.post.created_at.getDay()]+ "-" + response.data.post.created_at.getHours()+":"+response.data.post.created_at.getMinutes() + " minutes"

                let date = response.data.post.created_at
                let hours = date.getHours()
                let minutes = date.getMinutes()
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
           

                this.timeDetails = hours +":"+ minutes+ " " + day_night

                response.data.post.image = "http://localhost:8000/storage/"+response.data.post.image
                this.posts = response.data.post;
            })
        },
        // ampm(response){
        //     if(response.data.post.created_at.getHours() >= 12){
        //         response.data.post.created_at.getHours() + "pm"
        //     }else{
        //       response.data.post.created_at.getHours() + "am"
        //     }
        // }
    },
    mounted(){
        let data = {
            'user_id' : this.getUserData.id,
            'post_id' : this.$route.params.newsId
        }
        axios.post('http://localhost:8000/api/post/viewcount',data).then((response)=> {
            this.viewCount = response.data.view_count
         })
        this.postId = this.$route.params.newsId;
        this.loadPost(this.postId)
    }
};
</script>

