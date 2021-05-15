/* 
 * 随机数
 */
export default (num = 1000) => {
    let r = Math.random();
    return Math.ceil(r * num % num);
}