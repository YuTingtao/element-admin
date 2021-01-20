<template>
    <div>
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