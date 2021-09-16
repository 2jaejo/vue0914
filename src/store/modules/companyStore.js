import axios from "axios";

const companyStore = {
    namespaced:true,
    
    state:{ 
        clientList:{

        },

        orderList:{

        },

        salesList:{

        },

    },

    mutations:{
       
        itemManagement: (state, payload) =>{
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

        itemManagement:({ commit }, data) => {

            axios.post('http://49.50.160.174/store/clientlist',{
                data
            },{
                headers:{

                }
            })
            .then(res => {
               commit('itemManagement',res.data);
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
                context.commit('searchSales',res.data);
            })
            .catch(err => {
                console.log('catch : '+ err);
            });
        }

    }
        
}

export default companyStore;