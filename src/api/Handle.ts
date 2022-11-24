import { http } from "@/plugin/axios";
import qs from 'qs'

class Handle{
    table = 'handle'

    get(id:number = 0){
        return http.request({url:'handle/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'handle/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'handle/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'handle/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'handle/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'handle/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Handle()
