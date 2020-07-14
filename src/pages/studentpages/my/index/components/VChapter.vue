<template>
    <div class="g-box3" v-if="baseData">
        <div>{{baseData.chapterName}}</div>
        <img :src="baseData.chapterPicture" alt="">
    </div>
</template>

<script>
    export default {
        name:'VChapter',
        props:['baseData']
    }
</script>

<style lang="scss" scoped>
.g-box3{

}
</style>