<script setup lang="ts">
    import { ref,reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import { DataList } from '@/util/interface';
    import Query from '@/api/Query'

    const form = reactive({content:''})
    const data = ref<DataList>()
    const result = ref('')

    console.log(typeof(result.value))

    const submit = () => {
        Query.get(form.content).then((res)=>{
            if(res.data.code === 0){
                ElMessage('执行成功')
                result.value = ''
                data.value = JSON.parse(JSON.stringify(res.data.data))
            }else{
                result.value = 'Error: ' + res.data.msg
                return false
            }
        }).catch((res)=>{
            result.value = '网络错误'
        })
    }
</script>

<template>
    <view>
        <form>
            <el-form-item>
                <el-col :span="24">
                    <el-input v-model="form.content" :rows="5" type="textarea" placeholder="sql" />
                </el-col>
            </el-form-item>
            <el-form-item label="" class="text-right">
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">执行</el-button>
                <el-button >重置</el-button>
            </el-form-item>
        </form>

        <view class="mt-5">
            <view v-if="result">{{result}}</view>
            <view v-else>
                <el-table :data="data?.data" style="width: 100%">
                    <el-table-column :prop="item.field" :label="item.title" v-for="(item,index) in data?.thead" :key="index" show-overflow-tooltip />
                </el-table>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>

</style>