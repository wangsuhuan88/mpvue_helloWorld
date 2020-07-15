<template>
    <div class="box g-box4" v-if="baseData">
        <div class="m-box">
            <div class="c-tit">今日成就</div>
            <div>
                {{baseData.todayAchievement}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'VTodayAchievement',
        props:['baseData']
    }
</script>

<style lang="scss" scoped>
.g-box4{

}
</style>