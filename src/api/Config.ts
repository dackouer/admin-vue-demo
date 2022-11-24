import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 配置接口总类
 */

class Config{
    // 获取配置接口
    get(table:string,id:number = 0){
        return http.request({url:'config/'+table+'/'+id})
    }

    mod(table:string,data:object,id:number){
        return http.request({
            method:'post',
            url: table+'/mod/'+id,
            data: qs.stringify(data)
        })
    }

    field(table:string){
        return http.request({
            url: table + '/field'
        })
    }
}

export default new Config()