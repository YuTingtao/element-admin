/* 
 * 深拷贝
 */
function deepClone(obj){
    var objClone = Array.isArray(obj) ? [] : {};
    if (typeof obj === 'object') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    objClone[key] =  deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

export default deepClone