import { http } from "@/plugin/axios";
import qs from 'qs'

class Currency{
    get(id:number = 0){
        return http.request({url:'currency/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'currency/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'currency/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'currency/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'currency/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'currency/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Currency()
