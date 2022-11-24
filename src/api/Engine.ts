import { http } from "@/plugin/axios";
import qs from 'qs'

class Engine{
    get(id:number = 0){
        return http.request({url:'engine/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'engine/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'engine/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'engine/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'engine/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'engine/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Engine()
