import request from "../../request/service";
// GET请求参数的二次处理
export function bundleUtils(data) {
    let rawValues = Object.values(data)
    let rawKeys = Object.keys(data)
    let flag = rawValues.map((_, index) => {
        return `${rawKeys[index]}=${rawValues[index]}`
    }).join('&')
    console.log(flag)
    return flag
}
// GET请求
export function AGetRequest(data) {
    return request({
        url: `/search?${bundleUtils(data)}`,
        method: "GET",
    });
};
// POST
export function APostRequest(data) {
    return request({
        url: `/search`,
        method: "POST",
        data: data
    });
};
//  // 此处模拟的Post请求
//  const handPost = (data) => {
//     APostRequest(data).then(res => {
//       console.log('APostRequest', res)
//     }).catch(err => {
//       console.log('APostRequest', err)
//     }

//     )
//   }

