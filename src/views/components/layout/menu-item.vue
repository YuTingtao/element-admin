// 递归左侧菜单item
<template>
    <div>
        <template v-for="(item, index) in data">
            <template v-if="!item.hidden">
                <el-menu-item
                    v-if="!item.children || !item.children.filter(item => item.hidden != true).length > 0"
                    :index="item.redirect || item.path" :key="item.path">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
                <el-submenu
                    v-if="item.children && item.children.filter(item => item.hidden != true).length > 0"
                    :index="item.redirect || item.path" :key="index">
                    <template slot="title">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <span>{{item.meta.title}}</span>
                    </template>
                    <menuItem :data="item.children"></menuItem>
                </el-submenu>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'menuItem',
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>
