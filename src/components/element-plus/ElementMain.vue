<script setup lang="ts">
    import { ref,onMounted } from 'vue'

    const showData = ref()

    onMounted(()=>{
        init()
    })

    const init = () => {
        setShowData()
    }

    const setShowData = () => {
        showData.value = [
            {id:1,title:'标题1',icon:'s',pic:'/images/mb1.png',value:897,desc:'日访问量 1235'},
            {id:2,title:'标题2',icon:'s',pic:'/images/mb2.png',value:345,desc:'日访问量 1235'},
            {id:3,title:'标题3',icon:'s',pic:'/images/mb3.png',value:6543,desc:'日访问量 1235'},
            {id:4,title:'标题4',icon:'s',pic:'/images/mb4.png',value:2376,desc:'日访问量 1235'}
        ]
    }
</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6" v-for="item in showData" :key="item.id">
            <div class="rounded-lg bg-white p-5">
                <div class="flex justify-between">
                    <div class="text-gray-600">{{item.title}}</div>
                    <div class="flex1 text-gray-600">{{item.icon}}</div>
                </div>
                <div class="flex justify-between">
                    <h4 class="text-4xl my-5">{{item.value}}</h4>
                </div>
                <div>
                    <img :src="item.pic" alt="" class="w-full">
                </div>
                <el-divider class="my-4" />
                <div class="flex justify-between">
                    <div class="text-gray-500">{{item.desc}}</div>
                </div>
            </div>
        </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-5">
        <el-col :span="12">
            <div class="rounded-lg bg-white py-5">
                <div class="flex justify-between px-5">
                    <div class="text-gray-600">项目数据详情</div>
                    <div class="flex1 text-gray-600">asd</div>
                </div>
                <el-divider class="my-4" />
                <div class="px-5">
                    <echart-bar />
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="rounded-lg bg-white py-5">
                <div class="flex justify-between px-5">
                    <div class="text-gray-600">项目数据详情</div>
                    <div class="flex1 text-gray-600">asd</div>
                </div>
                <el-divider class="my-4" />
                <div class="px-5">
                    <echart-pie />
                </div>
            </div>
        </el-col>
    </el-row>
    
    <el-row :gutter="20" class="mt-5">
        <el-col :span="4" v-for="i in 6">
            <div class="rounded-lg bg-white p-5">
                <div class="flex justify-between">
                    <div class="text-gray-600">参考数据</div>
                    <div class="flex1 text-gray-600">100</div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
    
</style>