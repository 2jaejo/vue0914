import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

import Login from '../views/Login.vue'
import Company from '../views/Company'
import Hospital from '../views/Hospital'

Vue.use(Vuex);

const navigator = {
    namespaced:true,
    state:{
        pageStack:[Login],

    },
    mutations:{
        pushPage:(state, payload) => {
            state.pageStack.push(payload);    
        },
        popPage:(state) =>{
            state.pageStack.pop();
        },
        splicePage:(state) =>{
            state.pageStack.splice(1);
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
    },
}


export default new Vuex.Store({
    namespaced:true,
    modules:{
        navigator,
 
    },
    state:{ //data
        user :{is_login:false, kor_nm:'',relater_div_cde:'',user_id:''},
        session:'',       
    },
    mutations:{
        //로그인 데이터 저장
        procLoginData: (state, payload) =>{
            console.log(payload.user);
            state.user = payload.user;         
        },
        emptyLoginData:() => {
            console.log('OK!!!!');
    
        },
        //로그아웃 데이터 삭제
        procLogoutData:(state) => {
            state.user='';
            console.log(state.user);
        },
        //로그인 데이터 확인
        chkLoginData:(state, payload ) => {
            state.user.is_login = payload;
            //state.session = payload;
        }
    },
    actions:{

        procLoginData:({ commit },data) => {
            axios.post('http://49.50.160.174/comm/login',{
                data
            })
            .then(res => {
                if(!(res.data.status == '000')){
                    alert('로그인 실패');
                }else{
                    alert('로그인 성공');
                    commit('procLoginData', res.data);
                    console.log(res.data.user.relater_div_cde);

                    const getMenu = (type)=>{
                        switch(type){
                            case '3002':
                                return Company;
                            case '3001':
                                return Hospital;
                        }
                    }
                    var pageToPush = {
                        extends: getMenu(res.data.user.relater_div_cde),
                        data(){
                            return{
                                
                            }
                        }
                    }
                    commit('navigator/pushPage',pageToPush);    
                
                }     
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },

        procLogoutData:({ commit }) => {
            axios.get('http://49.50.160.174/comm/logout',{
    
            })
            .then(res => {
                if(res.data.status == '000'){
                    alert('로그아웃');
                    commit('procLogoutData');
                    //commit('navigator/splicePage');
                }     
            })
            .catch(err => {
                console.log('catch : '+err);
            });
            
        },
        chkLoginData({ commit } ){
            axios.get('http://49.50.160.174/comm/check',{
    
            })
            .then(res => {
                console.log('chkLoginData');
                console.log(res.data);

                if(res.data.user.is_login) {
                    commit('chkLoginData',res.data);
                } else {
                    //TO-DO 로그아웃 페이지로 이동
                    commit('navigator/popPage');
                }
  
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }


    }
        
})

