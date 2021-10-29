<template>
    <v-ons-page>
<!-- 툴바 -->
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>
 
<!-- 본문 -->
        <div class="content">
            <ons-list>
                <ons-list-item>
                    <label class="center" for="pc_yn">
                        PC접속 허용 ({{ pc_yn ? 'on' : 'off' }})
                    </label>
                    <div class="right">
                        <v-ons-switch input-id="pc_yn"
                            v-model="pc_yn"
                        >
                        </v-ons-switch>
                    </div>
                </ons-list-item>
                <ons-list-item>
                    <label class="center" for="alarm_yn">
                        푸시알림 허용 ({{ alarm_yn ? 'on' : 'off' }})
                    </label>
                    <div class="right">
                        <v-ons-switch input-id="alarm_yn"
                            v-model="alarm_yn"
                        >
                        </v-ons-switch>
                    </div>
                </ons-list-item>
            </ons-list>
            <v-ons-list>
                <v-ons-list-item style="height:80px;">
                    <div class="center">
                        <v-ons-button modifier="large--cta" @click="modifyUserSetting()">수정</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>       
        </div>

    </v-ons-page>    
</template>

<script>

export default {
    created(){
        this.getUserSetting();
    },
    data() {
        return {
            pc_yn:false,
            alarm_yn:false,       
        }
    },
    methods:{
        getUserSetting(){
            this.$axios.get('http://49.50.160.174/user/getusersetting',{

            }).then(res => {
                res.data.list[0].PC_YN == '1' ? this.pc_yn = true : this.pc_yn = false;
                res.data.list[0].ALARM_YN == '1' ? this.alarm_yn = true : this.pc_yn = false;
            }).catch(err => {
                console.log('catch : '+err);
            });
        },
        modifyUserSetting(){
            let data = {};
            this.pc_yn == true ? data.pc_yn = '1' : data.pc_yn = '0';
            this.alarm_yn == true ? data.alarm_yn = '1' : data.alarm_yn = '0';

            this.$axios.post('http://49.50.160.174/user/modifyusersetting',{
                data
            }).then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert({
                        title: "CODE : "+res.data.status,
                        message: '수정완료!'
                    }); 
                    this.getUserSetting();
                }else{
                    this.$ons.notification.alert("수정실패!");
                }    
            }).catch(err => {
                console.log('catch : '+err);
            });
        }

    }
    
}
</script>