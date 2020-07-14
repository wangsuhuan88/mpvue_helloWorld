<template>
    <div>
     
        <v-user :baseData="baseData"></v-user>
        
        <v-completed :baseData="baseData"></v-completed>

        <v-chapter :baseData="baseData"></v-chapter>

        <v-todayAchievement :baseData="baseData"></v-todayAchievement>

        <v-splendidShow :baseData="baseData"></v-splendidShow>

        <v-footer @drawPic="drawPic"></v-footer>

        <v-createdPic v-if="showModal"></v-createdPic>
        
    </div>
</template>

<script>

    import VUser from './components/VUser'
    import VCompleted from './components/VCompleted'
    import VChapter from './components/VChapter'
    import VTodayAchievement from './components/VTodayAchievement'
    import VFooter from './components/VFooter'
    import VSplendidShow from './components/VSplendidShow'
    import VCreatedPic from './components/VCreatedPic'

    export default {
        name:'myStudy',
        data(){
            return {
                baseData:null,
                showModal:false
            }
        },
        components:{
            VCompleted,
            VChapter,
            VTodayAchievement,
            VFooter,
            VUser,
            VSplendidShow,
            VCreatedPic
        },
        mounted() {
            // mock data 
            // TODO
            this.baseData = {
                chapterName: "【成语】闻鸡起舞",
                chapterPicture: "http://oss-sts-upload.yunshuxie.com/pic/thadm/material/2020/04/27/16/09/44/29a88c722c7b48f3a1299d748b9bb8af/8929d017-b90a-4220-bb6d-a64ffaddee02.png",
                courseName: "我正在学云舒写大语文启蒙年课",
                formalCourseUrl: null,
                headUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKhIssPsAxlaBbHDicEQP8dqaPSlTnxcCbBgQaOibRVEpS7BnicDWQI20ZNw0bnRujdMV00v3xRyd8ibw/132",
                idiomsNum: 1,
                learnWordNum: 9,
                learningUrl: "https://sale1.yunshuxie.com/course3.html?productType=140&activityId=5095&sk=n8mNwofHz7lm7ht6lWoQXOvMTASrf7dMON74zE1KuaM=",
                nick: "60000011865",
                pictureTalkingNum: 0,
                poetryNum: 1,
                qrCodeUrl: "http://oss-ysx-pic.yunshuxie.com/pic/DSGD29n1594695706840.png",
                shareDes: "学习云舒写大语文启蒙课的第3天，已跟北大博士老师，一起阅读1730字，想来试试么？",
                shareImg: "http://ysx-pic.oss-cn-beijing.aliyuncs.com/activity/2020/writing_picture03/152_152.png",
                shareTitle: "我的学习报告已出炉，快来看看吧",
                shareUrl: "https://talkpicture.yunshuxie.com/tp_study_report.html?chapterId=180448&productType=140&shareMemberId=KH36NxQWazZ5jXwQYOU6qQ%3D%3D",
                splendidShow: [
                    {
                        answerList: [
                            {
                                answerStarNum: 2,
                                assemblyId: 145,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>先听到鸡叫声的是谁呢？</p>",
                            },
                            {
                                answerStarNum: 2,
                                assemblyId: 147,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>祖逖把半夜的鸡叫声当成什么了？</p>"
                            },
                            {
                                answerStarNum: 3,
                                assemblyId: 146,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>&ldquo;闻鸡起舞&rdquo;中的&ldquo;舞&rdquo;是什么意思"
                            }

                        ],
                        linkName: "动动脑筋",
                        linkSort: 3,
                    },
                    {
                        linkName: "用用成语",
                        linkSort: 4,
                        answerList:[
                            {
                                answerStarNum: 3,
                                assemblyId: 152,
                                audioTime: 5,
                                audioUrl: "http://oss-ysx-msg.yunshuxie.com/audio/DSGDptg1594537094579.mp3",
                                stemUrl: "<p>祖逖闻鸡起舞的精神真值得我们学习呀！</p>↵<div id=\"eagle-drag-images\" style=\"position: fixed; top: -100000px;\">&nbsp;</div>",
                            },
                            {
                                answerStarNum: 3,
                                assemblyId: 148,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>想要鼓励莎莎坚持练琴，你可以给她讲谁的故事呢？</p><div id='eagle-drag-images' style='position: fixed; top: -100000px;'>&nbsp;</div>"
                            },
                            {
                                answerStarNum: 3,
                                assemblyId: 149,
                                audioTime: 26,
                                audioUrl: "http://oss-ysx-msg.yunshuxie.com/audio/DSGD2fj1594537304672.mp3",
                                stemUrl: "<p>试着用闻鸡起舞的故事来鼓励莎莎坚持练琴吧！</p>",
                            }
                        ]
                    },
                    {
                        linkName: "认认汉字",
                        linkSort: 5,
                        answerList:[
                            {
                                answerStarNum: 3,
                                assemblyId: 178,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>请为淘淘选出他喜欢的气球吧！（早）</p>",
                            },
                            {
                                answerStarNum: 3,
                                assemblyId: 184,
                                audioTime: null,
                                audioUrl: null,
                                stemUrl: "<p>请为淘淘选出他喜欢的气球吧！（午）</p>",
                            }
                        ]
                    }
                ],
                starNum: 3,
                studyNum: 3,
                todayAchievement: "<p>我复习了词语：使劲拍 猛地跳 一溜烟地跑<br />我读了：《闻鸡起舞》的故事<br />我掌握了：&ldquo;闻鸡起舞&rdquo;的意思和用法<br />我认识了汉字：早、午、夜<br />我知道了要勤奋和坚持</p>",
                wordsNumber: 1730
            }
        },
        onShareAppMessage(e){
            return {
                title: '分享标题123',
                path: 'pages/studentpages/my/index/main',
                imageUrl: '../img/411.jpg',
                success: (res) => {
                    wx.showToast({
                        title: '分享成功',
                        icon: 'success',
                        duration: 2000
                    })
                },
                fail: (res) => {
                    // 分享失败
                    wx.showToast({
                        title: '分享失败',
                        icon: 'failed',
                        duration: 2000
                    })
                }
            }
        },
        methods: {
            drawPic(){
                console.log(456)
                this.showModal = true
            }
        },

        
    }
</script>

<style lang="scss" scoped>

</style>