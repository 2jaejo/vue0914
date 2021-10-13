import axios from "axios";

const companyStore = {
    namespaced:true,
    
    state:{ 
        itemStepOne:[],
        itemStepTwo:[],
    },

    mutations:{
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
    },

    actions:{
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
   

    }
        
}

export default companyStore;