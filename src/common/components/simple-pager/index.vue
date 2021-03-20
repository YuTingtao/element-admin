<template>
    <div class="simple-pager">
        <i :class="['simple-pager-item', 'el-icon-d-arrow-left', currentNum == 1? 'disable':'']" @click="toFirst"></i>
        <i :class="['simple-pager-item', 'el-icon-arrow-left', currentNum == 1? 'disable':'']" @click="toPrev"></i>
        <div class="simple-pager-num">
            <input type="text" v-model="currentNum"
                :style="{ 'width': 8 * String(currentNum).length + 4 + 'px' }"
                @change="handleChange($event)"
                @keyup.enter="$event.target.blur()">
            <span>{{'/' + pageCount}}</span>
        </div>
        <i :class="['simple-pager-item', 'el-icon-arrow-right', currentNum == pageCount? 'disable':'']" @click="toNext"></i>
        <i :class="['simple-pager-item', 'el-icon-d-arrow-right', currentNum == pageCount? 'disable':'']" @click="toEnd"></i>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        current: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
    },
    data() {
        return {
            currentNum: this.current
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.total / this.pageSize)
        }
    },
    watch: {
        current(val) {
            this.currentNum = val;
        }
    },
    methods: {
        toFirst() {
            if (this.currentNum > 1) {
                this.currentNum = 1;
                this.$emit('currentChange', this.currentNum);
            }
        },
        toEnd() {
            if (this.currentNum < this.pageCount) {
                this.currentNum = this.pageCount;
                this.$emit('currentChange', this.currentNum);
            }
        },
        toPrev() {
            if (this.currentNum > 1) {
                this.currentNum--;
                this.$emit('currentChange', this.currentNum);
            }
        },
        toNext() {
            if (this.currentNum < this.pageCount) {
                this.currentNum++;
                this.$emit('currentChange', this.currentNum);
            }
        },
        handleChange(e) {
            let value = e.target.value;
            value = Number(value.replace(/\D/g,''));
            if (value < 1) {
                this.currentNum = 1;
            } else if (value > this.pageCount) {
                this.currentNum = this.pageCount || 1;
            } else {
                this.currentNum = value;
            }
            this.$emit('currentChange', this.currentNum);
        }
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style>
