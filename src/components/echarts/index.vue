<template>
    <div class="echarts"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { 
    LegendComponent, 
    TitleComponent, 
    TooltipComponent, 
    GridComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    BarChart, LineChart, PieChart, 
    LegendComponent, TitleComponent, TooltipComponent, GridComponent,
    CanvasRenderer
])

export default {
    name: 'echarts',
    props: {
        option: {
            type: Object,
            default() {
                return {}
            }
        },
        theme: {
            type: String,
            default: 'defult'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.chart = echarts.init(this.$el, this.theme);
        this.chart.setOption(this.option);
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        setOption(option) {
            if (!option) return false;
            this.chart.setOption(option);
        },
        handleResize() {
            this.chart.resize();
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
