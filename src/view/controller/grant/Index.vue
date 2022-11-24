<script setup lang="ts">
    import { ref,reactive,onMounted } from "vue"
    import Menu from '@/api/Menu'
    import Handle from '@/api/Handle'

    const menu_id = ref(0)
    const role_id = ref(0)
    const menuData = ref()
    const handleData = ref()

    onMounted(async () => {
        await init()
    })

    const init = async () => {
        await getMenuData()
    }

    const getMenuData = async () => {
        Menu.role().then((res)=>{
            menuData.value = JSON.parse(JSON.stringify(res.data.data))
        })
        Handle.get().then((res)=>{
            handleData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    const handleChange = async () => {

    }
</script>

<template>
    <div class="p-5 bg-white">
        <el-collapse v-model="menuData" @change="handleChange">
            <template v-for="item in menuData" :key="item.id">
                <el-collapse-item :name="item.id" v-if="item.pid == 0">
                    <template #title>
                        <el-checkbox v-model="item.is_selected" :label="item.title" size="large" />
                    </template>
                    <template v-for="itm in menuData" :key="itm.id">
                        <el-collapse-item :name="itm.id" v-if="itm.pid == item.id" class="pl-7">
                            <template #title>
                                <el-checkbox v-model="itm.is_selected" :label="itm.title" size="large" />
                            </template>
                            <template v-for="im in menuData" :key="im.id">
                                <el-collapse-item :name="im.id" v-if="im.pid == itm.id" class="pl-7">
                                    <template #title>
                                        <el-checkbox v-model="im.is_selected" :label="im.title" size="large" />
                                        <!-- <el-checkbox v-model="checked1" :label="it.title" size="large" v-for="it in handleData" :key="it.id" /> -->
                                    </template>
                                </el-collapse-item>
                            </template>
                        </el-collapse-item>
                    </template>
                </el-collapse-item>
            </template>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped>

</style>