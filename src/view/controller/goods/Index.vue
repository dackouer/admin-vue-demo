<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import router from '@/router';
    import Goods from '@/api/Goods'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,title:'',symbol:'',is_default:0})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            Goods.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.title = data.title
                    form.symbol = data.symbol
                    form.is_default = data.is_default
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.title = ''
            form.symbol = ''
            form.is_default = 0
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
    }

    // 获取显示数据
    const getTableData = async () => {
        Goods.show(search).then((res)=>{
            if(res.data.code === 0){
                tableData.value = JSON.parse(JSON.stringify(res.data.data))
            }else{
                console.log(res)
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 翻页
    const changePage = async (e:any) => {
        search.page = e
        await getTableData()
    }

    // 切换显示行数
    const changePagesize = async (e:any) => {
        search.pagesize = e
        await getTableData()
    }

    // 数据选择器
    const onSelect = (e:any) => {
        selectData.value = e
    }

    // 新增按钮
    const add = async (table:string) => {
        router.push('./goods/action')
        // keyid.value = 0
        // dialogFormVisible.value = true
    }

    // 修改按钮
    const mod = async (table:string,id:number = 0) => {
        router.push('./goods/action?id='+id)
        // keyid.value = id
        // dialogFormVisible.value = true
    }

    // 删除数据
    const del = async (table:string,id:number = 0) => {
        Goods.del(id).then((res)=>{
            if(res.data.code === 0){
                ElMessage('删除成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 批量删除数据
    const batchDel = (table:string) => {
        if(!selectData.value){
            alert('请选择要删除的选项!')
            return false
        }

        const selectID:string = getSelectID(selectData.value)
        if(!selectID.length){
            alert('请选择要删除的选项!')
            return false
        }
        Goods.del(selectID).then((res)=>{
            if(res.data.code === 0){
                ElMessage('删除成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 提交表单
    const submit = async () => {
        Goods.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(keyid.value?'修改成功':'新增成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

</script>

<template>
    <el-container class="bg-white">
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>{{tableData?.title.replace('管理','')}}管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add(tableData?.table)">新增</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <el-form :inline="true" :model="search" size="large" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input v-model="search.keyword" placeholder="关键词" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableData" class="text-gray-500 font-light">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <element-table :data="tableData" @mod="mod" @del="del" @select="onSelect" />
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-handle :items="[]" @add="add(tableData?.table)" @del="batchDel(tableData?.table)" />
            <el-pagination v-model:currentPage="search.page" v-model:page-size="search.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" :title="(form?.id ? '修改' : '新增') + tableData?.title.replace('管理','')" width="700px">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="单位：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="标识符：">
                <el-col :span="14">
                    <el-input v-model="form.symbol" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="设为默认：">
                <el-switch v-model="form.is_default" :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>