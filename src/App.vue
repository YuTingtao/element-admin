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
        if (/iphone|ipad|ipod/.test(navigator.userAgent)) {
            window.addEventListener('pagehide', () => {
                sessionStorage.vuexState = JSON.stringify(this.$store.state);
            }, false);
        } else {
            window.addEventListener('beforeunload', () => {
                sessionStorage.vuexState = JSON.stringify(this.$store.state);
            }, false);
        }
        if (sessionStorage.vuexState) {
            this.$store.replaceState(
                Object.assign({}, this.$store.state, JSON.parse(sessionStorage.vuexState))
            );
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
