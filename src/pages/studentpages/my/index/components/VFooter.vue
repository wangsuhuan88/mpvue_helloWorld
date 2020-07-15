<template>
    <div>
        <button open-type="share">分享1</button>
        <button @click="handlerFun">生成海报</button>
    </div>
</template>

<script>
    export default {
        name:'VFooter',
        methods: {
            handlerFun(){
                console.log(123)
                this.$emit('showModalFun')
            }
        },
        
        
    }
</script>

<style lang="scss" scoped>

</style>