<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import Config from '@/api/Config'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { ConfigData } from '@/util/interface'

    const form = reactive({title:''})

    const props = withDefaults(defineProps<{
        data: ConfigData
    }>(),{})

    onMounted(()=>{
        console.log(props.data)
    })

    const submit = ()=>{
        const table = props.data.table.replace('_','/')
        console.log('table: ' +table)
        Config.mod(table,props.data.data,1).then((res)=>{
            console.log('mod result:')
            console.log(res)
            console.log('mod end')
            if(res.data.code === 0){
                ElMessage.warning('修改成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }else{
                ElMessage.warning(res.data.msg)
                return false
            }
        })
    }
</script>

<template>
    <el-container class="h-screen overflow-auto bg-white p-10">
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>{{data?.title}}</el-link>
            </div>
            <div>
            </div>
        </el-header>

        <el-main class="mt-10 w-[50%] min-w-[700px] pb-[100px]">
            <el-form size="large" label-width="180px">
                <template v-for="(item,index) in data?.map" :key="index">
                    <template v-if="item.map != 'id' && item.map != 'create_time' && item.map != 'update_time'">
                        <el-form-item :label="item.title" v-if="item.type == 'select'">
                            <el-select v-model="data.data[item.map]" placeholder="请选择">
                                <el-option :label="itm.title" :value="itm.id" v-for="itm in item.default" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" v-else-if="item.type == 'radio'">
                            <el-radio-group v-model="data.data[item.map]" class="ml-4">
                                <el-radio :label="itm[0]" size="large" v-for="itm in item.default">{{itm[1]}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.title" v-else-if="item.type == 'switch'">
                            <el-switch v-model="data.data[item.map]" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                        <el-form-item :label="item.title" v-else-if="item.type == 'textarea'">
                            <el-input v-model="data.data[item.map]" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" />
                        </el-form-item>
                        <el-form-item :label="item.title" v-else>
                            <el-input v-model="data.data[item.map]" />
                        </el-form-item>
                    </template>
                </template>
                <el-form-item label="">
                    <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确认保存</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
    body{
        background-color: #FFF;
    }
</style>