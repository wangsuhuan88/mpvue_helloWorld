<template>
    <div class="g-box1">shrink 
      123
        
        <div class="ItemBox" v-if="dataObj"  @click="showList(dataObj)">
            <div class="m-tit">{{dataObj.tit}}</div>
            <div class="m-list" v-show="dataObj.isShow">
                <ul>
                    <li class="item" @click.stop="goDetail">   
                        <img class="img" :src="dataObj.img" alt="">
                        <div class="text" @click.stop="setScore">{{dataObj.item1}}</div>
                    </li>
                  
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'VShrink',
        data(){
            return {
                wshname:'vshrink组件',
                list:null,
                curIndex:-1,
            }
        },
        props:['dataObj'],
        onShow(){
            console.log('sharink  on show')
            //console.log(this.dataObj)
        },
        methods:{
            showList(item){
                console.log('showList1')
                item.isShow = !item.isShow
            },
            goDetail(){
                console.log('goDetail')
            },
            setScore(){
                console.log('setScore')
                wx.navigateTo({
                    url: '/pages/studentpages/detail/main?kid=1',
                })

            }
            
        },
        watch: {
            dataObj(newv,oldv){
                console.log(newv)
                this.list = newv;
            }
        },
        
    }
</script>

<style lang="less" scoped>
.ItemBox{
    .m-tit{
        height: 50px;
        text-align: center;
        font-size: 16px;
        line-height: 50px;
    }
    .m-list{
        .item{
            list-style: none;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            .img{
                width: 200px;
                height: 200px;
            }
            .text{
                margin-top: 20px;
                padding: 10px;
                line-height: 24px;
            }

        }
    }
}
</style>