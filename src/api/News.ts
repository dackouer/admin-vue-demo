import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class News{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'news/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'news/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'news/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'news/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'news/save',
            data: qs.stringify(data)
        })
    }

    del(id:number | string){
        return http.request({
            method:'post',
            url: 'news/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new News()
