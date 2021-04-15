<template>
    <el-select ref="select"
        :value="selectData" :value-key="_defaultProps.value" :placeholder="placeholder"
        :multiple="multiple" :disabled="disabled" :filterable="true"
        :collapse-tags="collapseTags"
        :clearable="true" @clear="handleClear"
        :filter-method="handleFilter"
        @remove-tag="removeTag"
        @visible-change=visibleChange>
        <template v-if="multiple">
            <el-option class="tree-select-option hidden"
                v-for="item in selectData" :key="item[_defaultProps.value]"
                :value="item" :label="item[_defaultProps.label]">
            </el-option>
        </template>
        <template v-else>
            <el-option class="tree-select-option hidden"
                v-for="item in [selectData]" :key="item[_defaultProps.value]"
                :value="item" :label="item[_defaultProps.label]">
            </el-option>
        </template>
        <el-option 
            :class="{'tree-select-option': true, 'tree-select-option-simple': !multiple}"
            :key="_defaultProps.value"
            :value="null" disabled>
            <el-tree ref="tree"
                :data="options"
                :props="_defaultProps"
                :show-checkbox="multiple"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                :node-key="nodeKey"
                :check-strictly="checkStrictly"
                :default-expanded-keys="defaultExpandedKeys"
                :default-expand-all="defaultExpendAll"
                :highlight-current="true"
                :accordion="accordion"
                @check="handleCheck"
                @node-click="nodeClick"
                :filter-node-method="filterNode"
                :current-node-key="!multiple? value : null">
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: [Array, Number, String],
            default: null
        },
        placeholder: {
            type: String,
            default: '输入关键词过滤'
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
                return {}
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
            selectData: [], // 选中的对象
            defaultExpandedKeys: [] // 树默认展开keys
        };
    },
    computed: {
        _defaultProps() {
            return Object.assign({
                label: 'label',
                children: 'children',
                value: 'id'
            }, this.defaultProps);
        }
    },
    watch: {
        value(val) {
            if (this.multiple) {
                this.selectData = [];
                this.getSelectData(this.options);
                this.$refs.tree.setCheckedKeys(val || []);
                this.defaultExpandedKeys = this.value || [];
            } else {
                this.getSelectData(this.options);
                this.$refs.tree.setCurrentKey(val || null);
                this.defaultExpandedKeys = this.value? [this.value] : [];
            }
        },
        options(val) {
            if (this.value) {
                if (this.multiple) {
                    this.selectData = [];
                    this.getSelectData(val);
                } else {
                    this.getSelectData(val);
                    this.$refs.tree.setCurrentKey(this.value);
                }
            }
        }
    },
    mounted() {
        this.getSelectData(this.options);
        if (this.multiple) {
            this.$refs.tree.setCheckedKeys(this.value || []);
            this.defaultExpandedKeys = this.value || [];
        } else {
            this.defaultExpandedKeys = this.value? [this.value] : [];
        }
    },
    methods: {
        // 获取选中的值
        getSelectData(array) {
            if (!this.value || this.value.length == 0) {
                this.multiple? this.selectData = [] : this.selectData = {};
                return false;
            }
            array = array || [];
            let label = this._defaultProps.label;
            let child = this._defaultProps.children;
            let value = this._defaultProps.value;
            array.forEach(item => {
                if (this.multiple) {
                    this.value.forEach(item2 => {
                        if (item[value] == item2) {
                            this.selectData.push(item);
                        }
                    })
                } else {
                    if (item[value] == this.value) {
                        this.selectData = item;
                    }
                }
                // 递归
                if (item[child] && item[child].length > 0) {
                    this.getSelectData(item[child])
                }
            })
        },
        // 多选：当复选框被点击的时候触发
        handleCheck(current, data) {
            if(this.multiple) {
                this.$emit('change', data.checkedKeys);
                this.$emit('handleChange', data);
            }
        },
        // 单选：获取当前被选中节点
        nodeClick(data) {
            if (!this.multiple) {
                let value = this._defaultProps.value;
                this.$emit('change', data[value]);
                this.$emit('handleChange', data);
                this.$refs.select.blur();
            }
        },
        // 多选：删除标签
        removeTag(data) {
            let value = this._defaultProps.value;
            let tempArr = [];
            this.selectData.forEach(item => {
                if (item[value] != data[value]) {
                    tempArr.push(item);
                }
            });
            this.selectData = tempArr;
            this.$emit('change', tempArr.map(item => item[value]));
            this.$emit('handleChange', this.selectData);
        },
        // select清空
        handleClear() {
            if (this.multiple) {
                this.$emit('change', []);
                this.$emit('handleChange', []);
            } else {
                this.$emit('change', '');
                this.$emit('handleChange', '');
            }
        },
        // 搜索
        handleFilter(val) {
            this.$refs.tree.filter(val);
        },
        filterNode(val, data, node) {
            if (!val) {
                return true;
            }
            // return data[this._defaultProps.label].indexOf(val) !== -1;
            return this.getFilterTree(val, data, node);
        },
        getFilterTree(val, data, node) {
            if (data[this._defaultProps.label].indexOf(val) !== -1){
                return true;
            }
            let level = node.level;
            if (level === 1) {
                return false;
            }
            let parentData = node.parent;
            let index = 0;
            while (index < level - 1) {
                // 如果匹配到直接返回
                if (parentData.data[this._defaultProps.label].indexOf(val) != -1) {
                    return true;
                }
                // 否则的话再往上一层做匹配
                parentData = parentData.parent;
                index ++;
            }
            // 没匹配到返回false
            return false;
        },
        // 下拉框显示或隐藏
        visibleChange(val) {
            if (!val) {
                // 重置搜索
                this.$refs.tree.filter('');
            }
        }
    }
};
</script>

<style>
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
    color: #409eff;
}
.tree-select-option.hidden {
    display: none;
}
</style>
