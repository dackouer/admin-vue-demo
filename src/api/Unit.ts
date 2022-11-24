import { http } from "@/plugin/axios";
import qs from 'qs'

class Unit{
    table = 'unit'

    get(id:number = 0){
        return http.request({url:this.table+'/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:this.table+'/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: this.table+'/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: this.table+'/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: this.table+'/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: this.table+'/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Unit()
