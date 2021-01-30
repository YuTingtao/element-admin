<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="类型">
                <el-select v-model="filter.type" placeholder="请选择类型" filterable clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="类型1" value="1"></el-option>
                    <el-option label="类型2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="filter.keyword" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList();">查询</el-button>
                <el-button type="primary">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data" border>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="描述" prop="desc" show-overflow-tooltip></el-table-column>
        </el-table>
        <simple-pager :total="total" :current="current" @currentChange="currentChange"></simple-pager>
    </div>
</template>

<script>
import simplePager from '@/common/components/simple-pager'
import commonApi from '../../request/common/getList'
export default {
    components: { simplePager },
    data() {
        return {
            filter: {
                type: '',
                keyword: ''
            },
            data: [],
            total: 100,
            current: 1
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            commonApi.getList().then(res => {
                if (res.status == 200) {
                    this.data = res.data;
                }
            })
        },
        // 分页导航
        currentChange(val) {
            this.current = val;
            this.getList();
        }
    }
}
</script>

<style lang="scss" scoped>
    .simple-pager{
        margin-top: 20px;
        text-align: center;
    }
</style>