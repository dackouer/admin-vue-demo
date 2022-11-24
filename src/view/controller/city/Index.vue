<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import City from '@/api/City'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,title:'',code:'',level:1,pid:0,tel_code:'',zip_code:'',spell:'',en_name:'',short_en_name:'',longitude:0,latitude:0})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            City.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.title = data.title
                    form.code = data.code
                    form.level = data.level
                    form.pid = data.pid
                    form.tel_code = data.tel_code
                    form.zip_code = data.zip_code
                    form.en_name = data.en_name
                    form.short_en_name = data.short_en_name
                    form.longitude = data.longitude
                    form.latitude = data.latitude
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.title = ''
            form.code = ''
            form.level = 1
            form.pid = 0
            form.tel_code = ''
            form.zip_code = ''
            form.en_name = ''
            form.short_en_name = ''
            form.longitude = 0
            form.latitude = 0
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
    }

    // 获取显示数据
    const getTableData = async () => {
        City.show(search).then((res)=>{
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
        keyid.value = 0
        dialogFormVisible.value = true
    }

    // 修改按钮
    const mod = async (table:string,id:number = 0) => {
        keyid.value = id
        dialogFormVisible.value = true
    }

    // 删除数据
    const del = async (table:string,id:number = 0) => {
        City.del(id).then((res)=>{
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

        const selectID:string | number = getSelectID(selectData.value)
        if(!selectID.length){
            alert('请选择要删除的选项!')
            return false
        }
        City.del(selectID).then((res)=>{
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
        City.save(form).then((res)=>{
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
            <el-form-item label="城市名称：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="城市编码：">
                <el-col :span="14">
                    <el-input v-model="form.code" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="行政区号：">
                <el-col :span="14">
                    <el-input v-model="form.tel_code" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="邮政编码：">
                <el-col :span="14">
                    <el-input v-model="form.zip_code" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="字母拼英：">
                <el-col :span="14">
                    <el-input v-model="form.spell" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="英文全称：">
                <el-col :span="14">
                    <el-input v-model="form.en_name" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="英文简写：">
                <el-col :span="14">
                    <el-input v-model="form.short_en_name" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="经度：">
                <el-col :span="14">
                    <el-input v-model="form.longitude" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="纬度：">
                <el-col :span="14">
                    <el-input v-model="form.latitude" autocomplete="off" />
                </el-col>
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