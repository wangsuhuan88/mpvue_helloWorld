<template>
    <div>
        项目详情页 
    </div>
</template>

<script>
    export default {
        onShow(){
            console.log('kid')
            console.log(this)
            console.log(this.$root.$mp.query.kid) 
        }
    }
</script>

<style lang="less" scoped>

</style>