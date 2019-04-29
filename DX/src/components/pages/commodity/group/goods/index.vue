<template>
    <div class="goods">
        <Scroll :isShowRight="true" ref="scroll" @hightMove="hightMove" @bottomLoad="bottomLoad">
            <div class="fold" ref="basicFoldObj">
                <div class="fold-title" @click="objShowClick(basicObj)">
                    <span class="fold-name fold-name-basic">销售品基本信息</span>
                    <span class="fold-save" @click.stop="objSave(basicObj)" v-if="basicObj.showScope != 'read'">保存</span>
                    <span :class="['fold-oc',basicObj.isShow ? 'fold-oc-s' :'' ]" ref="basicObjShow" @click.stop="objShowClick(basicObj)">
                    </span>
                </div>
                <div :class="['fold-content']" 
                    :style="basicObjStyle"
                    @click="basicFoldObjClick"
                    v-show="basicObj.isShow">
                    <div class="fold-read" v-if="basicObj.showScope == 'read'"></div>
                    <component :is="item.componentName"
                        :class="basicObj.showScope == 'read' ? 'active' : ''"
                        @componentView="changeView" 
                        @saveStatus="saveStatus" 
                        @constituteUpdate="reComponentDataByConstitute" 
                        @mounted="componentMounted"
                        @commodityTypeChange="commodityTypeChange"
                        :componentData="componentData" 
                        :ref="'component-' + item.componentName" 
                        :id="'goods-' + item.componentName"
                        v-show="item.isShow"
                        v-for="(item,index) in basicObj.items" 
                        :key="index"></component>
                    <div class="fold-more" @click="basicObjClick" v-if="basicObj.items.length < 3">
                        <span>更多信息</span>
                    </div>
                </div>
                
            </div>
            <div class="fold" ref="pricesFoldObj">
                <div class="fold-title" @click="objShowClick(pricesObj)">
                    <span class="fold-name fold-name-prices">定价信息</span>
                    <span class="fold-save" @click.stop="objSave(pricesObj)" v-if="pricesObj.showScope != 'read'">保存</span>
                    <span :class="['fold-oc',pricesObj.isShow ? 'fold-oc-s' :'' ]" ref="pricesObjShow" @click.stop="objShowClick(pricesObj)">
                    </span>
                </div>
                <div class="fold-content" v-show="pricesObj.isShow">
                    <div class="fold-read" v-if="pricesObj.showScope == 'read'"></div>
                    <component :is="item.componentName" 
                        :class="pricesObj.showScope == 'read' ? 'active' : ''"
                        @componentView="changeView" 
                        @saveStatus="saveStatus" 
                        @mounted="componentMounted"
                        @changeBasic="changeBasic"
                        :componentData="componentData" 
                        :ref="'component-' + item.componentName" 
                        :id="'goods-' + item.componentName"
                        v-show="item.isShow"
                        v-for="(item,index) in pricesObj.items" 
                        :key="index"></component>
                </div>
            </div>
            <div class="fold" ref="acceptFoldObj">
                <div class="fold-title" @click="objShowClick(acceptObj)">
                    <span class="fold-name fold-name-accept">受理信息</span>
                    <span class="fold-save" @click.stop="objSave(acceptObj)" v-if="acceptObj.showScope != 'read'">保存</span>
                    <span :class="['fold-oc',acceptObj.isShow ? 'fold-oc-s' :'' ]" ref="acceptObjShow" @click.stop="objShowClick(acceptObj)">
                    </span>
                </div>
                <div class="fold-content" v-show="acceptObj.isShow">
                    <div class="fold-read" v-if="acceptObj.showScope == 'read'"></div>
                    <component :is="item.componentName" 
                        :class="acceptObj.showScope == 'read' ? 'active' : ''"
                        @componentView="changeView" 
                        @saveStatus="saveStatus" 
                        @mounted="componentMounted"
                        :componentData="componentData" 
                        :ref="'component-' + item.componentName" 
                        :id="'goods-' + item.componentName"
                        v-show="item.isShow"
                        v-for="(item,index) in acceptObj.items" 
                        :key="index"></component>
                </div>
            </div>
            <div class="fold" ref="estimateFoldObj">
                <div class="fold-title" @click="objShowClick(estimateObj)">
                    <span class="fold-name fold-name-estimate">毛利预估</span>
                    <span class="fold-save" @click.stop="objSave(estimateObj)" v-if="estimateObj.showScope != 'read'">保存</span>
                    <span :class="['fold-oc',estimateObj.isShow ? 'fold-oc-s' :'' ]" ref="estimateObjShow" @click.stop="objShowClick(estimateObj)">
                    </span>
                </div>
                <div class="fold-content" v-show="estimateObj.isShow">
                    <div class="fold-read" v-if="estimateObj.showScope == 'read'"></div>
                    <component :is="item.componentName" 
                        :class="estimateObj.showScope == 'read' ? 'active' : ''"
                        @componentView="changeView" 
                        @saveStatus="saveStatus" 
                        @mounted="componentMounted"
                        :componentData="componentData" 
                        :ref="'component-' + item.componentName" 
                        :id="'goods-' + item.componentName"
                        v-show="item.isShow"
                        v-for="(item,index) in estimateObj.items" 
                        :key="index"></component>
                </div>
            </div>
            <div class="fold" ref="apportionFoldObj">
                <div class="fold-title" @click="objShowClick(apportionObj)">
                    <span class="fold-name fold-name-estimate">公允价值静态分摊</span>
                    <span class="fold-jump">公允价值管理</span>
                    <span class="fold-save" @click.stop="objSave(apportionObj)" v-if="apportionObj.showScope != 'read'">保存</span>
                    <span :class="['fold-oc',apportionObj.isShow ? 'fold-oc-s' :'' ]" ref="apportionObjShow" @click.stop="objShowClick(apportionObj)">
                    </span>
                </div>
                <div class="fold-content" v-show="apportionObj.isShow">
                    <div class="fold-read" v-if="apportionObj.showScope == 'read'"></div>
                    <component :is="item.componentName" 
                        :class="apportionObj.showScope == 'read' ? 'active' : ''"
                        @componentView="changeView" 
                        @saveStatus="saveStatus" 
                        @mounted="componentMounted"
                        :componentData="componentData" 
                        :ref="'component-' + item.componentName" 
                        :id="'goods-' + item.componentName"
                        v-show="item.isShow"
                        v-for="(item,index) in apportionObj.items" 
                        :key="index"></component>
                </div>
            </div>
        </Scroll>

        <RightMenu :value="rightMenuValue" @input="rightMenuInput" ref="rightMenuRef"/>
    </div>
    
