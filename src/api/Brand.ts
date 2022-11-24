import { http } from "@/plugin/axios";
import qs from 'qs'

class Brand{
    get(id:number = 0){
        return http.request({url:'brand/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'brand/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'brand/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'brand/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'brand/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'brand/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Brand()
