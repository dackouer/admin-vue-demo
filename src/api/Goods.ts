import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Goods{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'goods/'+id})
    }
    one(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'goods/one/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'goods/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'goods/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'goods/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'goods/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'goods/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Goods()
