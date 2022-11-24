import { http } from "@/plugin/axios";
import qs from 'qs'

class Tags{
    get(id:number = 0){
        return http.request({url:'tags/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'tags/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'tags/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'tags/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'tags/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'tags/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Tags()
