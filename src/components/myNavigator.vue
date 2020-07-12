<template>
    <div class="tabBarBox">tabBar
        <button @click="getProps">getProps</button>  
    
        <ul class="tabList" data-index="aa">
            <li data-index="0" class="item actived">首页</li>
            <li data-index="1" class="item" @click="goLink">课程</li>
            <li data-index="2" class="item" @click="goLink2">我的</li>
            <li><button data-index="666" @click="goLink2">button</button></li>
        </ul>
       
        
    </div>
</template>

<script>
    export default {
        name:'tabBar',
        data(){
            return {
                anys:''
            }
        },
        methods:{
            goLink(){
                console.log('tabBar点击课程')
                wx.navigateTo({
                    url: '/pages/studentpages/kecheng/main',
                })
            },
            goLink2(){
                
                console.log('tabBar点击我的')
                wx.navigateTo({
                    url: '/pages/studentpages/my/index/main',
                })
            },
            getProps(){
                wx.showToast({
                    title: 'tabBar',
                    icon: 'success',
                    duration: 2000
                })

               
                
            }
        },
        onShow(){
            console.log('tabBar show')
        }
    }
</script>
<style scoped lang="less">
.tabBarBox{
    // position: fixed;
    // left:0;
    // bottom: 0;
    // width: 100%;
    height: 50px;
    z-index: 99999;
    .tabList{
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item{
            flex: 1;

        }
        .item.actived{
            color: #ccc;
        }

    }
    

    
}
</style>

