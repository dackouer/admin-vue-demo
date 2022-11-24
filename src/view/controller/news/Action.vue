<script setup lang="ts">
    import { ref,reactive,shallowRef,onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router';
    import { DataList,UploadList } from '@/util/interface';
    import News from '@/api/News'
    import NewsCate from '@/api/NewsCate'

    import { ElMessage, ElMessageBox, tagEmits } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadFile,UploadProps, UploadUserFile } from 'element-plus'
    import '@wangeditor/editor/dist/css/style.css'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    const id = ref(0)
    const router = useRouter(), route = useRoute();
    const dialogFormVisible = ref(false)
    const formLabelWidth = ref(180)
    const form = reactive({id:0,cate_id:'',title:'',keyword:'',desc:'',pic:'',picture:[] as UploadList[],is_original:0,source_url:'',is_comment:0,content:'',sort:1})
    const pictures = ref<UploadList[]>([])
    const CateData = ref()

    const dialogImageUrl = ref('')
    const disabled = ref(false)
    const dialogVisible = ref(false)
    const fileList = ref<UploadUserFile[]>([])
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

        await NewsCate.get().then((res)=>{
            CateData.value = res.data.data
        })

        const param_id = route.params.id ? route.params.id! : route.query.id!
        console.log('param_id: ' + param_id)
        if(param_id){
            await News.get(param_id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0 && res.data.data){
                    form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    form.cate_id = JSON.parse(JSON.stringify(res.data.data)).cate_id
                    form.title = JSON.parse(JSON.stringify(res.data.data)).title
                    form.keyword = JSON.parse(JSON.stringify(res.data.data)).keyword
                    form.desc = JSON.parse(JSON.stringify(res.data.data)).desc
                    form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
                    form.picture = JSON.parse(JSON.stringify(res.data.data)).picture
                    form.is_original = JSON.parse(JSON.stringify(res.data.data)).is_original
                    form.source_url = JSON.parse(JSON.stringify(res.data.data)).source_url
                    form.is_comment = JSON.parse(JSON.stringify(res.data.data)).is_comment
                    form.content = JSON.parse(JSON.stringify(res.data.data)).content
                    form.sort = JSON.parse(JSON.stringify(res.data.data)).sort

                    pictures.value = JSON.parse(JSON.stringify(res.data.data)).picture
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

    const add = (table:string,id:number = 0)=>{
        dialogFormVisible.value = true
    }

    const submit = () => {
        News.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(form.id?'修改成功':'新增成功')
                setTimeout(()=>{
                    router.push('../news')
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
                <el-link>发布新闻</el-link>
            </div>
        </el-header>
    </el-container>
    <el-container class="w-screen h-screen overflow-auto bg-white p-10">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="新闻类别：">
                <el-col :span="16">
                    <el-select v-model="form.cate_id" placeholder="选择类别">
                        <el-option :label="item.title" :value="item.id" v-for="item in CateData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="新闻标题：">
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
            
            <el-form-item label="轮播图：">
                <el-col :span="16">
                    <el-alert title="默认第1张图为商品主图，建议尺寸：1:1" type="success" :closable="false" class="py-0" />
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="16">
                    <el-upload :action="uploadAction+'?path=news'" :file-list="pictures" list-type="picture-card" :on-success="uploadSuccess">
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
            <el-form-item label="介绍详情：">
                <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.content" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <el-form-item label="是否原创：">
                <el-switch v-model="form.is_original" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="来源链接：">
                <el-col :span="16">
                    <el-input v-model="form.source_url" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="开启评论：">
                <el-switch v-model="form.is_comment" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="排序：">
                <el-col :span="16">
                    <el-input v-model="form.sort" autocomplete="off" />
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