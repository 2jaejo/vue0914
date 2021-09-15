import axios from "axios";

const companyStore = {
    namespaced:true,
    
    state:{ 
        clientList:{

        },

    },

    mutations:{
       
        itemManagement: (state, payload) =>{
            state.clientList = payload;        
        },
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

    }
        
}

export default companyStore;