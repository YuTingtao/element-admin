<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use(
    [BarChart, LineChart, PieChart, LegendComponent, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]
)
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
            let chart = echarts.init(this.$refs.echarts);
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
