<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {}
    },
    created() {
        // 防止vuex刷新失效
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('vuex-admin', JSON.stringify(this.$store.state));
            sessionStorage.setItem('redirect', this.$route.fullPath);
        }, false);
        if (sessionStorage.getItem('vuex-admin') ) {
            this.$store.replaceState(Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem('vuex-admin'))
                )
            );
            // 获取菜单路由
            this.$store.dispatch('getMenuList').then(res => {
                this.$router.replace(sessionStorage.getItem('redirect'));
                sessionStorage.removeItem('vuex-admin');
                sessionStorage.removeItem('redirect');
            })
        }
        // 解决IE不能监听hash和参数变化
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            window.addEventListener('hashchange', () => {
                let currentPath = location.hash.slice(1);
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath);
                }
            }, false);
        }
    }
}
</script>