</template>

<script>
    import RightMenu from './business/right-menu.vue';

    export default {
        name: 'goods',
        props:{
            componentData:{},
            nodes:Array
        },
        data() {
            return {
                currentView:'basic',
                currentData:{},
                isLoading:false,
                basicObj:{
                    name:'basic',
                    isShow:false,
                    showScope:'',
                    items:[],
                    inits:[{
                        name:'基本信息',
                        componentName:'basic',
                        isShow: true
                    },{
                        name:'构成信息',
                        componentName:'constitute',
                        isShow: false
                    }]
                },
                basicInit:[],
                basicMore:[{
                    name:'关联关系',
                    componentName:'relation',
                    isShow: true
                },{
                    name:'关联销售品组关系',
                    componentName:'sales',
                    isShow: true
                },{
                    name:'组合销售品',
                    componentName:'share',
                    isShow: false
                },{
                    name:'关联包',
                    componentName:'income',
                    isShow: false
                },{
                    name:'销售品标签',
                    componentName:'salesLabel',
                    isShow: true
                },{
                    name:'属性配置',
                    componentName:'attribute',
                    isShow: true
                }],
                pricesObj:{
                    name:'prices',
                    isShow:false,
                    showScope:'',
                    items:[],
                    inits:[{
                        name:'资费定价',
                        componentName:'prices',
                        isShow: true
                    },{
                        name:'促销规则',
                        componentName:'ware',
                        isShow: false
                    }]
                },
                acceptObj:{
                    name:'accept',
                    isShow:false,
                    showScope:'',
                    items:[],
                    inits:[{
                        name:'受理规则',
                        componentName:'accept',
                        isShow: true
                    },{
                        name:'业务登记单',
                        componentName:'register',
                        isShow: true
                    }]
                },
                estimateObj:{
                    name:'estimate',
                    isShow:false,
                    showScope:'',
                    items:[],
                    inits:[{
                        name:'毛利预估',
                        componentName:'estimate',
                        isShow: true
                    }]
                },
                apportionObj:{
                    name:'apportion',
                    isShow:false,
                    showScope:'',
                    items:[],
                    inits:[{
                        name:'公允价值静态分摊',
                        componentName:'apportion',
                        isShow: true
                    }]
                },

                showTabs:[{
                    name:'基本信息',
                    componentName:'basic',
                    top: 0
                }],
                tabs:[{
                    name:'基本信息',
                    top:0
                },{
                    name:'定价信息',
                    top:0
                },{
                    name:'受理信息',
                    top:0
                },{
                    name:'毛利预估',
                    top:0
                },{
                    name:'公允价值静态分摊',
                    top:0
                }],
                tab:'',
                componentHeight:-1,
                rightMenuValue:'basicFoldObj',
                basicObjStyle:{
                    height: '0',
                    overflow: 'hidden'
                },
                allSaveResult: true,
                nodeArr:{
                    '01001':'basicObj',
                    '02001':'pricesObj',
                    '01002':'acceptObj',
                    '01003':'estimateObj'
                }
            }
        },
        watch:{
            nodes(val,old){
                this.adjustNodes();
            }
        },
        mounted(){
            
            this.adjustNodes();
            
            this.$nextTick( () => {
                let h = document.documentElement.clientHeight || document.body.clientHeight;
                this.basicObjStyle.height = `${h - 480}px`;
            })
        },
        methods:{
            adjustNodes(){
                if(this.nodes && this.nodes.length > 0){
                    let activeItem = this.nodes.find( nItem => nItem.active == 'true'),
                        nodeTemp = activeItem ? this[this.nodeArr[activeItem.componentCode]] : this.basicObj;
                    this.nodes.filter( nItem => {
                        this[this.nodeArr[nItem.componentCode]].showScope = nItem.showScope;
                    })

                    nodeTemp.isShow = true;
                    nodeTemp.items = nodeTemp.inits;
                }else{
                    this.basicObj.isShow = true;
                    this.basicObj.items = this.basicObj.inits;
                }
            },
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            saveStatus(val){
                this.reComponentDataByBasicName();
                this.$emit('saveStatus',val);
            },
            hightMove(val){
                let foldArray = ['basicFoldObj','pricesFoldObj','acceptFoldObj','estimateFoldObj','apportionFoldObj'],
                    elRect = this.$el.getBoundingClientRect();

                this.$refs.rightMenuRef.scrollMove();
                    
                for(let i = 0; i<foldArray.length; i++){
                    let item = foldArray[i];
                    let blockRect = this.$refs[item].getBoundingClientRect();
                    if(blockRect.top - elRect.top + blockRect.height > elRect.height / 2){
                        this.rightMenuValue = item;
                        return ;
                    }
                }


            },
            componentMounted(component){
                this.$refs.scroll.initScroll();
            },
            changeBasic() {
               this.$refs[`component-basic`][0].initMonthlyBasicFeeM();
            },
            basicObjClick(){
                this.basicObj.items = [...this.basicObj.items,...this.basicMore];
            },
            objShowClick(obj){
                obj.isShow = !obj.isShow;
                if(obj.items.length === 0){
                    obj.items = [...obj.items,...obj.inits];
                }else{
                    this.$nextTick( () => {
                        this.$refs.scroll.initScroll();
                    })
                }
            },
            bottomLoad(){
//                 let sObjArray = [this.pricesObj,this.acceptObj,this.estimateObj,this.apportionObj].filter( item => !item.isShow);
//                 if(sObjArray.length === 0) return;
//                 this.$refs[`${sObjArray[0].name}ObjShow`].click();
            },
            rightMenuInput(val){
                let blockRect = this.$refs[val].getBoundingClientRect(),
                    elRect = this.$el.getBoundingClientRect(),
                    scrollTop = this.$refs.scroll.$refs.content.scrollTop,
                    newTop = blockRect.top + scrollTop - elRect.top;

                this.$refs.scroll.setHeightScrollTop(newTop);
                this.rightMenuValue = val;
            },
            basicFoldObjClick(){
                this.basicObjStyle.height = 'auto';
                this.basicObjStyle.overflow = 'visible';
                
            },
            commodityTypeChange(val){
            	this.componentData.commodityType = val;
                //销售品类型切换，组件显示控制
                let chageArray = {
                    "10": "1001", //10 销售品
                    "30": "1002", //30 组合销售品
                    "40": "1001", //40 可选包
                    "50": "1004", //50 促销
                    "60": "1003", //60 关联包
                    "70": "1001"  //70 加装包
                },
                    noneArray = {
                    '1001': ['share','income','ware'],//1001 不显示组件share，income，ware
                    '1002': ['constitute','income','ware'],//1002 不显示组件constitute，income，ware
                    '1003': ['share','ware'],//1003 不显示组件share，ware
                    '1004': ['share','income']//1004 不显示组件share，income
                },
                    noneObj = noneArray[chageArray[val]],
                    objArray = [this.basicObj,this.pricesObj,this.acceptObj,this.estimateObj];
                objArray.filter(objItem => {
                    objItem.items.filter(cItem => {

                        if(noneObj.includes(cItem.componentName)){
                            cItem.isShow = false
                            return true;
                        }
                        cItem.isShow = true;
                    })

                    objItem.inits.filter(cItem => {

                        if(noneObj.includes(cItem.componentName)){
                            cItem.isShow = false
                            return true;
                        }
                        cItem.isShow = true;
                    })
                })

                this.basicMore.filter(cItem => {
                    if(noneObj.includes(cItem.componentName)){
                        cItem.isShow = false
                        return true;
                    }
                    cItem.isShow = true;
                })

                //constitute组件不显示，修改estimate模板类型
                this.$nextTick( () => {
                    this.reComponentDataByConstitute();    
                })
            },
            save(){
                return new Promise(async (resolve, reject) => {
                    let saveObjSaveArray = [];
                    this.allSaveResult = true;
                    [this.basicObj,this.pricesObj,this.acceptObj,this.estimateObj].filter( item => {
                        if(item.showScope == 'read') return true;
                        saveObjSaveArray.push(this.objSave(item));
                        return true;
                    })
                    await Promise.all(saveObjSaveArray).then(values => {
                        resolve(values.filter( item => !item).length === 0);
                    });
                })
            },
            objSave(obj){
                return new Promise((resolve, reject) => {
                    if(obj.items.length === 0){
                        resolve(this.allSaveResult == true);
                    }
                    let resultLength = 0;
                    obj.items.map( (item) => {
                        let component = this.$refs[`component-${item.componentName}`][0];
                        try{
                            if(typeof(eval(component.save)) == "function"){
                                component.save( result => {
                                    resultLength ++;
                                    this.allSaveResult = this.allSaveResult  && result;
                                    if(obj.items.length === resultLength){
                                        resolve(this.allSaveResult == true);
                                    }
                                });
                            }else{
                                resultLength ++;
                            }
                        }catch(e){
                            resultLength ++;
                        }
                    })
                })
            },
            reComponentDataByBasicName(){
                //根据基本信息名称 更新 关联关系、关联销售品组关系
                ['relation','sales'].filter( name => {
                    let component = this.$refs[`component-${name}`];
                    if(!component) return;
                    component = component[0];
                    try{
                        if(typeof(eval(component.reInitData)) == "function"){
                            component.reInitData();
                        }
                    }catch(e){

                    }
                })
            },
            reComponentDataByConstitute(){
                //根据构成信息 更新 毛利预估模板类型
                let componentEstimate = this.$refs[`component-estimate`];
                if(!componentEstimate) return;
                componentEstimate = componentEstimate[0];

                let constituteItem = this.basicObj.items.find( item => item.componentName == 'constitute');
                let componentConstitute = this.$refs[`component-constitute`][0];

                if(constituteItem.isShow){
                    try{
                        if(typeof(eval(componentEstimate.setTemplateType)) == "function"){
                            componentEstimate.setTemplateType(componentConstitute.getEstimateTemplateType());
                        }
                    }catch(e){

                    }
                }else{
                    try{
                        if(typeof(eval(componentEstimate.setTemplateType)) == "function"){
                            componentEstimate.setTemplateType(10,true);
                        }
                    }catch(e){

                    }
                }
            },
            reBasicInfo(){
                //刷新基本信息
                let componentBasic = this.$refs[`component-basic`];
                if(!componentBasic) return;
                componentBasic = componentBasic[0];

                try{
                    if(typeof(eval(componentBasic.reInitData)) == "function"){
                        componentBasic.reInitData();
                    }
                }catch(e){

                }
            }
        },
        components:{
            accept: () => import('./group/accept'),
            attribute: () => import('./group/attribute'),
            basic: () => import('./group/basic'),
            constitute: () => import('./group/constitute'),
            income: () => import('./group/income'),
            salesLabel: () => import('./group/sales-label'),
            prices: () => import('./group/prices'),
            register: () => import('./group/register'),
            relation: () => import('./group/relation'),
            sales: () => import('./group/sales'),
            share: () => import('./group/share'),
            ware: () => import('./group/ware'),
            estimate: () => import('./group/estimate'),
            apportion: () => import('./group/apportion'),
            RightMenu
        }
    }
