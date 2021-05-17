<template>
    <div ref="wangEditor" class="wangEditor"></div>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
    props: {
        // 菜单
        menus: {
            type: Array,
            default() {
                return []
            }
        },
        data: {
            type: String,
            default: ''
        },
        // 图片上传接口地址
        uploadImgServer: {
            type: String,
            default: '/'
        },
        height: {
            type: Number,
            default: 300
        },
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            editor: null,
            content: '', // 内容
        }
    },
    mounted() {
        const editor = new wangEditor(this.$refs.wangEditor);
        // 菜单配置
        editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'todo',
            'justify',
            'quote',
            'emoticon',
            'image',
            'video',
            'table',
            'code',
            'splitLine',
            'undo',
            'redo',
            ...this.menus
        ];
        // 设置高度
        editor.config.height = this.height;
        editor.config.placeholder = this.placeholder;
        editor.config.zIndex = this.zIndex;
        // 取消自动 focus
        editor.config.focus = false
        // 配置server接口地址
        editor.config.uploadImgServer = this.uploadImgServer;
        // change回调
        editor.onchange = (html) => {
            this.content = html;
        };
        editor.create();
        this.editor = editor;
        this.editor.txt.html(this.data);
    },
    beforeDestroy() {
        // 销毁编辑器
        this.editor.destroy();
        this.editor = null;
    },
    methods: {
        // 设置内容
        setContent(data) {
            this.editor.txt.html(data);
        },
        // 追加内容
        appendContent(data) {
            this.editor.txt.append(data);
        },
        // 获取内容
        getContent() {
            return this.editor.txt.html();
        },
        // 获取纯文本
        getText() {
            return this.editor.txt.text();
        },
        // 清空内容
        clearContent() {
            this.editor.txt.clear();
        },
        // 禁用
        disable() {
            this.editor.disable();
        },
        // 启用
        enable() {
            this.editor.enable();
        },
    }
}
</script>

<style>

</style>