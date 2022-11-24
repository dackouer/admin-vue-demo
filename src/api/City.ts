import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class City{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'city/'+id})
    }

    parent(pid:number = 0){
        return http.request({url:'city/parent/'+pid})
    }

    show(data:Object){
        return http.request({method:'post',url:'city/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'city/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'city/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'city/save',
            data: qs.stringify(data)
        })
    }

    del(id:number | string){
        return http.request({
            method:'post',
            url: 'city/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new City()
