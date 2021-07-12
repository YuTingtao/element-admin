<template>
    <div>
        <el-form v-model="form" inline>
            <el-form-item prop="ids" label="多选">
                <treeSelect
                    v-model="form.ids"
                    :options="treeData"
                    :multiple="true"
                    :defaultProps="{ label: 'name', children: 'child' }">
                </treeSelect>
            </el-form-item>
            <el-form-item style="margin-right: 30px;">
                <span style="margin-right: 10px;">{{form.ids}}</span>
                <el-button type="primary" @click="form.ids = [2, 5]">修改</el-button>
            </el-form-item>
            <el-form-item prop="id" label="单选">
                <treeSelect
                    v-model="form.id"
                    :options="treeData"
                    :multiple="false"
                    :defaultProps="{ label: 'name', children: 'child' }">
                </treeSelect>
            </el-form-item>
            <el-form-item>
                <span style="margin-right: 10px;">{{form.id}}</span>
                <el-button type="primary" @click="form.id = 3">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import treeSelect from '@/components/tree-select'
export default {
    components: { treeSelect },
    data() {
        return {
            form: {
                ids: [4, 5],
                id: 5
            },
            treeData: [{
                name: '一级1',
                id: 1,
                child: [{
                    name: '二级1',
                    id: 2,
                    child: [{
                        name: '三级1',
                        id: 3
                    }]
                }]
            }, {
                name: '一级2',
                id: 4,
                child: [{
                    name: '二级2',
                    id: 5,
                    child: [{
                        name: '三级2',
                        id: 6
                    }]
                }]
            }],
        }
    },
}
</script>

<style>

</style>
