<!--特殊名单-->
<template>
    <div class="content">
        <div class="app__title-1">
            <span class="app__title-name">特殊名单</span>
        </div>
        <span class="btn-mod" @click="handleBook">日志</span>
        <span class="btn-add" @click="handleSet" v-if="userRightBtnControl.setBtn">设置</span>
        <div class="main">
            <div class="tag-box" v-for="(item,index) in tableItemData"  v-show="item.subSpecialType != null" :key="index">
                <span>{{changeName(item.subSpecialType)}}</span>
                <i @click="labelDelete(item)"></i>
            </div>
            <div v-if="!tableItemData.length" class="app__data-none">
                <span>当前暂无数据 请添加</span>
            </div>
        </div>

        <!-- 点击设置后的弹窗S -->
        <Dialog ref="modalSet" :dialogTitle="titleType" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Row class="credit-content">
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="24">
                            <FormItem labelText="欠费：" small>
                                <RadioGroup :data="arrearsData" name="arrears" v-model="specialObject.arrears"></RadioGroup>
                            </FormItem>
                        </Col>
                        <Col :span="24">
                            <FormItem labelText="移动黑名单：" small>
                                <RadioGroup :data="radioArray" name="mobile" v-model="specialObject.mobile"></RadioGroup>
                            </FormItem>
                        </Col>
                        <Col :span="24">
                            <FormItem labelText="违章黑名单：" small>
                                <RadioGroup :data="radioArray" name="regula" v-model="specialObject.regula"></RadioGroup>
                            </FormItem>
                        </Col>
                        <Col :span="24">
                            <FormItem labelText="宽带黑名单：" small>
                                <RadioGroup :data="radioArray" name="broadband" v-model="specialObject.broadband"></RadioGroup>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
            </div>
            <div slot="btnBox">
                <span class="save" @click="confirmModal">确定</span>
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>
        <!-- 点击日志后的弹窗S -->
        <Dialog ref="modalBook" :dialogTitle="titleBook" :dialogSize="bookDialogSize" :initBtn="true">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup class="m-title app__table-thead" :inline="true" :titleList="bookTitleData" @dragchange="dragchange">
                    <DragItem :width="item.width" :value="item" v-for="(item,index) in bookTitleData"
                        :key="index">
                        <span>{{item.name}}</span>
                    </DragItem>
                </DragGroup>
                <Row :class="['m-item app__table-item']" :inline="true" v-for="(table,index) in bookItemData" :key="index">
                    <Col :width="item.width" v-for="(item,index) in bookTitleData" :inline="true" :key="index">
                        <span v-if="item.param == 'specialType'">
                            {{getType(table[item.param])}}
                        </span>
                        <span v-else-if="item.param == 'updateDate' || item.param == 'createDate' || item.param == 'expDate' || item.param == 'statusDate' || item.param == 'effDate'">
                            {{table[item.param] | date}}
                        </span>
                        <span v-else-if="item.param=='statusCd'">
                            {{getStatusCd(table[item.param])}}
                        </span>
                        <span v-else-if="item.param=='objType'">
                            {{table[item.param] == '1100' ? '客户' : ''}}
                        </span>
                        <span v-else>
                            {{table[item.param]}}
                        </span>
                    </Col>
                </Row>
                <Row class="empty-style" :class="['m-item app__table-item']" v-for="empty in 20 - bookItemData.length" :key="empty.id">    
                </Row>
                <div v-if="!bookItemData.length" class="app__data-none">
                    <span>当前暂无数据</span>
                </div>
                <div class="footer" v-if="bookItemData.length">
                    <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
                    </Pagination>
                </div>
            </Scroll>
            <div slot="btnBox">
                <span class="back" @click="handleReturn">返回</span>
            </div>
        </Dialog>
        
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>
<script type="text/javascript">
    export default{
        props: {
            componentData: {}
        },
        data(){
            return{
                flag: true,
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                },
                tipInfo: {
                    iconType: 3,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },
                titleType: '设置特殊名单',
                titleBook: '历史记录',
                dialogSize: {
                    max: '538'
                },
                bookDialogSize: {
                    max: '800'
                },
                arrearsData: [
                    {
                        label: "欠费灰名单",
                        value: "120003"
                    },{
                        label: "欠费黑名单",
                        value: "120002"
                    },{
                        label: "无",
                        value: "0"
                    }
                ],
                specialObject: {
                    arrears: '',
                    mobile: '',
                    regula: '',
                    broadband: ''
                },
                updateSpecialObject: {},
                bookTitleData:[
                    {
                        name: '名单类型',
                        param: 'specialType',
                        width: 120
                    },{
                        name: "名单子类型",
                        param: "subSpecialTypeName",
                        width: 120
                    },{
                        name: '修改人',
                        param: 'updateStaffName',
                        width: 120
                    },{
                        name: '修改时间',
                        param: 'updateDate',
                        width: 120
                    },{
                        name: "创建人",
                        param: "createStaffName",
                        width: 120
                    },{
                        name: '创建时间',
                        param: 'createDate',
                        width: 120
                    },{
                        name: '创建渠道',
                        param: 'createChannelName',
                        width: 200
                    },{
                        name: '失效时间',
                        param: 'expDate',
                        width: 120
                    },{
                        name: '状态',
                        param: 'statusCd',
                        width: 120
                    },{
                        name: '状态时间',
                        param: 'statusDate',
                        width: 120
                    },{
                        name: '生效时间',
                        param: 'effDate',
                        width: 120
                    },{
                        name: '特殊名单原因',
                        param: 'specialListReason',
                        width: 160
                    },{
                        name:  '新增方式',
                        param: 'operSource',
                        width: 120
                    },{
                        name:  '创建部门',
                        param: 'fromDeptName',
                        width: 120
                    },{
                        name:  '对象类型',
                        param: 'objType',
                        width: 120
                    },{
                        name:  '对象标识',
                        param: 'objId',
                        width: 120
                    }
                ],
                tableItemData: [],
                bookItemData: [],
                custAdd: {
                    creditLevel: '',
                    expDate: '',
                    remark: ''
                },
                deleteData: {},
                radioArray: [
                    {
                        label: "是",
                        value: "1000"
                    },{
                        label: "否",
                        value: "1100"
                    }
                ],
                specialType: '',
                userRightBtnControl: {          // 权限按钮控制
                    setBtn: false,
                }
            }
        },
        mounted() {
            this.getListData();
            // 循环权限数据     
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100621':
                        this.userRightBtnControl.setBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            // 分页
            pageChange(val){
                this.getListData(val)
            },
            dragchange(val){
                this.tableTitleData = val;
            },
            handleSet() {
                this.specialObject = {
                    arrears: '',
                    mobile: '',
                    regula: '',
                    broadband: ''
                };
                this.tableItemData.forEach(item => {
                    switch(item.subSpecialType){
                        case '120001':
                            this.specialObject.regula = '1000';
                            break;
                        case '120002':
                            this.specialObject.arrears = '120002';
                            break;
                        case '120003':
                            this.specialObject.arrears = '120003';
                            break;
                        case '120004':
                            this.specialObject.mobile = '1000';
                            break;
                        case '120005':
                            this.specialObject.broadband = '1000';
                            break;
                        case '120006':
                            return
                            break;
                        default:
                            break;
                    }
                })
                this.updateSpecialObject = JSON.parse(JSON.stringify(this.specialObject));
                this.$refs.modalSet.show();
            },

            // 点击日志按钮
            handleBook() {
                this.getSpecialBook();
                this.$refs.modalBook.show();
            },
            // 新增特殊名单
            confirmModal() {
                if(this.updateSpecialObject.arrears != this.specialObject.arrears && this.updateSpecialObject.arrears != ''){
                    let obj = this.tableItemData.find(item => item.subSpecialType == '120002');
                    let obj1 = this.tableItemData.find(item => item.subSpecialType == '120003');
                    if(obj != undefined){
                        this.delSpecial(obj);
                    }else{
                        this.delSpecial(obj1);
                    }
                }
                if(this.updateSpecialObject.regula != this.specialObject.regula && this.updateSpecialObject.regula != ''){
                    let obj = this.tableItemData.find(item => item.subSpecialType == '120001')
                    this.delSpecial(obj);
                }
                if(this.updateSpecialObject.mobile != this.specialObject.mobile && this.updateSpecialObject.mobile != ''){
                    let obj = this.tableItemData.find(item => item.subSpecialType == '120004')
                    this.delSpecial(obj);
                }
                if(this.updateSpecialObject.broadband != this.specialObject.broadband && this.updateSpecialObject.broadband != ''){
                    let obj = this.tableItemData.find(item => item.subSpecialType == '120005')
                    this.delSpecial(obj);
                }
                if(this.updateSpecialObject.arrears != this.specialObject.arrears && this.specialObject.arrears != '' && this.specialObject.arrears != '0'){
                    this.addSpecial(this.specialObject.arrears);
                }
                if(this.updateSpecialObject.mobile != this.specialObject.mobile && this.specialObject.mobile != '' && this.specialObject.mobile == '1000'){
                    this.addSpecial('120004');
                }
                if(this.updateSpecialObject.regula != this.specialObject.regula && this.specialObject.regula != '' && this.specialObject.regula == '1000'){
                    this.addSpecial('120001');
                }
                if(this.updateSpecialObject.broadband != this.specialObject.broadband && this.specialObject.broadband != '' && this.specialObject.broadband == '1000'){
                    this.addSpecial('120005');
                }
                this.$refs.modalSet.hide();
            },
            addSpecial(num) {
                if(num=='120001'||num=='120002'||num=='120005'){
                    this.specialType = '1200'
                }else{
                    this.specialType = '1100'
                }
                this.$axios.post(this.$api.CustSpecialAdd, {
                    objId: this.componentData.custId,
                    objType: '1100',
                    statusCd: '1000',     // 1000:是，1100：否
                    subSpecialType: num,   // 名单子类型
                    specialType: this.specialType,       // 名单类型
                    createStaff: this.$user.getStaffId(),
                    updateStaff: this.$user.getStaffId(),
                    createChannel: this.$user.getUserOrgs().orgId,
                    effDate: this.$utils.getLocalTime(),
                    operSource: '手工'
                }).then(res => {
                    if (res.data) {
                        this.getListData();
                        this.$refs.modalSet.hide();
                        this.$message.success({"message": "设置成功"})
                    } else {
                        this.$message.error({"message": "设置失败"})
                    }
                    this.specialObject = {
                        arrears: '',
                        mobile: '',
                        regula: '',
                        broadband: ''
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            delSpecial(item) {
                this.$axios.patch(this.$api.CustSpecialDel.format({specialListId:item.specialListId}),{
                    objId: this.componentData.custId,
                    objType: '1100',
                    specialListId: item.specialListId,
                    specialType: item.specialType,      // 名单类型
                    subSpecialType: item.subSpecialType,   // 名单子类型
                    statusCd: '1100',
                    createStaff: this.$user.getStaffId(),
                    updateStaff: this.$user.getStaffId(),
                    effDate: this.$utils.getLocalTime(),
                    operSource: '手工'
                }).then(res => {
                    if (res.data) {
                        this.getListData();
                        this.$refs.modalSet.hide();
                        this.$message.success({"message": "设置成功"})
                    } else {
                        this.$message.error({"message": "请求失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

       
            handleBack() {
                this.$refs.modalSet.hide();
                this.specialObject = {
                    arrears: '',
                    mobile: '',
                    regula: '',
                    broadband: ''
                }
            },
            handleReturn() {
                this.$refs.modalBook.hide();
            },
            // 删除
            labelDelete(item) {
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.deleteData = item;
            },
            tipConfirm() {
                this.$axios.patch(this.$api.CustSpecialDel.format({specialListId:this.deleteData.specialListId}),{
                    objId: this.componentData.custId,
                    objType: '1100',
                    specialListId: this.deleteData.specialListId,
                    specialType: this.deleteData.specialType,      // 名单类型
                    subSpecialType: this.deleteData.subSpecialType,   // 名单子类型
                    statusCd: '1100',
                    createStaff: this.$user.getStaffId(),
                    updateStaff: this.$user.getStaffId(),
                    operSource: '手工'
                }).then(res => {
                    if (res.data) {
                        this.getListData();
                        this.$refs.tip.hide();
                        this.$message.success({"message": "删除成功"})
                    } else {
                        this.$message.error({"message": "请求失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            changeName(val){
                switch(val){
                    case '120001':
                        return '违章黑名单';
                        break;
                    case '120002':
                        return '欠费黑名单';
                        break;
                    case '120003':
                        return '欠费灰名单'
                        break;
                    case '120004':
                        return '移动黑名单';
                        break;
                    case '120005':
                        return '宽带黑名单';
                        break;
                    case '120006':
                        return '宽带灰名单';
                        break;
                    default:
                        break;
                }
            },
            getType(val) {
                switch (val){
                    case '1000':
                        return 'I类客户';
                        break;
                    case '1100':
                        return 'II类客户';
                        break;
                    case '1200':
                        return 'III类客户';
                        break;
                    default:
                        break;
                }
            },
            getStatusCd(val) {
                switch (val){
                    case '1000':
                        return '有效';
                        break;
                    case '1001':
                        return '将生效';
                        break;
                    case '1002':
                        return '待恢复';
                        break;
                    case '1100':
                        return '无效';
                        break;
                    case '1101':
                        return '将失效';
                        break;
                    case '1102':
                        return '待失效';
                        break;
                    case '1200':
                        return '未生效';
                        break;
                    case '1300':
                        return '已归档';
                        break;
                    case '1301':
                        return '待撤消';
                        break;
                    default:
                        break;
                }
            },
            // 列表查询
            getListData (pageIndex = 1) {
                this.$axios.get(this.$api.CustSpecial, {
                    params: {
                        objId: this.componentData.custId,
                        statusCd: '1000',
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    if (res.data) {
                        this.tableItemData = res.data;
                    } else {
                        this.$message.error({"message": "请求失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 日志列表查询
            getSpecialBook (pageIndex = 1) {
                this.$axios.get(this.$api.CustSpecialBook + '/specialHis', {
                    params: {
                        objId: this.componentData.custId,
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.bookItemData = res.data;
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.error({message: "暂无数据"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            changeHeight() {
            },
            changeLow() {
            }
            
        }
    }
</script>
<style scoped lang="scss">
    
    .content{
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

        .btn-add  {
            display: block;
            position: absolute;
            top: 24px;
            right: 60px;
            z-index: 99;
            background-color: #5a8af2;
            width: 70px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            color: #ffffff;
            cursor: pointer;
            text-align: center;

            &:hover {
                background-color: #4e80ec;
            }

            i {
                color: #ffffff;
                font-size: 13px;
            }
        }
        .btn-mod {
            display: block;
            position: absolute;
            top: 24px;
            right: 0;
            z-index: 99;
            padding: 3px 0 0 18px;
            background-color: #5a8af2;
            width: 50px;
            height: 24px;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
            color: #ffffff;
            cursor: pointer;


            &:hover {
                background-color: #4e80ec;
            }

            i {
                color: #ffffff;
                font-size: 13px;
            }
        }
        .main{
            border-top: 1px solid $mainColor;
            .tag-box{
                display: inline-block;
                padding: 10px;
                margin: 10px;
                border: solid 1px #d5e8f9;
                background-color: #eff7fd;
                color: $mainColor;

                i{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    cursor: pointer;
                    margin-left: 10px;
                    background: url("./images/bqsc.png") no-repeat;
                    background-size: cover;
                }
            }
        }
        .empty-style {
            width: 1460px;
        }

        .credit-content {
            padding: 30px 50px;

            .select-free {
                width: 180px;
            }

            .btn-modify {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                border: 1px solid transparent;
                border-radius: 4px;
                background: $mainColor;
                color: #fff;
                cursor: pointer;
                font-size: 12px;
                &:hover {
                    opacity: .8;
                }
            }

            .remark {
                resize: none;
            }
        }
        .overflow-style {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>