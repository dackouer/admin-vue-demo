<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import Module from '@/api/Module'
    import Engine from '@/api/Engine'
    import Charset from '@/api/Charset'
    import Collate from '@/api/Collate'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const engineData = ref()
    const charsetData = ref()
    const collateData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,title:'',tabname:'',pic:'',pid:0,level:1,layer:1,engine_id:'',charset_id:'',collate_id:'',increment_value:1,comment:'',sort:1})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            Module.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.title = data.title
                    form.tabname = data.tabname
                    form.pic = data.pic
                    form.pid = data.pid
                    form.level = data.level
                    form.layer = data.layer
                    form.engine_id = data.engine_id
                    form.charset_id = data.charset_id
                    form.collate_id = data.collate_id
                    form.increment_value = data.increment_value
                    form.comment = data.comment
                    form.sort = data.sort
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.title = ''
            form.tabname = ''
            form.pic = ''
            form.pid = 0
            form.level = 1
            form.layer = 1
            form.engine_id = ''
            form.charset_id = ''
            form.collate_id = ''
            form.increment_value = 1
            form.comment = ''
            form.sort = 1
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
        await getEngineData()
        await getCharsetData()
        await getCollateData()
    }

    // 获取显示数据
    const getTableData = async () => {
        Module.show(search).then((res)=>{
            if(res.data.code === 0){
                tableData.value = JSON.parse(JSON.stringify(res.data.data))
            }else{
                console.log(res)
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 获取存储引擎
    const getEngineData = async () => {
        Engine.get().then((res)=>{
            if(res.data.code === 0){
                engineData.value = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }

    // 获取字符编码
    const getCharsetData = async () => {
        Charset.get().then((res)=>{
            if(res.data.code === 0){
                charsetData.value = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }

    // 获取排序规则
    const getCollateData = async () => {
        Collate.get().then((res)=>{
            if(res.data.code === 0){
                collateData.value = JSON.parse(JSON.stringify(res.data.data))
            }
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
    const add = async (table:string,pid:number = 0,level:number = 1) => {
        // console.log('table: '+table+' pid: '+pid+' level: '+level)
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
        Module.del(id).then((res)=>{
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
        Module.del(selectID).then((res)=>{
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
        Module.save(form).then((res)=>{
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
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="模块名称：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="表名：">
                <el-col :span="14">
                    <el-input v-model="form.tabname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-col :span="14">
                    <el-input v-model="form.pic" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="表层级：">
                <el-col :span="14">
                    <el-input v-model="form.layer" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="存储引擎：">
                <el-col :span="14">
                    <el-select v-model="form.engine_id" placeholder="选择存储引擎">
                        <el-option :label="item.title" :value="item.id" v-for="item in engineData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="字符编码：">
                <el-col :span="14">
                    <el-select v-model="form.charset_id" placeholder="选择字符编码">
                        <el-option :label="item.title" :value="item.id" v-for="item in charsetData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="排序规则：">
                <el-col :span="14">
                    <el-select v-model="form.collate_id" placeholder="选择排序规则">
                        <el-option :label="item.title" :value="item.id" v-for="item in collateData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="自增起始值：">
                <el-col :span="14">
                    <el-input v-model="form.increment_value" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="注释：">
                <el-col :span="14">
                    <el-input v-model="form.comment" autocomplete="off" />
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