/* 
 * 生成router菜单
 */
function renderMenu(routes, data) {
    // 排序
    let menuArr = data.sort((a, b) => { return a.order - b.order });
    menuArr.forEach(item => {
        let menu = {
            path: item.path,
            component: item.component,
            name: item.name,
            redirect: item.redirect,
            alias: item.alias,
            meta: item.meta,
            children: []
        }
        if (item.component) {
            menu.component = () => import('@/views/'+item.component+'.vue');
        }
        if(item.children && item.children.length > 0){
            renderMenu(menu.children, item.children)
        }
        routes.push(menu);
    })
}

export default (routes, data) => {
    renderMenu(routes, data)
}