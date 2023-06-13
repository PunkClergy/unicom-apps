
// 将秒或毫秒 转化为时分秒格式
export const formatSeconds = (value) => {
    // value 秒 如果是毫秒 乘以1000即可
    let HourTime = parseInt(value);// 秒
    let branchTime = 0;// 分
    let secondTime = 0;// 小时
    if (HourTime > 60) {
        branchTime = parseInt(HourTime / 60);
        HourTime = parseInt(HourTime % 60);
        if (branchTime > 60) {
            secondTime = parseInt(branchTime / 60);
            branchTime = parseInt(branchTime % 60);
        }
    }
    let result = "" + parseInt(HourTime);
    if (result < 10) {
        result = '0' + result;
    }
    if (branchTime > 0) {
        result = "" + parseInt(branchTime) + ":" + result;
        if (branchTime < 10) {
            result = '0' + result;
        }
    } else {
        result = '00:' + result;
    }
    if (secondTime > 0) {
        result = "" + parseInt(secondTime) + ":" + result;
        if (secondTime < 10) {
            result = '0' + result;
        }
    } else {
        result = '00:' + result;
    }
    return result;
}
