<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div>
            <v-ons-card>
                <v-ons-list>
                    <v-ons-list-item>
                        <div class="left">
                            <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">
                                {{director_nm}} 원장
                            </span>
                            <span class="list-item__subtitle">
                                {{director_his}}<br>
                                {{director_spec}}
                            </span>
                        </div>
                    </v-ons-list-item>
                    <v-ons-list-item>
                        <div class="left"> <span class="list-item__title"> 병원아이디 </span> </div>
                        <div class="center"> <span class="list-item__title"> {{hos_id}} </span> </div>
                    </v-ons-list-item>
                    <v-ons-list-item>
                        <div class="left"> <span class="list-item__title"> loc_cde </span> </div>
                        <div class="center"> <span class="list-item__title"> {{loc_cde}} </span> </div>
                    </v-ons-list-item>
                    <v-ons-list-item>
                        <div class="left"> <span class="list-item__title"> kind_cde </span> </div>
                        <div class="center"> <span class="list-item__title"> {{kind_cde}} </span> </div>
                    </v-ons-list-item>
    <!-- 날짜선택 -->
                    <v-ons-list-item>
                        <div class="center">
                            <select 
                                class="select-input select-input--underbar"
                                style="height:50px; font-size:30px;"
                                v-model="selectYear"
                                @change="changeYear"
                            >
                                <option v-for="year in years" :key="year" :value="year" >
                                {{ year }}
                                </option>
                            </select>
                            &nbsp;
                            <p>년</p>
                            &nbsp;&nbsp;
                
                            <select 
                                class="select-input select-input--underbar"
                                style="height:50px; font-size:30px;"
                                v-model="selectMonth"
                                @change="changeMonth"
                            >
                                <option v-for="item in month" :key="item" :value="item" >
                                {{ item }}
                                </option>
                            </select>
                            &nbsp;
                            <p>월</p>
                            &nbsp;&nbsp;
                            
                            <select 
                                class="select-input select-input--underbar"
                                style="height:50px; font-size:30px;"
                                v-model="selectDay"
                            >
                                <option v-for="item in days" :key="item" :value="item" >
                                {{ item }}
                                </option>
                            </select>
                            &nbsp;
                            <p>일</p>
                        </div>
                    </v-ons-list-item>
                    <v-ons-list-item>
                        <div class="center">
                            <p>
                                선택일자 : [ {{selectYear}} - {{selectMonth}} - {{selectDay}} ]
                            </p>
                        </div>
                    </v-ons-list-item>
<!-- 시간선택 -->
                    <v-ons-list-item>
                    
                        <div class="center">
                        <select 
                            class="select-input select-input--underbar"
                            style="height:50px; font-size:30px;"
                            v-model="selectHour"
                        >
                            <option v-for="hour in hours" :key="hour" :value="hour" >
                            {{ hour }}
                            </option>
                        </select>
                        &nbsp;
                        <p>시</p>
                        &nbsp;&nbsp;
                
                        <select 
                            class="select-input select-input--underbar"
                            style="height:50px; font-size:30px;"
                            v-model="selectMinute"
                        >
                            <option v-for="minute in minutes" :key="minute" :value="minute">
                            {{ minute }}
                            </option>
                        </select>
                        &nbsp;
                        <p>분</p>

                        </div>
                    </v-ons-list-item>
                    
                    <v-ons-list-item>
                        <div class="center">
                        <p>
                            선택시간 : [ {{selectHour}} : {{selectMinute}} ]
                        </p>
                        </div>
                    </v-ons-list-item>                    
                </v-ons-list>

                <div>
                    <v-ons-button modifier="large" @click="pop()">닫기</v-ons-button>
                </div>    
            </v-ons-card>
            <div>
                <v-ons-button modifier="large" @click="splice()">첫페이지로 이동</v-ons-button>
            </div>        
            <div>
                <button class="button--large button--outline" @click="axiosTest(title)">axios 서버통신</button>
            </div>
            <div v-if="axiosData">
                title: {{ axiosData.title }}<br>
                email : {{ axiosData.email}}<br>
                password : {{ axiosData.password}}<br>
                id : {{ axiosData.id}}<br>
                createdAt : {{ axiosData.createdAt}}    
            </div>           
        </div>
            
    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState(['axiosData']),
    },
    data(){
        return{
            years:[],
            month:[],
            days:[],
            lastDay:'',
            selectYear:'',
            selectMonth:'',
            selectDay:'',

            hours:[],
            minutes:[],
            selectHour:'06',
            selectMinute:'01',
        }
    },
    beforeMount(){
        let today = new Date();
        
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let date = today.getDate();
        let last = new Date(year,month,0).getDate();

        this.selectYear = year;
        this.selectMonth = (month >= 10 ? month : '0'+month);
        this.selectDay = (date >= 10 ? date : '0'+date);

    //년 select
        for(let i = year ; i <= year+1 ; i++){
        this.years.push(i);
        }

    //월 select
        for(let j = 1; j <= 12; j++){ 
        this.month.push( (j < 10 ? '0'+j : j ) );
        }

    //일 select
        for(let k = 1; k <= last ; k++){  
        this.days.push( (k < 10 ? '0'+k : k ) );
        }
    //시간 select
        for(let i = 6; i<21; i++){
            if(i<10){
                i = '0'+i;
            }
            this.hours.push(i);
        }
    //분 select
        for(let j = 0; j<60; j++){
            if(j<10){
                j = '0'+j;
            }
            this.minutes.push(j);
        }

    },
    methods:{
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        splice(){
            this.$store.dispatch('navigator/splicePage');
        },
        axiosTest(title){
            this.$store.dispatch('axiosTest',title);
        },
        changeYear(){
            this.selectMonth='01';
            this.selectDay='01';
        },
        changeMonth() {
            this.days.splice(0,this.days.length);  //일 배열 삭제
            let ld = new Date(this.selectYear,this.selectMonth, 0).getDate(); //선택된 월의 마지막 일
                for(let i=1; i <= ld; i++){
                this.days.push((i < 10 ? '0'+ i : i )); //selectbox
                }
            this.selectDay = '01';  //1일 선택
        }
    } 
}
</script>