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
            <!-- 리스트 -->
            <ul class="list">
                <li class="list-item list-item--longdivider">
                    <div class="list-item__center list-item--longdivider__center">
                        {{list.WR_SUBJECT}}         
                    </div>
                </li>
                <!-- <br> 줄바꿈 적용 = v-html -->
                <li class="list-item list-item--longdivider">
                    <div class="list-item__center list-item--longdivider__center"
                        v-html="list.WR_CONTENT"
                    >
                    </div>
                </li>
                <li class="list-item list-item--longdivider">
                    <div class="list-item__center list-item--longdivider__center">
                        {{list.WR_DATETIME}}
                    </div>
                </li>
            </ul>        
        </div>

    </v-ons-page>    
</template>

<script>
export default {
    
}
</script>