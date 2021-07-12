<template>
    <div>
        <h3>富文本编辑器</h3>
        <editor class="editor" :value="content" ref="editor"></editor>
        <el-button type="primary" @click="getContent">显示内容</el-button>
    </div>
</template>

<script>
import editor from '@/components/wangEditor'
export default {
    components: { editor },
    data() {
        return {
            content: '<p>wangEditor富文本编辑器</p>'
        }
    },
    methods: {
        getContent(cont) {
            this.content = this.$refs.editor.getContent()
            this.$alert(this.content);
        },
    }
}
</script>

<style lang="scss" scoped>
h3{
    margin-bottom: 15px;
    font-weight: normal;
    font-size: 16px;
}
.editor{
    margin-bottom: 15px;
}
</style>