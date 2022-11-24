import { http } from "@/plugin/axios";
import qs from 'qs'

class User{
    get(id:number = 0){
        return http.request({url:'user/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'user/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'user/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'user/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'user/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: 'user/del',
            data: qs.stringify({id:id})
        })
    }

    check(id:number | string,token:string){
        return http.request({method:'post',url:'user/check',data:{uid:id,token:token}}) 
    }

    // 用户登录接口
    login(data:object){
        return http.request({
            method:'post',
            url: 'login',
            data: qs.stringify(data)
        })
    }

    logout(){
        return http.request({
            url: 'user/logout'
        })
    }
}

export default new User()
