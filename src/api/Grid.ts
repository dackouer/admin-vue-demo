import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Grid{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'grid/'+id})
    }

    parent(pid:number = 0){
        return http.request({url:'grid/parent/'+pid})
    }

    show(data:Object){
        return http.request({method:'post',url:'grid/show',data:data})
    }

    child(){
        return http.request({url:'grid/child'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'grid/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'grid/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'grid/save',
            data: qs.stringify(data)
        })
    }

    del(id:number | string){
        return http.request({
            method:'post',
            url: 'grid/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Grid()
