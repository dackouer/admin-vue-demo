<script setup lang="ts">
    import router from '@/router'
    import { ref,reactive,onMounted } from 'vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import { Iphone, User as Users,ChatDotRound } from '@element-plus/icons-vue'
    import FingerprintJS from '@fingerprintjs/fingerprintjs'
    import User from '@/api/User'
    import { setLogin } from '@/util/main'
    import { UserObj } from '@/util/interface'
    
    const baseUrl = import.meta.env.VITE_API_BASEURL;
    const tagIndex = ref(false)
    const dialogVisible = ref(false)
    const data = ref({id:1,title:'后台管理系统',logo:''})
    const random = ref('')
    const issend = ref(true)
    const sendText = ref('发送验证码')
    const form = reactive({username:'admin', password:'Admin@dacK2022ou',nickname:'',mobile:'',visitorid:'', numcode:'', smscode:'', type:'username',token:''})
    
    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await setVisitor()
    }

    // 设置visitor
    const setVisitor = async () => {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        form.token = result.visitorId
    }

    // 发送验证码
    const send = (time = 30) => {
        
    }

    // 提交登录
    const onSubmit = () => {
        User.login(form).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 0){
                ElMessage('登录成功!')
                setLogin(res.data.data as unknown as UserObj)
                    
                setTimeout(()=>{
                    router.push('/')
                },1000)
            }else{
                ElMessage(res.data.msg)
                random.value = Math.random().toString().split('.').pop() as string
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 忘记密码
    const forget = (e:any) => {
        return false
    }

    // 第三方登录
    const third = (type:string) => {
        switch(type){
            case 'wechat':
                break;
            case 'qq':
                break;
            case 'weibo':
                break;
            default:
                
        }
    }
</script>

<template>
    <el-container class="h-screen">
        <el-header class="flex items-center">
            <div class="container mx-auto flex justify-between">
                <div class="flex items-center">
                    <img :src="data.logo" alt="">
                    <a href="/" class="ml-2">{{data.title}}</a>
                </div>
                <div class="flex items-center">
                    <a href="/">帮助中心</a>
                </div>
            </div>
        </el-header>
        <el-main style="background-image:url(/images/bg1.png)">
            <div class="container mx-auto flex justify-end">
                <div class="w-[360px] mt-[100px] mr-10 bg-white p-5 rounded-md">
                    <div class="flex justify-between mt-5 mx-12">
                        <h4 :class="['cursor-pointer pb-2 text-gray-400',!tagIndex?'active':'']" @click="tagIndex = !tagIndex">账号登录</h4>
                        <h4 :class="['cursor-pointer pb-2 text-gray-400',tagIndex?'active':'']" @click="tagIndex = !tagIndex">短信登录</h4>
                    </div>

                    <el-form :model="form" size="large" class="mt-8 mx-2">
                        <el-form-item>
                            <el-input v-model.trim="form.username" class="" :placeholder="!tagIndex?'用户名/手机号码':'手机号码'" :prefix-icon="Users" clearable />
                        </el-form-item>
                        <el-form-item v-if="!tagIndex">
                            <el-input v-model.trim="form.password" class="" placeholder="您的密码" :prefix-icon="Iphone" show-password clearable />
                        </el-form-item>
                        <el-form-item v-if="!tagIndex">
                            <div class="flex justify-between item-center">
                                <el-input v-model="form.numcode" placeholder="验证码" :prefix-icon="ChatDotRound" />
                                <img :src="baseUrl+'captcha?token='+form.token+'&r='+random" class="cursor-pointer w-[130px] ml-2" @click="random=Math.random().toString().split('.').pop() as string" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item class="relative" v-else>
                            <el-input v-model="form.smscode" placeholder="短信验证码" :prefix-icon="Iphone" />
                            <h5 class="absolute right-5 inline-block text-blue-500 cursor-pointer" @click="send(30)">{{sendText}}</h5>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="w-full text-white hover:text-slate-100 btn-submit" @click="onSubmit">登 录</el-button>
                        </el-form-item>
                        <div class="-mt-3 flex justify-between mx-1" v-if="!tagIndex">
                            <span class="text-sm cursor-pointer" @click="forget">忘记密码</span>
                            <span class="text-sm cursor-pointer" @click="dialogVisible = true">注册</span>
                        </div>

                        <el-divider class="mt-10">第三方登录</el-divider>
                        <div class="flex justify-between mx-8 mb-5">
                            <el-avatar :size="45" class="bg-green-500 cursor-pointer" @click="third('wechat')"> <i class="fa fa-weixin text-2xl"></i> </el-avatar>
                            <el-avatar :size="45" class="bg-blue-500 cursor-pointer" @click="third('qq')"> <i class="fa fa-qq text-2xl"></i> </el-avatar>
                            <el-avatar :size="45" class="bg-red-500 cursor-pointer" @click="third('weibo')"> <i class="fa fa-weibo text-2xl"></i> </el-avatar>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-main>
        <el-footer class="text-center">
            <h4 class="mt-5">逸间茶</h4>
        </el-footer>
    </el-container>
</template>

<style lang="scss" scoped>
    .el-main{
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .active{
        color: #333;
        border-bottom: 2px solid #fd6589;
    }
    .el-button.btn-submit{
        background-image: linear-gradient(to left,#fd6689,#f9c3c7);
        border: unset;
    }
</style>