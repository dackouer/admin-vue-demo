import { http } from "@/plugin/axios";
import qs from 'qs'

class Collate{
    get(id:number = 0){
        return http.request({url:'collate/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'collate/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'collate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'collate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'collate/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'collate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Collate()
