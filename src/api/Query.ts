import { http } from "@/plugin/axios";
import qs from 'qs'

class Query{
    get(sql:string){
        console.log('sql: '+sql)
        return http.request({
            method:'post',
            url:'query',
            data: qs.stringify({sql:sql})
        })
    }
}

export default new Query()
