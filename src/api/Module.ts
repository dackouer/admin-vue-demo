import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 模块接口总类
 */

class Module{
    get(id:number = 0){
        return http.request({url:'module/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'module/show',data:data})
    }

    list(){
        return http.request({url:'module/list'})
    }

    tree(){
        return http.request({url:'module/tree'})
    }

    child(){
        return http.request({url:'module/child'})
    }
    // 获取菜单接口
    all(){
        return http.request({url:'module'})
    }

    // 获取最大排序值
    sort(pid:number){
        return http.request({
            method:'post',
            url: 'module/sort',
            data: qs.stringify({pid:pid})
        })
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'module/add',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'module/save',
            data: qs.stringify(data)
        })
    }

    del(id:number|string){
        return http.request({
            method:'post',
            url: 'module/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Module()