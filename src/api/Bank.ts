import { http } from "@/plugin/axios";
import qs from 'qs'

class Bank{
    get(id:number = 0){
        return http.request({url:'bank/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'bank/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'bank/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'bank/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'bank/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'bank/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Bank()
