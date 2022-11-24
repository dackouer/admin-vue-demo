<script setup lang="ts">
    import { ref,reactive,shallowRef,onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router';
    import { DataList,UploadList } from '@/util/interface';
    import Goods from '@/api/Goods'
    // import Collection from '@/api/Collection'
    import GoodsCate from '@/api/GoodsCate'
    import Currency from '@/api/Currency'
    import Unit from '@/api/Unit'
    import Tags from '@/api/Tags'
    import Brand from '@/api/Brand'

    import { ElMessage, ElMessageBox, tagEmits } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadFile,UploadProps, UploadUserFile } from 'element-plus'
    import '@wangeditor/editor/dist/css/style.css'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    const id = ref(0)
    const router = useRouter(), route = useRoute();
    const dialogFormVisible = ref(false)
    const formLabelWidth = ref(180)
    const form = reactive({id:0,cate_id:'',title:'',keyword:'',desc:'',is_virtual:0,code:'',pic:'',picture:[] as UploadList[],link_url:'',music:'',video:'',brand_id:1,price:0,original_price:0,cost_price:0,unit_id:1,currency_id:1,stock:0,alarm_stock:0,goods_number:'',batch_code:'',bar_code:'',limit_count:0,limit_order:0,limit_balance:0,limit_coin:0,start_time:'',end_time:'',give_cent:0,tags:'',is_sale:0,content:'',is_allow_share:0,is_commission:0,commission_rate:0,sort:1,status:'-1'})
    const is_tag = ref(false)
    const tags = ref([])
    const tagName = ref('')
    const pictures = ref<UploadList[]>([])
    // const collectionData = ref()
    const goodsData = ref()
    const CateData = ref()
    const CurrencyData = ref()
    const UnitData = ref()
    const TagsData = ref()
    const BrandData = ref()

    const dialogImageUrl = ref('')
    const disabled = ref(false)
    const dialogVisible = ref(false)
    const fileList = ref<UploadUserFile[]>([])
    const musicList = ref<UploadUserFile[]>([])
    const videoList = ref<UploadUserFile[]>([])
    const picList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')
    type InsertFnType = (url: string, alt: string, href: string) => void

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const toolbarConfig = {}
    const editorConfig = { MENU_CONF: {
            uploadImage:{
                fieldName: 'file',
                maxFileSize: 5 * 1024 * 1024,
                server: uploadAction.value+'?path=images',
                customInsert(res: any, insertFn: InsertFnType) {
                    console.log(res)
                    console.log(uploadAction.value)
                    insertFn(res.data.url, res.data.alt, res.data.url)
                },
            },
            uploadVideo:{
                fieldName: 'file',
                maxFileSize: 100 * 1024 * 1024,
                server: uploadAction.value+'?path=media&type=media',
                customInsert(res: any, insertFn: InsertFnType) {
                    console.log(res)
                    insertFn(res.data.url, res.data.alt, res.data.url)
                }
            }
        } 
    }

    onMounted(async () => {
        // await Collection.get().then((res)=>{
        //     collectionData.value = res.data.data
        // })

        await GoodsCate.get().then((res)=>{
            CateData.value = res.data.data
        })

        await Currency.get().then((res)=>{
            CurrencyData.value = res.data.data
        })
        await Unit.get().then((res)=>{
            UnitData.value = res.data.data
        })
        await Tags.get().then((res)=>{
            TagsData.value = res.data.data
        })
        await Brand.get().then((res)=>{
            BrandData.value = res.data.data
        })

        const param_id = route.params.id ? route.params.id! : route.query.id!
        console.log('param_id: ' + param_id)
        if(param_id){
            await Goods.get(param_id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0 && res.data.data){
                    form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    form.cate_id = JSON.parse(JSON.stringify(res.data.data)).cate_id
                    form.title = JSON.parse(JSON.stringify(res.data.data)).title
                    form.keyword = JSON.parse(JSON.stringify(res.data.data)).keyword
                    form.desc = JSON.parse(JSON.stringify(res.data.data)).desc
                    form.is_virtual = JSON.parse(JSON.stringify(res.data.data)).is_virtual
                    form.code = JSON.parse(JSON.stringify(res.data.data)).code
                    form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
                    form.picture = JSON.parse(JSON.stringify(res.data.data)).picture
                    form.link_url = JSON.parse(JSON.stringify(res.data.data)).link_url
                    form.music = JSON.parse(JSON.stringify(res.data.data)).music
                    form.video = JSON.parse(JSON.stringify(res.data.data)).video
                    form.brand_id = JSON.parse(JSON.stringify(res.data.data)).brand_id
                    form.price = JSON.parse(JSON.stringify(res.data.data)).price / 100
                    form.original_price = JSON.parse(JSON.stringify(res.data.data)).original_price / 100
                    form.cost_price = JSON.parse(JSON.stringify(res.data.data)).cost_price / 100
                    form.unit_id = JSON.parse(JSON.stringify(res.data.data)).unit_id
                    form.currency_id = JSON.parse(JSON.stringify(res.data.data)).currency_id
                    form.tags = JSON.parse(JSON.stringify(res.data.data)).tags
                    form.stock = JSON.parse(JSON.stringify(res.data.data)).stock
                    form.alarm_stock = JSON.parse(JSON.stringify(res.data.data)).alarm_stock
                    form.goods_number = JSON.parse(JSON.stringify(res.data.data)).goods_number
                    form.batch_code = JSON.parse(JSON.stringify(res.data.data)).batch_code
                    form.bar_code = JSON.parse(JSON.stringify(res.data.data)).bar_code
                    form.limit_count = JSON.parse(JSON.stringify(res.data.data)).limit_count
                    form.limit_order = JSON.parse(JSON.stringify(res.data.data)).limit_order
                    form.limit_balance = JSON.parse(JSON.stringify(res.data.data)).limit_balance
                    form.limit_coin = JSON.parse(JSON.stringify(res.data.data)).limit_coin
                    form.start_time = JSON.parse(JSON.stringify(res.data.data)).start_time
                    form.end_time = JSON.parse(JSON.stringify(res.data.data)).end_time
                    form.give_cent = JSON.parse(JSON.stringify(res.data.data)).give_cent
                    form.is_sale = JSON.parse(JSON.stringify(res.data.data)).is_sale
                    form.content = JSON.parse(JSON.stringify(res.data.data)).content
                    form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
                    form.is_allow_share = JSON.parse(JSON.stringify(res.data.data)).is_allow_share
                    form.status = JSON.parse(JSON.stringify(res.data.data)).status

                    pictures.value = JSON.parse(JSON.stringify(res.data.data)).picture

                    musicList.value.push({name:form.music})
                    videoList.value.push({name:form.video})
                }
            })
        }
    })

    const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const uploadSuccess: UploadProps['onSuccess'] = (res) => {
        console.log(res)
        if(res.code === 0){
            form.picture.push({name:res.data.url,url:res.data.url})
            form.pic = form.picture[0].url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }
    
    const handleRemove = (file: UploadFile) => {
        console.log(file)
        pictures.value.forEach((item,index)=>{
            if(item.name == file.name){
                pictures.value.splice(index,1)
            }
        })
        form.pic = ''
        form.picture = []
        pictures.value.forEach((item,index)=>{
            if(index == 0){
                form.pic = item.url
            }
            form.picture.push({name:item.url,url:item.url})
        })
    }

    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }

    const handleDownload = (file: UploadFile) => {
        console.log(file)
    }

    // 上传音频
    const handleRemoveMusic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewMusic: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const uploadSuccessMusic:UploadProps['onSuccess'] = (res) => {
        console.log(res)
        form.music = res.data.url
    }

    // 上传视频
    const handleRemoveVideo: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewVideo: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const uploadSuccessVideo:UploadProps['onSuccess'] = (res) => {
        console.log(res)
        form.video = res.data.url
    }


    const add = (table:string,id:number = 0)=>{
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Goods.del(id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0){
                    alert('删除成功')
                    setTimeout(()=>{
                        router.push('/goods')
                    },500)
                }else{
                alert('删除失败')
                return false 
                }
            })
        }
    }

    const addTags = () => {
        if(tagName.value == ''){
            ElMessage.warning('标签名称不能为空')
            return false
        }
        Tags.add({title:tagName.value}).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage.warning('添加成功')
                TagsData.value.push(res.data.data)
                setTimeout(()=>{
                    tagName.value = ''
                    is_tag.value = false
                },300)
                return true
            }else{
                ElMessage.warning(res.data.msg)
                return false
            }
        })
        
    }

    const submit = () => {
        Goods.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(form.id?'修改成功':'新增成功')
                setTimeout(()=>{
                    router.push('../goods')
                },500)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        })
    }
