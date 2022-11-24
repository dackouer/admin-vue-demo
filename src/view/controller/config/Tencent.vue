<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import Config from '@/api/Config';

    const configData = ref()

    onMounted(async () => {
        await Config.get('tencent').then((res)=>{
            console.log(res.data.data)
            configData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    })
</script>

<template>
    <template-config :data="configData" />
</template>

<style lang="scss" scoped>

</style>