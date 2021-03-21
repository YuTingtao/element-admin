// 面包屑
<template>
    <el-breadcrumb :separator="separator" :separator-class="separatorClass">
        <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.path" :to="item.redirect || item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import bus from '../bus'
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
        this.setBreadCrumb();
        // 手动设置面包屑
        bus.$on('setBreadCrumb', data => {
            if (data && data.length > 0) {
                this.breadCrumbs = [];
                data.forEach((item, index) => {
                    this.breadCrumbs.push({
                        path: item.path,
                        meta: {
                            title: item.title
                        }
                    })
                })
            }
        })
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
