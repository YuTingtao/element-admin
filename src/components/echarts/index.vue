<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import walden from './walden.json' // 皮肤
export default {
    name: 'echarts',
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            // 注册皮肤
            echarts.registerTheme('walden', walden);
            let chart = echarts.init(this.$refs.echarts, 'walden');
            chart.setOption(this.options);
            window.addEventListener('resize', ()=> {
                chart.resize();
            })
        },
    }
}
</script>

<style>
    .echarts{
        width: 100%;
        height: 100%;
    }
</style>