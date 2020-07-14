<template>
    <div class="g-box2" v-if="baseData">

       <div class="m-box1">
           星星得分 {{baseData.starNum}}
       </div>

        <div class="m-box2">
            <div class="u-tit">
                恭喜你完成了今天的课程
            </div>
            <div class="u-daycount">
                <div class="nums">
                    <span class="strong">{{baseData.studyNum}}</span>天
                </div>
                累计上课
            </div>
            <ul class="u-list">
                <li class="item">
                    <div class="item-count">{{baseData.wordsNumber}}</div>
                    <div class="item-tit">累计阅读(字)</div>
                </li>
                <li class="item">
                    <div class="item-count">{{baseData.poetryNum}}</div>
                    <div class="item-tit">学习古诗(首)</div>
                </li>
                <li class="item">
                    <div class="item-count">{{baseData.idiomsNum}}</div>
                    <div class="item-tit">学习成语(个)</div>
                </li>
                <li class="item">
                    <div class="item-count">{{baseData.pictureTalkingNum}}</div>
                    <div class="item-tit">看图说话(幅)</div>
                </li>
                <li class="item">
                    <div class="item-count">{{baseData.learnWordNum}}</div>
                    <div class="item-tit">识字(个)</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name:'VCompleted',
        props:['baseData']
    }
</script>

<style lang="scss" scoped>
.g-box2{

}
</style>