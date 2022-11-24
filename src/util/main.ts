import router from '@/router'
import { UserObj } from '@/util/interface'
import User from '@/api/User'

// 检查登录
function checkLogin(){
    const uid = localStorage.getItem('uid')
    const nickname = localStorage.getItem('nickname')
    const sign = localStorage.getItem('sign')
    const face = localStorage.getItem('face')
    const token = localStorage.getItem('token')
    let user = {} as UserObj

    if(uid == null || nickname == null || face == null || sign == null || token == null){
        return false
    }

    return { uid,nickname,sign,face,token } 
}

function getUser(){
    const uid = localStorage.getItem('uid')!
    const nickname = localStorage.getItem('nickname')!
    const face = localStorage.getItem('face')!
    const sign = localStorage.getItem('sign')!
    const token = localStorage.getItem('token')!

    return { uid,nickname,sign,face,token } 
}

// 存储登录信息
function setLogin(data:any){
    localStorage.setItem('uid',data.uid)
    localStorage.setItem('nickname',data.nickname)
    localStorage.setItem('face',data.face)
    localStorage.setItem('sign',data.sign)
    localStorage.setItem('token',data.token)

    console.log('token: '+localStorage.getItem('token'))
}

// 退出登录
function setLogout(){
    localStorage.removeItem('uid')
    localStorage.removeItem('nickname')
    localStorage.removeItem('face')
    localStorage.removeItem('sign')
    localStorage.removeItem('token')
    localStorage.clear()
}

// 新增
function add(table:string,id:number = 0,pid:number = 0,level:number = 1){
    console.log(table + ' add form')
}

// 修改
function mod(table:string,id:number,pid:number = 0,level:number = 1){
    console.log(table + ' mod form')
}

// 保存数据
function save(table:string,data:object){
    console.log(table + ' save data')
}

// 删除
function del(table:string,id:number){
    console.log(table + ' del data')
}

function implode(arr:[]){
    if(!arr.length){
        return ''
    }
    let str = ''
    Object.entries(arr).forEach((item:any)=>{
        str += item + ','
    })

    if(str != ''){
        return str.substring(0,str.length-1)
    }
    return ''
}

function getSelectID(arr:[]){
    if(!arr.length){
        return ''
    }
    let str:string = ''
    Object.entries(arr).forEach((item:any)=>{
        str += item[1].id + ','
    })

    if(str != ''){
        return str.substring(0,str.length-1)
    }
    return ''
}


// 检查字符是否为空
function checkStr(str:string,type = 'string'){

    if(str == null || str == 'undefined' || str.trim() == ''){
        return false
    }
    return true
}

export { checkLogin,getUser,setLogin,setLogout,add,mod,save,del,implode,getSelectID }