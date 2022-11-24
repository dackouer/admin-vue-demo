import { http } from "@/plugin/axios";
import qs from 'qs'

class Skin{
    get(id:number | string = 0){
        return http.request({url:'skin/'+id}) 
    }

    default(data:Array<{id:number,w_aside:string,bg_aside:string,bg_header:string,bg_img:string,default:boolean}>){
        return data.findIndex((item)=>{
            return item.default == true
        })
    }
}

export default new Skin()