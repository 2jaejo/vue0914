import axios from "axios";

const companyStore = {
    namespaced:true,
    
    state:{ 
        itmeList:[],

        itemStepOne:[],

        itemStepTwo:[],

        clientList:{},

        orderList:{},

        salesList:{},

    },

    mutations:{
        itemList: (state, payload) =>{
            state.itemList = payload;        
        },

        itemSelectStepOne:(state, payload) => {
            state.itemStepOne = payload;
        },
        itemSelectStepTwo:(state, payload) => {
            state.itemStepTwo = payload;
        },

        clientList: (state, payload) =>{
            state.clientList = payload;        
        },

        searchOrder:(state, payload) =>{
            state.orderList = payload;
        },

        searchSales:(state, payload) =>{
            state.salesList = payload;
        }
    },

    actions:{
        itemList:({ commit }, data) => {

            axios.post('http://49.50.160.174/store/itemlist',{
                data
            },{
                headers:{

                }
            })
            .then(res => {
                console.log(res.data);
                commit('itemList',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }, 

        itemSelectStepOne:({ commit }) => {
            axios.get('http://49.50.160.174/store/itemselectstepone',{
   
            },{
                headers:{

                }
            })
            .then(res => {
                let base = {
                    CLS_PARENT:'0',
                    CLS_NM:'전체',
                    CLS_ID:'0',
                }
                //배열 맨앞에 '전체' 추가
                res.data.unshift(base);

               commit('itemSelectStepOne',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        },

        itemSelectStepTwo:({ commit }, data) => {
            axios.post('http://49.50.160.174/store/itemselectsteptwo',{
                data
            },{
                headers:{

                }
            })
            .then(res => {
                let base = {
                    CLS_PARENT:data.key,
                    CLS_NM:'전체',
                    CLS_ID:'0',
                }
                //배열 맨앞에 '전체' 추가
                res.data.unshift(base);

               commit('itemSelectStepTwo',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }, 

        clientList:({ commit }, data) => {

            axios.post('http://49.50.160.174/store/clientlist',{
                data
            },{
                headers:{

                }
            })
            .then(res => {
               commit('clientList',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }, 
        
        searchOrder:(context,data) => {
            axios.post('http://49.50.160.174/store/orderlist',{
                data
            })
            .then(res => {
                context.commit('searchOrder',res.data);
            })
            .catch(err => {
                console.log('catch : '+ err);
            });
        },
        
        searchSales:(context, data) => {
            axios.post('http://49.50.160.174/store/saleslist',{
                data
            })
            .then(res => {
                console.log('sales');
                console.log(res);
                context.commit('searchSales',res.data);
            })
            .catch(err => {
                console.log('catch : '+ err);
            });
        }

    }
        
}

export default companyStore;