<!--地址信息-->
<template>
    <div class="expand-warp">
        <div class="app__title-1">
            <span class="app__title-name">地址信息</span>
        </div>
        <span class="btn-add" @click="handleAdd" v-if="userRightBtnControl.addBtn">
            <i class="iconfont icontianjia"></i>
        </span>
        <div class="btn-content">
            <ConditionSearch :data="conditionSearchData" @search="handleSearch"></ConditionSearch>
        </div>
        <Scroll class="app__table mgtop10" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title">
            <DragGroup class="m-title app__table-thead" :titleList="tableTitleData">
                <DragItem :span="item.span" 
                    :value="item"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span>{{item.name}}</span>
                </DragItem>
                <Col :span="4">
                    <span>操作</span>
                </Col>
            </DragGroup>
            <Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
                <Col :span="item.span"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span>
                        {{table[item.param]}}
                    </span>
                </Col>
                <Col :span="4">
                    <span class="review" @click="handleDelete(table)" v-if="userRightBtnControl.deleteBtn">删除</span>
                </Col>    
            </Row>
            <div v-if="!tableItemData.length" class="app__data-none">
                <span>当前暂无数据 请添加</span>
            </div>
        </Scroll>

        <!-- 地址选择S -->
        <Dialog ref="modalType" :dialogTitle="addressDialogTitle" :dialogSize="addressDialogSize" :initBtn="true">
            <Scroll :isShowRight="true">
            <div class="modal-content">
                <Row>
                    <Col :span="8">
                        <div class="searchBox">
                            <Select :data="addressData" dataLabelStr="addrFull" dataValueStr="addrId" :isMore="true" :isNullSel="false" v-model="addressObj" :saveObject="true" :placeholder="placeholder" :isSearch="true" @load="getSelAddress" :lazyTime="600"></Select>
                            <p v-show="showAddBtn" @click="setAddress">找不到地址，我要创建</p>
                        </div>
                    </Col>
                    <Col :span="3">
                        <Input v-model.trim="addressDetail.building"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="buildingData" v-model="addressDetail.buildingName"  :isNullSel='false'></Select>
                    </Col>
                    <Col :span="3">
                        <Input v-model.trim="addressDetail.floor"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="floorData" v-model="addressDetail.floorName" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="3">
                        <Input v-model.trim="addressDetail.room"></Input>
                    </Col>
                    <Col :span="2">
                        <span class="room">室</span>
                    </Col>
                </Row>
            </div>
            </Scroll>
            <div slot="btnBox">
                <span class="save" @click="btnSave">保存</span>
                <span class="back" @click="btnClose">返回</span>
            </div>
        </Dialog>
        <!-- 地址选择E -->
        <!-- 地址新增S -->
        <Dialog ref="modalTypeAdd" :dialogTitle="addressDialogTitle" :dialogSize="addressDialogSize" :initBtn="true">
            <Scroll :isShowRight="true">
            <div class="modal-content">
                <Row>
                    <Col :span="2">
                        <Select :data="provinceData" v-model.trim="province" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="3">
                        <div class="searchBox">
                            <Input v-model.trim="setObj.road" :isSearch="true"></Input>
                        </div>
                    </Col>
                    <Col :span="2">
                        <Input v-model.trim="setObj.lane"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="laneData" v-model="setObj.laneName" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="2">
                        <Input v-model.trim="setObj.sublang"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="sublangData" v-model="setObj.sublangName" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="2">
                        <Input v-model.trim="setObj.building"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="buildingData" v-model="setObj.buildingName" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="2">
                        <Input v-model.trim="setObj.floor"></Input>
                    </Col>
                    <Col :span="2">
                        <Select :data="floorData" v-model="setObj.floorName" :isNullSel='false'></Select>
                    </Col>
                    <Col :span="2">
                        <Input v-model.trim="setObj.room"></Input>
                    </Col>
                    <Col :span="1">
                        <span class="room">室</span>
                    </Col>
                </Row>
            </div>
            </Scroll>
            <div slot="btnBox">
                <span class="save" @click="btnAdd">保存</span>
                <span class="back" @click="btnBack">返回</span>
            </div>
        </Dialog>
        <!-- 地址新增E -->

        <!-- 删除弹窗S -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
        <!-- 删除弹窗E -->
    </div>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    data () {
        return {
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            tableTitleData: [
                {
                    name: '地址全称',
                    param: 'addressFull',
                    span: 10
                },{
                    name: '综资地址Id',
                    param: 'addressId',
                    span: 10
                }
            ],
            custId: '',
            placeholder: "请输入",
            tableItemData: [],
            contactOperateData: {},
            addressDialogTitle: '添加地址',
            showAddBtn: false,
            addressDialogSize: {
                max: 1000
            },
            province: '上海市',
            addressData: [],
            provinceData: [
                {
                    label: '上海市',
                    value: '上海市'
                },
                {
                    label: '其他',
                    value: '其他'
                },
            ],
            buildingData: [
                {
                    label: '号楼',
                    value: '号楼' 
                },{
                    label: '幢',
                    value: '幢' 
                },{
                    label: '栋',
                    value: '栋' 
                },{
                    label: '座',
                    value: '座' 
                },{
                    label: '楼',
                    value: '楼' 
                },{
                    label: '号库',
                    value: '号库' 
                },{
                    label: '单体',
                    value: '单体' 
                },{
                    label: '单元',
                    value: '单元' 
                },{
                    label: '峰',
                    value: '峰' 
                },{
                    label: '阁',
                    value: '阁' 
                },{
                    label: '库',
                    value: '库' 
                },{
                    label: '管',
                    value: '管' 
                },{
                    label: '片',
                    value: '片' 
                }
            ],
            floorData: [
                {
                    label: '层',
                    value: '层' 
                },{
                    label: '层半',
                    value: '层半' 
                }
            ],
            laneData: [
                {
                    label: '临号',
                    value: '临号' 
                },{
                    label: '弄',
                    value: '弄' 
                },{
                    label: '号',
                    value: '号' 
                },
            ],
            sublangData: [
                {
                    label: '支弄',
                    value: '支弄' 
                },{
                    label: '区',
                    value: '区' 
                },{
                    label: '块',
                    value: '块' 
                },{
                    label: '街',
                    value: '街' 
                },{
                    label: '道',
                    value: '道' 
                },{
                    label: '路',
                    value: '路' 
                }
            ],
            addressObj: {},
            addressZongzi: {},
            setObj: {
                road: '',
                lane: '',    //临号
                sublang: '',   //支弄
                building: '',  //楼号
                floor: '',    //层
                laneName: '临号',   
                sublangName: '支弄',
                buildingName: '号楼',
                floorName: '层',
                room: '',   //室
            },
            addressDetail: {
                building: '',
                floor: '',
                room: '',
                buildingName: '号楼',
                floorName: '层'
            },
            deleteData: {},                 // 存储删除的数据
            userRightBtnControl: {          // 权限按钮控制
                addBtn: false,
                deleteBtn: false
            },
            conditionSearchData:[
            {
                iconfont: 'iconkhbs',
                placeholder:'地址全称搜索',
                param: 'addName'
            }],
        }
    },
    mounted () {
        this.getAddressInfoList()
        // 循环权限数据
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-100616':
                    this.userRightBtnControl.addBtn = true;
                    break;
                default:
                    break;
            }
        })
    },
    methods: {
        // 搜索
        handleSearch (data) {
            this.getAddressInfoList(data.addName)
        },

        // 地址信息列表
        getAddressInfoList (data) {
            this.$axios.get(this.$api.CustAddress, {
                params: {
                    addName: data ? data : '',
                    custId: this.componentData.custId,
                    staffId: this.$user.getStaffId(),
                    sysRoleIds: this.$user.getSysRoleId(),
                    sysUserId: this.$user.getSysUserId(),
                    orgId: this.$user.getOrgId(),
                    xSubChannel: this.$user.getXSubChannel()
                }
            }).then(res => {
                if (res.data) {
                    if(res.data.address != null){
                        this.tableItemData = res.data.address
                    }else{
                        this.tableItemData = []
                    }
                } else {
                    this.$message.error({"message": "查询失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },

        // 添加按钮
        handleAdd () {
            this.addressDetail = {
                building: '',
                floor: '',
                room: '',
                buildingName: '号楼',
                floorName: '层'
            }
            this.addressObj = {}
            this.$refs.modalType.show()
        },

        // 删除按钮
        handleDelete (data) {
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = `确认要删除吗？`;
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
            this.deleteData = data;
        },

        // 删除
        tipConfirm() {
            this.$axios.patch(this.$api.CusAddress + `/${this.deleteData.addressId}`, {
                    addrId: this.deleteData.addressId,
                    addrName: this.deleteData.addressFull,
                    createStaff: 1,
                    custId: this.componentData.custId,
                    primaryFlag: 1,
                    remark: '',
                    statusCd: '1100'
            }).then(res => {
                if (res.data) {
                    this.$message.success({"message": "删除成功"})
                    this.$refs.tip.hide();
                    this.getAddressInfoList()
                } else {
                    this.$message.error({"message": "删除失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 综资地址下拉信息查询
        getSelAddress (addressName){
            if(addressName == '') return
            this.$axios.get(this.$api.SelectAddress + addressName).then((res) => {
                if(res.data && res.data.length){
                    this.addressData = res.data;
                    this.showAddBtn = false;
                }else{
                    this.addressData = [];
                    if(addressName != ''){
                        this.showAddBtn = true;
                    }else{
                        this.showAddBtn = false;
                    }
                }
                
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 综资地址信息查询
        getAddress (){
            if(this.addressObj.addrFull == undefined){
                this.$message.warning({"message": '请选择地址'})
                return
            }
            this.$axios.post(this.$api.GetAddress, {
              "address_full": this.addressObj.addrFull,
              "contact_id": this.$utils.getFullTime(),
              "employee_id": '0-1',
              "address_id": ""
            }).then((res) => {
                if(res.data.errorCode == '0'){
                    this.addressZongzi = res.data.result;
                    this.saveAddress('0');
                }else{
                   this.addressZongzi = this.addressObj
                   this.saveAddress('1');
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        
        // 新建综资地址
        setAddress() {
            this.$refs.modalTypeAdd.show();
        },
        //新建综资地址保存
        btnAdd() {
            this.$axios.post(this.$api.NewAddress, {
                "address_province": this.province,
                "address_road_code": this.setObj.road,
                "address_lane": this.setObj.lane,
                "address_sub_lane": this.setObj.sublang,
                "address_house_no": '',
                "address_building": this.setObj.building,
                "address_floor": this.setObj.floor,
                "address_room_no": this.setObj.room,
                "address_add": ""
            }).then((res) => {
                if(res.data){
                    this.addressZongzi = res.data;
                    this.saveAddress('0');
                    this.$refs.modalTypeAdd.hide();
                    this.$refs.modalType.hide();
                    this.$message.success({"message": "地址新建成功"})
                }else{
                    this.$message.error({"message": "地址新建失败"})
                }
                
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 关闭综资地址新增窗口
        btnBack() {
            this.$refs.modalTypeAdd.hide();
        },
        // 添加客户列表地址
        btnSave() {
            this.getAddress();
        },
        // 添加客户地址接口
        saveAddress(num = "0") {
            let obj = {},addurl = '';                
            if(num == "0"){  // 综资查询有数据，用综资地址信息
                obj = {
                    addrId: this.addressZongzi.address_id,
                    addrName: this.addressZongzi.address_full,
                    createStaff: this.$user.getStaffId(),
                    custId: this.componentData.custId,
                    primaryFlag: 1,
                    remark: '',
                    statusCd: '',
                    subBureauCode: this.addressZongzi.sub_bureau_code,
                    bureauCode: this.addressZongzi.bureau_code,
                    bureauName: this.addressZongzi.bureau_name,
                    subBureauName: this.addressZongzi.sub_bureau_name,
                    subBureauId: this.addressZongzi.subBureauid,
                    bureauId: this.addressZongzi.bureauid,
                    addrPostcode: ''
                }
            }else{    // 综资查询没有数据，用索引地址信息
                if(this.addressDetail.building != ''){
                    addurl = addurl + this.addressDetail.building+this.addressDetail.buildingName;
                }
                if(this.addressDetail.floor != ''){
                    addurl = addurl + this.addressDetail.floor+this.addressDetail.floorName;
                }
                if(this.addressDetail.room != ''){
                    addurl = addurl + this.addressDetail.room+'室';
                }
                obj = {
                    addrId: this.addressZongzi.addrId,
                    addrName: this.addressZongzi.addrFull + addurl,
                    createStaff: this.$user.getStaffId(),
                    custId: this.componentData.custId,
                    primaryFlag: 1,
                    remark: '',
                    statusCd: '',
                    subBureauCode: '',
                    bureauCode: '',
                    bureauName: this.addressZongzi.qj,
                    subBureauName: this.addressZongzi.jf,
                    subBureauId: this.addressZongzi.fj_crmid,
                    bureauId: this.addressZongzi.qj_crmid,
                    addrPostcode: ''
                }
            }

            this.$axios.post(this.$api.CusAddress, obj).then(res => {
                if (res.data) {
                    this.$message.success({"message": "添加成功"})
                    this.$refs.modalType.hide();
                    this.getAddressInfoList()
                } else {
                    this.$message.error({"message": "添加失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 关闭客户列表新增窗口
        btnClose() {
            this.$refs.modalType.hide()
        },
        changeHeight() {
        },
        changeLow() {
        }
    }
}
</script>

<style lang="scss" scoped>
    .expand-warp {
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);
        .btn-add  {
            display: block;
            position: absolute;
            top: 24px;
            right: 0;
            z-index: 99;
            padding: 3px 0 0 22px;
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
        .btn-content {
            width: 380px;
            position: absolute;
            top: 22px;
            right: 100px;
            z-index: 99;
        }

        .expand-content {
            width: 100%;
            margin-top: 20px;
            font-size: 14px;
        }

        // 拓展信息
        .modal-content {
            padding: 20px 20px 220px 30px;

            .col {
                padding-left: 4px;

                .room {
                    line-height: 30px;
                }
            }
            .searchBox {
                position: relative;

                p{
                    position: absolute;
                    top: 35px;
                    left: 0;
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                    background-color: #5a8af2;
                    color: #ffffff;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }

        .review {
            color: $mainColor;
            cursor: pointer;
        }
    }
</style>
