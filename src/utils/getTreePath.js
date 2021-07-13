function getTreePath(arr, value, key = 'id', child = 'child') {
    let tempPath = [];
    let getNodePath;
    try {
        getNodePath = function(node) {
            tempPath.push(node);
            // 找到符合条件的节点，通过throw终止掉递归
            if (node[key] == value) {
                throw ('Got it!');
            }
            if (node[child] && node[child].length > 0) {
                for (var i = 0; i < node[child].length; i++) {
                    getNodePath(node[child][i]);
                }
                // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                tempPath.pop();
            } else {
                // 找到叶子节点时，删除路径当中的该叶子节点
                tempPath.pop();
            }
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
        return tempPath;
    }
}

export default getTreePath;
