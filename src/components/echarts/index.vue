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
        option: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.chart = echarts.init(this.$refs.echarts);
        this.setOption();
        window.addEventListener('resize', ()=> {
            this.chart.resize();
        })
    },
    methods: {
        setOption() {
            this.chart.setOption(this.option);
        }
    }
}
</script>

<style>
    .echarts{
        width: 100%;
        height: 100%;
    }
</style>
