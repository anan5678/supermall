import axios from "axios"

export function request(config) {

    const instance = axios.create({
        baseURL: "http://152.136.185.210:7878/api/m5",
        timeout: 5000
    })
    // axios的拦截器，什么时候使用
    // config中的一些信息不符合服务器的要求
    // 每次发生网络请求时，希望界面显示一个请求图标show出来，
    // 某些网络请求（比如登录（token））,必须携带一些特殊的信息
    // 请求拦截
    // instance.interceptors.request.use(config => {
    //     console.log(config)
    // },err => {
    //     console.log(err)
    // })

    // 响应拦截
    instance.interceptors.response.use(res => {
       return res.data
    }, err => {
        console.log(err)
    })


    return instance(config)     
}

// axios的拦截器




// export function request(config){
//     return new Promise((resolve,reject) => {
//         const instance = axios.create({
//             baseURL:"http://123.207.32.32:8000",
//             timeout:5000
//         })
//         instance(config)
//         .then(res => {
//             resolve(res)
//         })
//         .catch(err => {
//             reject(err)
//         })
//     })
// }


// export function request(config,success,failure){
//     const instance = axios.create({
//         baseURL:"http://123.207.32.32:8000",
//         timeout:5000
//     })

//     // 发生真正的网络请求
//     instance(config)
//     .then(res => {
//         // console.log(res);
//         console.log(config)
//         success(res);
//     })
//     .catch(err => {
//         console.log(err);
//         failure(err)
//     })
// }



// export function request(config){
//     const instance = axios.create({
//         baseURL:"http://123.207.32.32:8000",
//         timeout:5000
//     })

//     // 发生真正的网络请求
//     instance(config.baseConfig)
//     .then(res => {
//         // console.log(res);
//         console.log(config)
//         config.success(res);
//     })
//     .catch(err => {
//         console.log(err);
//         config.failure(err)
//     })
// }


