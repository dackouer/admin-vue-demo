<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import User from '@/api/User'
    import City from '@/api/City'
    import Role from '@/api/Role'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const provinceData = ref()
    const cityData = ref()
    const districtData = ref()
    const roleData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10,role_id:7})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,username:'',nickname:'',realname:'',face:'',mobile:'',email:'',idcard:'',password:'',checkpwd:'',native_pid:'',native_cid:'',native_did:'',native_address:'',hobby:'',invite:'',role_id:''})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            User.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.username = data.username
                    form.nickname = data.nickname
                    form.realname = data.realname
                    form.face = data.face
                    form.mobile = data.mobile
                    form.email = data.email
                    form.idcard = data.idcard
                    form.native_pid = data.native_pid
                    form.native_cid = data.native_cid
                    form.native_did = data.native_did
                    form.native_address = data.native_address
                    form.hobby = data.hobby
                    form.invite = data.invite
                    form.role_id = data.role_id
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.username = ''
            form.nickname = ''
            form.realname = ''
            form.face = ''
            form.mobile = ''
            form.email = ''
            form.idcard = ''
            form.native_pid = ''
            form.native_cid = ''
            form.native_did = ''
            form.native_address = ''
            form.hobby = ''
            form.invite = ''
            form.role_id = ''
        }
    })

    // ?????????
    const init = async () => {
        await getTableData()
        await getProvinceData()
        await getRoleData()
    }

    // ??????????????????
    const getTableData = async () => {
        User.show(search).then((res)=>{
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
    const getProvinceData = async () => {
        City.parent(0).then((res)=>{
            provinceData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    // ????????????
    const changeProvince = async (e:any) => {
        console.log(e)
        City.parent(e).then((res)=>{
            cityData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    // ????????????
    const changeCity = async (e:any) => {
        console.log(e)
        City.parent(e).then((res)=>{
            districtData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    // ????????????
    const getRoleData = async () => {
        Role.child().then((res)=>{
            roleData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    // ????????????
    const changeRole = async (e:any) => {
        // console.log(e[1])
        form.role_id = e[1]
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
    const add = async (table:string) => {
        keyid.value = 0
        dialogFormVisible.value = true
    }

    // ????????????
    const mod = async (table:string,id:number = 0) => {
        keyid.value = id
        dialogFormVisible.value = true
    }

    // ????????????
    const del = async (table:string,id:number = 0) => {
        User.del(id).then((res)=>{
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
        User.del(selectID).then((res)=>{
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
        User.save(form).then((res)=>{
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
            <element-table :data="tableData" @mod="mod" @del="del" @select="onSelect" />
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-handle :items="[]" @add="add(tableData?.table)" @del="batchDel(tableData?.table)" />
            <el-pagination v-model:currentPage="search.page" v-model:page-size="search.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" :title="(form?.id ? '??????' : '??????') + tableData?.title.replace('??????','')" width="700px">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="????????????">
                <el-col :span="14">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-input v-model="form.nickname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.realname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.idcard" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.mobile" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.email" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="14">
                    <el-input v-model="form.idcard" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="???????????????">
                <el-col :span="4">
                    <el-select v-model="form.native_pid" placeholder="??????" @change="changeProvince">
                        <el-option :label="item.title" :value="item.id" v-for="item in provinceData" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-select v-model="form.native_cid" placeholder="??????" @change="changeCity">
                        <el-option :label="item.title" :value="item.id" v-for="item in cityData" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-select v-model="form.native_did" placeholder="??????">
                        <el-option :label="item.title" :value="item.id" v-for="item in districtData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="??????????????????">
                <el-col :span="14">
                    <el-input v-model="form.native_address" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="????????????">
                <el-col :span="14">
                    <el-input v-model="form.invite" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="?????????">
                <el-col :span="14">
                    <el-cascader v-model="form.role_id" :options="roleData" placeholder="????????????" @change="changeRole" style="width:100%;" />
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