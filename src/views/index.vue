<template>
    <div class="page-box">
        <div class="top-tips">{{ userInfo.name || '用户' }}，欢迎登录系统！</div>
        <el-row class="top-card" :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover">
                    <i class="el-icon-user-solid"></i>
                    <span>用户</span>
                    <em>12,345</em>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <i class="el-icon-s-order"></i>
                    <span>订单</span>
                    <em>123</em>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <i class="el-icon-s-goods"></i>
                    <span>商品</span>
                    <em>12,345</em>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <i class="el-icon-s-finance"></i>
                    <span>收入</span>
                    <em>100万</em>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="chart-box" :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">柱状图</div>
                    <div class="chart-item">
                        <echarts :option="optionBar"></echarts>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">折线图</div>
                    <div class="chart-item">
                        <echarts :option="optionPie"></echarts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import config from '@/config'
import echarts from '@/components/echarts'
import { mapState } from 'vuex'
export default {
    components: { echarts },
    data() {
        return {
            optionBar: {
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 18, 10, 20]
                }]
            },
            optionPie: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 15,
                    top: 15,
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '75%'],
                        avoidLabelOverlap: false,
                        emphasis: {
                            label: {
                                fontSize: '16',
                            },
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ]
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    created() {
        
    }
}
</script>

<style lang="scss" scoped>
    .top-tips{
        margin-bottom: 15px;
        color: #999;
    }
    .top-card{
        .el-card{
            border: none;
            color: #fff;
        }
        span{
            margin: 0 10px 0 5px;
        }
        em{
            display: block;
            font-size: 24px;
        }
        .el-col:nth-child(1) {
            .el-card{
                background: cornflowerblue;
            }
        }
        .el-col:nth-child(2) {
            .el-card{
                background: darkorange;
            }
        }
        .el-col:nth-child(3) {
            .el-card{
                background: lightseagreen;
            }
        }
        .el-col:nth-child(4) {
            .el-card{
                background: lightslategray;
            }
        }
    }
    .chart-box{
        margin-top: 20px;
    }
    .chart-item{
        width: 100%;
        height: 300px;
    }
</style>