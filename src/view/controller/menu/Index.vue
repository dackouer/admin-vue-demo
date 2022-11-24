<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import Menu from '@/api/Menu'
    import Module from '@/api/Module'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage, FormRules } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const moduleData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,title:'',pic:'',level:1,pid:0,is_open:0,module_id:0,pvalue:0,cvalue:0,svalue:0,router:'',sort:1})
    const rules = reactive<FormRules>({title:[{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            Menu.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.title = data.title
                    form.pic = data.pic
                    form.level = data.level
                    form.pid = data.pid
                    form.is_open = data.is_open
                    form.module_id = data.module_id
                    form.pvalue = data.pvalue
                    form.cvalue = data.cvalue
                    form.svalue = data.svalue
                    form.router = data.router
                    form.sort = data.sort
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.title = ''
            form.pic = ''
            form.level = form.level > 1 ? form.level : 1
            form.pid = form.pid > 0 ? form.pid : 0
            form.is_open = 0
            form.module_id = 0
            form.pvalue = 0
            form.cvalue = 0
            form.svalue = 0
            form.router = ''
            form.sort = 1
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
        await getModuleData()
    }

    // 获取显示数据
    const getTableData = async () => {
        Menu.show(search).then((res)=>{
            if(res.data.code === 0){
                tableData.value = JSON.parse(JSON.stringify(res.data.data))
            }else{
                console.log(res)
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 获取模块数据
    const getModuleData = async () => {
        Module.child().then((res)=>{
            moduleData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    // 模块选择器
    const changeModule = async (value:any) => {
        form.module_id = value[1]
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
    const add = async (table:string,pid:number = 0,level:number = 1) => {
        console.log('table: '+table+' pid: '+pid+' level: '+level)
        keyid.value = 0
        form.pid = pid
        form.level = level
        dialogFormVisible.value = true
    }

    // 修改按钮
    const mod = async (table:string,id:number = 0) => {
        keyid.value = id
        dialogFormVisible.value = true
    }

    // 删除数据
    const del = async (table:string,id:number = 0) => {
        Menu.del(id).then((res)=>{
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
        Menu.del(selectID).then((res)=>{
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
        Menu.save(form).then((res)=>{
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
            <element-table :data="tableData" @add="add" @mod="mod" @del="del" @select="onSelect" />
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-handle :items="[]" @add="add(tableData?.table)" @del="batchDel(tableData?.table)" />
            <el-pagination v-model:currentPage="search.page" v-model:page-size="search.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" :title="(form?.id ? '修改' : '新增') + tableData?.title.replace('管理','')" width="700px">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="菜单名称：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-col :span="14">
                    <el-input v-model="form.pic" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="默认开启：">
                <el-col :span="14">
                    <el-switch v-model="form.is_open" :active-value="1" :inactive-value="0" />
                </el-col>
            </el-form-item>
            <el-form-item label="链接模块：" v-if="form.pid > 0">
                <el-col :span="14">
                    <el-cascader v-model="form.module_id" :options="moduleData" @change="changeModule" style="width:100%;" />
                </el-col>
            </el-form-item>
            <el-form-item label="路由：">
                <el-col :span="14">
                    <el-input v-model="form.router" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="参数选项：" v-if="form.pid > 0">
                <el-col :span="4">
                    <el-select v-model="form.pvalue" placeholder="父级">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center"><span class="text-gray-500">-</span></el-col>
                <el-col :span="4">
                    <el-select v-model="form.cvalue" placeholder="类别">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center"><span class="text-gray-500">-</span></el-col>
                <el-col :span="4">
                    <el-select v-model="form.svalue" placeholder="状态">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="排序：">
                <el-col :span="14">
                    <el-input v-model="form.sort" autocomplete="off" />
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