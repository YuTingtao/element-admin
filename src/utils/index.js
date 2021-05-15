export default () => {
    let utilFiles = require.context('./', false, /\.js$/);
    console.log(utilFiles);
    let obj = new Object();
    utilFiles.keys().forEach(key => {
        if (key === './index.js') return;
        let utilName = key.replace(/^\.\//, '').replace(/\.js/, '');
        obj[utilName] = utilFiles(key).default;
    });
}
