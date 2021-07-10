<template>
    <div class="com-pager">
        <i :class="['com-pager-item', 'el-icon-d-arrow-left', current == 1? 'disable':'']" @click="toFirst"></i>
        <i :class="['com-pager-item', 'el-icon-arrow-left', current == 1? 'disable':'']" @click="toPrev"></i>
        <div class="com-pager-num">
            <input type="text"
                :style="{ 'width': inputWidth }"
                :value="current"
                @input="onInput"
                @change="onChange"
                @keyup.enter="$event.target.blur()">
            <span>{{' / ' + pageCount}}</span>
        </div>
        <i :class="['com-pager-item', 'el-icon-arrow-right', current == pageCount? 'disable':'']" @click="toNext"></i>
        <i :class="['com-pager-item', 'el-icon-d-arrow-right', current == pageCount? 'disable':'']" @click="toEnd"></i>
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
        return {}
    },
    computed: {
        pageCount() {
            return Math.ceil((this.total || 1) / this.pageSize);
        },
        inputWidth() {
            return 8 * String(this.current).length + 'px';
        }
    },
    methods: {
        toFirst() {
            if (this.current > 1) {
                this.$emit('update:current', 1);
                this.$emit('currentChange', 1);
            }
        },
        toEnd() {
            if (this.current < this.pageCount) {
                this.$emit('update:current', this.pageCount);
                this.$emit('currentChange', this.pageCount);
            }
        },
        toPrev() {
            if (this.current > 1) {
                let value = this.current - 1;
                this.$emit('update:current', value);
                this.$emit('currentChange', value);
            }
        },
        toNext() {
            if (this.current < this.pageCount) {
                let value = this.current + 1;
                this.$emit('update:current', value);
                this.$emit('currentChange', value);
            }
        },
        onInput(e) {
            let value = e.target.value;
            value = value.replace(/\D/g,'');
            e.target.value = value;
            e.target.style.width = 8 * String(value || 1).length + 'px';
        },
        onChange(e) {
            let value = Number(e.target.value);
            if (value < 1) {
                value = 1;
            } else if (value > this.pageCount) {
                value = this.pageCount || 1;
            }
            e.target.value = value;
            this.$emit('update:current', value);
            this.$emit('currentChange', value);
        }
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style>
