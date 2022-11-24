<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import Config from '@/api/Config';
    import { WechatData } from '@/util/interface';
    import { ElMessage, ElMessageBox, UploadInstance } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'

    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')
    const form = reactive({id:0,wechat_name: '',appid: '',secret: '',server_url: '',token: '',wx_qrcode: '',mini_wechat_name: '',mini_original_id: '',mini_appid: '',mini_secret: '',mini_qrcode: '',app_wechat_name: '',app_appid: '',app_secret: '',web_wechat_name: '',web_appid: '',web_secret: '',mchid: '',serial_number: '',apikey: '',apiv3key: '',apicert: '',apikeys: '',notify_url:'',return_url:'',service_qrcode:''})
    const uploadRef = ref<UploadInstance>()

    onMounted(async () => {
        await init()
    })

    const init = async () => {
        await getFromData()
    }

    const getFromData = async () => {
        await Config.get('wechat').then((res)=>{
            // console.log(res)
            if(res.data.code === 0){
                const data = JSON.parse(JSON.stringify(res.data.data))
                form.id = data.data.id
                form.wechat_name = data.data.wechat_name
                form.appid = data.data.appid
                form.secret = data.data.secret
                form.server_url = data.data.server_url
                form.token = data.data.token
                form.wx_qrcode = data.data.wx_qrcode
                form.mini_wechat_name  = data.data.mini_wechat_name
                form.mini_original_id  = data.data.mini_original_id
                form.mini_appid = data.data.mini_appid
                form.mini_secret = data.data.mini_secret
                form.mini_qrcode = data.data.mini_qrcode
                form.app_wechat_name = data.data.app_wechat_name
                form.app_appid = data.data.app_appid
                form.app_secret = data.data.app_secret
                form.web_wechat_name = data.data.web_wechat_name
                form.web_appid = data.data.web_appid
                form.web_secret = data.data.web_secret
                form.mchid = data.data.mchid
                form.serial_number = data.data.serial_number
                form.apikey = data.data.apikey
                form.apiv3key  = data.data.apiv3key
                form.apicert = data.data.apicert
                form.apikeys = data.data.apikeys
                form.notify_url = data.data.notify_url
                form.return_url = data.data.return_url
                form.service_qrcode = data.data.service_qrcode
            }
        })
    }

    // 上传公众号二维码
    const uploadWxQrcode: UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.wx_qrcode = res.data.url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    // 上传小程序二维码
    const uploadMiniQrcode: UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.mini_qrcode = res.data.url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    // 上传客服二维码
    const uploadServiceQrcode: UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.service_qrcode = res.data.url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    const uploadApicert: UploadProps['onSuccess'] = (res) => {
        console.log(res)
        if(res.code === 0){
            form.apicert = res.data.filename
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    const uploadApikey: UploadProps['onSuccess'] = (res) => {
        console.log(res)
        if(res.code === 0){
            form.apikeys = res.data.filename
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    const submitUpload = () => {
        uploadRef.value!.submit()
    }

    const submit = () => {
        Config.mod('wechat',form,1).then((res)=>{
            if(res.data.code === 0){
                alert('修改成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }else{
                alert(res.data.msg);
                return false;
            }
        })
    }
</script>

<template>

    <el-container class="h-screen overflow-auto bg-white p-10">
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>微信设置</el-link>
            </div>
            <div>
            </div>
        </el-header>

        <el-main class="mt-2 w-[60%] min-w-[700px] overflow-auto">
            <el-form size="large" :model="form" label-width="180px">
                <el-divider content-position="left" class="mb-10">公众号设置</el-divider>

                <el-form-item label="公众号名称">
                    <el-input v-model="form.wechat_name" />
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 公众号设置 - 账号详情 - 名称</span>
                </el-form-item>
                <el-form-item label="公众号AppId">
                    <el-input v-model="form.appid" />
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 基本配置 - 公众号开发信息 - AppID</span>
                </el-form-item>
                <el-form-item label="公众号AppSecret">
                    <el-input v-model="form.secret" />
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 基本配置 - 公众号开发信息 - AppSecret</span>
                </el-form-item>
                <el-form-item label="服务器地址">
                    <el-input v-model="form.server_url" />
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 基本配置 - 服务器配置 - 服务器地址</span>
                </el-form-item>
                <el-form-item label="Token">
                    <el-input v-model="form.token" />
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 基本配置 - 服务器配置 - token</span>
                </el-form-item>
                <el-form-item label="公众号二维码">
                    <el-upload class="avatar-uploader" :action="uploadAction+'?path=wechat'" :show-file-list="false" :on-success="uploadWxQrcode">
                        <img v-if="form.wx_qrcode" :src="form.wx_qrcode" class="avatar w-[180px] h-[180px]" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                    <span class="text-gray-400">公众号首页 - 设置与开发 - 公众号设置 - 账号详情 - 二维码</span>
                </el-form-item>

                <el-divider content-position="left" class="my-10">小程序设置</el-divider>

                <el-form-item label="小程序名称">
                    <el-input v-model="form.mini_wechat_name" />
                    <span class="text-gray-400">小程序首页 - 设置 - 基本设置 - 基本信息 - 小程序名称</span>
                </el-form-item>
                <el-form-item label="小程序原始id">
                    <el-input v-model="form.mini_original_id" />
                    <span class="text-gray-400">小程序首页 - 设置 - 基本设置 - 账号信息 - 原始id</span>
                </el-form-item>
                <el-form-item label="小程序AppId">
                    <el-input v-model="form.mini_appid" />
                    <span class="text-gray-400">小程序首页 - 开发 - 开发管理 - 开发设置 - 开发者ID - AppID</span>
                </el-form-item>
                <el-form-item label="小程序AppSecret">
                    <el-input v-model="form.mini_secret" />
                    <span class="text-gray-400">小程序首页 - 开发 - 开发管理 - 开发设置 - 开发者ID - AppSecret</span>
                </el-form-item>
                <el-form-item label="小程序二维码">
                    <el-upload class="avatar-uploader" :action="uploadAction+'?path=wechat'" :show-file-list="false" :on-success="uploadMiniQrcode">
                        <img v-if="form.mini_qrcode" :src="form.mini_qrcode" class="avatar w-[180px] h-[180px]" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                    <span class="text-gray-400">小程序首页 - 设置与开发 - 小程序设置 - 账号详情 - 二维码</span>
                </el-form-item>

                <el-divider content-position="left" class="my-10">开放平台设置</el-divider>

                <el-form-item label="移动应用名称">
                    <el-input v-model="form.app_wechat_name" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 移动应用 - 应用详情 - 应用名称</span>
                </el-form-item>
                <el-form-item label="移动应用AppId">
                    <el-input v-model="form.app_appid" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 移动应用 - 应用详情 - AppID</span>
                </el-form-item>
                <el-form-item label="移动应用AppSecret">
                    <el-input v-model="form.app_secret" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 移动应用 - 应用详情 - AppSecret</span>
                </el-form-item>

                <el-form-item label="网站应用名称">
                    <el-input v-model="form.web_wechat_name" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 网站应用 - 应用详情 - 应用名称</span>
                </el-form-item>
                <el-form-item label="网站应用AppId">
                    <el-input v-model="form.web_appid" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 网站应用 - 应用详情 - AppID</span>
                </el-form-item>
                <el-form-item label="网站应用AppSecret">
                    <el-input v-model="form.web_secret" />
                    <span class="text-gray-400">开放平台首页 - 管理中心 - 网站应用 - 应用详情 - AppSecret</span>
                </el-form-item>

                <el-divider content-position="left" class="my-10">商户号设置</el-divider>

                <el-form-item label="商户号ID">
                    <el-input v-model="form.mchid" />
                    <span class="text-gray-400">商户号首页 - 账户中心 - 个人信息 - 登录账号</span>
                </el-form-item>
                <el-form-item label="API证书序列号">
                    <el-input v-model="form.serial_number" />
                    <span class="text-gray-400">商户号首页 - 账户中心 - API安全 - 申请API证书 - 证书序列号</span>
                </el-form-item>
                <el-form-item label="Api密钥">
                    <el-input v-model="form.apikey" />
                    <span class="text-gray-400">商户号首页 - 账户中心 - API安全 - 设置API密钥</span>
                </el-form-item>
                <el-form-item label="Apiv3密钥">
                    <el-input v-model="form.apiv3key" />
                    <span class="text-gray-400">商户号首页 - 账户中心 - API安全 - 设置APIv3密钥</span>
                </el-form-item>
                <el-form-item label="回调地址">
                    <el-input v-model="form.notify_url" />
                    <span class="text-gray-400">询问技术开发人员</span>
                </el-form-item>
                <el-form-item label="返回地址">
                    <el-input v-model="form.return_url" />
                    <span class="text-gray-400">询问技术开发人员</span>
                </el-form-item>
                <el-form-item label="微信Apicert证书">
                    <el-upload ref="uploadRef" class="upload-demo" :action="uploadAction+'?path=wx&type=wx'" :on-success="uploadApicert">
                        <template #trigger>
                            <el-button type="primary" class="bg-blue-400">上传Apicert证书</el-button>
                        </template>
                    </el-upload>
                    <span class="text-gray-400">商户号首页 - 账户中心 - API安全 - 申请API证书 - 证书管理(apiclient_cert.pem)</span>
                </el-form-item>
                <el-form-item label="微信Apikey证书">
                    <el-upload ref="uploadRef" class="upload-demo" :action="uploadAction+'?path=wx&type=wx'" :on-success="uploadApikey">
                        <template #trigger>
                            <el-button type="primary" class="bg-blue-400">上传Apikey证书</el-button>
                        </template>
                    </el-upload>
                    <span class="text-gray-400">商户号首页 - 账户中心 - API安全 - 申请API证书 - 证书管理(apiclient_key.pem)</span>
                </el-form-item>

                <el-divider content-position="left" class="my-10">客服设置</el-divider>

                <el-form-item label="客服二维码">
                    <el-upload class="avatar-uploader" :action="uploadAction+'?path=wechat'" :show-file-list="false" :on-success="uploadServiceQrcode">
                        <img v-if="form.service_qrcode" :src="form.service_qrcode" class="avatar w-[180px] h-[180px]" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确认保存</el-button>
                </el-form-item>
            </el-form>

            <div style="height:100px;"></div>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>

</style>