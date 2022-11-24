import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Menu{
    get(id:number = 0){
        return http.request({url:'menu/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'menu/show',data:data})
    }

    list(){
        return http.request({url:'menu/list'})
    }

    tree(){
        return http.request({url:'menu/tree'})
    }

    grant(){
        return http.request({url:'menu/grant'})
    }

    role(){
        return http.request({url:'menu/role'})
    }

    child(){
        return http.request({url:'menu/child'})
    }
    // 获取菜单接口
    all(){
        return http.request({url:'menu'})
    }

    // 获取最大排序值
    sort(pid:number){
        return http.request({
            method:'post',
            url: 'menu/sort',
            data: qs.stringify({pid:pid})
        })
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'menu/add',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'menu/save',
            data: qs.stringify(data)
        })
    }

    del(id:number|string){
        return http.request({
            method:'post',
            url: 'menu/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Menu()