<template>
    <div  class="g-box1" v-if="baseData">
        <p>{{baseData.nick}}</p>
        <img class="m-avatar" :src="baseData.headUrl" alt="">
    </div>
</template>

<script>
    export default {
        name:'VUser',
        data(){
            return {
                userData:null
            }
        },
        props:['baseData'],
        mounted(){
            //this.getUserData()
        },
        methods: {
            getUserData(){
                wx.getUserInfo({
                    success: (res) => {
                        this.userData = res.userInfo
                    },
                    fail:(res) => {
                        console.log(res)
                        wx.showToast({
                            title: res,
                            duration: 2000
                        })
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.g-box1{
    .m-avatar{
        width: 100px;
        height: 100px;
    }
}

</style>