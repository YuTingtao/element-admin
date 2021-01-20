<template>
    <div class="simple-pager">
        <i :class="['simple-pager-item', 'el-icon-d-arrow-left', currentNum == 1? 'disable':'']" @click="toFirst"></i>
        <i :class="['simple-pager-item', 'el-icon-arrow-left', currentNum == 1? 'disable':'']" @click="toPrev"></i>
        <span class="simple-pager-num">{{currentNum + '/' + pageCount}}</span>
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
        }
    }
}
</script>

<style lang="scss">
    .simple-pager{
        margin-right: -1px;
        font-size: 14px;
        color: #666;
    }
    .simple-pager-item{
        display: inline-block;
        width: 32px;
        line-height: 28px;
        text-align: center;
        background: #f8f8f8;
        border: 1px solid #e8e8e8;
        cursor: pointer;
        &:first-child{
            border-radius: 3px 0 0 3px;
        }
        &:last-child{
            border-radius: 0 3px 3px 0;
        }
        &:hover{
            background: $primary;
            border-color: $primary;
            color: #fff;
        }
        &.disable{
            background: #f8f8f8;
            color: #999;
            border-color: #e8e8e8;
            cursor: not-allowed;
        }
    }
    .simple-pager-item + .simple-pager-item{
        margin-left: -1px;
    }
    .simple-pager-num{
        display: inline-block;
        padding: 0 6px;
        line-height: 28px;
        background: #fff;
        vertical-align: bottom;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
    }
</style>