import { http } from "@/plugin/axios";
import qs from 'qs'

class Charset{
    get(id:number = 0){
        return http.request({url:'charset/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'charset/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'charset/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'charset/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'charset/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'charset/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Charset()
