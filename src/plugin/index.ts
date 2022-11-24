
import { App,defineAsyncComponent,Component, AsyncComponentLoader, ComputedOptions, MethodOptions, AsyncComponentOptions } from "vue";
import { setupElemementplus } from "./element-plus";
import { setupFontawesome } from "./font-awesome";
import { setupTailwindcss } from "./tailwindcss";

import EchartBar from '@/components/echarts/EchartBar.vue'
import EchartPie from '@/components/echarts/EchartPie.vue'

import ElementHandle from '@/components/element-plus/ElementHandle.vue'
import ElementMain from '@/components/element-plus/ElementMain.vue'
import ElementMenu from '@/components/element-plus/ElementMenu.vue'
import ElementTable from '@/components/element-plus/ElementTable.vue'

import ElementSearch from '@/components/template/ElementSearch.vue'
import TemplateConfig from '@/components/template/TemplateConfig.vue'

function autoComponent(app:App){
    // const components = import.meta.glob('@/components/**/*.vue')
    
    // Object.keys(components).forEach((key)=>{

    //     const name = key.split('/').pop()?.split('.').shift() as string
    //     const value:AsyncComponentLoader<Component<any, any, any, ComputedOptions, MethodOptions>> | AsyncComponentOptions<Component<any, any, any, ComputedOptions, MethodOptions>> = ()=>import(key)
    //     app.component(name,defineAsyncComponent(value))
    // })

    app.component('EchartBar',EchartBar)
    app.component('EchartPie',EchartPie)

    app.component('ElementHandle',ElementHandle)
    app.component('ElementMain',ElementMain)
    app.component('ElementMenu',ElementMenu)
    app.component('ElementTable',ElementTable)

    app.component('ElementSearch',ElementSearch)
    app.component('TemplateConfig',TemplateConfig)
}

export function setupPlugin(app:App){
    setupFontawesome()
    setupTailwindcss()
    setupElemementplus(app)
    autoComponent(app)
}