</script>

<template>

    <el-container>
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>添加藏品</el-link>
            </div>
        </el-header>
    </el-container>
    <el-container class="w-screen h-screen overflow-auto bg-white p-10">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="商品类别：">
                <el-col :span="16">
                    <el-select v-model="form.cate_id" placeholder="选择类别">
                        <el-option :label="item.title" :value="item.id" v-for="item in CateData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="商品标题：">
                <el-col :span="16">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="关键词：">
                <el-input v-model="form.keyword" autocomplete="off" />
            </el-form-item>
            <el-form-item label="描述：">
                <el-input v-model="form.desc" autocomplete="off" />
            </el-form-item>
            <el-form-item label="虚拟商品：">
                <el-switch v-model="form.is_virtual" :active-value="1" :inactive-value="0" />
            </el-form-item>
            
            <el-form-item label="轮播图：">
                <el-col :span="16">
                    <el-alert title="默认第1张图为商品主图，建议尺寸：1:1" type="success" :closable="false" class="py-0" />
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="16">
                    <el-upload :action="uploadAction+'?path=goods'" :file-list="pictures" list-type="picture-card" :on-success="uploadSuccess">
                        <el-icon><Plus /></el-icon>

                        <template #file="{ file }">
                            <div>
                                <!-- {{item}} -->
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                        <el-icon><Download /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                        <el-icon><Delete /></el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-col>
            </el-form-item>
            <!-- <el-form-item label="展示方式：">
                <el-col :span="16">
                    <el-radio-group v-model="form.show_type">
                        <el-radio label="1">正常</el-radio>
                        <el-radio label="2">3D</el-radio>
                        <el-radio label="3">外链</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="外链地址：" v-if="form.show_type == '3'">
                <el-col :span="16">
                    <el-input v-model="form.link_url" autocomplete="off" />
                </el-col>
            </el-form-item> -->
            <!-- <el-form-item label="音频文件">
                <el-upload v-model:file-list="musicList" ref="uploadRef" class="upload-demo" :action="uploadAction+'?path=goods&type=music'" :on-success="uploadSuccessMusic" :on-preview="handlePreviewMusic" :on-remove="handleRemoveMusic">
                    <template #trigger>
                        <el-button type="primary" class="bg-blue-400">上传音频文件</el-button>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频文件">
                <el-upload v-model:file-list="videoList" ref="uploadRef" class="upload-demo" :action="uploadAction+'?path=goods&type=video'" :on-success="uploadSuccessVideo" :on-preview="handlePreviewVideo" :on-remove="handleRemoveVideo">
                    <template #trigger>
                        <el-button type="primary" class="bg-blue-400">上传视频文件</el-button>
                    </template>
                </el-upload>
            </el-form-item> -->
            <el-form-item label="标签：">
                <el-checkbox-group v-model="tags">
                    <el-checkbox :label="item.title" v-for="item in TagsData" :key="item.id" />
                </el-checkbox-group>
                <el-input v-model="tagName" autocomplete="off" style="width:120px !important;margin-left:30px;" v-if="is_tag" />
                <el-button class="ml-1" v-if="is_tag" @click="addTags">添加</el-button>
                <el-button size="small" v-if="!is_tag" @click="is_tag = true" class="ml-5"><el-icon><Plus /></el-icon></el-button>
                
            </el-form-item>
            <el-form-item label="品牌：">
                <el-col :span="16">
                    <el-select v-model="form.brand_id" placeholder="选择品牌">
                        <el-option :label="item.title" :value="item.id" v-for="item in BrandData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="价格">
                <el-col :span="3">
                    <el-input v-model="form.price" autocomplete="off">
                        <template #prefix>售价:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="3">
                    <el-input v-model="form.original_price" autocomplete="off">
                        <template #prefix>原价:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="3">
                    <el-input v-model="form.cost_price" autocomplete="off">
                        <template #prefix>市场价:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-select v-model="form.currency_id" placeholder="选择币种">
                        <el-option :label="item.title" :value="item.id" v-for="item in CurrencyData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="库存">
                <el-col :span="7">
                    <el-input v-model="form.stock" autocomplete="off">
                        <template #prefix>销售库存:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-select v-model="form.unit_id" placeholder="选择单位">
                        <el-option :label="item.title" :value="item.id" v-for="item in UnitData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="限购">
                <el-col :span="7">
                    <el-input v-model="form.limit_count" autocomplete="off">
                        <template #prefix>商品限购:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="7">
                    <el-input v-model="form.limit_order" autocomplete="off">
                        <template #prefix>订单限购:&ensp;</template>
                    </el-input>
                </el-col>
                <!-- <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="3">
                    <el-input v-model="form.limit_balance" autocomplete="off">
                        <template #prefix>余额限购:&ensp;</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-input v-model="form.limit_coin" autocomplete="off">
                        <template #prefix>平台币限购:&ensp;</template>
                    </el-input>
                </el-col> -->
            </el-form-item>
            <!-- <el-form-item label="发售时间">
                <el-col :span="7">
                    <el-date-picker v-model="form.start_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间" style="width:100%" />
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="7">
                    <el-date-picker v-model="form.end_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间" style="width:100%" />
                </el-col>
            </el-form-item> -->

            <el-form-item label="赠送积分">
                <el-col :span="16">
                    <el-input v-model="form.give_cent" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="商品货号：">
                <el-input v-model="form.goods_number" autocomplete="off" />
            </el-form-item>
            <el-form-item label="批次号：">
                <el-input v-model="form.batch_code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品条形码：">
                <el-input v-model="form.bar_code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="介绍详情：">
                <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.content" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <el-form-item label="允许分享：">
                <el-switch v-model="form.is_allow_share" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="开启分佣：">
                <el-switch v-model="form.is_commission" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="分佣比：" v-if="form.is_commission">
                <el-col :span="4">
                    <el-input v-model="form.commission_rate" autocomplete="off">
                        <template #prefix>上级:&ensp;</template>
                        <template #suffix>%</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="4">
                    <el-input v-model="form.commission_rate" autocomplete="off">
                        <template #prefix>上上级:&ensp;</template>
                        <template #suffix>%</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="商品排序：">
                <el-col :span="16">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="状态：">
                <el-col :span="16">
                    <el-radio-group v-model="form.status">
                        <el-radio label="-1">仓库</el-radio>
                        <el-radio label="1">上架</el-radio>
                        <el-radio label="0">下架</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
                <el-button >取消</el-button>
            </el-form-item>
            
            <div style="height:100px;"></div>
        </el-form>
    </el-container>
</template>

<style lang="scss" scoped>

    .el-form-item .el-input,.el-form-item .el-select,.el-form-item .el-alert{
       width: 100%;
    }

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>