</script>
<style scoped lang="scss">
    .goods{
        width: 100%;
        height: 100%;
        z-index: 1;
        overflow: hidden;

        .step-box{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
        }

        .fold{
            margin-top: 15px;

            .fold-title{
                width: 100%;
                height: 60px;
                background: linear-gradient(#fff, #f1f4ff);
                border-width: 2px 1px 1px;
                border-style: solid;
                border-color: #5c9cf3 #f5f5f5 #f5f5f5;
                cursor: pointer;

                .fold-name{
                    position: absolute;
                    display: block;
                    top: 20px;
                    left: 20px;
                    height: 20px;
                    line-height: 20px;
                    padding-left: 30px;
                    color: #497cc1;
                    background-repeat: no-repeat;
                    background-position: left center;

                    &.fold-name-basic{
                        background-image: url(./images/xspjbxx.png);
                    }

                    &.fold-name-prices{
                        background-image: url(./images/zfcx.png);
                    }

                    &.fold-name-accept{
                        background-image: url(./images/slywdjd.png);
                    }

                    &.fold-name-estimate{
                        background-image: url(./images/mlyg.png);
                    }
                }

                .fold-save{
                    position: absolute;
                    display: block;
                    top: 15px;
                    right: 65px;
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 30px;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                    background-color: $mainColor;
                    background-image: url(./images/bzan.png);
                    background-repeat: no-repeat;
                    background-position: 10px center;

                    &:hover{
                        opacity: .8;
                    }
                }
                .fold-jump{
                	position: absolute;
                    display: block;
                    top: 15px;
                    right: 160px;
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid $mainColor;
                    padding-left: 9px;
                    border-radius: 4px;
                    color: $mainColor;
                    cursor: pointer;
                    background-color: #fff;

                    &:hover{
                        color: #fff;
                        background: $mainColor;
                    }
                }

                .fold-oc{
                    position: absolute;
                    display: block;
                    top: 21px;
                    right: 25px;
                    width: 18px;
                    height: 11px;
                    background-image: url(./images/yjzkzt.png);
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: all .3s ease;
                    cursor: pointer;

                    &.fold-oc-s{
                        transform: rotate(-180deg);
                    }
                }
            }

            .fold-content{
                width: 100%;
                padding: 20px;
                transition: all .3s ease;

                .fold-read{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #999;
                    opacity: .2;
                    z-index: 99;
                    pointer-events: none;
                }

                .active {
                    pointer-events:none;
                    
                }

                .fold-more{
                    width: 100%;
                    height: 50px;
                    line-height: 45px;
                    text-align: center;
                    cursor: pointer;
                    border-top: 1px solid #f5f5f5;
                    background: linear-gradient(#fff, #f1f4ff);
                    z-index: 2;

                    span{
                        display: inline-block;
                        padding-right: 30px;

                        &:after{
                            content:'';
                            position: absolute;
                            display: block;
                            top: 14px;
                            right: 0;
                            width: 18px;
                            height: 11px;
                            background-image: url(./images/yjzkzt.png);
                            background-repeat: no-repeat;
                            background-position: right center;
                            animation:moremove 1s infinite;

                            @keyframes moremove
                            {
                                0%{
                                    top: 14px;
                                }
                                50%{
                                    top: 18px;
                                }
                                100%{
                                    top: 14px;
                                }
                            }
                        }

                        
                    }
                }
            }
        }
        
    }
</style>
