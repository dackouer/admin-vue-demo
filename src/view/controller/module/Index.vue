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

    // ?????????
    const init = async () => {
        await getTableData()
        await getEngineData()
        await getCharsetData()
        await getCollateData()
    }

    // ??????????????????
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

    // ??????????????????
    const getEngineData = async () => {
        Engine.get().then((res)=>{
            if(res.data.code === 0){
                engineData.value = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }

    // ??????????????????
    const getCharsetData = async () => {
        Charset.get().then((res)=>{
            if(res.data.code === 0){
                charsetData.value = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }

    // ??????????????????
    const getCollateData = async () => {
        Collate.get().then((res)=>{
            if(res.data.code === 0){
                collateData.value = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }

    // ??????
    const changePage = async (e:any) => {
        search.page = e
        await getTableData()
    }

    // ??????????????????
    const changePagesize = async (e:any) => {
        search.pagesize = e
        await getTableData()
    }

    // ???????????????
    const onSelect = (e:any) => {
        selectData.value = e
    }

    // ????????????
    const add = async (table:string,pid:number = 0,level:number = 1) => {
        // console.log('table: '+table+' pid: '+pid+' level: '+level)
        keyid.value = 0
        form.pid = pid
        form.level = level
        dialogFormVisible.value = true
    }

    // ????????????
    const mod = async (table:string,id:number = 0) => {
        keyid.value = id
        dialogFormVisible.value = true
    }

    // ????????????
    const del = async (table:string,id:number = 0) => {
        Module.del(id).then((res)=>{
            if(res.data.code === 0){
                ElMessage('????????????')
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

    // ??????????????????
    const batchDel = (table:string) => {
        if(!selectData.value){
            alert('???????????????????????????!')
            return false
        }

        const selectID:string = getSelectID(selectData.value)
        if(!selectID.length){
            alert('???????????????????????????!')
            return false
        }
        Module.del(selectID).then((res)=>{
            if(res.data.code === 0){
                ElMessage('????????????')
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

    // ????????????
    const submit = async () => {
        Module.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(keyid.value?'????????????':'????????????')
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
                <el-link>{{tableData?.title.replace('??????','')}}??????</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add(tableData?.table)">??????</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <el-form :inline="true" :model="search" size="large" class="demo-form-inline">
                <el-form-item label="?????????">
                    <el-input v-model="search.keyword" placeholder="?????????" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableData" class="text-gray-500 font-light">??????</el-button>
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
    <el-dialog v-model="dialogFormVisible" :title="(form?.id ? '??????' : '??????') + tableData?.title.replace('??????','')" width="700px">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-input v-model="form.tabname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-input v-model="form.pic" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="????????????">
                <el-col :span="14">
                    <el-input v-model="form.layer" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-select v-model="form.engine_id" placeholder="??????????????????">
                        <el-option :label="item.title" :value="item.id" v-for="item in engineData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-select v-model="form.charset_id" placeholder="??????????????????">
                        <el-option :label="item.title" :value="item.id" v-for="item in charsetData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-select v-model="form.collate_id" placeholder="??????????????????">
                        <el-option :label="item.title" :value="item.id" v-for="item in collateData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="??????????????????">
                <el-col :span="14">
                    <el-input v-model="form.increment_value" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-input v-model="form.comment" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">??????</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">??????</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>