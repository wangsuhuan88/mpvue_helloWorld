<template>
    <div  class="g-box1" v-if="baseData">
        <img class="m-avatar" :src="baseData.headUrl" alt="">
        <div class="m-info">
            <div class="u-name">{{baseData.nick}}</div>
            <div class="u-msg">我在学云舒写大语文启蒙课</div>
        </div>
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
    padding: 24px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .m-avatar{
        width: 54px;
        max-width: 54px;
        height: 54px;
        margin-right: 8px;
        border-radius: 50%;
    }
    .m-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        .u-name{
            font-size: 18px;
            font-weight: bold;
        }
        .u-msg{
            font-size: 15px;
        }

    }
}

</style>