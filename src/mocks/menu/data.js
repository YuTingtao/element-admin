// 支持多级菜单，三级以上分组可用component: 'components/layout/empty',
const menuList = [
    {
        path: '/index',
        component: 'index',
        name: '',
        redirect: '',
        alias: '',
        meta: {
            title: '首页', // 标题
            activePath: '/index' // 当前导航高亮的路径
        },
        icon: 'el-icon-house',
        order: 1,
        hidden: false
    },
    {
        path: '/example',
        component: 'components/layout/view-empty',
        redirect: '/simple-pager',
        name: '',
        alias: '',
        meta: {
            title: '组件用例'
        },
        icon: 'el-icon-folder',
        order: 2,
        hidden: false,
        children: [
            {
                path: '/pager',
                component: 'example/pager',
                redirect: '',
                name: '',
                alias: '',
                meta: {
                    title: '简单分页'
                },
                icon: '',
                order: 1,
                hidden: false
            },
            {
                path: '/tree-select',
                component: 'example/tree-select',
                redirect: '',
                name: '',
                alias: '',
                meta: {
                    title: '树形下拉'
                },
                icon: '',
                order: 2,
                hidden: false
            },
            {
                path: '/wangEditor',
                component: 'example/wangEditor',
                redirect: '',
                name: '',
                alias: '',
                meta: {
                    title: '富文本编辑'
                },
                icon: '',
                order: 3,
                hidden: false
            },
        ]
    },
];

export default menuList
