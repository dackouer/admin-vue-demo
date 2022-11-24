<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import router from '@/router'
    import { DataList,MapData } from '@/util/interface'

    const space = ref('&nbsp;&nbsp;&nbsp;&nbsp;')

    const props = withDefaults(defineProps<{
       data: DataList
    }>(),{
        
    })

    const emit = defineEmits(['select','add','del','mod'])

    const handleSelectionChange = (e:any) => {
        emit('select',e)
    }

    const add = async (table:string,pid:number,level:number = 1) => {
        // console.log('template table: '+table+' pid: '+pid+' level: '+level)
        emit('add',table,pid,level+1)
    }

    const mod = async (table:string,id:number) => { emit('mod',table,id) }

    const del = async (table:string,id:number) => { 
        if(confirm('确定要删除吗？')){
            emit('del',table,id) 
        }
    }
</script>

<template>
    <!-- {{data?.data}} -->
    <el-table ref="multipleTableRef" stripe size="large" :data="data?.data" class-name="table-demo" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <template v-for="item in data?.thead" :key="item.id">
            <el-table-column :label="item.title" :width="item.width>0?item.width:''" show-overflow-tooltip>
                <template #default="scope">
                    <template v-if="item.type == 'varchar'">
                        <template v-if="data?.layer > 1 && item.map == 'title'">
                            <span v-html="space.repeat(scope.row.level-1) + scope.row.title + '[+]'" v-if="scope.row.level < data?.layer" @click="add(data.table,scope.row.id,scope.row.level)" class="cursor-pointer" />
                            <span v-html="space.repeat(scope.row.level-1) + scope.row.title" v-else />
                        </template>
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                    <img :src="scope.row[item.map]" class="h-[30px]" v-else-if="item.type == 'pic' || item.type == 'img'" />
                    <el-switch v-else-if="item.type == 'switch'" :active-value="1" :inactive-value="0" />
                    <span v-html="scope.row[item.map]" v-else></span>
                </template>
            </el-table-column>
        </template>
        <el-table-column label="修改">
            <template #default="scope">
                <el-icon :size="16" @click="mod(data.table,scope.row.id)"><Edit class="cursor-pointer" /></el-icon>
            </template>
        </el-table-column>
        <el-table-column label="删除">
            <template #default="scope">
                <el-icon :size="16" @click="del(data.table,scope.row.id)"><Delete class="cursor-pointer" /></el-icon>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>

</style>