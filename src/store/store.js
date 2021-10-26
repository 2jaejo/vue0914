import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

//로그인 컴포넌트
import Login from '../views/Login.vue'

//모듈 임포트
import companyStore from './modules/companyStore'
import hospitalStore from './modules/hospitalStore'

Vue.use(Vuex);

//내비게이터 모듈 
const navigator = {
    namespaced:true,
    state:{
        //내비 페이지 스택
        pageStack:[Login],

    },
    mutations:{
        //페이지 더하기
        pushPage:(state, payload) => {
            state.pageStack.push(payload);    
        },
        //페이지 빼기
        popPage:(state) =>{
            state.pageStack.pop();
        },

        //페이지 첫화면
        splicePage:(state) =>{
            state.pageStack.splice(1);
        },
        //메인화면
        mainPage:(state) =>{
            state.pageStack.splice(2);
        }, 
    },
    actions:{
        pushPage:({ commit }, page) => {
            commit('pushPage', page);
        },
        popPage:({ commit }) => {
            commit('popPage');
        },
        splicePage:({ commit }) => {
            commit('splicePage');
        },
        mainPage:({ commit }) => {
            commit('mainPage');
        },
    },
}



export default new Vuex.Store({
    namespaced:true,
    modules:{
        navigator,
        companyStore,
        hospitalStore,
 
    },
    state:{ //data
        user :{
            is_login:'', 
            user_id:'',
            kor_nm:'',
            relater_div_cde:'',
        },   
    },
    mutations:{
        //로그인 데이터 저장
        procLoginData: (state, payload) =>{
            state.user = payload.user;         
        },
        //로그아웃 데이터 삭제
        procLogoutData:(state) => {
            state.user.is_login=false;
            state.user.user_id='';
            state.user.kor_nm='';
            state.user.relater_div_cde='';
        },
        //로그인 데이터 확인
        chkLoginData:(state, payload ) => {
            state.user.is_login = payload;
        }
    },
    actions:{
        procLogoutData:({ commit }) => {
            axios.get('http://49.50.160.174/comm/logout',{
    
            })
            .then(res => {
                if(res.data.status == '000'){
                    //state.user 초기화
                    commit('procLogoutData');
                    //alert('로그아웃');

                    //첫번째 스택 이동  (로그인화면)
                    commit('navigator/splicePage');
                }     
            })
            .catch(err => {
                console.log('catch : '+err);
            });
            
        },

        //세션 확인 
        chkLoginData({ commit } ){
            axios.get('http://49.50.160.174/comm/check',{
    
            })
            .then(res => {
                //console.log('세션 확인');
                //console.log(res.data.user);

                if(res.data.user.is_login == true) {
                    commit('chkLoginData',res.data.user.is_login);
                } else {
                    
                    //state.user 초기화
                    commit('procLogoutData');
                    //새로고침
                    window.location.reload();

                    //첫번째 스택 이동  (로그인화면)
                    //commit('navigator/splicePage');
                }
  
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }


    }
        
})

