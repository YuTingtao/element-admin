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
        <!-- 分页 -->
        <pager :total="total" :current.sync="filter.pageNum" @currentChange="getList"></pager>
    </div>
</template>

<script>
import pager from '@/components/pager'
import demoApi from '@/request/demo'
export default {
    components: { pager },
    data() {
        return {
            filter: {
                type: '',
                keyword: '',
                pageNum: 1,
                pageSize: 10
            },
            data: [],
            total: 0,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            let params = {
                ...this.filter
            }
            demoApi.getList(params).then(res => {
                if (res.status == 200) {
                    this.data = res.content;
                    this.total = res.total;
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .com-pager{
        margin: 20px 0;
        text-align: center;
    }
</style>