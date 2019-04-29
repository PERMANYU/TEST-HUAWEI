<template>
    <div class="list">      
        <div class="l-d-content">                    
            <div class="left2">
                <span class="span" :class="{active1:isShow=='1000'}" @click="clickSpan('1000')">销售品配置</span>

                <ul v-show="isShow2">
                    <li :class="{active:currentInfo == item.components}" v-for="(item,index) in module" :key="index"
                        @click="moduleClick(item.components,index)">{{item.name}}
                    </li>
                </ul>
                <span class="span2" :class="{active5:isShow=='1200'}" @click="clickSpan('1200')">配置目标客户</span>
                <span class="span3" :class="{active5:isShow=='1300'}" @click="clickSpan('1300')">配置销售渠道</span>
                <span class="span4" :class="{active5:isShow=='1500'}" @click="clickSpan('1500')">配置促销资源</span>
                <span class="span5" :class="{active5:isShow=='1600'}" @click="clickSpan('1600')">配置客户服务</span>
                <span class="span7" :class="{active5:isShow=='1700'}" @click="clickSpan('1700')">测试验证</span>
                <span class="span8" :class="{active5:isShow=='1800'}" @click="clickSpan('1800')">上市发布</span>
            </div>
            <div class="l-d-header">
            	<span class="app__btn app__btn-confirm" @click="operationSchedule">进度追踪</span>
                <div class="d-h-title">
                    {{offerName}}
                </div>
            </div>
            <!--加载详情组件-->
            <div class="d-c-info">
                <component :is="currentView" ref="component" :componentData="componentData" @menuPosition="getMenuPosition"></component>
            </div>
        </div>
        <Dialog dialogTitle="进度追踪" :dialogSize="dialogSize" ref="flowSchedule" :showConfirmBtn="false">
			<Scroll class="dialog-schedule" :isShowRight="true">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="6">环节</Col>
						<Col :span="3">操作人</Col>
						<Col :span="5">办理时间</Col>
						<Col :span="5">办理时长</Col>
						<Col :span="3">备注</Col>
						<Col :span="2">状态</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in flowScheduleData" :key="index">
						<Col :span="6">{{item.taskName}}</Col>
						<Col :span="3">{{item.operator}}</Col>
						<Col class="no-wrap" :title="item.operateDate" :span="5">{{item.operateDate}}</Col>
						<Col :span="5">{{item.duration}}</Col>
						<Col class="no-wrap" :title="item.operateDesc" :span="3">{{item.operateDesc}}</Col>
						<Col :span="2">{{item.operatorStatus == '1' ? '同意' : item.operatorStatus == '0' ? '回退' : '无'}}</Col>
					</Row>
					<Row v-if="flowScheduleData.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
			</Scroll>
			<!--  <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange"> -->
			<!--</Pagination>-->
		</Dialog>
    </div>
</template>

