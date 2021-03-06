<template>
    <el-container class="g-layout">
        <!-- 头部 -->
        <el-header class="g-head" height="60px">
            <div class="g-logo" index="/index">
                <img src="@/assets/img/logo.png" alt="">
                <h2>管理后台</h2>
            </div>
            <!-- 暂开收起图标 -->
            <el-tooltip :content="isCollapse? '展开菜单':'收起菜单'" effect="dark">
                <i class="icon-collapse"
                    :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
                    @click="isCollapse = !isCollapse">
                </i>
            </el-tooltip>
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
    created() {
        // 小屏左侧菜单默认收起
        if (document.body.offsetWidth < 1366) {
            this.isCollapse = true;
        }
    },
    methods: {
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
