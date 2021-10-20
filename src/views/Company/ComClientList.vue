<template>
    <v-ons-page
        :infinite-scroll="loadMore"
    >
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">
                <b>{{ title }}</b>
            </div>
        </v-ons-toolbar>

        <div class="content">

            <v-ons-list> 
                <v-ons-list-item
                    modifier="chevron"
                    tappable
                    v-for="cli in clientList" :key="cli.HOS_iD"
                    style="padding-left:2%;"
                    @click="getClientInfo(cli)"
                >
                    {{cli.HOS_NM}}
                </v-ons-list-item>
            </v-ons-list>

<!-- 무한스크롤 로딩바 -->
            <div class="after-list" style="text-align:center; padding:10px;">
                <div class="true" v-if="show">
                    <v-ons-icon icon="fa-spinner" size="36px" spin></v-ons-icon>
                </div>
                <div class="false" v-else>
                    <p>마지막 페이지입니다.</p>
                </div>
            </div> 

        </div>
   
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import ComClientInfo from '../Company/ComClientInfo.vue'

export default {
    components: { 
        
    },
    computed:{
        
    },
    created(){
        this.$store.dispatch('chkLoginData');
        this.getClientList();       
    },
    data(){
        return{
            comClientList:[],

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			clientList:[],
            
        }
    },
    methods: {
        getClientInfo(cli){
            var pageToPush = {
                extends: ComClientInfo,
                data(){
                    return{
                        title:cli.HOS_NM,
                        back:'',
                        cli, 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
        getClientList(){
            let data ={
                nbr:this.nbr,
            }

            axios.post('http://49.50.160.174/store/clientlist',{
                data
            }).then(res =>{           
                if(res.data.list.length > 0){
                    this.comClientList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    if(this.comClientList.length > 20){
                        num = 20;
                    }else{
                        num = this.comClientList.length
                    }
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.comClientList[i];
                        this.clientList.push(data);
                    }
                    this.maxItem = this.comClientList.length;
                    this.nextItem = num;
                    this.count = 10;
                }            

            }).catch(err =>{
                console.log('catch : '+err);
            });
        },

        //무한스크롤 메서드
        loadMore(done) {
            console.log('load');
            this.show=true;

            if(this.nextItem == this.maxItem){
                    this.show=false;
            }
			if ( this.count + this.nextItem > this.maxItem ){
				this.count = this.maxItem - this.nextItem ;
				setTimeout(()=>{
					this.show=false;
				},1000)
            }

			setTimeout(() => {	
				for (let i = this.nextItem ; i < this.nextItem + this.count ; i++) {
					let data = JSON.parse(JSON.stringify(this.comClientList[i]));  
                    this.clientList.push(data);
				}
				this.nextItem += this.count;
				done();
			}, 600)
		}

    }
}
</script>