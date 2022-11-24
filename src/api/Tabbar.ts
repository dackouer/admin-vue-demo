import { http } from "@/plugin/axios";
import qs from 'qs'

class Tabbar{
    get(id:number = 0){
        return http.request({url:'tabbar/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'tabbar/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'tabbar/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Tabbar()
