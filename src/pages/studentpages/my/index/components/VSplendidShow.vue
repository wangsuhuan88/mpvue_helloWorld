<template>
    <div class="box g-box5" v-if="baseData">
        <div>精彩表现</div>
        <template v-for="(obj,index) in baseData.splendidShow">
            <div class="m-box" :key="index">
                <div class="c-tit">{{obj.linkName}}</div>
                <ul v-if="obj.answerList">
                    <li v-for="(item,index2) in obj.answerList" :key="index2">
                        <div>{{item.stemUrl}}</div>
                        <div>星星数{{item.answerStarNum}}</div>
                        <div>
                            <!-- <audio controls="controls">
                                <source :src="item.audioUrl" type="audio/ogg">
                                <source :src="item.audioUrl" type="audio/mpeg">
                          
                            </audio> -->
                            
                        {{item.audioTime}}</div>
                    </li>
                </ul>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name:'VSplendidShow',
        props:["baseData"]
    }
</script>

<style lang="scss" scoped>
@import url(./common.scss);

.g-box5{
    
}
</style>