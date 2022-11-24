<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import Tabbar from '@/api/Tabbar'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,title:'',pic:'',active_pic:'',type:0,url:'',is_valid:1,sort:1})

    const fileList = ref<UploadUserFile[]>([])
    const fileActiveList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            Tabbar.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.title = data.title
                    form.pic = data.pic
                    form.active_pic = data.active_pic
                    form.type = data.type
                    form.url = data.url
                    form.is_valid = data.is_valid
                    form.sort = data.sort
                    fileList.value = [{name:'',url:form.pic}]
                    fileActiveList.value = [{name:'',url:form.active_pic}]
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.title = ''
            form.pic = ''
            form.active_pic = ''
            form.type = 0
            form.url = ''
            form.is_valid = 1
            form.sort = 1
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
    }

    // 获取显示数据
    const getTableData = async () => {
        Tabbar.show(search).then((res)=>{
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
        Tabbar.del(id).then((res)=>{
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
        Tabbar.del(selectID).then((res)=>{
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
        Tabbar.save(form).then((res)=>{
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

    const handleRemovePic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewPic: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
        // fileList.value!.clearFiles()
        // const file = files[0] as UploadRawFile
        // file.uid = genFileId()
        // fileList.value!.handleStart(file)
    }

    const uploadSuccessPic:UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.pic = res.data.url
        }else{
            ElMessage(res.msg)
            return false
        }
    }

    const handleRemoveActivePic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewActivePic: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const uploadSuccessActivePic:UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.active_pic = res.data.url
        }else{
            ElMessage(res.msg)
            return false
        }
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
            <el-form-item label="标题">
                <el-col :span="16">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片">
                <el-col :span="16">
                    <el-upload v-model:file-list="fileList" class="upload-demo" :action="uploadAction+'?path=tabbar'" :limit="1" :on-exceed="handleExceed" :on-success="uploadSuccessPic" :on-preview="handlePreviewPic" :on-remove="handleRemovePic" list-type="picture">
                        <el-button type="primary" class="bg-blue-400">上传图片</el-button>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="激活图片">
                <el-col :span="16">
                    <el-upload v-model:file-list="fileActiveList" class="upload-demo" :action="uploadAction+'?path=tabbar'" :limit="1" :on-exceed="handleExceed" :on-success="uploadSuccessActivePic" :on-preview="handlePreviewActivePic" :on-remove="handleRemoveActivePic" list-type="picture">
                        <el-button type="primary" class="bg-blue-400">上传图片</el-button>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="链接">
                <el-col :span="16">
                    <el-input v-model="form.url" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="显示">
                <el-col :span="16">
                    <el-switch v-model="form.is_valid" :active-value="1" :inactive-value="0" />
                </el-col>
            </el-form-item>
            <el-form-item label="排序">
                <el-col :span="16">
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