<script type="text/javascript">
    export default{
        components:{
            goods: () => import('./group/goods'),
        },
        
        data(){
            return{
                componentData:{},
                offerName:'',
                offerId:'',      //销售品Id
                currentView:'goods',
                currentInfo:'1',
                comName:'',           //当前商品名称
                module: [
                    {name:'基本信息',components:'1'},
                    {name:'定价信息',components:'2'},
                    {name:'受理规则',components:'3'},
                    {name:'毛利预估',components:'4'},
                ],
                isShow: '900',
                isShow2:false,
                flowScheduleData: [],
                dialogSize: {
					size: 80,
					min: 800,
					max: 600
				}
            }
        },
        mounted() {
            this.getList()
            this.componentData = {
                offerId:this.$route.params.id,
                requirementId:this.$route.params.reid
            }
        },
        methods:{
            clickSpan(type){
                if (type=='1000') {
                    if (this.isShow2==true) {
                        this.isShow2=false
                    } else {
                        this.isShow2=true
                    }
                }
                this.currentInfo = 0;


                if(type=='1100'){                        
                    this.$refs.component.rightMenuInput('basicFoldObj')
                }else if(type=='1000'){
                    this.$refs.component.rightMenuInput('basicFoldObj')
                }else if(type=='1200'){
                    this.isShow=1200
                    this.$refs.component.rightMenuInput('constraintFoldObj')
                }else if(type=='1300'){
                    this.isShow=1300
                    this.$refs.component.rightMenuInput('channelFoldObj')
                }else if(type=='1400'){
                    this.isShow=1400
                    //this.$refs.component.rightMenuInput('saleselFoldObj')
                }else if(type=='1500'){
                    this.isShow=1500
                    this.$refs.component.rightMenuInput('saleselFoldObj')
                }else if(type=='1600'){
                    this.isShow=1600
                    this.$refs.component.rightMenuInput('customerFoldObj')
                }else if(type=='1700'){
                    this.isShow=1700
                    this.$refs.component.rightMenuInput('validateFoldObj')
                }else if(type=='1800'){
                    this.isShow=1800
                    this.$refs.component.rightMenuInput('listedFoldObj')
                }else if(type=='1900'){
                    this.isShow=1900
                    this.$refs.component.rightMenuInput('pricesFoldObj')
                }else if(type=='2000'){
                    this.isShow=2000
                    this.$refs.component.rightMenuInput('acceptFoldObj')
                }else if(type=='2100'){
                    this.isShow=2100
                    this.$refs.component.rightMenuInput('estimateFoldObj')
                }
            },
            // 联动展示菜单
            getMenuPosition(val) {
                return
                switch(val){
                    case 'pricesFoldObj': this.isShow = 900;
                    break;
                    case 'acceptFoldObj': this.isShow = 900;
                    break;
                    case 'estimateFoldObj': this.isShow = 900;
                    break;
                    case 'basicFoldObj': this.isShow = 1100;
                    break;
                    case 'constraintFoldObj': this.isShow=1200;
                    break;
                    case 'channelFoldObj': this.isShow=1300;
                    break;
                    case 'saleselFoldObj': this.isShow=1500;
                    break;
                    case 'customerFoldObj': this.isShow=1600;
                    break;
                    case 'validateFoldObj': this.isShow=1700;
                    break;
                    case 'listedFoldObj': this.isShow=1800;
                    break;
                    case 'pricesFoldObj': this.isShow=1900;
                    break;
                    case 'acceptFoldObj': this.isShow=2000;
                    break;
                    case 'estimateFoldObj': this.isShow=2100;
                    break;
                }
            },
            getList(){
                this.$axios.get(this.$api.replace(this.$api.OfferBasic, ["{offerId}"], [this.$route.params.id]), {

                }).then((res) => {
                    console.log(res,'基本信息')
                    if (res.data.success) {
                        this.offerName = res.data.offer.offerName                        
                    }
                })
            },
            //基本信息左侧列表
            moduleClick(components,index) {
                this.currentInfo = components;
                this.isShow = 900
                switch(index){
                    case 0:this.$refs.component.rightMenuInput('basicFoldObj');
                    break;
                    case 1:this.$refs.component.rightMenuInput('pricesFoldObj');
                    break;
                    case 2:this.$refs.component.rightMenuInput('acceptFoldObj');
                    break;
                    case 3:this.$refs.component.rightMenuInput('estimateFoldObj');
                    break;
                }
            },
            operationSchedule() {
				//流程追踪
				this.$refs.flowSchedule.show();
				this.getreRuireData();
			},
			// 进度追踪列表
			getreRuireData() {
				this.$axios.get(this.$api.FlowScheduleList, {
					params: {
						"objType": "1000",
                        "objId": this.componentData.offerId,
                        "requirementId": this.componentData.requirementId
					}
				}).then(res => {
					if(res.data.success === true) {
						this.flowScheduleData = res.data.traceList;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			}
            
        }
    }
</script>

<style scoped lang="scss">
    /*字符超出隐藏*/
    .app__cut-txt{
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
    }
    .list{
        width: 100%;
        height: 100%;


        .header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .h-all{

                padding: 0 20px;

                .h-a-add{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    height: 30px;

                }

                .h-a-title{

                    .a-t-name{
                        display: inline-block;
                        height: 100%;
                        line-height: 50px;
                        font-weight: bold;
                        padding-left: 20px;
                        font-size: 16px;
                        color: $mainColor;
                        background-image: url(./images/all.png);
                        background-repeat: no-repeat;
                        background-position: 0;
                    }

                    .a-t-search{
                        display: inline-block;
                        height: 100%;
                        line-height: 50px;
                        padding-left: 30px;

                    }


                }

            }
        }


        .l-d-header{
            display: inline-block;
            float: right;
            width: 84%;
            border-bottom: 10px solid #f8f8f8;
            text-align: center;
            color: $mainColor;
            font-size: 18px;
            font-weight: 800;

            .d-h-title{
                width: 50%;
                height: 50px;
                line-height: 50px;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0 auto;
            }
            .app__btn-confirm{
            	position: absolute;
            	top: 10px;
            	left: 20px;
            	cursor: pointer;
            	z-index: 8;
            }

        }

        .l-d-content{
            .left2 {
                position: fixed;
                width: 16%;
                height: 800px;
                float: left;
                border-right: 10px solid #f9f9f9;
                span:hover {
                    color: #fff;
                    background-color: $mainColor;
                }
                .span {
                    display: block;
                    height: 50px;
                    line-height: 32px;
                    border-bottom: 1px solid #f9f9f9;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;                    
                    background: url(images/icon0011.png) no-repeat 10px center, url(images/icon_44.png) no-repeat 160px center;
                }
                .span2 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    height: 50px;
                    line-height: 32px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0022.png) no-repeat 10px center;
                }
                .span3 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    height: 50px;
                    line-height: 32px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0033.png) no-repeat 10px center;
                }
                .span4 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    height: 50px;
                    line-height: 32px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0044.png) no-repeat 10px center;
                }
                .span5 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    line-height: 32px;
                    height: 50px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0055.png) no-repeat 10px center;
                }
                .span6 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    line-height: 32px;
                    height: 50px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0066.png) no-repeat 10px center;
                }
                .span7 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    line-height: 32px;
                    height: 50px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0077.png) no-repeat 10px center;
                }
                .span8 {
                    display: block;
                    padding: 10px 50px;
                    font-size: 14px;
                    cursor: pointer;
                    line-height: 32px;
                    height: 50px;
                    border-bottom: 1px solid #f9f9f9;
                    background: url(images/icon0088.png) no-repeat 10px center;
                }

                .active1 {
                    color: $mainColor;
                    background: url(images/icon001.png) no-repeat 10px center;
                    background-color: white;
                }
                .active5 {
                    color: white;
                    background: url(images/icon005.png) no-repeat 10px center;
                    background-color: $mainColor;
                }


                ul {
                    width: 100%;
                    background: #fcfcfc;

                    li {
                        padding: 6px 0;
                        text-align: center;
                        line-height: 32px;
                        height: 50px;
                        font-size: 14px;
                        cursor: pointer;
                        border-bottom: 1px solid #f8f8f8;
                        &:hover {
                            color: #fff;
                            background-color: $mainColor;
                        }
                    }
                    .active {
                        background-color: $mainColor;
                        color: #fff;
                    }
                }
            }

            .d-c-info{
                width: 84%;
                height: 560px;
                float: right;
                font-size: 14px;
                padding: 10px 0;

                .d-c-title{
                    border-left: 4px solid $mainColor;
                    padding-left: 4px;
                }
            }

        }

    }
</style>
