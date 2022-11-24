<script setup lang="ts">
    import { ref,reactive,watch,onMounted } from 'vue'
    import Order from '@/api/Order'
    import { add,mod,save,del,getSelectID } from '@/util/main'
    import { ElMessage } from 'element-plus';

    const keyid = ref(0)
    const formLabelWidth = ref(180)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const userData = ref()
    const cateData = ref()
    const goodsData = ref()
    const search = reactive({keyword:'',page:1,pagesize:10})
    const selectID = ref([])
    const selectData = ref()
    const form = reactive({id:0,uid:'',goods_id:'',cate_id:0})

    onMounted(async () => {
        await init()
    })

    watch(keyid,(val,value)=>{
        if(val){
            Order.get(val).then((res)=>{
                if(res.data.code === 0){
                    const data = JSON.parse(JSON.stringify(res.data.data))
                    form.id = data.id
                    form.uid = data.uid
                    form.goods_id = data.goods_id
                    form.cate_id = data.cate_id
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            form.id = 0
            form.uid = ''
            form.goods_id = ''
            form.cate_id = 0
        }
    })

    // 初始化
    const init = async () => {
        await getTableData()
        // await getUserData()
        // await getCateData()
        // await getGoodsData()
    }

    // 获取显示数据
    const getTableData = async () => {
        Order.show(search).then((res)=>{
            if(res.data.code === 0){
                tableData.value = JSON.parse(JSON.stringify(res.data.data))
            }else{
                console.log(res)
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 获取用户列表
    const getUserData = async () => {

    }

    // 获取商品类别列表
    const getCateData = async () => {
        
    }

    // 获取商品列表
    const getGoodsData = async () => {
        
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
        Order.del(id).then((res)=>{
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
        Order.del(selectID).then((res)=>{
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
        Order.save(form).then((res)=>{
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
                <el-button type="primary" plain @click="add(tableData?.table)">测试下单</el-button>
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
    <el-dialog v-model="dialogFormVisible" :title="(form?.id ? '修改订单' : '测试下单')" width="700px">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="用户：">
                <el-col :span="14">
                    <el-input v-model="form.uid" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="商品类别：">
                <el-col :span="14">
                    <el-input v-model="form.cate_id" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="商品：">
                <el-switch v-model="form.goods_id" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="数量：">
                <el-col :span="14">
                    <el-input v-model="form.cate_id" autocomplete="off" />
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