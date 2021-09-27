import axios from "axios";

const companyStore = {
    namespaced:true,
    
    state:{ 
        itemList:[],

        itemStepOne:[],

        itemStepTwo:[],

        clientList:[],

        orderList:[],

        salesList:[],

    },

    mutations:{
        itemList: (state, payload) =>{
            state.itemList = payload;       
        },

        searchItem:(state, payload) => {
            state.itemList = payload;
        },

        itemSelectStepOne:(state) => {
            axios.get('http://49.50.160.174/store/itemselectstepone',{
                
            })
            .then(res => {
                state.itemStepOne = res.data.one;
                state.itemStepTwo = res.data.two;
            })
            .catch(err => {
                console.log('catch : '+err);
            });    
        },

        itemSelectStepTwo:(state, payload) => {
            state.itemStepTwo = payload;
        },

        clientList:(state, payload) => {
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
                commit('itemList',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        },

        searchItem:(context, data) => {
            axios.post('http://49.50.160.174/store/itemlist',{
                data
            })
            .then(res => {
                context.commit('searchItem',res.data);
            })
            .catch(err => {
                console.log('catch : '+ err);
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
                if (res.data.length < 1){
                    let base = {
                        CLS_PARENT:data.key,
                        CLS_NM:'전체',
                        CLS_ID:'0',
                    }
                    //배열 맨앞에 '전체' 추가
                    res.data.unshift(base);
                }

               commit('itemSelectStepTwo',res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        },
        
        itemAdd:() => {

        },

        itemModify:() => {
            
        },

        itemDelete:() => {
            
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
                context.commit('searchSales',res.data);
            })
            .catch(err => {
                console.log('catch : '+ err);
            });
        }

    }
        
}

export default companyStore;