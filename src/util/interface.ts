import { RouteRecordName } from "vue-router"

// axios 数据返回格式
export interface ResponseResult<T>{
    code: number
    msg: string
    data?: T
}

export interface MapData{
    map     : string
    field   : string
    type    : string
    length  : string
    default : string
    title   : string
    width   : number | string
}

// 登录用户数据格式
export interface UserObj{
    age?: number
    balance?: number
    birth?: string
    chain_id?: string
    coin?: number
    create_time?: string
    direct_share?: number
    email?: string
    face?: string
    gender?: number
    id?: number
    idcard?: string
    invite_code?: string
    ip_address?: string
    is_admin?: number
    is_auth?: number
    is_del?: number
    is_locked?: number
    is_secure?: number
    is_transfer_total_count?: number
    is_valid?: number
    locked_time?: number
    mobile?: string
    nickname?: string
    open_blind_count?: number
    openid?: string
    order_amount?: number
    order_count?: number
    order_number?: number
    order_total?: number
    parent_id?: number
    realname?: string
    regip?: string
    role_id?: number
    score?: number
    sign: string
    title?: string
    token: string
    total_share?: number
    uid: string
    username: string
}

// 多层级表数据格式
export interface ItemList{
    id: number
    title: string
    code?: string
    pic?: string
    level: number
    pid: number
    number?: number
    sort?: number
    is_open?: boolean | number
    router?: RouteRecordName | undefined
    pvalue?: string | number
    cvalue?: string | number
    svalue?: string | number
    isopen?: boolean
    url?: string
    type?: String
    create_time?: string
    update_time?: string
    is_del?: boolean | number
}

// 表字段格式
export interface FieldList{
    map: string
    title: string
    field: string
    type: string | number
    length: number
    ispic?: boolean
    default?: string | number
    width: number
    sort?: boolean
    value?: any
}

// 权限格式
export interface HandList{
    
}

// 搜索
export interface SearchList{
    
}

// 搜索
export interface WechatData{
    id: number | string
    wechat_name:  string
    appid:  string
    secret:  string
    server_url:  string
    token:  string
    wx_qrcode:  string
    mini_wechat_name:  string
    mini_original_id:  string
    mini_appid:  string
    mini_secret:  string
    mini_qrcode:  string
    app_wechat_name:  string
    app_appid:  string
    app_secret:  string
    web_wechat_name:  string
    web_appid:  string
    web_secret:  string
    mchid:  string
    serial_number:  string
    apikey:  string
    apiv3key:  string
    apicert:  string
    apikeys:  string
    notify_url: string
    return_url: string
    service_qrcode: string
}

// show数据格式
export interface DataList{
    title: string
    table: string
    layer: number
    thead: FieldList[]
    rows: number
    hand?: HandList
    search?: SearchList
    data: any
}

export interface ConfigData{
    title: string
    table: string
    map: FieldList
    data: []
}

// 风格数据格式
export interface StyleList{
    id: number
    title: string
    default: boolean
    asideBgColor?: string | null
    mainBgColor?: string | null
    menuColor?: string | null
    menuActiveColor?: string | null
    menuBgColor?: string | null
    textColor?: string | null
    textActiveColor?: string | null
    textBgColor?: string | null
}

export interface UploadList{
    name:string
    url:string
}

export interface UnitForm{
    id: number
    title: string
    symbol: string
    is_default: number
}
