<template>
    <el-container class="g-layout">
        <!-- 头部 -->
        <el-header class="g-head" height="60px">
            <!-- 暂开收起图标 -->
            <i class="icon-collapse"
                :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
                @click="toggleSide">
            </i>
            <h2 class="title">管理后台</h2>
            <!-- 面包屑 -->
            <breadcrumb></breadcrumb>
            <!-- 右侧 -->
            <el-dropdown class="right-dropdown" size="medium" @command="rightCommand">
                <span class="name">{{ userInfo.name }}<i class="el-icon-arrow-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container class="g-content">
            <el-scrollbar class="g-aside">
                <!-- 左侧菜单 -->
                <el-menu
                    router
                    :default-active="$route.meta.activePath || $route.path"
                    :collapse="isCollapse"
                    unique-opened
                    background-color="#4B5D6F"
                    text-color="#fff">
                    <menu-item :data="menuList"></menu-item>
                </el-menu>
            </el-scrollbar>
            <!-- 页面主体 -->
            <el-main class="g-main">
                <router-view class="g-page"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import menuItem from './menu-item'
import breadcrumb from './breadcrumb'
import { mapState } from 'vuex'
export default {
    components: { menuItem, breadcrumb },
    name: 'layout',
    data() {
        return {
            isCollapse: false, // 菜单是否收起
        }
    },
    computed: {
        ...mapState({
            menuList: state => state.menuList, // 菜单数组
            userInfo: state => state.userInfo, // 用户信息
        })
    },
    methods: {
        toggleSide() {
            this.isCollapse = !this.isCollapse;
        },
        rightCommand(val) {
            switch (val) {
                case 'logout':
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/scss/layout/layout.scss';
</style>
