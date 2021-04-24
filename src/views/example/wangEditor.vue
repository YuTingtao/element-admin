<template>
    <div>
        <h3>富文本编辑器</h3>
        <editor class="editor" ref="editor"></editor>
        <el-button type="primary" @click="setContent('<p>这是js插入的内容</p>')">设置内容</el-button>
        <el-button type="primary" @click="getContent">获取内容</el-button>
    </div>
</template>

<script>
import editor from '@/components/wangEditor'
export default {
    components: { editor },
    data() {
        return {
            content: ''
        }
    },
    methods: {
        setContent(cont) {
            this.$refs.editor.setContent(cont);
        },
        getContent() {
            this.$alert(this.$refs.editor.getContent());
        }
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