import { http } from "@/plugin/axios";
import qs from 'qs'

class Order{
    get(id:number = 0){
        return http.request({url:'order/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'order/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'order/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'order/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'order/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'order/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Order()
