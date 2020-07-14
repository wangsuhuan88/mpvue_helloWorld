<template>
    <div class="g-box4" v-if="baseData">
        今日成就
        <div>
            {{baseData.todayAchievement}}
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