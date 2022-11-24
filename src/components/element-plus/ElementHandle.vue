<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import router from '@/router'

    interface ButtonList{
        id: number
        title: string
        type?: any
        click: ((evt: MouseEvent) => any) | undefined
        plain?: boolean
    }

    const buttons = ref<ButtonList[]>()

    const props = withDefaults(defineProps<{
        items: ButtonList[],
        table?: string,
        title?: string
    }>(),{
        table: '',
        title: ''
    })

    onMounted(() => {
        buttons.value = [
            {id:1,title:'刷新',type:'',click:()=>{return refresh()},plain:true},
            {id:2,title:'新增',type:'',click:()=>{return add()},plain:false},
            {id:3,title:'删除',type:'',click:()=>{return del()},plain:false},
            // {id:4,title:'导入',type:'',click:()=>{return imports()},plain:false},
            // {id:5,title:'导出',type:'',click:()=>{return exports()},plain:false},
            // {id:6,title:'打印',type:'',click:()=>{return print()},plain:false},
            // {id:7,title:'审核',type:'',click:()=>{return review()},plain:false},
            // {id:8,title:'核准',type:'',click:()=>{return approve()},plain:false},
            // {id:9,title:'清空',type:'',click:()=>{return clear()},plain:false},
            {id:10,title:'返回',type:'',click:()=>{return reback()},plain:false},
        ]
    })

    const emit = defineEmits(['refresh','add','del','imports','exports','print','review','approve','clear','reback'])

    // 刷新
    const refresh = ()=>{
        window.location.reload()
    }

    // 新增
    const add = ()=>{
        console.log('add')
        // if(props.action != ''){
        //     router.push('/'+props.action)
        // }else{
        //     // dialog = false
        // }

        emit('add')
    }

    // 删除
    const del = ()=>{
        emit('del')
    }

    // 导入
    const imports = ()=>{
        console.log('imports')
        emit('imports')
    }

    // 导出
    const exports = ()=>{
        console.log('exports')
        emit('exports')
    }

    // 打印
    const print = ()=>{
        console.log('print')
        emit('print')
    }

    // 审核
    const review = ()=>{
        console.log('review')
        emit('review')
    }

    // 核准
    const approve = ()=>{
        console.log('approve')
        emit('approve')
    }

    // 清空
    const clear = ()=>{
        if(confirm('确定要清空所有数据么？')){
            if(confirm('清空后数据无法恢复,确定要执行么？')){
                console.log('clear')
                emit('clear')
            }
        }
    }

    // 返回
    const reback = ()=>{
        window.history.go(-1);
    }
</script>

<template>
    <div>
        <template v-for="(item,index) in buttons" :key="item.id">
            <el-button :plain="item.plain" :type="item.type" size="default" class="text-gray-500 font-light" @click="item.click">{{item.title}}</el-button>
        </template>
    </div>
</template>

<style lang="scss" scoped>

</style>