<template>
    <div>
        <div class="g-list">
            <!-- {{dataObj.tit}} -->
            <v-shrink :dataObj="dataObj"></v-shrink>
            <card :text="name"></card>
        </div>

        <div class="g-footer">
            <VmyNavigator></VmyNavigator>
        </div>
    </div>
</template>

<script>
    import  VmyNavigator  from '@/components/myNavigator.vue'
    import VShrink  from '@/components/student/VShrink.vue'
    import card from '@/components/card'
    export default {
        name:'student-index',
        data(){
            return {
                name:'wangsuhuan',
                dataObj:{
                    tit:"我的标我的标题我的标题我的标题题111",
                    img:"https://thumb.qschou.com/files/qschou.com/avatar/285/63a7acbe-bd54-11e7-adb1-00163e002a34/32868f34-c02c-11ea-9a29-00163e002a34.jpeg@!thumb.png",
                    item1:"项标题哈哈111",
                    isShow:false,
                }
            }
        },
        components:{
            VmyNavigator,
            VShrink,//:() => import('../../components/student/VShrink.vue')
            card
        },
        onShow(){
            console.log('aa')
        },
        methods: {
            testh(e){
                console.log(e)
            }
        },
    }
</script>
