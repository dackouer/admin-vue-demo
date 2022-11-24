<script setup lang="ts">
    import {ref,onMounted} from 'vue'
    import { ItemList } from '@/util/interface'
    import { setLogout } from '@/util/main';
    import Menu from '../api/Menu'
import router from '@/router';

    const skin = ref({aside_width:220,mainBg:'#8b5be5'})
    const pid = ref('1')
    const isCollapse = ref(false)
    const menuData = ref([] as ItemList[])
    const user = {uid:0,face:'/face/unkown.png',nickname:'admin'}

    onMounted(() => {
        pid.value = localStorage.getItem('pid') ? localStorage.getItem('pid')! : '1'
        Menu.tree().then((res)=>{
            console.log(res.data.data)
            menuData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    })

    const handleOpen = (key: string, keyPath: string[]) => {
        // console.log('menu',key, keyPath)
    }

    const handleClose = (key: string, keyPath: string[]) => {
        // console.log('menu',key, keyPath)
    }

    const changeMenu = (e:any) => {
        localStorage.setItem('pid',e)
        pid.value = e
    }

    const logout = async () => {
        if(confirm('确定要退出登录么？')){
            setLogout()
            setTimeout(()=>{
                router.push('/login')
            },500)
        }
    }
</script>

<template>
    <el-container class="h-screen">
        <el-aside :width="isCollapse ? 'auto' : skin.aside_width + 'px'" :style="'background-color:'+skin.mainBg+';'">
            <div class="text-center mt-5 mb-5">
                <el-avatar :size="!isCollapse?'large':'small'" :src="user.face"></el-avatar>
                <h4 class="mt-1 text-ellipsis overflow-hidden" v-if="!isCollapse">{{user.nickname}}</h4>
            </div>
            <el-scrollbar height="calc(100vh - 200px)">
                <element-menu :pid="pid" :isCollapse="isCollapse" :items="menuData" class="menu-demo" @open="handleOpen" @close="handleClose"></element-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header>
                <element-menu pid="0" :isTop="true" :isCollapse="false" mode="horizontal" :ellipsis="false" :items="menuData" @open="handleOpen" @close="handleClose" @select="changeMenu">
                    <template #prefix>
                        <el-menu-item index="0" style="border:unset">
                            <el-icon :size="22" :class="['h-[60px]','outline-none','cursor-pointer','duration-1000',isCollapse?'shrink':'']" @click="isCollapse=!isCollapse"><Fold /></el-icon>
                        </el-menu-item>
                    </template>
                    
                    <template #suffix>
                        <el-sub-menu index="1001">
                            <template #title>
                                <el-icon class="mx-0 px-0"><Bell /></el-icon>
                            </template>
                            <el-menu-item index="1001-1">提醒</el-menu-item>
                            <el-menu-item index="1001-2">消息</el-menu-item>
                            <el-menu-item index="1001-3">工单</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="1002">
                            <template #title>
                                <el-icon class="mx-0 px-0"><Reading /></el-icon>
                            </template>
                            <el-menu-item index="454545">sdfgsdfgsdfg</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="1003">
                            <template #title>
                                <span>{{user.nickname}}</span>
                            </template>
                            <el-menu-item index="1003-1">用户中心</el-menu-item>
                            <el-menu-item index="1003-2">修改密码</el-menu-item>
                            <el-menu-item index="1003-3">安全设置</el-menu-item>
                            <el-menu-item index="1003-4">安全设置</el-menu-item>
                            <el-divider class="m-0 p-0" />
                            <el-menu-item index="1003-5" @click="logout">退出登录</el-menu-item>
                        </el-sub-menu>
                    </template>
                </element-menu>
            </el-header>
            <el-main class="bg-gray-100">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .menu-demo{
        background: unset !important;
    }

    .el-menu-item.is-active, .el-sub-menu .el-menu-item.is-active{
        border: unset;
        background-color: unset !important;
    }
    .el-menu-item.is-active:hover, .el-sub-menu .el-menu-item:hover{
        border: unset;
        background-color: unset !important;
    }

    .el-menu{
        background-color: unset !important;
        border: unset !important;
    }

    .el-menu-item:hover{
        background-color: unset !important;
        border: unset !important;
    }
</style>