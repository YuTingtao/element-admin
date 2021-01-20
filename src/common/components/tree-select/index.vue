<template>
    <el-select ref="select"
        :value="selectLabel" :placeholder="placeholder"
        :multiple="multiple" :disabled="disabled" :filterable="true"
        :collapse-tags="collapseTags"
        :clearable="true" @clear="handleClear"
        :filter-method="handleFilter"
        @remove-tag="removeTag"
        @visible-change=visibleChange>
        <el-option :class="{'tree-select-option': true, 'tree-select-option-simple': !multiple}" :value="value" disabled>
            <el-tree ref="tree"
                :data="options"
                :props="defaultProps"
                :show-checkbox="multiple"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                :node-key="nodeKey"
                :check-strictly="checkStrictly"
                :default-expanded-keys="defaultExpandedKeys"
                :default-expand-all="defaultExpendAll"
                :highlight-current="!multiple"
                :accordion="accordion"
                @check="handleCheck"
                @node-click="nodeClick"
                :filter-node-method="filterNode">
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'handleChange'
    },
    props: {
        value: {
            type: [Array, Number, String],
            default: null
        },
        placeholder: {
            type: String,
            default: '请选择(可搜索)'
        },
        // 是否多选
        multiple: {
            type: Boolean,
            default: true
        },
        // 是否可用
        disabled: {
            type: Boolean,
            default: false
        },
        // 多选是否合并显示一个tag
        collapseTags: {
            type: Boolean,
            default: false
        },
        // tree: 树形数据
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        // tree: 默认字段
        defaultProps: {
            type: Object,
            default() {
                return {
                    label: 'label',
                    children: 'children',
                };
            }
        },
        // tree: 唯一字段名
        nodeKey: {
            type: String,
            default: 'id',
        },
        // tree: 复选框的情况下，是否严格的遵循父子不互相关联
        checkStrictly: {
            type: Boolean,
            default: true,
        },
        // tree: 是否默认展开所有
        defaultExpendAll: {
            type: Boolean,
            default: false,
        },
        // tree: 是否手风琴模式
        accordion: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectLabel: null, // 选中的label
            selectData: null, // 选中的对象
            defaultExpandedKeys: [] // 树默认展开keys
        };
    },
    mounted() {
        if (this.multiple) {
            this.setLabels(this.options);
            if (!this.value || this.value.length < 1) {
                this.selectLabel = [];
                this.$refs.tree.setCheckedKeys([]);
            } else {
                this.$refs.tree.setCheckedKeys(this.value);
            }
            this.defaultExpandedKeys = this.value || [];
        } else {
            this.setLabel(this.options);
            this.$refs.tree.setCurrentKey(this.value);
            if (!this.value) {
                this.selectLabel = '';
            }
            this.defaultExpandedKeys = this.value? [this.value] : [];
        }
    },
    watch: {
        value(val) {
            if (this.multiple) {
                this.selectLabel = [];
                this.selectData = [];
                this.setLabels(this.options);
                this.$refs.tree.setCheckedKeys(val || []);
                if (!val || val.length == 0) {
                    this.selectLabel = [];
                }
                this.defaultExpandedKeys = this.value || [];
            } else {
                this.setLabel(this.options);
                this.$refs.tree.setCurrentKey(val || null);
                if (!val || val.length == 0) {
                    this.selectLabel = '';
                }
                this.defaultExpandedKeys = this.value? [this.value] : [];
            }
        },
        options(val) {
            if (this.value) {
                if (this.multiple) {
                    this.setLabels(val);
                } else {
                    this.setLabel(this.options);
                    this.$refs.tree.setCurrentKey(this.value);
                }
            }
        }
    },
    methods: {
        // 获取选中的值 - 多选
        setLabels(array) {
            if (!this.value || this.value.length == 0) {
                return false;
            }
            array = array || [];
            this.selectLabel = this.selectLabel || [];
            this.selectData = this.selectData || [];
            let key = this.nodeKey;
            let name = this.defaultProps.label;
            let child = this.defaultProps.children;
            array.forEach(item => {
                this.value.forEach(item2 => {
                    if (item[key] == item2) {
                        this.selectLabel.push(item[name]);
                        this.selectData.push(item);
                    }
                })
                // 递归
                if (item[child] && item[child].length > 0) {
                    this.setLabels(item[child])
                }
            })
        },
        // 获取选中的值 - 单选
        setLabel(array) {
            array = array || [];
            let key = this.nodeKey;
            let name = this.defaultProps.label;
            let child = this.defaultProps.children;
            array.forEach(item => {
                if (item[key] == this.value) {
                    this.selectLabel = item[name];
                    this.selectData = item;
                }
                // 递归
                if (item[child] && item[child].length > 0) {
                    this.setLabel(item[child])
                }
            })
        },
        // 多选：当复选框被点击的时候触发
        handleCheck(current, data) {
            if(this.multiple) {
                this.$emit('handleChange', data.checkedKeys);
            }
        },
        // 单选：获取当前被选中节点
        nodeClick(data) {
            if (!this.multiple) {
                this.$emit('handleChange', data[this.nodeKey]);
                this.$refs.select.blur();
            }
        },
        // 多选：删除标签
        removeTag(data) {
            let index = this.selectLabel.indexOf(data);
            this.selectLabel.splice(index, 1);
            this.selectData.splice(index, 1);
            let val = this.selectData.map(item => item[this.nodeKey]);
            this.$emit('handleChange', val);
        },
        // select清空
        handleClear() {
            if (this.multiple) {
                this.$emit('handleChange', []);
            } else {
                this.$emit('handleChange', '');
            }
        },
        // 搜索
        handleFilter(val) {
            this.$refs.tree.filter(val);
        },
        filterNode(val, data) {
            if (!val) return true;
            return data[this.defaultProps.label].indexOf(val) !== -1;
        },
        // 下拉框隐藏时，重置搜索
        visibleChange(val) {
            if (!val) {
                this.$refs.tree.filter('');
            }
        }
    }
};
</script>

<style lang="scss">
.tree-select-option {
    height: auto;
    padding: 0;
    background: #fff;
}
.tree-select-option .el-tree-node__content {
    height: 34px;
}
.tree-select-option .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #f5f7fa;
}
.tree-select-option-simple .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    color: $primary;
}
.tree-select-option.selected {
    font-weight: normal;
}
</style>
