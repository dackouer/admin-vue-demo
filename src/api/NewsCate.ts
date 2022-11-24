import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class NewsCate{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'news_cate/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'news_cate/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'news_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'news_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'news_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number | string){
        return http.request({
            method:'post',
            url: 'news_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new NewsCate()
