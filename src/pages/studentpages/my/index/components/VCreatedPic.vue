<template>
    <div class="g-box6">
        <a class="btnclose" href="javascript:;" @click="closeFun">关闭</a>
        <canvas v-show="!imgpath" canvas-id="canvasId" class="canvas"></canvas>
        <template v-if="imgpath">
            <img :src="imgpath" alt="">
            <button class="saveimg" @click="saveimg">保存图片</button>
        </template>
        
    </div>
</template>

<script>
    import canvas from "../common/canvas.js";
    export default {
        name:'VCreatedPic',
        data(){
            return {
                imgpath:''
            }
        },
        mounted() {
            console.log('created pic mounted')
            
            this.draw().then(path => {
                console.log('wanc')
                console.log(path)
                this.imgpath = path
            })

            

        },
        methods:{
            draw() {
                let canvasId = "canvasId";
                const commands = [
                    { type: "rect", x: 0, y: 0, w: 750, h: 1335, fill: "#ff0", alpha: 1 }
                ];

                return canvas.draw({
                    canvasId,
                    commands,
                    delay: 800
                }).then(() => {
                    return canvas.save({
                        canvasId
                    });
                    /*
                    wx.canvasToTempFilePath({
                            canvasId:canvasId,
                            quality: 1,
                            success: res => {
                                wx.showToast({
                                    title:'success'
                                })
                                // this.setData({
                                //     canvasTemImg: res.tempFilePath,
                                //     canvasHidden:true
                                // })
                                console.log('success')
                                console.log(res)
                            },
                            fail: res => {
                                wx.showToast({
                                    title:'fail'
                                })
                                console.log('fail')
                                console.log(res)
                            },
                            complete:res => {
                                wx.showToast({
                                    title:'complete'
                                })
                                console.log('completed')
                                console.log(res)
                            }
                        })
                        */
                        
                }).then(path => {
                    return path;
                });
                
            },
            closeFun(){
                this.$emit('hideModalFun')
            },
            saveimg(){
                let _this = this
                let t = 'scope.writePhotosAlbum'
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting[t]) {
                            wx.authorize({
                                scope: t,
                                success () {
                                    // 2次重复代码
                                    // 待提取优化
                                    wx.saveImageToPhotosAlbum({
                                        success(res) { 
                                            wx.showToast({
                                                title:'已保存到相册'
                                            })
                                        }
                                    })
                                },
                                
                            })
                        }else{
                             wx.saveImageToPhotosAlbum({
                                filePath:_this.imgpath,
                                success(res) { 
                                    wx.showToast({
                                        title:'已保存到相册'
                                    })
                                }
                            })
                        }
                    }
                })
            }
           
        }
    }
</script>

<style lang="scss" scoped>
.g-box6{
    position: fixed;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0,0,0,.6);
    .btnclose{
        position:absolute;
        left:0;
        top: 0;
        width: 50px;
        height: 50px;
        z-index: 100;
    }


}
</style>