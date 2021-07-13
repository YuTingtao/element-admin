export default () => {
    let ctx = require.context('./', false, /\.js$/);
    // console.log(ctx);
    let obj = new Object();
    ctx.keys().forEach(key => {
        if (key === './index.js') {
            return false;
        }
        let name = key.replace(/^\.\//, '').replace(/\.js/, '');
        obj[name] = ctx(key).default;
    });
}
