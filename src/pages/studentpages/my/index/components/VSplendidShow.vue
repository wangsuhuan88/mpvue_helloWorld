<template>
    <div class="g-box5" v-if="baseData">
        <div>精彩表现</div>
        {{baseData.splendidShow}}
        <template v-for="(obj,index) in baseData.splendidShow">
            <div :key="index">
                
                <div>{{obj.linkName}}</div>
                

                <ul v-if="obj.answerList">
                    <li v-for="(item,index2) in obj.answerList" :key="index2">
                        <div>{{item.stemUrl}}</div>
                        <div>星星数{{item.answerStarNum}}</div>
                        <div>
                            <audio controls="controls">
                                <source :src="item.audioUrl" type="audio/ogg">
                                <source :src="item.audioUrl" type="audio/mpeg">
                          
                            </audio>
                            <audio src="item.audioUrl"></audio>
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
.g-box5{

}
</style>