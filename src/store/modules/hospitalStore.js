import axios from "axios";

const hospitalStore = {
    namespaced:true,
    
    state:{
        hospitalInfo:{}, 
       
    },

    mutations:{
        hosInfo: (state, payload) =>{
            state.hospitalInfo = payload;
        },
        itemList: (state, payload) =>{
            state.itemList = payload;       
        },

    },

    actions:{
        hosInfo:({ commit }, data) => {
            axios.post('http://49.50.160.174/doctor/hosinfo',{
                data
            }).then(res =>{
                commit('hosInfo',res.data.list[0]);
            }).catch(err =>{
                console.log('catch : '+err);
            });
        },

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


    }
        
}

export default hospitalStore;