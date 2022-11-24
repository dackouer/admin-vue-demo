import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Activity{
    table = 'activity'

    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:this.table+'/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:this.table+'/show',data:qs.stringify(data)})
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

    del(id:number | string){
        return http.request({
            method:'post',
            url: this.table+'/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Activity()
