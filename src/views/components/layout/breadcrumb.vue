// 面包屑
<template>
    <el-breadcrumb :separator="separator" :separator-class="separatorClass">
        <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.path" :to="item.redirect || item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumb',
    props: {
        separator: {
            type: String,
            default: '/'
        },
        separatorClass: {
            type: String,
            default: '' // el-icon-arrow-right
        }
    },
    data() {
        return {
            breadCrumbs: []
        }
    },
    watch: {
        $route(to, form) {
            this.setBreadCrumb();
        }
    },
    created() {
        // console.log(this.$route.matched);
        this.setBreadCrumb();
    },
    methods: {
        // 设置面包屑
        setBreadCrumb() {
            if (/^(\/|\/index|\/home)$/i.test(this.$route.path)) {
                this.breadCrumbs = [{ path: '/index', meta: { title: '首页' } }]
            } else {
                this.breadCrumbs = [
                    ...this.$route.matched
                ]
            }
        }
    }
}
</script>
