<script setup lang="ts">
    import { reactive } from 'vue'

    const props = withDefaults(defineProps<{
        data: any
    }>(),{
       
    })

    const emit = defineEmits(['submit'])

    const onSubmit = () => {
        emit('submit')
    }
</script>

<template>
    <!-- <el-form :inline="true" :model="data" size="large" class="demo-form-inline">
        <el-form-item label="关键词">
            <el-input v-model="data?.keyword" placeholder="关键词" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" class="text-gray-500 font-light">查询</el-button>
        </el-form-item>
    </el-form> -->
</template>

<style lang="scss" scoped>

</style>