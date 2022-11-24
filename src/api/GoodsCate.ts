import { http } from "@/plugin/axios";
import qs from 'qs'

class GoodsCate{
    get(id:number = 0){
        return http.request({url:'cate/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'cate/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new GoodsCate()
