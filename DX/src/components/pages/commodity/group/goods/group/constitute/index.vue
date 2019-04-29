<template>
    <div class="constitute">
        <!--构称成员信息列表-->
        <div class="app__top">
            <span class="app__top-left">构成成员信息</span>
        </div>
        <div class="info-list member">
            <!--头部-->
            <div class="app__title ">
                <i class="iconfont icon-jibenxinxi"></i>
                <span>构成成员列表</span>
            </div>
            <div class="h-a-add">
                <div class="app__btn app__btn-add" @click.stop="showLeft('1000')">根产品</div>
                <div class="app__btn app__btn-add" @click="configProGrp()">配置虚拟产品组</div>
                <div class="app__btn app__btn-pull" @click="delConfigProGrp()">删除虚拟产品组</div>
            </div>

            <Scroll class="app__table__inner" :isShowBottom="true" ref="listScroll">
                <Row class="app__table-thead" inline>
                    <Col :width="80"></Col>
                    <Col :width="120">产品名称</Col>
                    <Col :width="120">CRM编码</Col>
                    <Col :width="120">产品编码</Col>
                    <Col :width="120">虚拟产品组编码</Col>
                    <Col :width="120">成员角色</Col>
                    <Col :width="120">最小数量</Col>
                    <Col :width="120">最大数量</Col>
                    <Col :width="120">构成类型</Col>
                    <Col :width="120">约束类型</Col>
                    <Col :width="120">更多信息</Col>
                    <Col :width="120">操作</Col>
                </Row>

                <Row class="tab-tbody" :class="['app__table-item']" v-for="(item,index) in offeProdRelArr" :key="index" inline>
                    <Col :width="80">
					    <Checkbox name="Checkbox" v-model="checkArr" :label="item"></Checkbox>
				    </Col>
                    <Col :width="120" class="col-show">
                    <i :class="{show2:goodsId===index}" @click="showChildClick(index)" v-show="item.children.length>0"></i> {{item.prodName}}
                    </Col>
                    <Col :width="120" class="no-wrap">{{item.crmProdNbr}}</Col>
                    <Col :width="120">{{item.prodNbr}}</Col>
                    <Col :width="120">{{item.virtualProdGrpNbr}}</Col>
                    <!-- <Col :width="2">{{item.roleId == "10000000"?"基础":item.roleId == "20000000"?"加装":item.roleId == "40000000"?"本方":item.roleId == "50000000"?"对方":item.roleId == "60000000"?"基础加装共享":item.roleId == "60000001"?"仅基础共享":item.roleId == "60000002"?"仅加装独享":item.roleId == "60000003"?"基础或加装独享":""}}</Col> -->
                    <Col :width="120" class="no-wrap">{{item.roleName}}</Col>
                    <Col :width="120">{{item.minNum}}</Col>
                    <Col :width="120">{{item.maxNum}}</Col>
                    <Col :width="120">{{item.relType=="1001"?"构成（同拆）": item.relType == "1000" ?"构成（不同拆)" : item.relType == "1002" ? "关联包(同拆)" : item.relType == "1003" ?"关联包(不同拆)" : ""}}</Col>
                    <Col :width="120">{{item.rstrType=="1200"?"必选":item.rstrType=="1300"?"默选":"禁止选"}}</Col>
                    <Col :width="120">
                    <span class="span" @click.stop="more(item)">更多</span>
                    </Col>
                    <Col :width="120">
                    <span class="span iconfont icon-jiahao" @click.stop="showLeaf(item)"></span>
                    <span class="span iconfont icon-xiugai" title="修改" @click.stop="mod(item)"></span>
                    <span class="span iconfont icon-shanchu" title="删除" @click.stop="del(item)"></span>
                    </Col>

                    <!--子表格-->
                    <Col  class="child-list" v-show="goodsId===index">
                    <Row v-if="item.children.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(val,index) in item.children" :key="index">
                        <Col :width="73"></Col>
                        <Col :width="120" class="col-show">
                        <div class="borderline"></div>{{val.prodName}}</Col>
                        <Col :width="115" class="no-wrap">{{val.crmProdNbr}}</Col>
                        <Col :width="120">{{val.prodNbr}}</Col>
                        <Col :width="113">{{val.virtualProdGrpNbr}}</Col>
                        <!-- <Col :span="2">{{val.roleId == "10000000"?"基础":val.roleId == "20000000"?"加装":val.roleId == "40000000"?"本方":val.roleId == "50000000"?"对方":val.roleId == "60000000"?"基础加装共享":val.roleId == "60000001"?"仅基础共享":val.roleId == "60000002"?"仅加装独享":val.roleId == "60000003"?"基础或加装独享":""}}</Col> -->
                        <Col :width="117" class="no-wrap">{{val.roleName}}</Col>
                        <Col :width="117">{{val.minNum}}</Col>
                        <Col :width="116">{{val.maxNum}}</Col>
                        <Col :width="116">{{val.relType=="1001"?"构成（同拆）": val.relType == "1000" ?"构成（不同拆)" : val.relType == "1002" ? "关联包(同拆)" : val.relType == "1003" ?"关联包(不同拆)" : ""}}</Col>
                        <Col :width="117">{{val.rstrType=="1200"?"必选":val.rstrType=="1300"?"默选":val.rstrType=="1400"?"禁止选":val.rstrType=="1500"?"可选":"无"}}</Col>
                        <Col :width="116">
                        <span class="span" @click.stop="moreChild(val)">更多</span>
                        </Col>
                        <Col :width="120">
                        <span class="span iconfont icon-xiugai" title="修改" @click.stop="modChild(val)"></span>
                        <span class="span iconfont icon-shanchu" title="删除" @click.stop="delChild(val)"></span>
                        </Col>
                    </Row>
                    </Col>

                </Row>
                <Row v-if="!offeProdRelArr.length" class="app__data-none"> 
                    <Col :span="24"><span>当前无数据!</span></Col>
                </Row>

            </Scroll>
        </div>
        <!--限制构称信息列表-->
        <div class="info-list limit">
            <!--头部-->
            <div class="app__title ">
                <i class="iconfont icon-jibenxinxi"></i>
                <span>限制构成</span>
            </div>
            <div class="h-a-add">
                <div class="app__btn app__btn-add" @click="showAddLimit()">添加</div>
            </div>

            <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                <Row class="app__table-thead">
                    <Col :span="14">产品名称</Col>
                    <Col :span="6">客账户限制规则</Col>
                    <Col :span="4">操作</Col>
                </Row>

                <Row v-if="offerRstrList.length>0" :class="['app__table-item']" v-for="(item,index) in offerRstrList" :key="index">
                    <Col :span="14">
                    <Row>
                        <Col :span="18">
                        <Select multiple multipleBlock :isNullSel="false" @change="prodActChange(arguments[0],item)" @multipleClose="prodActDel(arguments[0],item)" dataLabelStr="prodName" dataValueStr="prodId" :data="qryordAttr" v-model="item.offerIdCompRstrCfgs"></Select>
                        </Col>
                        <Col :span="6">
                        <Row>
                            <Col :span="24" class="rstrCol" v-for="(val,ind) in item.offerCompRstrCfgs" :key="ind"> {{val.roleId == "10000000"?"基础":val.roleId == "20000000"?"加装":val.roleId == "40000000"?"本方":val.roleId == "50000000"?"对方":""}}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    </Col>
                    <Col :span="6">
                    <RadioGroup :data="rstrTypeList" :name="'rstrType'+ index " v-model="item.rstrType" @change="rstrTypeChange(arguments[0],item)"></RadioGroup>
                    </Col>
                    <Col :span="4">
                    <span class="span iconfont icon-shanchu" title="删除" @click="showdelLimit(item)"></span>
                    </Col>
                </Row>
                <Row v-if="!offerRstrList.length" class="app__data-none">
                    <Col :span="24"><span>当前无数据!</span></Col>
                </Row>
            </Scroll>
        </div>
        <!--添加根产品-->
        <LeftDialog class="add-parent" ref="leftDialog" @close="leftDialogClose">
            <Scroll :isShowRight="true">
                <!--头部-->
                <div class="l-d-header clearfix">
                    <i></i>
                    <span>{{leftDialogTitle}}</span>
                    <button v-if="prodObj.prodId&&tabDefault=='basic'" @click="sureSubmit()">确定</button>
                </div>

                <Row v-show="!prodObj.prodId">
                    <div class="sel-box">
                        <Search class="offer-sear" placeholder="请输入产品名称" ref="prodSearch" @search="searchprodClick"></Search>
                    </div>

                    <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                        <Row class="app__table-thead">
                            <Col :span="9">产品编码</Col>
                            <Col :span="9">产品名称</Col>
                            <Col :span="6">选择</Col>
                        </Row>

                        <Row :class="['app__table-item']" v-for="(item,index) in qureyProdListArr" :key="index">
                            <Col :span="9">{{item.prodNbr}}</Col>
                            <Col :span="9">{{item.prodName}}</Col>
                            <Col :span="6">
                            <Radio name="prodRadio" v-model="qureyProdCheck" :label="item"></Radio>
                            </Col>
                        </Row>
                        <Row v-if="!qureyProdListArr.length" class="app__data-none">
                            <Col :span="24">
                            <span>当前无数据!</span>
                            </Col>
                        </Row>
                    </Scroll>

                    <Pagination :pageIndex="pageProductObj.pageIndex" :pageSize="pageProductObj.pageSize" :rowCount="pageProductObj.rowCount" :perPages=1 @change="pageChange" :isCenter="true">
                    </Pagination>

                </Row>
                <Row v-show="prodObj.prodId">
                    <!--选择产品-->
                    <Row>
                        <Col :span="24">
                        <FormItem labelText="已选产品：">
                            <span>{{prodObj.prodName}}</span>

                        </FormItem>
                        </Col>
                    </Row>

                    <!--tab导航-->
                    <TabPane :tabs="tabs" :value="tabDefault" @change="tabChange" :isAuto="false">
                        <template slot="basic">
                            <div class="basic-info">
                                <Form data-vv-scope="tabRoot">
                                    <Row class="app__table-thead">
                                        <Col :span="7">
                                        <FormItem labelText="成员角色：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.roleId')">
                                            <!-- <Select v-if="componentData.commodityType == '10' || componentData.commodityType == '30'" name="roleId" v-validate="'required'" data-vv-as="成员角色" :isNullSel="false" :data="roleList" v-model="basicData.roleId"></Select> -->
                                            <!-- <Select v-else name="roleId" v-validate="'required'" data-vv-as="成员角色" :isNullSel="false" :data="roleData" v-model="basicData.roleId"></Select> -->
                                            <Input v-validate="'required'" name="roleId" data-vv-as="成员角色" v-model="basicData.roleName" @click.native="catalogClick()" ref="catalogItemNameRef"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最小数目：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.minNum')">
                                            <Input v-validate="minRoot" name="minNum" data-vv-as="最小数目" v-model="basicData.minNum"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最大数目：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.maxNum')">
                                            <Input v-validate="maxRoot" name="maxNum" data-vv-as="最大数目" v-model="basicData.maxNum"></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="默认数目：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.num')">
                                            <Input v-validate="betweenstrRoot" name="num" data-vv-as="默认数目" v-model="basicData.num"></Input>
                                        </FormItem>
                                        </Col>

                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="约束类型：" :requiredIcon="true">
                                            <Select :isNullSel="false" :data="ysTypeList" v-model="basicData.rstrType"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="产品存在方式：" :requiredIcon="true">
                                            <Select :isNullSel="false" :data="prodExistTypeList" v-model="basicData.prodExistType"></Select>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="优惠值：">
                                            <Select :isNullSel="true" :data="discountValueList" v-model="basicData.discountValue"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="首月优惠值：">
                                            <Select :isNullSel="true" :data="firstMonDiscountValueList" v-model="basicData.firstMonDiscountValue"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1" v-if="componentData.commodityType == '60'">
                                        <FormItem labelText="构成类型：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.relType')">
                                            <Select  v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeRelList" v-model="basicData.relType" data-vv-as="构成类型"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1" v-else>
                                        <FormItem labelText="构成类型：" :requiredIcon="true" :errorMessage="errors.first('tabRoot.relType')">
                                            <Select  v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeList" v-model="basicData.relType" data-vv-as="构成类型"></Select>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </template>
                        <template slot="workflow">
                            <div class="info-list work-flow">
                                <div class="add-box">
                                    <div class="app__btn app__btn-add" @click="showAddFlow()">添加</div>
                                </div>

                                <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                                    <Row class="app__table-thead">
                                        <Col :span="8">业务流程编码</Col>
                                        <Col :span="8">业务流程名称</Col>
                                        <Col :span="8">操作</Col>
                                    </Row>

                                    <Row v-if="offerServiceList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in offerServiceList" :key="index">
                                        <Col :span="8">{{item.standardCd}}</Col>
                                        <Col :span="8">{{item.serviceOfferName}}</Col>
                                        <Col :span="8">
                                        <span class="span iconfont icon-shanchu" title="删除" @click.stop="delAddFlow(item)"></span>
                                        </Col>
                                    </Row>
                                    <Row v-if="!offerServiceList.length" class="app__data-none">
                                        <Col :span="24"><span>当前无数据!</span></Col>
                                    </Row>
                                </Scroll>

                                <!--加载更多-->
                                <!--<div class="add-more" v-if="offerServiceList.length>0">
                                <span>加载更多</span>
                            </div>-->
                            </div>
                        </template>
                        <template slot="attr">
                            <div class="info-list property">
                                <div class="add-box">
                                    <div class="app__btn app__btn-add" @click="showAddAttr1()">添加</div>
                                </div>

                                <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                                    <Row class="app__table-thead">
                                        <Col :span="4">属性编码</Col>
                                        <Col :span="4">属性名称</Col>
                                        <Col :span="3">最大值</Col>
                                        <Col :span="3">最小值</Col>
                                        <Col :span="3">自动触发</Col>
                                        <Col :span="3">属性值</Col>
                                        <Col :span="4">操作</Col>
                                    </Row>

                                    <Row v-if="prodAttrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
                                        <Col :span="4">{{item.attrNbr}}</Col>
                                        <Col :span="4">{{item.attrName}}</Col>
                                        <Col :span="3">{{item.maxValue}}</Col>
                                        <Col :span="3">{{item.minValue}}</Col>
                                        <Col :span="3">{{item.autoTrigger == "1"?"是":"否"}}</Col>
                                        <Col :span="3">
                                        <span class="span" @click="moreProdAttr(item)">更多</span>
                                        </Col>
                                        <Col :span="4">
                                        <!--<span class="span" @click="modAttr()">修改</span>-->
                                        <span class="span iconfont icon-shanchu" title="删除" @click="delprodAttr(item)"></span>
                                        </Col>
                                    </Row>
                                    <Row v-if="!prodAttrList.length" class="app__data-none">
                                        <Col :span="24"><span>当前无数据!</span></Col>
                                    </Row>
                                </Scroll>

                                <!--加载更多-->
                                <!--<div v-if="prodAttrList.length>0" class="add-more">
                                <span>加载更多</span>
                            </div>-->
                            </div>
                        </template>
                    </TabPane>
                </Row>
            </Scroll>
        </LeftDialog>

        <!--添加功能产品-->
        <LeftDialog class="add-parent" ref="leftLeafDialog">
            <Scroll :isShowRight="true">
                <!--头部-->
                <div class="l-d-header clearfix">
                    <i></i>
                    <span>{{leftLeafDialogTitle}}</span>
                    <button v-if="prodObj.prodId&&tableafDefault=='leafbasic'" @click="sureLeafSubmit()">确定</button>
                </div>

                <Row v-show="!prodObj.prodId">
                    <div class="sel-box">
                        <Search class="offer-sear" placeholder="请输入产品名称" ref="gnProdSearch" @search="searchLeafprodClick"></Search>
                    </div>
                    <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                        <Row class="app__table-thead">
                            <Col :span="9">产品编码</Col>
                            <Col :span="9">产品名称</Col>
                            <Col :span="6">选择</Col>
                        </Row>
                        <Row :class="['app__table-item']" v-for="(item,index) in qureyProdListArr" :key="index">
                            <Col :span="9">{{item.prodNbr}}</Col>
                            <Col :span="9">{{item.prodName}}</Col>
                            <Col :span="6">
                            <Radio name="prodRadio" v-model="qureyLeafProdCheck" :label="item"></Radio>
                            </Col>
                        </Row>
                        <Row v-if="!qureyProdListArr.length" class="app__data-none">
                            <Col :span="24">
                            <span>当前无数据!</span>
                            </Col>
                        </Row>
                    </Scroll>

                    <Pagination :pageIndex="pageleafProductObj.pageIndex" :pageSize="pageleafProductObj.pageSize" :rowCount="pageleafProductObj.rowCount" :perPages=1 @change="pageLeafChange" :isCenter="true">
                    </Pagination>

                </Row>
                <Row v-show="prodObj.prodId">
                    <!--选择产品-->
                    <Row>
                        <Col :span="24">
                        <FormItem labelText="已选产品：">
                            <span>{{prodObj.prodName}}</span>
                        </FormItem>
                        </Col>
                    </Row>

                    <!--tab导航-->
                    <TabPane :tabs="leaftabs" :value="tableafDefault" @change="tableafChange" :isAuto="false">
                        <template slot="leafbasic">
                            <div class="basic-info">
                                <Form data-vv-scope="tabLeaf">
                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="成员角色：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.roleId')">
                                            <!-- <Select v-if="componentData.commodityType == '10' || componentData.commodityType == '30'" name="roleId" v-validate="'required'" data-vv-as="成员角色" :isNullSel="false" :data="roleList" v-model="leafData.roleId"></Select>
                                            <Select v-else name="roleId" v-validate="'required'" data-vv-as="成员角色" :isNullSel="false" :data="roleData" v-model="leafData.roleId"></Select> -->
                                          <Input  readonly name="roleName" data-vv-as="成员角色" v-model="leafData.roleName"></Input>
                                          <!-- <Input v-validate="'required'" name="roleName" data-vv-as="成员角色" v-model="leafData.roleName" @click.native="catalogClick()" ref="catalogItemNameRef"></Input> -->
                                        </FormItem>
                                        </Col>

                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最小数目：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.minNum')">
                                            <Input v-validate="minleaf" name="minNum" data-vv-as="最小数目" v-model="leafData.minNum"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最大数目：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.maxNum')">
                                            <Input v-validate="maxleaf" name="maxNum" data-vv-as="最大数目" v-model="leafData.maxNum"></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="默认数目：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.defaultCount')">
                                            <Input v-validate="betweenstrLeaf" name="defaultCount" data-vv-as="默认数目" v-model="leafData.defaultCount"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="产品存在方式：" :requiredIcon="true">
                                            <Select :isNullSel="false" :data="prodExistTypeList" v-model="leafData.prodExistType"></Select>
                                        </FormItem>
                                        </Col>

                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="约束类型：" :requiredIcon="true">
                                            <Select :isNullSel="false" :data="gnYsTypeList" v-model="leafData.rstrType"></Select>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="优惠值：">
                                            <Select :isNullSel="true" :data="discountValueList" v-model="leafData.discountValue"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="首月优惠值：">
                                            <Select :isNullSel="true" :data="firstMonDiscountValueList" v-model="leafData.firstMonDiscountValue"></Select>
                                        </FormItem>
                                        </Col>

                                        <Col :span="7" :offset="1" v-if="this.componentData.commodityType == '60'">
                                        <FormItem labelText="构成类型：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.relType')">
                                            <Select v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeRelList" v-model="leafData.relType" data-vv-as="构成类型"></Select>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1" v-else>
                                        <FormItem labelText="构成类型：" :requiredIcon="true" :errorMessage="errors.first('tabLeaf.relType')">
                                            <Select v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeList" v-model="leafData.relType" data-vv-as="构成类型"></Select>
                                        </FormItem>
                                        </Col>
                                        
                                    </Row>
                                </Form>
                            </div>
                        </template>

                        <template slot="leafattr">
                            <div class="info-list property">
                                <div class="add-box">
                                    <div class="app__btn app__btn-add" @click="showAddAttr1()">添加</div>
                                </div>

                                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                                    <Row class="app__table-thead">
                                        <Col :span="4">属性编码</Col>
                                        <Col :span="4">属性名称</Col>
                                        <Col :span="3">最大值</Col>
                                        <Col :span="3">最小值</Col>
                                        <Col :span="3">自动触发</Col>
                                        <Col :span="3">属性值</Col>
                                        <Col :span="4">操作</Col>
                                    </Row>

                                    <Row v-if="prodAttrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
                                        <Col :span="4">{{item.attrNbr}}</Col>
                                        <Col :span="4">{{item.attrName}}</Col>
                                        <Col :span="3">{{item.maxValue}}</Col>
                                        <Col :span="3">{{item.minValue}}</Col>
                                        <Col :span="3">{{item.autoTrigger == "1"?"是":"否"}}</Col>
                                        <Col :span="3">
                                        <span class="span" @click="moreProdAttr(item)">更多</span>
                                        </Col>
                                        <Col :span="4">
                                        <span class="span iconfont icon-shanchu" title="删除" @click="delprodAttr(item)"></span>
                                        </Col>
                                    </Row>
                                    <Row v-if="!prodAttrList.length" class="app__data-none">
                                        <Col :span="24"><span>当前无数据!</span></Col>
                                    </Row>
                                </Scroll>

                                <!--加载更多-->
                                <!--<div v-if="prodAttrList.length>0" class="add-more">
                                <span>加载更多</span>
                            </div>-->
                            </div>
                        </template>
                    </TabPane>
                </Row>
            </Scroll>
        </LeftDialog>

        <!--更多信息-->
        <LeftDialog class="add-parent" ref="moreDialog">
            <div class="l-d-header clearfix">
                <span>{{moreDialogTitle}}</span>
            </div>
            <Row>
                <Col :span="24" class="tabcol">
                <button :class="['tabbtn',tabIndex=='1'?'active':'']" @click="constituteInfo()">构成成员信息</button>
                <button :class="['tabbtn',tabIndex=='2'?'active':'']" @click="limitconstitute()">限制构成信息</button>
                </Col>
            </Row>
            <Scroll class="moreScroll" :isShowRight="true" v-show="tabIndex == '1'">
                <Row v-for="(item,index) in offeProdRelArr" :key="index">
                    <Col :span="24" class="offCol">
                    <div class="offIndex">{{index + 1}}</div>
                    <div class="offProdname" @click.stop="openNode(item)">{{item.prodName}}</div>
                    <div :class="['offToggle',prodIsOpen(item)?'active':'']"></div>
                    </Col>
                    <Col :span="24" class="offColcontent" v-if="prodIsOpen(item)">
                    <TabPane :tabs="moretabs" :value="item.tabmoreDefault" @change="tabmoreChange(arguments[0],item)" :isAuto="false">
                        <template slot="morebasic">
                            <div class="basic-info">
                                <Row class="app__table-thead">
                                    <Col :span="7">
                                    <FormItem labelText="成员角色：">
                                        <!-- <span>{{relsObj.roleId=="10000000"?"基础":relsObj.roleId=="20000000"?"加装":relsObj.roleId=="40000000"?"本方":relsObj.roleId=="50000000"?"对方":""}}</span> -->
                                        <span>{{relsObj.roleName}}</span>
                                    </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="最小数目：">
                                        <span>{{relsObj.minNum}}</span>
                                    </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="最大数目：">
                                        <span>{{relsObj.maxNum}}</span>
                                    </FormItem>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col :span="7">
                                    <FormItem labelText="默认数目：">
                                        <span>{{relsObj.defaultCount}}</span>
                                    </FormItem>
                                    </Col>

                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="约束类型：">
                                        <span>{{relsObj.rstrType=="1200"?"必选":relsObj.rstrType=="1300"?"默选":"禁止选"}}</span>
                                    </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="产品存在方式：">
                                        <span>{{relsObj.prodExistType=="1000"?"新装":relsObj.prodExistType=="1100"?"在用":"新装&在用"}}</span>
                                    </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col :span="7">
                                    <FormItem labelText="优惠值：">
                                        <span>{{relsObj.discountValue=="10"?"套餐生效期间不收取月租费":relsObj.discountValue=="30"?"免一路70元（按整月减免）":relsObj.discountValue=="40" ? "免一路100元（按整月减免）" : ""}}</span>
                                    </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="首月优惠值：">
                                        <span>{{relsObj.firstMonDiscountValue=="10"?"套餐生效前免月租":relsObj.firstMonDiscountValue=="20"?"套餐生效前租费对折":relsObj.firstMonDiscountValue=="30"?"新装免一路70元（按整月减免）在用":relsObj.firstMonDiscountValue=="40"?"免一路100元（按整月减免）": ""}}</span>
                                    </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                    <FormItem labelText="构成类型：">
                                        <span>{{relsObj.relType=="1001"?"同拆":"不同拆"}}</span>
                                    </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </template>
                        <template slot="moreworkflow">
                            <div class="info-list work-flow">
                                <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                                    <Row class="app__table-thead">
                                        <Col :span="12">业务流程编码</Col>
                                        <Col :span="12">业务流程名称</Col>
                                    </Row>

                                    <Row v-if="offerServiceList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in offerServiceList" :key="index">
                                        <Col :span="12">{{item.standardCd}}</Col>
                                        <Col :span="12">{{item.serviceOfferName}}</Col>
                                    </Row>
                                    <Row v-if="!offerServiceList.length" class="app__data-none">
                                        <Col :span="24"><span>当前无数据!</span></Col>
                                    </Row>
                                </Scroll>

                                <!--加载更多-->
                                <!--<div class="add-more" v-if="offerServiceList.length>0">
                                <span>加载更多</span>
                            </div>-->
                            </div>
                        </template>
                        <template slot="moreattr">
                            <div class="info-list property">
                                <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                                    <Row class="app__table-thead">
                                        <Col :span="4">属性编码</Col>
                                        <Col :span="4">属性名称</Col>
                                        <Col :span="3">最大值</Col>
                                        <Col :span="3">最小值</Col>
                                        <Col :span="4">自动触发</Col>
                                        <Col :span="4">属性值</Col>
                                    </Row>

                                    <Row v-if="prodAttrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
                                        <Col :span="4">{{item.attrNbr}}</Col>
                                        <Col :span="4">{{item.attrName}}</Col>
                                        <Col :span="3">{{item.maxValue}}</Col>
                                        <Col :span="3">{{item.minValue}}</Col>
                                        <Col :span="4">{{item.autoTrigger == "1"?"是":"否"}}</Col>
                                        <Col :span="4">
                                        <span class="span" @click="moreProdAttr(item)">更多</span>
                                        </Col>
                                    </Row>
                                    <Row v-if="!prodAttrList.length" class="app__data-none">
                                        <Col :span="24"><span>当前无数据!</span></Col>
                                    </Row>
                                </Scroll>

                                <!--加载更多-->
                                <!--<div v-if="prodAttrList.length>0" class="add-more">
                                <span>加载更多</span>
                            </div>-->
                            </div>
                        </template>
                    </TabPane>
                    <Row v-if="item.children.length>0">
                        <Col class="moreleafRowcol" :span="24">
                        <Row>
                            <Col :class="['moreleafcol',moreleafIndex == index?'active':'']" :span="3" v-for="(val,index) in item.children" :key="index" :title="val.prodName">
                            <div class="moreleafIndex">{{index + 1}}</div>
                            <div class="moreleafname" @click="moreleafDetail(val,index)">{{val.prodName}}</div>
                            </Col>
                        </Row>
                        </Col>
                        <Col :span="24" class="moreleafcolcon">
                        <TabPane :tabs="moreleaftabs" :value="moreleafDefault" @change="moreleafChange" :isAuto="false">
                            <template slot="moreleafbasic">
                                <div class="basic-info">
                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="成员角色：">
                                            <!-- <span>{{moreleafData.roleId=="10000000"?"基础":moreleafData.roleId=="20000000"?"加装":moreleafData.roleId=="40000000"?"本方":moreleafData.roleId=="50000000"?"对方":""}}</span> -->
                                            <span>{{moreleafData.roleName}}</span>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最小值：">
                                            <span>{{moreleafData.minNum}}</span>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="最大值：">
                                            <span>{{moreleafData.maxNum}}</span>
                                        </FormItem>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="默认数目：">
                                            <span>{{moreleafData.defaultCount}}</span>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="约束类型：">
                                            <span>{{moreleafData.rstrType=="1200"?"必选":moreleafData.rstrType=="1300"?"默选":"禁止选"}}</span>
                                        </FormItem>
                                        </Col>

                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="产品存在方式：">
                                            <span>{{moreleafData.prodExistType=="1000"?"新装":moreleafData.prodExistType=="1100"?"在用":"新装&在用"}}</span>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col :span="7">
                                        <FormItem labelText="优惠值：">
                                            <span>{{moreleafData.discountValue=="10"?"套餐生效期间不收取月租费":moreleafData.discountValue=="30"?"免一路70元（按整月减免）":moreleafData.discountValue=="40"?"免一路100元（按整月减免）":""}}</span>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="首月优惠值：">
                                            <span>{{moreleafData.firstMonDiscountValue=="10"?"套餐生效前免月租":moreleafData.firstMonDiscountValue=="20"?"套餐生效前租费对折":moreleafData.firstMonDiscountValue=="30"?"新装免一路70元（按整月减免）在用":moreleafData.firstMonDiscountValue=="40"?"免一路100元（按整月减免）":""}}</span>
                                        </FormItem>
                                        </Col>
                                        <Col :span="7" :offset="1">
                                        <FormItem labelText="构成类型：">
                                            <span>{{moreleafData.relType=="1001"?"同拆":"不同拆"}}</span>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </template>

                            <template slot="moreleafattr">
                                <div class="info-list property">
                                    <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                                        <Row class="app__table-thead">
                                            <Col :span="4">属性编码</Col>
                                            <Col :span="4">属性名称</Col>
                                            <Col :span="3">最大值</Col>
                                            <Col :span="3">最小值</Col>
                                            <Col :span="3">自动触发</Col>
                                            <Col :span="3">属性值</Col>
                                            <Col :span="4">操作</Col>
                                        </Row>

                                        <Row v-if="prodAttrList.length>0" :class="['app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
                                            <Col :span="4">{{item.attrNbr}}</Col>
                                            <Col :span="4">{{item.attrName}}</Col>
                                            <Col :span="3">{{item.maxValue}}</Col>
                                            <Col :span="3">{{item.minValue}}</Col>
                                            <Col :span="3">{{item.autoTrigger == "1"?"是":"否"}}</Col>
                                            <Col :span="3">
                                            <span class="span" @click="moreProdAttr(item)">更多</span>
                                            </Col>
                                            <Col :span="4">
                                            <span class="span iconfont icon-shanchu" title="删除" @click="delAttr()"></span>
                                            </Col>
                                        </Row>
                                        <Row v-if="!prodAttrList.length" class="app__data-none">
                                            <Col :span="24"><span>当前无数据!</span></Col>
                                        </Row>
                                    </Scroll>

                                    <!--加载更多-->
                                    <!--<div v-if="prodAttrList.length>0" class="add-more">
                                <span>加载更多</span>
                            </div>-->
                                </div>
                            </template>
                        </TabPane>
                        </Col>
                    </Row>

                    </Col>
                </Row>

            </Scroll>
            <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll" v-show="tabIndex == '2'">
                <Row class="app__table-thead">
                    <Col :span="12">产品名称</Col>
                    <Col :span="12">客账户限制规则</Col>
                </Row>

                <Row v-if="offerRstrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in offerRstrList" :key="index">
                    <Col :span="12">{{item.offerRstrGrpName}}</Col>
                    <Col :span="12">{{item.rstrType=='1000'?'同客户':'同账户'}}</Col>
                </Row>
                <Row v-if="!offerRstrList.length" class="app__data-none">
                    <Col :span="24"><span>当前无数据!</span></Col>
                </Row>
            </Scroll>
        </LeftDialog>
        <!--添加业务流程-->
        <Dialog :dialogSize="dialogSize" class="h-dialog add-flow" dialogTitle="添加业务流程" ref="addFlow" @confirm="constraintDialogSubmit" @close="closeconstraint">
            <Scroll class="dialog-box">
                <div class="search-dialog">
                    <Search class="offer-sear" placeholder="请输入产品名称" v-model.trim="serviceOfferName" @search="searchserviceClick"></Search>
                </div>
                <!--待选列表-->
                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <Row class="app__table-thead">
                        <Col :span="8">业务流程编码</Col>
                        <Col :span="8">业务流程名称</Col>
                        <Col :span="8">操作</Col>
                    </Row>
                    <Row v-if="prodServiceOfferRelArr.length>0" :class="['app__table-item']" v-for="(item,index) in prodServiceOfferRelArr" :key="index">
                        <Col :span="8">{{item.serviceOfferNbr}}</Col>
                        <Col :span="8">{{item.serviceOfferName}}</Col>
                        <Col :span="8">
                        <span v-if="!selectMkt(item)" class="span iconfont icon-weixuanzhong-fang" @click='addFlow(item)'></span>
                        <span v-if="selectMkt(item)" class="span iconfont icon-xuanzhong-fang" @click='unselectMkt(item)'></span>
                        </Col>
                    </Row>
                    <Row v-if="!prodServiceOfferRelArr.length" class="app__data-none">
                        <Col :span="24">
                        <span>当前无数据!</span>
                        </Col>
                    </Row>
                </Scroll>

                <Pagination v-if="prodServiceOfferRelArr.length>0" :pageIndex="prodServiceObj.pageIndex" :pageSize="prodServiceObj.pageSize" :rowCount="prodServiceObj.rowCount" :perPages=1 @change="pageServiceChange" :isCenter="true">
                </Pagination>

                <div class="title-select" v-if="offerServiceArr.length>0">已选业务流程</div>

                <!--已选列表-->
                <Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll" v-if="offerServiceArr.length>0">
                    <Row class="app__table-thead">
                        <Col :span="8">业务流程编码</Col>
                        <Col :span="8">业务流程名称</Col>
                        <Col :span="8">操作</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item,index) in offerServiceArr" :key="index">
                        <Col :span="8">{{item.serviceOfferNbr}}</Col>
                        <Col :span="8">{{item.serviceOfferName}}</Col>
                        <Col :span="8">
                        <span class="span iconfont icon-shanchu" title="删除" @click="delflow(item)"></span>
                        </Col>
                    </Row>
                </Scroll>
            </Scroll>
        </Dialog>

        <!--添加一次性费用-->
        <Dialog class="h-dialog add-once-money" dialogTitle="添加一次性费用" ref="addOnceMoney">
            <div class="dialog-box">
                <div class="search-dialog">
                    <Input class="input" :isSearch="true" placeholder="请输入搜索内容"></Input>
                    <span class="s-span"></span>
                </div>

                <!--待选列表-->
                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <Row class="app__table-thead">
                        <Col :span="5">服务提供编码</Col>
                        <Col :span="5">一次性费用名称</Col>
                        <Col :span="5">原始价格</Col>
                        <Col :span="5">调整类型</Col>
                        <Col :span="4">操作</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item,index) in 3" :key="index">
                        <Col :span="5">服务提供编码</Col>
                        <Col :span="5">一次性费用名称</Col>
                        <Col :span="5">原始价格</Col>
                        <Col :span="5">调整类型</Col>
                        <Col :span="4">
                        <i class="add"></i>
                        </Col>
                    </Row>
                </Scroll>

                <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=1 @change="pageChange" :isCenter="true">
                </Pagination>

                <div class="title-select">已选一次性费用</div>

                <!--已选列表-->
                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <Row class="app__table-thead">
                        <Col :span="5">服务提供编码</Col>
                        <Col :span="5">一次性费用名称</Col>
                        <Col :span="5">原始价格</Col>
                        <Col :span="5">调整类型</Col>
                        <Col :span="4">操作</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item,index) in 3" :key="index">
                        <Col :span="5">服务提供编码</Col>
                        <Col :span="5">一次性费用名称</Col>
                        <Col :span="5">原始价格</Col>
                        <Col :span="5">调整类型</Col>
                        <Col :span="4">
                        <i class="del"></i>
                        </Col>
                    </Row>
                </Scroll>
            </div>
        </Dialog>

        <!--查看属性值-->
        <Dialog class="h-dialog" dialogTitle="查看属性值" ref="seeAttr" :showBtn="false">
            <Scroll class="dialog-box attr-value">

                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <Row class="app__table-thead">
                        <Col :span="12">属性值</Col>
                        <Col :span="12">属性值名称</Col>
                    </Row>

                    <Row v-if="qryAttrValueList.length>0" :class="['app__table-item']" v-for="(item,index) in qryAttrValueList" :key="index">
                        <Col :span="12">{{item.attrValue}}</Col>
                        <Col :span="12">{{item.attrValueName}}</Col>
                    </Row>
                    <Row v-if="!qryAttrValueList.length" class="app__data-none">
                        <Col :span="24">
                        <span>当前无数据!</span>
                        </Col>
                    </Row>
                </Scroll>
            </Scroll>
        </Dialog>

        <!--添加属性值(第一步)-->
        <Dialog class="h-dialog add-attr1" :dialogSize="{min:900}" dialogTitle="添加属性" ref="addAttr1" :showBtn="false" :initBtn="true">
            <Scroll class="dialog-box">
                <!--左边列表-->
                <div class="left" style="width: 65%;float: left">
                    <!--<div class="search-dialog">
                        <Input class="input" :isSearch="true" placeholder="请输入搜索内容"></Input>
                        <span class="s-span"></span>
                    </div>-->

                    <!--待选列表-->
                    <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                        <div class="searchAttr">
                            <Search placeholder="请输入属性名称搜索" @search="searchClick"></Search>
                        </div>
                        <Row class="app__table-thead">
                            <Col :span="9">属性编码</Col>
                            <Col :span="9">属性名称</Col>
                            <Col :span="6">选择</Col>
                        </Row>
                        <Row v-if="qryProductAttrList.length>0" :class="['app__table-item']" v-for="(item,index) in qryProductAttrList" :key="index">
                            <Col :span="9">{{item.attrNbr}}</Col>
                            <Col :span="9">{{item.attrName}}</Col>
                            <Col :span="6">
                            <Radio name="attrRadio" v-model="qureyAttrCheck" :label="item"></Radio>
                            </Col>
                        </Row>
                        <Row v-if="!qryProductAttrList.length" class="app__data-none">
                            <Col :span="24">
                            <span>当前无数据!</span>
                            </Col>
                        </Row>
                    </Scroll>

                    <Pagination :pageIndex="ProductAttrDetailPageObj.pageIndex" :pageSize="ProductAttrDetailPageObj.pageSize" :rowCount="ProductAttrDetailPageObj.rowCount" :perPages=1 @change="pageAttrChange" :isCenter="true">
                    </Pagination>
                </div>

                <!--右边表单-->
                <div class="right" style="width: 35%;float: left">
                    <Form class="base-info" labelWidth="100px" labelAlign="left" data-vv-scope="tabAttr">
                        <Row>
                            <Col :span="20">
                            <FormItem labelText="最大值：">
                                <Input name="maxValue" data-vv-as="最大值" v-model="attrvalObj.maxValue"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="20">
                            <FormItem labelText="最小值：">
                                <Input name="minValue" data-vv-as="最小值" v-model="attrvalObj.minValue"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="20">
                            <FormItem labelText="自动触发：">
                                <Select :isNullSel="false" :data="autoTriggerList" v-model="attrvalObj.autoTrigger"></Select>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Scroll>

            <!--自定义按钮-->
            <template slot="btnBox">
                <span class="back" @click.stop="cancelAttr()">取消</span>
                <span v-if="qureyAttrCheck.attrValueType == '2000'" class="save" @click.stop="showAddAttr2()">下一步</span>
                <span v-else class="save" @click="addofferAttr()">确定</span>
            </template>
        </Dialog>

        <!--添加属性值(第二步)-->
        <Dialog class="h-dialog add-attr2" dialogTitle="添加属性值" ref="addAttr2" :showBtn="false" :initBtn="true">
            <Scroll class="dialog-box">
                <!--待选列表-->
                <Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <div class="searchAttr">
                        <Search placeholder="请输入属性值名称搜索" @search="searchValueClick"></Search>
                    </div>
                    <Row class="app__table-thead">
                        <Col :span="8">属性值</Col>
                        <Col :span="8">属性值名称</Col>
                        <Col :span="8">
                            <span v-if="!checkAttrAll" class="span iconfont icon-weixuanzhong-fang" @click="checkAll()"></span>
                            <span v-else class="span iconfont icon-xuanzhong-fang" @click="unCheckAll()"></span>
                        </Col>
                    </Row>

                    <Row v-if="qryProductAttrValueList.length>0" :class="['app__table-item']" v-for="(item,index) in qryProductAttrValueList" :key="index">
                        <Col :span="8">{{item.attrValue}}</Col>
                        <Col :span="8">{{item.attrValueName}}</Col>
                        <Col :span="8">
                        <span v-if="!selectAttr(item)" class="span iconfont icon-weixuanzhong-fang" @click='addAttr(item)'></span>
                        <span v-if="selectAttr(item)" class="span iconfont icon-xuanzhong-fang" @click='unselectAttr(item)'></span>
                        </Col>
                    </Row>
                    <Row v-if="!qryProductAttrValueList.length" class="app__data-none">
                        <Col :span="24">
                        <span>当前无数据!</span>
                        </Col>
                    </Row>
                </Scroll>

                <Pagination v-show="qryProductAttrValueList.length>0" :pageIndex="ProductAttrValueDetailPageObj.pageIndex" :pageSize="ProductAttrValueDetailPageObj.pageSize" :rowCount="ProductAttrValueDetailPageObj.rowCount" :perPages=1 @change="pageAttrValueChange" :isCenter="true">
                </Pagination>

                <div v-if="qryProductAttrCheck.length>0" class="title-select">已选属性</div>

                <!--已选列表-->
                <Scroll v-if="qryProductAttrCheck.length>0" class="app__table__inner" :isShowRight="true" ref="listScroll">
                    <Row class="app__table-thead">
                        <Col :span="8">属性值</Col>
                        <Col :span="8">属性值名称</Col>
                        <Col :span="8">操作</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item,index) in qryProductAttrCheck" :key="index">
                        <Col :span="8">{{item.attrValue}}</Col>
                        <Col :span="8">{{item.attrValueName}}</Col>
                        <Col :span="8">
                        <span class="span iconfont icon-shanchu" title="删除" @click='delAttr(item)'></span>
                        </Col>
                    </Row>
                </Scroll>
            </Scroll>

            <!--自定义按钮-->
            <template slot="btnBox">
                <span class="back" @click="showpreAttr()">上一步</span>
                <span class="save" @click="addofferAttr()">确定</span>
            </template>
        </Dialog>

        <!-- 成员角色目录位置 -->
        <Dialog dialogTitle="成员角色目录位置" ref="catalogItemDialog" @confirm="catalogItemDialogConfirm">
			<Scroll :isShowRight="true" ref="catalogItemTree">
				<Tree :folder="treeItem" :keys="catalogItemTreeKey" v-for="(treeItem,treeIndex) in catalogItemTree" :key="'tree'+treeIndex" v-model="catalogItemTreeModel" @plugClick="catalogItemTreePlugClick()" :selLevel="9999" />
			</Scroll>
		</Dialog>
        <!--删除根节点-->
        <Tip ref="tiproot" :tipObj="tiprootInfo" @confirm="tiprootConfirm()"></Tip>

        <!--删除功能节点-->
        <Tip ref="tipleaf" :tipObj="tipleafInfo" @confirm="tipleafConfirm()"></Tip>
        <!--删除业务流程-->
        <Tip ref="tipflow" :tipObj="tipflowInfo" @confirm="tipflowConfirm()"></Tip>
        <!--删除属性-->
        <Tip ref="tipattr" :tipObj="tipattrInfo" @confirm="tipattrConfirm()"></Tip>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: {
            componentData: {}
        },
        data() {
            return {
                tiprootInfo: {
                    iconType: 3,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    },
                    item: ""
                },
                tipleafInfo: {
                    iconType: 3,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    },
                    item: ""
                },
                tipflowInfo: {
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    },
                    item: ""
                },
                tipattrInfo: {
                    iconType: 3,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    },
                    item: ""
                },
                offerProdRelId: "", //根产品的标识
                offerleafProdRelId: "", //功能产品的标识
                prodType: "root",
                serviceOfferName: "",
                moreleafIndex: "0",
                offFlag: false,
                addrootFlag: false,
                dialogSize: {
                    size: 80,
                    min: 600,
                    max: 800
                },
                attrActype: "add",
                staff: "",
                createStaff: "222",
                updateStaff: "222",
                leftDialogTitle: '添加根产品',
                leftLeafDialogTitle: '添加功能产品',
                moreDialogTitle: "更多信息",
                tabIndex: "1",
                goodsId: '',
                tabType: '1000',
                basicData: {
                    name: '',
                    num: '1',
                    maxNum: '1',
                    minNum: '1',
                    prodId: '',
                    prodList: [],
                    roleId: "",
                    roleName: "",
                    rstrType: "1200",
                    relType: "1000",
                    prodExistType: "1200",
                    ifMarketingBinding: "1",
                    discountValue: "10",
                    firstMonDiscountValue: "10",
                    offerProdRelId: "",
                    parOfferProdRelId: 0,
                    effDate: "",
                    expDate: "",
                    offerProdRelCfgId: "",
                    firstMonDiscountValue: "10"
                },
                leafData: {
                    parOfferProdRelId: "",
                    roleId: "",
                    roleName: "",
                    minNum: '1',
                    maxNum: '1',
                    defaultCount: '1',
                    prodExistType: "1200",
                    ifMarketingBinding: "1",
                    ifAttrConstraint: "1",
                    discountValue: "10",
                    firstMonDiscountValue: "10",
                    relType: "1000",
                    rstrType: "1300",
                },
                relTypeList: [{
                    label: "构成（同拆）",
                    value: "1001"
                }, {
                    label: "构成（不同拆）",
                    value: "1000"
                }],
                relTypeRelList: [{
                    label: "构成（不同拆）",
                    value: "1000"
                },{
                    label: "构成（同拆）",
                    value: "1001"
                },{
                    label: "关联包（同拆）",
                    value: "1002"
                }, {
                     label: "关联包（不同拆）",
                    value: "1003"
                }],
                moreleafData: {
                    prodExistType: "1200",
                    ifMarketingBinding: "1",
                    ifAttrConstraint: "1",
                    discountValue: "10",
                    firstMonDiscountValue: "10",
                    roleName: "",
                    roleId: "10000000",
                    maxNum: '',
                    minNum: '',
                    defaultCount: '',
                    rstrType: "1300",
                    parOfferProdRelId: 0,
                    relType: "1000"
                },
                qureyLeafProdCheck: "",
                ifAttrConstraintList: [{
                    value: "1",
                    label: "是"
                }, {
                    value: "0",
                    label: "否"
                }],
                ifMarketingBindingList: [{
                    value: "1",
                    label: "是"
                }, {
                    value: "0",
                    label: "否"
                }],
                pageInfo: {
                    pageIndex: 1, // 当前页
                    pageSize: 20, // 每页条数
                    pageCount: 0, // 总页数
                    rowCount: 0 // 总条数
                },
                offeProdRelArr: [],
                prodOpenArray: [],
                statusCd: 1000,
                tabDefault: 'basic',
                tableafDefault: 'laefbasic',
                tabmoreDefault: 'morebasic',
                moreleafDefault: 'moreleafbasic',
                tabs: [{
                    label: "基本信息",
                    value: "basic"
                }, {
                    label: "排除的业务流程",
                    value: "workflow"
                }, {
                    label: "属性",
                    value: "attr"
                }],
                leaftabs: [{
                    label: "基本信息",
                    value: "leafbasic"
                }, {
                    label: "属性",
                    value: "leafattr"
                }],
                moretabs: [{
                    label: "基本信息",
                    value: "morebasic"
                }, {
                    label: "排除的业务流程",
                    value: "moreworkflow"
                }, {
                    label: "属性",
                    value: "moreattr"
                }],
                moreleaftabs: [{
                    label: "基本信息",
                    value: "moreleafbasic"
                }, {
                    label: "属性",
                    value: "moreleafattr"
                }],
                prodObj: {},
                //成员角色列表 
                offerObjRelRoleList: [],
                roleList: [{
                    label: "基础",
                    value: "10000000"
                }, {
                    label: "加装",
                    value: "20000000"
                }, {
                    label: "本方",
                    value: "40000000"
                }, {
                    label: "对方",
                    value: "50000000"
                }],
                roleData: [{
                    label: "基础加装共享",
                    value: "60000000"
                }, {
                    label: "仅基础共享",
                    value: "60000001"
                }, {
                    label: "仅加装独享",
                    value: "60000002"
                }, {
                    label: "基础或加装独享",
                    value: "60000003"
                }],
                //产品全视图页码
                pageProductObj: {
                    pageIndex: 1, // 当前页
                    pageSize: 5, // 每页条数
                    pageCount: 1, // 总页数
                    rowCount: 0 // 总条数
                },
                pageleafProductObj: {
                    pageIndex: 1, // 当前页
                    pageSize: 5, // 每页条数
                    pageCount: 1, // 总页数
                    rowCount: 0 // 总条数
                },
                pageAttrValueInfo: {
                    pageIndex: 1, // 当前页
                    pageSize: 5, // 每页条数
                    pageCount: 1, // 总页数
                    rowCount: 0 // 总条数
                },
                //业务流程页码
                prodServiceObj: {
                    pageIndex: 1, // 当前页
                    pageSize: 5, // 每页条数
                    pageCount: 1, // 总页数
                    rowCount: 0 // 总条数
                },
                //销售品构成列表页码
                offerProdRelPageObj: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0,
                    pageCount: 0
                },

                prodUseType: "1000",
                prodNbr: "",
                prodName: "",
                qureyProdListArr: [],
                prodServiceOfferRelArr: [],
                qureyProdCheck: "",
                catalogItemTreeModel: '',
                catalogItemTreeKey: [{
                    key: 'roleName',
                    span: 24
                }],
                ysTypeList: [{
                    value: "1200",
                    label: "必选"
                }, {
                    value: "1300",
                    label: "默选"
                }, {
                    value: "1400",
                    label: "禁止选"
                }],
                gnYsTypeList: [{
                    value: "1200",
                    label: "必选"
                }, {
                    value: "1300",
                    label: "默选"
                }, {
                    value: "1400",
                    label: "禁止选"
                }, {
                    value: "1500",
                    label: "可选"
                }],
                prodExistTypeList: [{
                    value: "1000",
                    label: "新装"
                }, {
                    value: "1100",
                    label: "在用"
                }, {
                    value: "1200",
                    label: "新装&在用"
                }],
                discountValueList: [{
                    value: "10",
                    label: "套餐生效期间不收取月租费"
                }, {
                    value: "30",
                    label: "免一路70元（按整月减免）"
                }, {
                    value: "40",
                    label: "免一路100元（按整月减免）"
                }],
                firstMonDiscountValueList: [{
                    value: "10",
                    label: "套餐生效前免月租"
                }, {
                    value: "20",
                    label: "套餐生效前租费对折"
                }, {
                    value: "30",
                    label: "新装免一路70元（按整月减免）在用"
                }, {
                    value: "40",
                    label: "免一路100元（按整月减免）"
                }],
                offerServiceList: [],
                offerServiceArr: [],
                ProdDisposableFeeList: [],
                //限制构成信息列表
                offerRstrList: [],
                offerRstrSelectList: [],
                qryordAttr: [],
                qryConstituteList: [],
                qryAttrPageObj: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0,
                    pageCount: 1
                },
                qryConstitutePageObj: {
                    pageIndex: 1,
                    pageSize: 20,
                    rowCount: 0,
                    pageCount: 1
                },
                rstrTypeList: [{
                    value: "1000",
                    label: "同客户关系"
                }, {
                    value: "1100",
                    label: "同账户关系"
                }, {
                    value: "1200",
                    label: "同地址关系"
                }, {
                    value: "1001",
                    label: "不同客户关系"
                }, {
                    value: "1101",
                    label: "不同账户关系"
                }, {
                    value: "1201",
                    label: "不同地址关系"
                }],
                qryConstituteSelect: "1000",
                prodAttrList: [],
                qryProductAttrList: [],
                qryProductAttrValueList: [],
                ProductAttrDetailPageObj: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0,
                    pageCount: 1
                },
                ProductAttrValueDetailPageObj: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0,
                    pageCount: 1
                },
                offerAttrPageObj: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0,
                    pageCount: 1
                },
                qureyAttrCheck: "",
                attrvalObj: {
                    minValue: "",
                    maxValue: '',
                    autoTrigger: "1"
                },
                autoTriggerList: [{
                    value: "1",
                    label: "是"
                }, {
                    value: "0",
                    label: "否"
                }],
                qryProductAttrCheck: [],
                //更多信息
                relsObj: {
                    minNum: "",
                    maxNum: "",
                    discountValue: "",
                    firstMonDiscountValue: "",
                    roleName: "",
                    prodExistType: "",
                    defaultCount: ""
                },
                updateProdObj: {
                    parOfferProdRelId: 0,
                    offerId: "",
                    prodId: "",
                    effDate: "",
                    expDate: "",
                    prodExistType: "1000",
                    roleId: "10000000",
                    roleName: "",
                    offerProdRelCfgId: "",
                    defaultCount: "",
                    rstrType: "1200",
                    minNum: "",
                    maxNum: "",
                    ifMarketingBinding: "1",
                    discountValue: "10",
                    firstMonDiscountValue: "10",
                    createStaff: "",
                    updateStaff: "",
                    createDate: "",
                    updateDate: "",
                    offerObjRelRoleArr: []
                },
                // writeAttrValue:'',//输入型值
                parProdId: "",
                qryAttrValueList: [],
                // 成员角色树
                catalogItemTree: [],
                editProRel: {
                    roleId: "",
                    roleName: ""
                },
                attrValSearchObj:{
                    attrName:'',
                    attrValueName:'',
                },
                checkArr:[],
            }
        },
        computed: {
            betweenstrRoot() {
                return `required`;
            },
            betweenstrLeaf() {
                return `required|numeric`;
            },
            maxRoot() {
                return `required|min_value:1`;
            },
            minRoot() {
                if(this.basicData.roleId == "20000000") {
                    return `required`;
                } else {
                    return `required|min_value:0`;
                }
            },
            maxleaf() {
                return `required|numeric|min_value:1`;
            },
            minleaf() {
                if(this.leafData.roleId == "20000000") {
                    return `required|numeric`;
                } else {
                    return `required|numeric|min_value:0`;
                }
            },
            maxAttr() {
                return `min_value:${this.attrvalObj.minValue}|required`;
            },
            minAttr() {
                return `max_value:${this.attrvalObj.maxValue}|required`;
            },
            checkAttrAll() {
                return this.qryProductAttrValueList.every( item => this.qryProductAttrCheck.find(cItem => cItem.attrValueId == item.attrValueId))
            },
        },
        mounted() {
        	console.log(this.componentData,787878)
            this.getoffeProdRel()
            this.offerProdRelPages(this.qryConstitutePageObj.pageIndex, this.prodName)
        },
        watch: {
            "basicData.maxNum": function(newValue, oldValue) {
                if(newValue == "0") {
                    this.basicData.rstrType = "1400";
                }
            },
            "basicData.minNum": function(newValue, oldValue) {
                if(newValue >= "1") {
                    this.basicData.rstrType = "1200";
                }
            },
            "basicData.defaultCount": function(newValue, oldValue) {
                if(newValue == "1") {
                    this.basicData.rstrType = "1300";
                }
            },
            "qureyProdCheck": function(newValue, oldValue) {
                this.prodObj = newValue
                this.basicData.prodId = newValue.prodId
            },
            "qureyLeafProdCheck": function(newValue, oldValue) {
                this.prodObj = newValue
                this.leafData.prodId = newValue.prodId
            },
            'offeProdRelArr': function(newValue, oldValue) {
                this.offerProdRelPages(this.qryConstitutePageObj.pageIndex, this.prodName)

            },
            
        },
        methods: {
            catalogClick() {
                this.$axios.get(this.$api.replace(this.$api.GetOfferObjRelRole, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        statutsCd: this.statusCd
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.offerObjRelRoles || [];
                        this.$nextTick(() => {
                             this.$refs.catalogItemDialog.show();
                             this.$refs.leftDialog.removeClickEvent();
                             this.$refs.leftLeafDialog.removeClickEvent();
                        })
                    } else {
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: '构成成员角色列表查询失败！' });
                })
            },
            catalogItemTreePlugClick() {
                this.$refs.catalogItemDialog.initHeight();
                this.$refs.catalogItemTree.initScroll();
            },
             catalogItemDialogConfirm() {

                this.basicData.roleName = this.catalogItemTreeModel.roleName;
                this.basicData.roleId = this.catalogItemTreeModel.roleId;

                this.leafData.roleName = this.catalogItemTreeModel.roleName;
                this.leafData.roleId = this.catalogItemTreeModel.roleId;

                this.$refs.catalogItemDialog.hide();
				this.$refs.catalogItemNameRef.focus();
				setTimeout(() => {
					this.$refs.catalogItemNameRef.blur();
                }, 100)
                this.basicData.roleId = this.basicData.roleId
            },
            //销售品配置构成关系界面查询
            getoffeProdRel() {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                this.$axios.get(this.$api.replace(this.$api.GetOffeProdRel, ['{offerId}'], offerIdArr), {
                    params: {
                        statusCd: this.statusCd
                    }
                }).then(res => {
                    if(res.data.success) {
                        //构成成员信息列表查询
                        if(res.data.offeProdRels) {
                            this.offeProdRelArr = res.data.offeProdRels

                            //根据移动电话、有线宽带返回毛利预估模板类型
                            this.$emit('constituteUpdate');
                        }
                        //限制构成信息列表查询
                        if(res.data.offerRstrCfgs) {
                            this.offerRstrList = [...res.data.offerRstrCfgs]
                            this.offerRstrList.map(item => {
                                this.$set(item, 'offerIdCompRstrCfgs', item.offerCompRstrCfgs.map(offerItem => {
                                    return offerItem.prodId;
                                }))
                                return item;
                            })
                            this.offerRstrSelectList = [...res.data.offerRstrCfgs]
                        }
                    } else {
                        this.$message.error({ message: '构成成员列表查询失败！' });
                    }
                })
            },
            //产品属性列表查询
            GetOfferProdAttrValRest(val) {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(val)
                this.$axios.get(this.$api.replace(this.$api.GetOfferProdAttrValRest, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                    params: {
                        statusCd: this.statusCd,
                        page: this.offerAttrPageObj.pageIndex,
                        limit: this.offerAttrPageObj.pageSize
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.offerProdAttrValRestDeatil) {
                            this.prodAttrList = []
                            this.prodAttrList = res.data.offerProdAttrValRestDeatil.content
                            this.offerAttrPageObj.pageIndex = res.data.offerProdAttrValRestDeatil.page
                            this.offerAttrPageObj.rowCount = res.data.offerProdAttrValRestDeatil.total
                        }
                    } else {
                        this.$message.error({ message: '产品属性列表查询失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: '产品属性列表查询失败！' });
                })
            },
            searchprodClick(val) {
                this.prodName = val
                this.pageProductObj.pageIndex = 1;
                this.qureyProdList(this.pageProductObj.pageIndex, this.pageProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
            },
            searchLeafprodClick(val) {
                this.prodName = val
                this.pageleafProductObj.pageIndex = 1;
                this.qureyProdList(this.pageleafProductObj.pageIndex, this.pageleafProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
            },
            searchserviceClick(val) {
                this.serviceOfferName = ""
            },
            //产品全视图查询
            qureyProdList(pageIndex, pageSize, prodNbr, prodName, prodUseType) {
                this.$axios.get(this.$api.QureyProdList, {
                    params: {
                        'parProdId': this.parProdId,
                        "prodNbr": prodNbr,
                        "prodName": prodName,
                        "effDate": "",
                        "expDate": "",
                        "prodFuncType": "",
                        "prodUseType": prodUseType,
                        "staff": this.staff,
                        "page": pageIndex,
                        "limit": pageSize
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        if(res.data.products.content) {
                            this.qureyProdListArr = res.data.products.content
                        } else {
                            this.qureyProdListArr = []
                        }

                        if(prodUseType == '1000'){
                            this.pageProductObj.pageIndex = res.data.products.page;
                            this.pageProductObj.rowCount = res.data.products.total;
                        }else if(prodUseType == '2000'){
                            this.pageleafProductObj.pageIndex = res.data.products.page;
                            this.pageleafProductObj.rowCount = res.data.products.total;
                        }

                    } else {
                        this.$message.error({ message: '产品列表查询失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                })
            },
            qureyProdTree() {

            },
            //产品业务约束列表
            prodService(prodId, pageIndex, pageSize) {
                this.$axios.post(this.$api.QryProdServiceOfferRel, {
                        prodId: prodId,
                        prodAttrId: '',
                        scopeInfos: [{
                            scope: 'prodServiceOfferRel',
                            page: pageIndex,
                            limit: pageSize
                        }]
                }).then((res) => {
                    if(res.data.prodServiceOfferRelList.prodServiceOfferRels.content) {
                        this.prodServiceOfferRelArr = res.data.prodServiceOfferRelList.prodServiceOfferRels.content
                        this.prodServiceObj.rowCount = res.data.prodServiceOfferRelList.prodServiceOfferRels.total
                    } else {
                        this.prodServiceOfferRelArr = []
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                })
            },
            //产品业务约束已选列表
            offerProdService() {
                let offerProdRelArr = []
                offerProdRelArr.push(this.componentData.offerId)
                offerProdRelArr.push(this.offerProdRelId)
                this.$axios.get(this.$api.replace(this.$api.OfferProdServiceRstr, ['{offerId}', '{offerProdRelId}'], offerProdRelArr), {
                    params: {
                        statusCd: this.statusCd
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.offerProdServiceRstrPage.content) {
                            this.offerServiceList = res.data.offerProdServiceRstrPage.content
                        }
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                })
            },
            //添加根产品
            showLeft(type) {
            	if(this.componentData.commodityType == '10' || this.componentData.commodityType == '30'){
	        		this.basicData.roleId = '10000000'
	        	}else{
	        		this.basicData.roleId = '60000000'
	        	}

                //当商品类型是可选包或者促销时，优惠值和首月优惠值，默认选项为请选择
                if(this.componentData.commodityType == '40' || this.componentData.commodityType == '50'){
                    this.basicData.discountValue = '';
                    this.basicData.firstMonDiscountValue = '';
                }else{
                    this.basicData.discountValue = '10';
                    this.basicData.firstMonDiscountValue = '10';
                }

                // 当商品类型是关联包时,构成类型默认选项为请选择
                if (this.componentData.commodityType == '60') {
                    this.basicData.relType = '';
                } else {
                    this.basicData.relType = '1000';
                }
                this.qureyProdListArr = [];
                this.pageProductObj = {
                    pageIndex: 1,
                    pageSize: 5,
                    pageCount: 1,
                    rowCount: 0
                }
                this.prodType = "root"
                this.leftDialogTitle = "添加根产品"
                this.tabDefault = "basic"
                this.$refs.leftLeafDialog.hide();
                this.$refs.leftDialog.show();


                this.componentData.showRightTopClose = false;

                this.attrActype = "add"
                this.offerProdRelId = ""
                this.parProdId = ""
                this.prodUseType = "1000"
                this.prodObj = {}
                this.basicData.roleName = ""
                this.basicData.name = ""
                this.basicData.num = "1"
                this.basicData.maxNum = "1"
                this.basicData.minNum = "1"
                // this.basicData.relType = "1000"
                this.qureyProdCheck = "";
                this.addrootFlag = false
                this.prodName = '';

                this.$refs.prodSearch.setValue('');
                this.qureyProdList(1, this.pageProductObj.pageSize, this.prodNbr, '', this.prodUseType)
            },
            //修改根产品
            mod(val) {
                this.prodType = "root"
                this.leftDialogTitle = "修改根产品"
                this.prodObj = val
                this.tabDefault = "basic"
                this.$refs.leftDialog.show();
                this.attrActype = "mod"
                this.offerProdRelId = val.offerProdRelId
                this.prodUseType = "1000"
                this.offeProdRelDetail(val)
            },
            //添加子产品
            showLeaf(val) {
                this.qureyProdListArr = [];
                this.pageleafProductObj = {
                    pageIndex: 1,
                    pageSize: 5,
                    pageCount: 1,
                    rowCount: 0
                }
                
                this.prodType = "leaf"
                this.leafData.roleId = val.roleId || "10000000";
//              if(this.componentData.commodityType == '10' || this.componentData.commodityType == '30'){
//	        		this.leafData.roleId = val.roleId || "10000000";
//	        	}else{
//	        		this.leafData.roleId = val.roleId || "60000000";
//	        	}


                //当商品类型是可选包或者促销时，优惠值和首月优惠值，默认选项为请选择
                if(this.componentData.commodityType == '40' || this.componentData.commodityType == '50'){
                    this.leafData.discountValue = ""
                    this.leafData.firstMonDiscountValue = ""
                }else{
                    this.leafData.discountValue = "10"
                    this.leafData.firstMonDiscountValue = "10"
                }

                // 当商品类型为关联包时,默认选项为请选择
                if (this.componentData.commodityType == '60') {
                    this.leafData.relType = ""
                } else  {
                    this.leafData.relType = "1000"
                }
                this.leafData.roleId = val.roleId
                this.leafData.roleName = val.roleName
                this.leafData.maxNum = '1'
                this.leafData.minNum = '1'
                this.leafData.defaultCount = '1'
                this.leafData.prodExistType = "1200"
                this.leafData.ifMarketingBinding = "1",
                this.leafData.ifAttrConstraint = "1",
                // this.leafData.relType = "1000",
                this.leafData.rstrType = "1300",
                this.leafData.parOfferProdRelId = val.offerProdRelId
                this.offerleafProdRelId = ""
                this.qureyLeafProdCheck = ""
                this.parProdId = val.prodId
                this.prodUseType = "2000"
                this.tableafDefault = "leafbasic"
                this.leftLeafDialogTitle = "添加功能产品"
                this.$refs.leftLeafDialog.show();
                this.prodName = ""
                this.prodObj = {}
                
                this.$refs.gnProdSearch.setValue('');
                this.qureyProdList(1, this.pageleafProductObj.pageSize, this.prodNbr, '', this.prodUseType)
            },
            //修改子产品
            modChild(val) {
                this.prodType = "leaf"
                this.leftLeafDialogTitle = "修改功能产品"
                this.prodObj = val
                this.tableafDefault = "leafbasic"
                this.prodUseType = "2000"
                this.leafData.parOfferProdRelId = val.parOfferProdRelId
                this.offerProdChildRelId = val.offerProdRelId
                this.offerleafProdRelId = val.offerProdRelId
                this.$refs.leftLeafDialog.show();
                this.offeProdleafRelDetail(val)
            },
            //展示更多信息
            more(val) {
                this.offerProdRelId = val.offerProdRelId
                this.offeProdRelDetail(val)
                if(val.children.length > 0) {
                    this.offerProdChildRelId = val.children["0"].offerProdRelId
                    this.offeProdleafRelDetail()
                }
                this.$refs.moreDialog.show();
                this.prodOpenArray = []
                if(this.prodOpenArray.indexOf(val.offerProdRelId) > -1) {
                    this.prodOpenArray = this.prodOpenArray.filter(item => item != val.offerProdRelId);
                } else {
                    this.prodOpenArray.push(val.offerProdRelId);
                }
            },
            //构成产品详情
            offeProdRelDetail(val) {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(val.offerProdRelId)
                this.$axios.get(this.$api.replace(this.$api.offerProdRelDetail, ['{offerId}', '{offerProdRelId}'], offerIdArr), {}).then(res => {
                    if(res.data.success) {
                        if(res.data.offeProdRel) {
                            this.relsObj.minNum = res.data.offeProdRel.minNum
                            this.relsObj.maxNum = res.data.offeProdRel.maxNum
                            this.relsObj.discountValue = res.data.offeProdRel.discountValue
                            this.relsObj.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue
                            this.relsObj.roleName = res.data.offeProdRel.roleName
                            this.relsObj.roleId = res.data.offeProdRel.roleId
                            this.relsObj.prodExistType = res.data.offeProdRel.prodExistType
                            this.relsObj.defaultCount = res.data.offeProdRel.defaultCount
                            this.relsObj.relType = res.data.offeProdRel.relType
                            this.relsObj.rstrType = res.data.offeProdRel.rstrType

                            //修改根产品
                            this.updateProdObj.offerProdRelId = res.data.offeProdRel.offerProdRelId
                            this.updateProdObj.parOfferProdRelId = res.data.offeProdRel.parOfferProdRelId
                            this.prodObj.prodId = res.data.offeProdRel.prodId
                            this.basicData.prodExistType = res.data.offeProdRel.prodExistType
                            this.updateProdObj.offerProdRelCfgId = res.data.offeProdRel.offerProdRelCfgId
                            this.basicData.num = res.data.offeProdRel.defaultCount
                            this.basicData.rstrType = res.data.offeProdRel.rstrType
                            this.basicData.relType = res.data.offeProdRel.relType
                            this.basicData.minNum = res.data.offeProdRel.minNum
                            this.basicData.maxNum = res.data.offeProdRel.maxNum
                            this.prodObj.prodName = res.data.offeProdRel.prodName
                            this.basicData.roleId = res.data.offeProdRel.roleId
                            this.basicData.roleName = res.data.offeProdRel.roleName
                            this.updateProdObj.ifMarketingBinding = res.data.offeProdRel.ifMarketingBinding
                            this.basicData.discountValue = res.data.offeProdRel.discountValue
                            this.basicData.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue

                        }
                    }
                }).catch(error => {

                })
            },
            offeProdleafRelDetail() {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(this.offerProdChildRelId)
                this.$axios.get(this.$api.replace(this.$api.offerProdRelDetail, ['{offerId}', '{offerProdRelId}'], offerIdArr), {}).then(res => {
                    if(res.data.success) {
                        if(res.data.offeProdRel) {
                            //子产品详情
                            this.moreleafData.roleId = res.data.offeProdRel.roleId
                            this.moreleafData.minNum = res.data.offeProdRel.minNum
                            this.moreleafData.maxNum = res.data.offeProdRel.maxNum
                            this.moreleafData.discountValue = res.data.offeProdRel.discountValue
                            this.moreleafData.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue
                            this.moreleafData.roleName = res.data.offeProdRel.roleName
                            this.moreleafData.prodExistType = res.data.offeProdRel.prodExistType
                            this.moreleafData.defaultCount = res.data.offeProdRel.defaultCount
                            this.moreleafData.relType = res.data.offeProdRel.relType
                            this.moreleafData.rstrType = res.data.offeProdRel.rstrType
                            //修改子产品详情
                            this.leafData.roleId = res.data.offeProdRel.roleId
                            this.leafData.minNum = res.data.offeProdRel.minNum
                            this.leafData.maxNum = res.data.offeProdRel.maxNum
                            this.leafData.discountValue = res.data.offeProdRel.discountValue
                            this.leafData.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue
                            this.leafData.roleName = res.data.offeProdRel.roleName
                            this.leafData.prodExistType = res.data.offeProdRel.prodExistType
                            this.leafData.defaultCount = res.data.offeProdRel.defaultCount
                            this.leafData.relType = res.data.offeProdRel.relType
                            this.leafData.rstrType = res.data.offeProdRel.rstrType
                        }
                    }
                }).catch(error => {

                })
            },
            //更多功能产品
            moreChild(val) {
                this.$refs.moreDialog.show();
                this.offerProdRelId = val.offerProdRelId
                this.offerProdChildRelId = val.offerProdRelId
                let valObj = {
                    offerProdRelId: val.parOfferProdRelId
                }
                this.offeProdRelDetail(valObj)
                this.offeProdleafRelDetail()
                this.prodOpenArray = []
                if(this.prodOpenArray.indexOf(val.parOfferProdRelId) > -1) {
                    this.prodOpenArray = this.prodOpenArray.filter(item => item != val.parOfferProdRelId);
                } else {
                    this.prodOpenArray.push(val.parOfferProdRelId);
                }
            },


            // 配置虚拟产品组
            configProGrp() {
                if(this.checkArr.length >= 2){
                    let arr = [];
                    this.checkArr.forEach(item => {
                        let temp = {
                            offerProdRelCfgId: item.offerProdRelCfgId,
                            statusCd: '1000'
                        }
                       arr.push(temp)
                    })

                     this.$axios.put(this.$api.replace(this.$api.UpdateOfferProdRelCfg,['{offerId}'],[this.componentData.offerId]),arr).then((res) => {
                        if(res.data.success){
                            this.$message.success({"message": "配置虚拟产品组成功！"})
                            this.getoffeProdRel();
                            this.checkArr = [];
                        }else{
                            this.$message.error({"message": "配置虚拟产品组失败！"})
                        }
                    }).catch(error => {
                        this.$message.error({ message: error.response.data.msg })
                    })

				}else{
                    this.$message.error({ message: '请先选择至少两个成员销售品！' });
                    return;
				}
            },
            // 删除虚拟产品组
            delConfigProGrp() {
                if(this.checkArr.length >= 1){

                    let arr = [];
                    this.checkArr.forEach(item => {
                        let temp = {
                            offerProdRelCfgId: item.offerProdRelCfgId,
                            statusCd: '1100'
                        }
                       arr.push(temp)
                    })
                
                    this.$axios.put(this.$api.replace(this.$api.UpdateOfferProdRelCfg,['{offerId}'],[this.componentData.offerId]),arr).then((res) => {
                        if(res.data.success){
                            this.$message.success({"message": "删除配置虚拟产品组成功！"})
                            this.getoffeProdRel();
                            this.checkArr = [];
                        }else{
                            this.$message.error({"message": "删除配置虚拟产品组失败！"})
                        }
                    }).catch(error => {
                        this.$message.error({ message: error.response.data.msg })
                    })

				}else{
                    this.$message.error({ message: '请先选择至少一个成员销售品！' });
                    return;
				}
            },
            //提交Tab
            sureSubmit() {
                this.$validator.validateAll('tabRoot').then((result) => {
                    if(result) {
                        if(Number(this.basicData.minNum) <= Number(this.basicData.maxNum)) {
                            if(Number(this.basicData.num) >= Number(this.basicData.minNum) && Number(this.basicData.num) <= Number(this.basicData.maxNum)) {
                                let offerIdArr = []
                                offerIdArr.push(this.componentData.offerId)
                                if(!this.offerProdRelId) {
                                    this.basicData.offerProdRelId = -1
                                    this.basicData.parOfferProdRelId = 0
                                    this.basicData.offerId = this.componentData.offerId
                                    this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
                                        "offerProdRelId": this.basicData.offerProdRelId,
                                        "parOfferProdRelId": this.basicData.parOfferProdRelId,
                                        "offerId": this.componentData.offerId,
                                        "prodId": this.prodObj.prodId,
                                        "effDate": this.basicData.effDate,
                                        "expDate": this.basicData.expDate,
                                        "prodExistType": this.basicData.prodExistType,
                                        "roleId": this.basicData.roleId,
                                        "offerProdRelCfgId": this.basicData.offerProdRelCfgId,
                                        "rstrType": this.basicData.rstrType,
                                        "relType": this.basicData.relType,
                                        "minNum": this.basicData.minNum,
                                        "maxNum": this.basicData.maxNum,
                                        "defaultCount": this.basicData.num,
                                        "discountValue": this.basicData.discountValue,
                                        "ifMarketingBinding": this.basicData.ifMarketingBinding,
                                        "firstMonDiscountValue": this.basicData.firstMonDiscountValue,
                                        "statusCd": this.statusCd,
                                        "updateStaff": this.createStaff,
                                        "createStaff": this.createStaff

                                    }).then(res => {
                                        if(res.data.success) {
                                            this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
                                            this.tabDefault = 'workflow'
                                            this.getoffeProdRel()
                                            this.$refs.leftDialog.show();
                                            this.$message.success({ message: '保存成功！' });
                                            this.basicData.roleName = ""
                                            this.addrootFlag = true
                                        } else {
                                            this.$message.error({ message: '保存失败！' });
                                        }
                                    }).catch(error => {
                                        this.$message.error({ message: '保存失败！' });
                                    })
                                } else {
                                    let offerIdArr = []
                                    offerIdArr.push(this.componentData.offerId)
                                    offerIdArr.push(this.offerProdRelId)
                                    this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                                        "offerProdRelId": this.offerProdRelId,
                                        "parOfferProdRelId": this.updateProdObj.parOfferProdRelId,
                                        "offerId": this.componentData.offerId,
                                        "prodId": this.prodObj.prodId,
                                        "effDate": this.updateProdObj.effDate,
                                        "expDate": this.updateProdObj.expDate,
                                        "prodExistType": this.basicData.prodExistType,
                                        "roleId": this.basicData.roleId,
                                        "offerProdRelCfgId": this.updateProdObj.offerProdRelCfgId,
                                        "defaultCount": this.basicData.num,
                                        "rstrType": this.basicData.rstrType,
                                        "relType": this.basicData.relType,
                                        "minNum": this.basicData.minNum,
                                        "maxNum": this.basicData.maxNum,
                                        "ifMarketingBinding": this.updateProdObj.ifMarketingBinding,
                                        "discountValue": this.basicData.discountValue || '',
                                        "firstMonDiscountValue": this.basicData.firstMonDiscountValue || '',
                                        "updateStaff": this.createStaff,
                                        "statusCd": this.statusCd,
                                        "createStaff": this.createStaff

                                    }).then(res => {
                                        if(res.data.success) {
                                            this.tabDefault = 'workflow'
                                            this.getoffeProdRel()
                                            this.$refs.leftDialog.show();
                                            this.$message.success({ message: '修改成功！' });
                                            this.addrootFlag = true
                                        } else {
                                            this.$message.error({ message: '修改失败！' });
                                        }
                                    })
                                }
                            } else {
                                this.tabDefault = "basic"
                                this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                            }
                        } else {
                            this.tabDefault = "basic"
                            this.$message.error({ message: '最小值应不大于最大值！' });
                        }
                    } else {
                        this.tabDefault = "basic"
                    }
                })
            },
            //切换tab
            tabChange(val) {
                if(this.tabDefault == "basic" && val == "workflow") {
                    if(this.attrActype == 'add') {
                        if(!this.addrootFlag) {
                            this.$validator.validateAll('tabRoot').then((result) => {
                                if(result) {
                                    if(Number(this.basicData.minNum) <= Number(this.basicData.maxNum)) {
                            if(Number(this.basicData.num) >= Number(this.basicData.minNum) && Number(this.basicData.num) <= Number(this.basicData.maxNum)) {
                                            let offerIdArr = []
                                            offerIdArr.push(this.componentData.offerId)
                                            this.basicData.offerProdRelId = -1
                                            this.basicData.parOfferProdRelId = 0
                                            this.basicData.offerId = this.componentData.offerId
                                            this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
                                                "offerProdRelId": this.basicData.offerProdRelId,
                                                "parOfferProdRelId": this.basicData.parOfferProdRelId,
                                                "offerId": this.componentData.offerId,
                                                "prodId": this.prodObj.prodId,
                                                "effDate": this.basicData.effDate,
                                                "expDate": this.basicData.expDate,
                                                "prodExistType": this.basicData.prodExistType,
                                                "roleId": this.basicData.roleId,
                                                "offerProdRelCfgId": this.basicData.offerProdRelCfgId,
                                                "rstrType": this.basicData.rstrType,
                                                "relType": this.basicData.relType,
                                                "minNum": this.basicData.minNum,
                                                "maxNum": this.basicData.maxNum,
                                                "defaultCount": this.basicData.num,
                                                "discountValue": this.basicData.discountValue,
                                                "ifMarketingBinding": this.basicData.ifMarketingBinding,
                                                "firstMonDiscountValue": this.basicData.firstMonDiscountValue,
                                                "statusCd": this.statusCd,
                                                "updateStaff": this.createStaff,
                                                "createStaff": this.createStaff

                                            }).then(res => {
                                                if(res.data.success) {
                                                    this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
                                                    this.getoffeProdRel()
                                                    this.$message.success({ message: '保存成功！' });
                                                    this.$nextTick(() => {
                                                        this.tabDefault = val;
                                                        this.offerProdService()
                                                        this.addrootFlag = true
                                                    })

                                                } else {
                                                    this.$message.error({ message: '保存失败！' });
                                                }
                                            }).catch(error => {
                                                this.$message.error({ message: '保存失败！' });
                                            })
                                        } else {
                                            this.tabDefault = "basic"
                                            this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                        }
                                    } else {
                                        this.tabDefault = "basic"
                                        this.$message.error({ message: '最小值应不大于最大值！' });
                                    }
                                } else {
                                    this.tabDefault = "basic"
                                }
                            })
                        } else {
                            this.tabDefault = val;
                            this.offerProdService()
                        }
                    } else {
                        this.$validator.validateAll('tabRoot').then((result) => {
                            if(result) {
                                if(Number(this.basicData.minNum) <= Number(this.basicData.maxNum)) {
                            if(Number(this.basicData.num) >= Number(this.basicData.minNum) && Number(this.basicData.num) <= Number(this.basicData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        offerIdArr.push(this.offerProdRelId)
                                        this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                                            "offerProdRelId": this.offerProdRelId,
                                            "parOfferProdRelId": this.updateProdObj.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.updateProdObj.effDate,
                                            "expDate": this.updateProdObj.expDate,
                                            "prodExistType": this.basicData.prodExistType,
                                            "roleId": this.basicData.roleId,
                                            "offerProdRelCfgId": this.updateProdObj.offerProdRelCfgId,
                                            "defaultCount": this.basicData.num,
                                            "rstrType": this.basicData.rstrType,
                                            "relType": this.basicData.relType,
                                            "minNum": this.basicData.minNum,
                                            "maxNum": this.basicData.maxNum,
                                            "ifMarketingBinding": this.updateProdObj.ifMarketingBinding,
                                            "discountValue": this.basicData.discountValue || '',
                                            "firstMonDiscountValue": this.basicData.firstMonDiscountValue || '',
                                            "updateStaff": this.createStaff,
                                            "statusCd": this.statusCd,
                                            "createStaff": this.createStaff

                                        }).then(res => {
                                            if(res.data.success) {
                                                this.getoffeProdRel()
                                                this.$refs.leftDialog.show();
                                                this.$message.success({ message: '修改成功！' });
                                                this.$nextTick(() => {
                                                    this.tabDefault = val;
                                                    this.offerProdService()
                                                    this.addrootFlag = true
                                                })
                                            } else {

                                            }
                                        })
                                    } else {
                                        this.tabDefault = "basic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tabDefault = "basic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tabDefault = "basic"
                            }
                        })
                    }
                } else if(this.tabDefault == "basic" && val == "attr") {
                    if(this.attrActype == 'add') {
                        if(!this.addrootFlag) {
                            this.$validator.validateAll('tabRoot').then((result) => {
                                if(result) {
                                    if(Number(this.basicData.minNum) <= Number(this.basicData.maxNum)) {
                            if(Number(this.basicData.num) >= Number(this.basicData.minNum) && Number(this.basicData.num) <= Number(this.basicData.maxNum)) {
                                            let offerIdArr = []
                                            offerIdArr.push(this.componentData.offerId)
                                            this.basicData.offerProdRelId = -1
                                            this.basicData.parOfferProdRelId = 0
                                            this.basicData.offerId = this.componentData.offerId
                                            this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
                                                "offerProdRelId": this.basicData.offerProdRelId,
                                                "parOfferProdRelId": this.basicData.parOfferProdRelId,
                                                "offerId": this.componentData.offerId,
                                                "prodId": this.prodObj.prodId,
                                                "effDate": this.basicData.effDate,
                                                "expDate": this.basicData.expDate,
                                                "prodExistType": this.basicData.prodExistType,
                                                "roleId": this.basicData.roleId,
                                                "offerProdRelCfgId": this.basicData.offerProdRelCfgId,
                                                "rstrType": this.basicData.rstrType,
                                                "relType": this.basicData.relType,
                                                "minNum": this.basicData.minNum,
                                                "maxNum": this.basicData.maxNum,
                                                "defaultCount": this.basicData.num,
                                                "discountValue": this.basicData.discountValue,
                                                "ifMarketingBinding": this.basicData.ifMarketingBinding,
                                                "firstMonDiscountValue": this.basicData.firstMonDiscountValue,
                                                "statusCd": this.statusCd,
                                                "updateStaff": this.createStaff,
                                                "createStaff": this.createStaff

                                            }).then(res => {
                                                if(res.data.success) {
                                                    this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
                                                    this.getoffeProdRel()
                                                    this.$message.success({ message: '保存成功！' });
                                                    this.$nextTick(() => {
                                                        this.tabDefault = val;
                                                        this.GetOfferProdAttrValRest(this.offerProdRelId)
                                                        this.addrootFlag = true
                                                    })
                                                } else {
                                                    this.$message.error({ message: '保存失败！' });
                                                }
                                            }).catch(error => {
                                                this.$message.error({ message: '保存失败！' });
                                            })
                                        } else {
                                            this.tabDefault = "basic"
                                            this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                        }
                                    } else {
                                        this.tabDefault = "basic"
                                        this.$message.error({ message: '最小值应不大于最大值！' });
                                    }

                                } else {
                                    this.tabDefault = "basic"
                                }
                            })
                        } else {
                            this.tabDefault = val;
                            this.GetOfferProdAttrValRest(this.offerProdRelId)
                        }
                    } else {
                        this.$validator.validateAll('tabRoot').then((result) => {
                            if(result) {
                                if(Number(this.basicData.minNum) <= Number(this.basicData.maxNum)) {
                            if(Number(this.basicData.num) >= Number(this.basicData.minNum) && Number(this.basicData.num) <= Number(this.basicData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        offerIdArr.push(this.offerProdRelId)
                                        this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                                            "offerProdRelId": this.offerProdRelId,
                                            "parOfferProdRelId": this.updateProdObj.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.updateProdObj.effDate,
                                            "expDate": this.updateProdObj.expDate,
                                            "prodExistType": this.basicData.prodExistType,
                                            "roleId": this.basicData.roleId,
                                            "offerProdRelCfgId": this.updateProdObj.offerProdRelCfgId,
                                            "defaultCount": this.basicData.num,
                                            "rstrType": this.basicData.rstrType,
                                            "relType": this.basicData.relType,
                                            "minNum": this.basicData.minNum,
                                            "maxNum": this.basicData.maxNum,
                                            "ifMarketingBinding": this.updateProdObj.ifMarketingBinding,
                                            "discountValue": this.basicData.discountValue || '',
                                            "firstMonDiscountValue": this.basicData.firstMonDiscountValue || '',
                                            "updateStaff": this.createStaff,
                                            "statusCd": this.statusCd,
                                            "createStaff": this.createStaff

                                        }).then(res => {
                                            if(res.data.success) {
                                                this.getoffeProdRel()
                                                this.$refs.leftDialog.show();
                                                this.$message.success({ message: '修改成功！' });
                                                this.$nextTick(() => {
                                                    this.tabDefault = val;
                                                    this.GetOfferProdAttrValRest(this.offerProdRelId)
                                                    this.addrootFlag = true
                                                })
                                            } else {
                                                this.$message.error({ message: '修改失败！' });
                                            }
                                        }).catch(error => {
                                            this.$message.error({ message: '修改失败！' });
                                        })
                                    } else {
                                        this.tabDefault = "basic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tabDefault = "basic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tabDefault = "basic"
                            }
                        })
                    }
                } else if(this.tabDefault == "attr" && val == "workflow") {
                    this.attrActype == 'mod'
                    this.addrootFlag = true
                    this.tabDefault = val;
                    this.offerProdService()
                } else if(this.tabDefault == "workflow" && val == "attr") {
                    this.attrActype == 'mod'
                    this.addrootFlag = true
                    this.tabDefault = val;
                    this.GetOfferProdAttrValRest(this.offerProdRelId)
                } else if(val == "basic") {
                    this.tabDefault = val;
                }
            },
            //切换添加功能产品tab
            tableafChange(val) {
                //添加功能产品
                if(this.offerleafProdRelId == "") {
                    if(this.tableafDefault == "leafbasic") {
                        this.$validator.validateAll('tabLeaf').then((result) => {
                            if(result) {
                                if(Number(this.leafData.minNum) <= Number(this.leafData.maxNum)) {
                                    if(Number(this.leafData.defaultCount) >= Number(this.leafData.minNum) && Number(this.leafData.defaultCount) <= Number(this.leafData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
                                            "offerProdRelId": this.offerleafProdRelId,
                                            "parOfferProdRelId": this.leafData.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.basicData.effDate,
                                            "expDate": this.basicData.expDate,
                                            "prodExistType": this.leafData.prodExistType,
                                            "roleId": this.leafData.roleId,
                                            "offerProdRelCfgId": this.leafData.offerProdRelCfgId,
                                            "rstrType": this.leafData.rstrType,
                                            "relType": this.leafData.relType,
                                            "minNum": this.leafData.minNum,
                                            "maxNum": this.leafData.maxNum,
                                            "defaultCount": this.leafData.defaultCount,
                                            "discountValue": this.leafData.discountValue,
                                            "ifMarketingBinding": this.leafData.ifMarketingBinding,
                                            "firstMonDiscountValue": this.leafData.firstMonDiscountValue,
                                            "statusCd": this.statusCd,
                                            "updateStaff": this.createStaff,
                                            "createStaff": this.createStaff
                                        }).then(res => {
                                            if(res.data.success) {
                                                this.offerleafProdRelId = res.data.offeProdRel["0"].offerProdRelId
                                                this.getoffeProdRel()
                                                this.tableafDefault = val
                                                this.GetOfferProdAttrValRest(this.offerleafProdRelId)
                                                this.$message.success({ message: '保存成功！' });
                                            } else {
                                                this.$message.error({ message: '保存失败！' });
                                            }
                                        }).catch(error => {
                                            this.$message.error({ message: '保存失败！' });
                                        })
                                    } else {
                                        this.tableafDefault = "leafbasic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tableafDefault = "leafbasic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tableafDefault = "leafbasic"
                            }
                        })

                    } else if(val == "leafbasic") {
                        this.tableafDefault = val;
                    }
                } else {
                    //修改功能产品
                    if(this.tableafDefault == "leafbasic") {
                        this.$validator.validateAll("tabLeaf").then((result) => {
                            if(result) {
                                if(Number(this.leafData.minNum) <= Number(this.leafData.maxNum)) {
                                    if(Number(this.leafData.defaultCount) >= Number(this.leafData.minNum) && Number(this.leafData.defaultCount) <= Number(this.leafData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        offerIdArr.push(this.offerleafProdRelId)
                                        this.leafData.offerProdRelId = this.offerleafProdRelId
                                        this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                                            "offerProdRelId": this.leafData.offerProdRelId,
                                            "parOfferProdRelId": this.leafData.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.basicData.effDate,
                                            "expDate": this.basicData.expDate,
                                            "prodExistType": this.leafData.prodExistType,
                                            "roleId": this.leafData.roleId,
                                            "offerProdRelCfgId": this.leafData.offerProdRelCfgId,
                                            "rstrType": this.leafData.rstrType,
                                            "relType": this.leafData.relType,
                                            "minNum": this.leafData.minNum,
                                            "maxNum": this.leafData.maxNum,
                                            "defaultCount": this.leafData.defaultCount,
                                            "discountValue": this.leafData.discountValue || '',
                                            "ifMarketingBinding": this.leafData.ifMarketingBinding,
                                            "firstMonDiscountValue": this.leafData.firstMonDiscountValue || '',
                                            "statusCd": this.statusCd,
                                            "updateStaff": this.createStaff,
                                            "createStaff": this.createStaff

                                        }).then(res => {
                                            if(res.data.success) {
                                                this.offerleafProdRelId = res.data.offeProdRel.offerProdRelId
                                                this.getoffeProdRel()
                                                this.tableafDefault = "leafattr"
                                                this.GetOfferProdAttrValRest(this.offerleafProdRelId)
                                                this.$message.success({ message: res.data.offeProdRel.prodName + '修改成功！' });
                                            } else {
                                                this.$message.error({ message: res.data.offeProdRel.prodName + '修改失败！' });
                                            }
                                        }).catch(error => {
                                            this.$message.error({ message: '功能产品修改失败！' });
                                        })
                                    } else {
                                        this.tableafDefault = "leafbasic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tableafDefault = "leafbasic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tableafDefault = "leafbasic"
                            }
                        })
                    } else if(val == "leafbasic") {
                        this.tableafDefault = val;
                        this.$message.success({ message: '修改成功！' });
                    }
                }

            },
            //提交功能产品
            sureLeafSubmit() {
                //添加功能产品
                if(this.offerleafProdRelId == "") {
                    if(this.tableafDefault == "leafbasic") {
                        this.$validator.validateAll("tabLeaf").then((result) => {
                            if(result) {
                                if(Number(this.leafData.minNum) <= Number(this.leafData.maxNum)) {
                                    if(Number(this.leafData.defaultCount) >= Number(this.leafData.minNum) && Number(this.leafData.defaultCount) <= Number(this.leafData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
                                            "offerProdRelId": this.offerleafProdRelId,
                                            "parOfferProdRelId": this.leafData.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.basicData.effDate,
                                            "expDate": this.basicData.expDate,
                                            "prodExistType": this.leafData.prodExistType,
                                            "roleId": this.leafData.roleId,
                                            "offerProdRelCfgId": this.leafData.offerProdRelCfgId,
                                            "rstrType": this.leafData.rstrType,
                                            "relType": this.leafData.relType,
                                            "minNum": this.leafData.minNum,
                                            "maxNum": this.leafData.maxNum,
                                            "defaultCount": this.leafData.defaultCount,
                                            "discountValue": this.leafData.discountValue,
                                            "ifMarketingBinding": this.leafData.ifMarketingBinding,
                                            "firstMonDiscountValue": this.leafData.firstMonDiscountValue,
                                            "statusCd": this.statusCd,
                                            "updateStaff": this.createStaff,
                                            "createStaff": this.createStaff

                                        }).then(res => {
                                            if(res.data.success) {
                                                this.offerleafProdRelId = res.data.offeProdRel["0"].offerProdRelId
                                                this.getoffeProdRel()
                                                this.tableafDefault = "leafattr"
                                                this.GetOfferProdAttrValRest(this.offerleafProdRelId)
                                                this.$message.success({ message: '保存成功！' });
                                            } else {
                                                this.$message.error({ message: '保存失败！' });
                                            }
                                        }).catch(error => {
                                            this.$message.error({ message: '保存失败！' });
                                        })
                                    } else {
                                        this.tableafDefault = "leafbasic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tableafDefault = "leafbasic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tableafDefault = "leafbasic"
                            }
                        })
                    } else if(val == "leafbasic") {
                        this.tableafDefault = val;
                        this.$message.success({ message: '保存成功！' });
                    }
                } else {
                    //修改功能产品
                    if(this.tableafDefault == "leafbasic") {
                        this.$validator.validateAll("tabLeaf").then((result) => {
                            if(result) {
                                if(Number(this.leafData.minNum) <= Number(this.leafData.maxNum)) {
                                    if(Number(this.leafData.defaultCount) >= Number(this.leafData.minNum) && Number(this.leafData.defaultCount) <= Number(this.leafData.maxNum)) {
                                        let offerIdArr = []
                                        offerIdArr.push(this.componentData.offerId)
                                        offerIdArr.push(this.offerleafProdRelId)
                                        this.leafData.offerProdRelId = this.offerleafProdRelId
                                        this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                                            "offerProdRelId": this.leafData.offerProdRelId,
                                            "parOfferProdRelId": this.leafData.parOfferProdRelId,
                                            "offerId": this.componentData.offerId,
                                            "prodId": this.prodObj.prodId,
                                            "effDate": this.basicData.effDate,
                                            "expDate": this.basicData.expDate,
                                            "prodExistType": this.leafData.prodExistType,
                                            "roleId": this.leafData.roleId,
                                            "offerProdRelCfgId": this.leafData.offerProdRelCfgId,
                                            "rstrType": this.leafData.rstrType,
                                            "relType": this.leafData.relType,
                                            "minNum": this.leafData.minNum,
                                            "maxNum": this.leafData.maxNum,
                                            "defaultCount": this.leafData.defaultCount,
                                            "discountValue": this.leafData.discountValue || '',
                                            "ifMarketingBinding": this.leafData.ifMarketingBinding,
                                            "firstMonDiscountValue": this.leafData.firstMonDiscountValue || '',
                                            "statusCd": this.statusCd,
                                            "updateStaff": this.createStaff,
                                            "createStaff": this.createStaff

                                        }).then(res => {
                                            if(res.data.success) {
                                                this.offerleafProdRelId = res.data.offeProdRel.offerProdRelId
                                                this.getoffeProdRel()
                                                this.tableafDefault = "leafattr"
                                                this.GetOfferProdAttrValRest(this.offerleafProdRelId)
                                                this.$message.success({ message: res.data.offeProdRel.prodName + '修改成功！' });
                                            } else {
                                                this.$message.error({ message: res.data.offeProdRel.prodName + '修改失败！' });
                                            }
                                        }).catch(error => {
                                            this.$message.error({ message: '功能产品修改失败！' });
                                        })
                                    } else {
                                        this.tableafDefault = "leafbasic"
                                        this.$message.error({ message: '默认数目应不小于最小值，不大于最小值！' });
                                    }
                                } else {
                                    this.tableafDefault = "leafbasic"
                                    this.$message.error({ message: '最小值应不大于最大值！' });
                                }
                            } else {
                                this.tableafDefault = "leafbasic"
                            }
                        })
                    } else if(val == "leafbasic") {
                        this.tableafDefault = val;
                        this.$message.success({ message: '修改成功！' });
                    }
                }
            },
            //更多信息
            tabmoreChange(val, item) {
                if(val == 'morebasic') {
                    this.$set(item, 'tabmoreDefault', val)
                } else if(val == 'moreworkflow') {
                    this.offerProdRelId = item.offerProdRelId
                    this.offerProdService()
                    this.$set(item, 'tabmoreDefault', val)
                } else if(val == 'moreattr') {
                    this.offerProdRelId = item.offerProdRelId
                    this.GetOfferProdAttrValRest(this.offerProdRelId)
                    this.$set(item, 'tabmoreDefault', val)
                }
            },
            //子产品更多信息
            moreleafChange(val) {
                if(val == 'moreleafbasic') {
                    this.moreleafDefault = val
                } else if(val == 'moreleafattr') {
                    this.offerProdRelId = this.offerProdChildRelId
                    this.GetOfferProdAttrValRest(this.offerProdRelId)
                    this.moreleafDefault = val
                }
            },
            moreleafDetail(val, index) {
                this.moreleafDefault = "moreleafbasic"
                this.moreleafIndex = index
                this.offerProdChildRelId = val.offerProdRelId
                this.offeProdleafRelDetail()
            },

            showChildClick(index) {
                if(this.goodsId === index) {
                    this.goodsId = '';
                } else {
                    this.goodsId = index;
                }
            },

            constituteInfo() {
                this.tabIndex = "1"
            },
            limitconstitute() {
                this.tabIndex = "2"
            },

            //展示添加限制弹窗
            showAddLimit() {
                if(this.offeProdRelArr.length > 1) {
                    let offerRstrListObj = {
                        roleId: "10000000",
                        rstrType: "1000"
                    }
                    this.offerRstrList.push(offerRstrListObj)
                } else {
                    this.$message.warning({ message: '不能添加限制构成成员！' });
                }
            },
            // 属性列表筛选
			searchClick(data) {
                this.attrValSearchObj.attrName = data;
                this.QryProductAttrDetail(1, this.ProductAttrDetailPageObj.pageSize);
            },
            //属性值列表筛选
            searchValueClick(data) {
                this.attrValSearchObj.attrValueName = data;
                this.QryProductAttrValueDetail(1, this.ProductAttrDetailPageObj.pageSize);
            },
            //单选框变化时
            rstrTypeChange(val, item) {
                let offerCompArr = []
                for(let elem of item.offerIdCompRstrCfgs) {
                    offerCompArr.push(this.qryordAttr.find(ele => ele.prodId == elem))
                }
                if(item.offerRstrGrpId) {
                    let offerIdArr = []
                    offerIdArr.push(this.componentData.offerId)
                    offerIdArr.push(item.offerRstrGrpId)
                    let OfferCompRstrCfgs = []
                    for(let elemen of offerCompArr) {
                        let OfferCompRstrCfgsObj = {
                            "offerCompRstrCfgId": -1,
                            "offerProdRelId": elemen.offerProdRelId,
                            "offerRstrGrpId": item.offerRstrGrpId
                        }
                        OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                    }
                    this.$axios.put(this.$api.replace(this.$api.PutOfferRstrGrp, ['{offerId}', '{offerRstrGrpId}'], offerIdArr), {
                        "offerRstrGrpId": item.offerRstrGrpId,
                        "rstrObjType": "110000",
                        "rstrObjId": this.componentData.offerId,
                        "rstrType": val,
                        "createStaff": this.createStaff,
                        "updateStaff": this.createStaff,
                        "statusCd": this.statusCd,
                        "offerCompRstrCfgs": OfferCompRstrCfgs
                    }).then(res => {
                        if(res.data.success) {
                            this.$message.success({ message: '修改成功！' });
                            this.getoffeProdRel()
                        } else {
                            this.$message.error({ message: '修改失败！' });
                            this.getoffeProdRel()
                        }
                    })
                } else {
                    let offerIdArr = []
                    offerIdArr.push(this.componentData.offerId)
                    let OfferCompRstrCfgs = []
                    for(let elemen of offerCompArr) {
                        let OfferCompRstrCfgsObj = {
                            "offerCompRstrCfgId": -1,
                            "offerProdRelId": elemen.offerProdRelId,
                            "offerRstrGrpId": -1
                        }
                        OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                    }
                    this.$axios.post(this.$api.replace(this.$api.PostOfferRstrGrp, ['{offerId}'], offerIdArr), {
                        "offerRstrGrpId": "-1",
                        "rstrObjType": "110000",
                        "rstrObjId": this.componentData.offerId,
                        "rstrType": val,
                        "createStaff": this.createStaff,
                        "updateStaff": this.createStaff,
                        "statusCd": this.statusCd,
                        "offerCompRstrCfgs": OfferCompRstrCfgs
                    }).then(res => {
                        if(res.data.success) {
                            this.$message.success({ message: '保存成功！' });
                            this.getoffeProdRel()
                        } else {
                            this.$message.error({ message: '保存失败！' });
                            this.getoffeProdRel()
                        }
                    })
                }
            },
            prodActChange(val, item) {
                if(item.offerIdCompRstrCfgs.length > 0) {
                    let offerCompArr = []
                    for(let elem of item.offerIdCompRstrCfgs) {
                        offerCompArr.push(this.qryordAttr.find(ele => ele.prodId == elem))
                    }
                    if(item.offerRstrGrpId) {
                        let offerIdArr = []
                        offerIdArr.push(this.componentData.offerId)
                        offerIdArr.push(item.offerRstrGrpId)
                        let OfferCompRstrCfgs = []
                        for(let elemen of offerCompArr) {
                            let OfferCompRstrCfgsObj = {
                                "offerCompRstrCfgId": -1,
                                "offerProdRelId": elemen.offerProdRelId,
                                "offerRstrGrpId": item.offerRstrGrpId
                            }
                            OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                        }
                        this.$axios.put(this.$api.replace(this.$api.PutOfferRstrGrp, ['{offerId}', '{offerRstrGrpId}'], offerIdArr), {
                            "offerRstrGrpId": item.offerRstrGrpId,
                            "rstrObjType": "110000",
                            "rstrObjId": this.componentData.offerId,
                            "rstrType": item.rstrType,
                            "createStaff": this.createStaff,
                            "updateStaff": this.createStaff,
                            "statusCd": this.statusCd,
                            "offerCompRstrCfgs": OfferCompRstrCfgs
                        }).then(res => {
                            if(res.data.success) {
                                this.$message.success({ message: '修改成功！' });
                                this.getoffeProdRel()
                            } else {
                                this.$message.error({ message: '修改失败！' });
                                this.getoffeProdRel()
                            }
                        })
                    } else {
                        let offerIdArr = []
                        offerIdArr.push(this.componentData.offerId)
                        let OfferCompRstrCfgs = []
                        for(let elemen of offerCompArr) {
                            let OfferCompRstrCfgsObj = {
                                "offerCompRstrCfgId": -1,
                                "offerProdRelId": elemen.offerProdRelId,
                                "offerRstrGrpId": -1
                            }
                            OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                        }
                        this.$axios.post(this.$api.replace(this.$api.PostOfferRstrGrp, ['{offerId}'], offerIdArr), {
                            "offerRstrGrpId": -1,
                            "rstrObjType": "110000",
                            "rstrObjId": this.componentData.offerId,
                            "rstrType": item.rstrType,
                            "createStaff": this.createStaff,
                            "updateStaff": this.createStaff,
                            "statusCd": this.statusCd,
                            "offerCompRstrCfgs": OfferCompRstrCfgs
                        }).then(res => {
                            if(res.data.success) {
                                this.$message.success({ message: '保存成功！' });
                                this.getoffeProdRel()
                            } else {
                                this.$message.error({ message: '保存失败！' });
                                this.getoffeProdRel()
                            }
                        })

                    }
                } else {
                    this.showdelLimit(item)
                }

            },
            prodActDel(val, item) {
                if(item.offerIdCompRstrCfgs.length > 0) {
                    let offerCompArr = []
                    for(let elem of item.offerIdCompRstrCfgs) {
                        offerCompArr.push(this.qryordAttr.find(ele => ele.prodId == elem))
                    }
                    if(item.offerRstrGrpId) {
                        let offerIdArr = []
                        offerIdArr.push(this.componentData.offerId)
                        offerIdArr.push(item.offerRstrGrpId)
                        let OfferCompRstrCfgs = []
                        for(let elemen of offerCompArr) {
                            let OfferCompRstrCfgsObj = {
                                "offerCompRstrCfgId": -1,
                                "offerProdRelId": elemen.offerProdRelId,
                                "offerRstrGrpId": item.offerRstrGrpId
                            }
                            OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                        }
                        this.$axios.put(this.$api.replace(this.$api.PutOfferRstrGrp, ['{offerId}', '{offerRstrGrpId}'], offerIdArr), {
                            "offerRstrGrpId": item.offerRstrGrpId,
                            "rstrObjType": "110000",
                            "rstrObjId": this.componentData.offerId,
                            "rstrType": item.rstrType,
                            "createStaff": this.createStaff,
                            "updateStaff": this.createStaff,
                            "statusCd": this.statusCd,
                            "offerCompRstrCfgs": OfferCompRstrCfgs
                        }).then(res => {
                            if(res.data.success) {
                                this.$message.success({ message: '修改成功！' });
                                this.getoffeProdRel()
                            } else {
                                this.$message.error({ message: '修改失败！' });
                                this.getoffeProdRel()
                            }
                        })
                    } else {
                        let offerIdArr = []
                        offerIdArr.push(this.componentData.offerId)
                        let OfferCompRstrCfgs = []
                        for(let elemen of offerCompArr) {
                            let OfferCompRstrCfgsObj = {
                                "offerCompRstrCfgId": -1,
                                "offerProdRelId": elemen.offerProdRelId,
                                "offerRstrGrpId": -1
                            }
                            OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                        }
                        this.$axios.post(this.$api.replace(this.$api.PostOfferRstrGrp, ['{offerId}'], offerIdArr), {
                            "offerRstrGrpId": -1,
                            "rstrObjType": "110000",
                            "rstrObjId": this.componentData.offerId,
                            "rstrType": item.rstrType,
                            "createStaff": this.createStaff,
                            "updateStaff": this.createStaff,
                            "statusCd": this.statusCd,
                            "offerCompRstrCfgs": OfferCompRstrCfgs
                        }).then(res => {
                            if(res.data.success) {
                                this.$message.success({ message: '保存成功！' });
                                this.getoffeProdRel()
                            } else {
                                this.$message.error({ message: '保存失败！' });
                                this.getoffeProdRel()
                            }
                        }).catch(error => {
                            this.$message.error({ message: error.response.data.msg })
                        })

                    }
                } else {
                    this.showdelLimit(item)
                }

            },

            //销售品配置构成列表查询
            offerProdRelPages(page, prodName) {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                this.$axios.get(this.$api.replace(this.$api.OfferProdRelPage, ['{offerId}'], offerIdArr), {
                    params: {
                        parOfferProdRelId: 0,
                        prodName: prodName,
                        statusCd: this.statusCd,
                        page: page,
                        limit: this.qryConstitutePageObj.pageSize
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.offeProdRelPage.content) {
                            this.qryordAttr = [...res.data.offeProdRelPage.content]
                            this.qryConstituteList = [...res.data.offeProdRelPage.content]
                        }
                        this.qryAttrPageObj.pageIndex = res.data.offeProdRelPage.page
                        this.qryAttrPageObj.rowCount = res.data.offeProdRelPage.total
                        this.qryConstitutePageObj.pageIndex = res.data.offeProdRelPage.page
                        this.qryConstitutePageObj.rowCount = res.data.offeProdRelPage.total
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            //展示删除限制弹框
            showdelLimit(val) {
                if(!val.offerRstrGrpId) {
                    this.offerRstrList.splice(this.offerRstrList.indexOf(val), 1)
                } else {
                    let offerIdArr = []
                    offerIdArr.push(this.componentData.offerId)
                    offerIdArr.push(val.offerRstrGrpId)
                    this.$axios.delete(this.$api.replace(this.$api.DeleteOfferRstrGrp, ['{offerId}', '{offerRstrGrpId}'], offerIdArr), {
                        params: {
                            "updateStaff": this.createStaff
                        }
                    }).then(res => {
                        if(res.data.success) {
                            this.$message.success({ message: '删除成功！' });
                            this.getoffeProdRel()
                        } else {
                            this.$message.error({ message: '删除失败！' });
                        }
                    }).catch(error => {
                        this.$message.error({ message: error.response.data.msg })
                    })
                }
            },

            //展示添加业务流程弹窗
            showAddFlow() {
                this.serviceOfferName = ""
                this.prodService(this.prodObj.prodId, this.prodServiceObj.pageIndex, this.prodServiceObj.pageSize)
                this.$refs.leftDialog.removeClickEvent();
                this.$refs.leftLeafDialog.removeClickEvent();
                this.offerServiceArr = []
                for(let ele of this.offerServiceList) {
                    let offerServiceObj = {
                        "serviceOfferId": ele.serviceOfferId,
                        "serviceOfferNbr": ele.standardCd,
                        "serviceOfferName": ele.serviceOfferName,
                        "offerProdRelId": ele.offerProdRelId,
                        "offerProdServiceRstrCfgId": ele.offerProdServiceRstrCfgId
                    }
                    this.offerServiceArr.push(offerServiceObj)
                }
                this.$refs.addFlow.show();
            },
            delAddFlow(val) {
                this.tipflowInfo.msg = `确认要删除吗？`;
                this.tipflowInfo.showBtn.clear = true;
                this.tipflowInfo.showBtn.save = true;
                this.tipflowInfo.item = val
                this.$refs.tipflow.show()
            },
            tipflowConfirm() {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(this.tipflowInfo.item.offerProdRelId)
                offerIdArr.push(this.tipflowInfo.item.offerProdServiceRstrCfgId)
                this.$axios.delete(this.$api.replace(this.$api.DelOfferProdServiceRstr, ['{offerId}', '{offerProdRelId}', '{offerProdServiceRstrCfgId}'], offerIdArr), {
                    params: {
                        "updateStaff": this.createStaff
                    }
                }).then(res => {
                    this.$refs.tipflow.hide()
                    if(res.data.success) {
                        this.$message.success({ message: '删除成功！' });
                        this.offerProdService()
                    } else {
                        this.$message.error({ message: '删除失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })

            },
            closeconstraint() {
                this.offerServiceArr = []
                this.$refs.leftDialog.addClickEvent();
                this.$refs.leftLeafDialog.addClickEvent();
                this.$refs.addFlow.hide();
            },
            //展示添加一次性费用弹窗
            showAddOnceMoney() {
                this.$refs.addOnceMoney.show();
            },
            //展示查看属性值
            showSeeAttr() {
                this.$refs.seeAttr.show();
            },
            //产品下的属性列表
            QryProductAttrValueDetail(pageIndex, pageSize) {
                this.$axios.get(this.$api.replace(this.$api.QryProductAttrDetail,['{prodId}','{prodAttrId}'],[this.prodObj.prodId,this.qureyAttrCheck.prodAttrId]), {
                    params: {
                        'prodId': this.prodObj.prodId,
                        "prodAttrId": this.qureyAttrCheck.prodAttrId,
                        "attrValueName":this.attrValSearchObj.attrValueName,
                        "page":pageIndex,
                        "limit": pageSize
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.prodAttrs.prodAttrValues.content) {
                            this.qryProductAttrValueList = res.data.prodAttrs.prodAttrValues.content
                        }
                    }else{
                        this.$message.error({message:res.data.msg})
                    }
                    this.ProductAttrValueDetailPageObj = {
                        pageIndex:  res.data.prodAttrs.prodAttrValues.page,
                        pageSize: res.data.prodAttrs.prodAttrValues.limit,
                        rowCount: res.data.prodAttrs.prodAttrValues.total
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            //产品下的属性值列表
            QryProductAttrDetail(pageIndex, pageSize) {
                this.$axios.get(this.$api.replace(this.$api.QryProdAttrList,['{prodId}'],[this.prodObj.prodId]), {
                    params: {
                        isAttrValue:0,
                        isPortalVisible:1,
                        prodId: this.prodObj.prodId,
                        attrName: this.attrValSearchObj.attrName,
                        page: pageIndex,
                        limit: pageSize
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.prodAttrs.content) {
                            this.qryProductAttrList = res.data.prodAttrs.content
                        }
                    }else{
                        this.$message.error({message:res.data.msg})
                    }
                    this.ProductAttrDetailPageObj = {
                        pageIndex: res.data.prodAttrs.page,
                        pageSize: res.data.prodAttrs.limit,
                        rowCount: res.data.prodAttrs.total
                    }

                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            //新增构成成员属性/修改构成成员属性
            postOfferProdAttr() {
                let attrRestrictValues = []
                for(let ele of this.qryProductAttrCheck) {
                    let attrRestrictValuesObj = {
                        "attrValueId": ele.attrValueId,
                        "statusCd": this.statusCd,
                        "createStaff": this.createStaff,
                        "updateStaff": this.createStaff
                    }
                    attrRestrictValues.push(attrRestrictValuesObj)
                }
                let offerProdRelId = ""
                if(this.prodType == "root") {
                    offerProdRelId = this.offerProdRelId
                } else {
                    offerProdRelId = this.offerleafProdRelId
                }
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(offerProdRelId)
                this.$axios.post(this.$api.replace(this.$api.PostOfferProdAttrValRest, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                    "offerProdRelId": offerProdRelId,
                    "attrId": this.qureyAttrCheck.attrId,
                    "prodId": this.prodObj.prodId,
                    "minValue": this.attrvalObj.minValue,
                    "maxValue": this.attrvalObj.maxValue,
                    "autoTrigger": this.attrvalObj.autoTrigger,
                    "attrRestrictValues": attrRestrictValues,
                    "createStaff": this.createStaff,
                    "statusCd": this.statusCd,
                    "updateStaff": this.createStaff
                }).then(res => {
                    this.$refs.leftDialog.addClickEvent();
                    this.$refs.leftLeafDialog.addClickEvent();
                    if(res.data.success) {
                        this.$message.success({ message: '保存成功！' });
                        this.GetOfferProdAttrValRest(offerProdRelId)
                    } else {
                        this.$message.error({ message: '保存失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: '保存失败！' });
                })
            },
            //修改属性值
            moreProdAttr(val) {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(val.offerProdRelId)
                offerIdArr.push(val.restrictId)
                this.$axios.get(this.$api.replace(this.$api.GetOfferProdAttrValRestDetail, ['{offerId}', '{offerProdRelId}', '{restrictId}'], offerIdArr), {}).then(res => {
                    if(res.data.success) {
                        if(res.data.offerProdAttrValRest.attrRestrictValues) {
                            this.qryAttrValueList = res.data.offerProdAttrValRest.attrRestrictValues
                            this.$nextTick(() => {
                                this.$refs.seeAttr.show();
                                this.$refs.leftDialog.removeClickEvent();
                                this.$refs.leftLeafDialog.removeClickEvent();
                            })
                        }
                    } else {

                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            //删除属性值
            delprodAttr(val) {
                this.tipattrInfo.msg = `确认要删除吗？`;
                this.tipattrInfo.showBtn.clear = true;
                this.tipattrInfo.showBtn.save = true;
                this.tipattrInfo.item = val
                this.$refs.tipattr.show()
            },
            tipattrConfirm() {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                offerIdArr.push(this.tipattrInfo.item.offerProdRelId)
                offerIdArr.push(this.tipattrInfo.item.restrictId)
                this.$axios.delete(this.$api.replace(this.$api.DelOfferProdAttrValRest, ['{offerId}', '{offerProdRelId}', '{restrictId}'], offerIdArr), {
                    params: {
                        "updateStaff": this.createStaff
                    }
                }).then(res => {
                    this.$refs.tipattr.hide()
                    if(res.data.success) {
                        this.$message.success({ message: '删除成功！' });
                        this.GetOfferProdAttrValRest(this.tipattrInfo.item.offerProdRelId)
                    } else {
                        this.$message.error({ message: '删除失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            //展示添加属性值弹窗(第一步)
            showAddAttr1() {
                this.qureyAttrCheck = ""
                this.attrvalObj.minValue = ""
                this.attrvalObj.maxValue = ''
                this.attrvalObj.autoTrigger = "1"
                this.attrValSearchObj.attrName = ''
                this.QryProductAttrDetail(this.ProductAttrDetailPageObj.pageIndex, this.ProductAttrDetailPageObj.pageSize)
                this.$refs.leftDialog.removeClickEvent();
                this.$refs.leftLeafDialog.removeClickEvent();
                this.$refs.addAttr2.hide();
                this.$refs.addAttr1.show();
            },
            showpreAttr() {
                this.$refs.leftDialog.removeClickEvent();
                this.$refs.leftLeafDialog.removeClickEvent();
                this.$refs.addAttr2.hide();
                this.$refs.addAttr1.show();
            },
            //展示添加属性值弹窗(第二步)
            showAddAttr2() {
                if(this.qureyAttrCheck.length == 0) {
                    this.$message.error({ message: '请选择属性！' });
                } else {
                    this.$validator.validateAll('tabAttr').then((result) => {
                        if(result) {
                            this.qryProductAttrCheck = []
                            this.attrValSearchObj.attrValueName = ''
                            this.QryProductAttrValueDetail(this.ProductAttrValueDetailPageObj.pageIndex, this.ProductAttrValueDetailPageObj.pageSize)
                            this.$refs.leftDialog.removeClickEvent();
                            this.$refs.leftLeafDialog.removeClickEvent();
                            this.$refs.addAttr1.hide();
                            this.$refs.addAttr2.show();
                        }
                    })
                }
            },
            addAttrConfirm() {
                
                this.$refs.leftDialog.addClickEvent();
                this.$refs.leftLeafDialog.addClickEvent();
                this.$refs.addAttr1.hide();
                this.$refs.addAttr3.hide();
            },
            addofferAttr() {
                if(this.qureyAttrCheck.length == 0) {
                    this.$message.error({message:'请选择属性'})
                    return
                }
                this.postOfferProdAttr()
                this.$refs.leftDialog.addClickEvent();
                this.$refs.leftLeafDialog.addClickEvent();
                this.$refs.addAttr1.hide();
                this.$refs.addAttr2.hide();
            },
            cancelAttr() {
                this.$refs.leftDialog.addClickEvent();
                this.$refs.leftLeafDialog.addClickEvent();
                this.$refs.addAttr1.hide();
            },
            //根产品分页改变
            pageChange(val) {
                this.pageProductObj.pageIndex = val
                this.qureyProdList(this.pageProductObj.pageIndex, this.pageProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
            },
            pageLeafChange(val) {
                this.pageleafProductObj.pageIndex = val
                this.qureyProdList(this.pageleafProductObj.pageIndex, this.pageleafProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
            },
            pageAttrChange(val) {
                this.ProductAttrDetailPageObj.pageIndex = val
                this.QryProductAttrDetail(this.ProductAttrDetailPageObj.pageIndex, this.ProductAttrDetailPageObj.pageSize)
            },
            pageAttrValueChange(val) {
                this.ProductAttrValueDetailPageObj.pageIndex = val
                this.QryProductAttrValueDetail(this.ProductAttrValueDetailPageObj.pageIndex, this.ProductAttrValueDetailPageObj.pageSize)
            },
            pageServiceChange(val) {
                this.prodServiceObj.pageIndex = val
                this.prodService(this.prodObj.prodId, this.prodServiceObj.pageIndex, this.prodServiceObj.pageSize)
            },
            //新增业务流程
            addFlow(val) {

                let offerServiceObj = {
                    "serviceOfferId": val.serviceOfferId,
                    "serviceOfferNbr": val.serviceOfferNbr,
                    "serviceOfferName": val.serviceOfferName,
                    "offerProdServiceRstrCfgId": "",
                    "offerProdRelId": ""
                }
                this.offerServiceArr.push(offerServiceObj)
            },
            //删除业务流程
            delflow(val) {
                this.offerServiceArr.splice(this.offerServiceArr.indexOf(val), 1)
            },
            selectMkt(val) {
                return this.offerServiceArr.find(item => item.serviceOfferId == val.serviceOfferId)
            },
            unselectMkt(val) {
                this.offerServiceArr.splice(this.offerServiceArr.indexOf(val), 1)
                return this.offerServiceArr.find(item => item.serviceOfferId == val.serviceOfferId)
            },
            addConstitute(val) {
                let addConstituteObj = {
                    'prodName': val.prodName,
                    'offerProdRelId': val.offerProdRelId,
                    'rstrType': '1000'
                }
                this.offerRstrSelectList.push(addConstituteObj)
            },
            delConstitute(val) {
                this.offerRstrSelectList.splice(this.offerRstrSelectList.indexOf(val), 1)
            },
            selectProd(val) {
                return this.offerRstrSelectList.find(item => item.offerProdRelId == val.offerProdRelId)
            },

            //产品业务约束配置
            constraintDialogSubmit() {
                let ProdDisposableFeeS = []
                ProdDisposableFeeS.push(this.componentData.offerId)
                ProdDisposableFeeS.push(this.offerProdRelId)
                let offerProdServiceRstrs = []
                for(let ele of this.offerServiceArr) {
                    let offerProdServiceObj = {
                        "serviceOfferId": ele.serviceOfferId,
                        "createStaff": this.createStaff,
                        "updateStaff": this.createStaff,
                        'statusCd': this.statusCd
                    }
                    offerProdServiceRstrs.push(offerProdServiceObj)
                }

                this.$axios.post(this.$api.replace(this.$api.PostOfferProdServiceRstr, ['{offerId}', '{offerProdRelId}'], ProdDisposableFeeS), {
                    "offerProdServiceRstrs": offerProdServiceRstrs
                }).then(res => {
                    if(res.data.success) {
                        this.$refs.addFlow.hide();
                        this.$message.success({ message: '保存成功！' });
                        this.offerProdService()
                    }
                })
            },
            addConstituteDialogSubmit() {
                let offerIdArr = []
                offerIdArr.push(this.componentData.offerId)
                let OfferCompRstrCfgs = []
                for(let val of this.offerRstrSelectList) {
                    let OfferCompRstrCfgsObj = {
                        "offerCompRstrCfgId": -1,
                        "offerProdRelId": val.offerProdRelId,
                        "offerRstrGrpId": -1

                    }
                    OfferCompRstrCfgs.push(OfferCompRstrCfgsObj)
                }
                this.$axios.post(this.$api.replace(this.$api.PostOfferRstrGrp, ['{offerId}'], offerIdArr), {
                    "offerRstrGrpId": "-1",
                    "rstrObjType": "110000",
                    "rstrObjId": this.componentData.offerId,
                    "rstrType": this.qryConstituteSelect,
                    "createStaff": this.createStaff,
                    "updateStaff": this.createStaff,
                    "statusCd": this.statusCd,
                    "offerCompRstrCfgs": OfferCompRstrCfgs
                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ message: '保存成功！' });
                        this.$refs.addLimit.hide();
                        this.getoffeProdRel()
                    } else {
                        this.$message.error({ message: '保存失败！' });
                        this.getoffeProdRel()
                    }
                })

            },
            checkAll() {
                this.qryProductAttrValueList.forEach( item => {
                    if(!this.qryProductAttrCheck.find(cItem => cItem.attrValueId == item.attrValueId)) {
                        this.qryProductAttrCheck.push(item)
                    }
                })
            },
            unCheckAll() {
                this.qryProductAttrValueList.map( item => {
                    this.qryProductAttrCheck = this.qryProductAttrCheck.filter( bItem => bItem.attrValueId != item.attrValueId)
                })
            },
            
            addAttr(val) {
                this.qryProductAttrCheck.push(val)
            },
            delAttr(val) {
                this.qryProductAttrCheck.splice(this.qryProductAttrCheck.indexOf(val), 1)
            },
            selectAttr(val) {
                return this.qryProductAttrCheck.find(item => item.attrValueId == val.attrValueId)
            },
            unselectAttr(val) {
                this.qryProductAttrCheck = this.qryProductAttrCheck.filter(item => item.attrValueId != val.attrValueId)
            },

            //删除构成成员
            del(val) {
                this.tiprootInfo.msg = `确认要删除吗？`;
                this.tiprootInfo.showBtn.clear = true;
                this.tiprootInfo.showBtn.save = true;
                this.tiprootInfo.item = val
                this.$refs.tiproot.show()
            },
            tiprootConfirm() {
                let offerIdArr = []
                offerIdArr.push(this.tiprootInfo.item.offerId)
                offerIdArr.push(this.tiprootInfo.item.offerProdRelId)
                this.$axios.delete(this.$api.replace(this.$api.DeleteOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                    params: {
                        "updateStaff": this.createStaff
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ message: '删除成功！' });
                        this.$refs.tiproot.hide()
                        this.getoffeProdRel()
                    } else {
                        this.$message.error({ message: '删除失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            delChild(val) {
                this.tipleafInfo.msg = `确认要删除吗？`;
                this.tipleafInfo.showBtn.clear = true;
                this.tipleafInfo.showBtn.save = true;
                this.tipleafInfo.item = val
                this.$refs.tipleaf.show()
            },
            tipleafConfirm() {
                let offerIdArr = []
                offerIdArr.push(this.tipleafInfo.item.offerId)
                offerIdArr.push(this.tipleafInfo.item.offerProdRelId)
                this.$axios.delete(this.$api.replace(this.$api.DeleteOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
                    params: {
                        "updateStaff": this.createStaff
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ message: '删除成功！' });
                        this.$refs.tipleaf.hide()
                        this.getoffeProdRel()
                    } else {
                        this.$message.error({ message: '删除失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            openNode(val) {
                this.offeProdRelDetail(val)
                this.prodOpenArray = []
                if(this.prodOpenArray.indexOf(val.offerProdRelId) > -1) {
                    this.prodOpenArray = this.prodOpenArray.filter(item => item != val.offerProdRelId);
                } else {
                    this.prodOpenArray.push(val.offerProdRelId);
                }
            },
            prodIsOpen(val) { //是不是展开
                return this.prodOpenArray.indexOf(val.offerProdRelId) > -1;
            },
            getEstimateTemplateType(){
                //根据构成移动电话、有限宽带返回毛利预估模板类型
                let yx = this.offeProdRelArr.find( item => item.prodNbr == '6600117000');
                let yd = this.offeProdRelArr.find( item => item.prodNbr == '6600001000');
                if(yx && yd){
                    return 30;
                }else if(yx){
                    return 20;
                }else{
                    return 10;
                }
            },
            leftDialogClose(){
                this.componentData.showRightTopClose = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    /*弹框容器*/
    
    .dialog-box {
        padding: 0 30px;
    }
    
    .attr-value {
        padding-top: 20px;
    }
    /*弹窗中的搜索框样式*/
    
    .search-dialog {
        position: relative;
        width: 50%;
        margin: 20px 0;
        span {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 30px;
            background: $mainColor url(images/search-btn.png) no-repeat center center;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
        }
    }
    /*清除浮动*/
    
    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
    
    .clearfix {
        *zoom: 1;
    }
    
    //构称信息
    .constitute {
        width: 100%;
        .radio-nofirst {
            margin-left: 20px;
        }
        .checkbox-nofirst {
            margin-left: 20px;
        }
        /*操作按钮*/
        .h-a-add {
            position: absolute;
            top: 10px;
            left: 135px;
            height: 30px;
        }
        .a-h-add {
            padding: 5px 0;
        }
        /*表头样式*/
        .v-t-title {
            color: #333;
            font-weight: bold;
            background-color: #f5fafd;
            border-top: 1px solid $mainColor;
            text-align: center;
        }
        //成员类表
        .info-list {
            .tab-tbody {
                .col {
                    button {
                        border: none;
                        outline: none;
                        font-size: 12px;
                        color: $mainColor;
                        background-color: transparent;
                        cursor: pointer;
                    }
                }
                //子集列表
                .child-list {
                    background-color: white;
                    padding-left: 0;
                    .v-t-title {
                        border: none;
                    }
                    .borderline {
                        width: 10px;
                        height: 40px;
                        border-bottom: 1px dashed #CCCCCC;
                        border-left: 1px dashed #CCCCCC;
                        float: left;
                        margin-top: -20px;
                        margin-left: 5px;
                    }
                    // .no-wrap {
                    //     overflow: hidden;
                    //     white-space: nowrap;
                    //     text-overflow: ellipsis;
                    // }
                }
                /*展开*/
                .col-show {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    i {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background: url("./images/bgsq.png") no-repeat;
                        background-size: cover;
                        cursor: pointer;
                    }
                    i.show2 {
                        background: url("./images/bgsq.png") no-repeat;
                        background-size: cover;
                    }
                }
                /*收起*/
                .col-hide {
                    font-size: 14px;
                    color: $mainColor;
                    i {
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        background: url("./images/hide-icon.png") no-repeat;
                        background-size: cover;
                        cursor: pointer;
                    }
                }
            }
        }
        //添加根产品
        .add-parent {
            padding-left: 30px;
            //头部
            .l-d-header {
                padding-top: 10px;
                i {
                    float: left;
                    width: 14px;
                    height: 14px;
                    margin-top: 4px;
                    margin-right: 10px;
                    background: url("./images/add-icon.png") no-repeat;
                    background-size: cover;
                }
                span {
                    color: #222222;
                    font-size: 16px;
                }
                button {
                    float: right;
                    width: 60px;
                    height: 30px;
                    margin-right: 50px;
                    border: none;
                    outline: none;
                    font-size: 12px;
                    color: white;
                    background-color: $mainColor;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            //选择产品
            .search {
                span {
                    color: #222222;
                    font-size: 14px;
                }
                /*下拉框*/
                .select {
                    display: inline-block;
                    width: 200px;
                    margin-right: 10px;
                    z-index: 2;
                }
                button {
                    width: 60px;
                    height: 30px;
                    margin-right: 50px;
                    border: none;
                    outline: none;
                    font-size: 12px;
                    color: white;
                    background-color: $mainColor;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            /*tab导航*/
            .nav-tab {
                padding-top: 10px;
                font-size: 0; //去除空隙
                span {
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    color: #999999;
                    line-height: 30px;
                    text-align: center;
                    font-size: 12px;
                    cursor: pointer;
                }
                .active {
                    position: relative;
                    top: 3px;
                    z-index: 1;
                    border: solid 1px #f0f0f0;
                    border-bottom: none;
                    border-top: solid 2px $mainColor;
                    color: $mainColor;
                    background-color: white;
                }
            }
            //导航列表盒子
            .nav-box {
                padding: 10px;
                border: solid 1px #f0f0f0;
                //添加按钮
                //加载更多
                .add-more {
                    width: 100%;
                    margin-top: 6px;
                    text-align: center;
                    span {
                        font-size: 14px;
                        color: $mainColor;
                        cursor: pointer;
                    }
                }
                .base-info {
                    padding-top: 20px;
                }
                //一次性费用
                .once-money {
                    //最新价格
                    .col {
                        input {
                            width: 50%;
                            height: 24px;
                            outline: none;
                        }
                    }
                }
            }
        }
        //添加限制构称信息弹框
        .add-limit,
        .add-flow,
        .add-once-money,
        .add-attr2 {
            .title-select {
                width: 100%;
                font-size: 14px;
                color: #a0d468;
                margin-bottom: 10px;
            }
            .col {
                .select {
                    width: 50%;
                    margin-left: 25%;
                    /deep/ .select-input {
                        height: 24px;
                    }
                }
                i.add {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("./images/dialog-add.png") no-repeat;
                    background-size: cover;
                    cursor: pointer;
                }
                i.del {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("./images/dialog-del.png") no-repeat;
                    background-size: cover;
                    cursor: pointer;
                }
            }
        }
        /*修改限制弹框*/
        .mod-limit {
            .dialog-box {
                min-height: 200px;
                .form-item {
                    line-height: 40px;
                    min-height: 40px;
                }
            }
        }
        /*添加属性第一步*/
        .add-attr1 {
            .dialog-box {
                padding: 0;
            }
            .search-dialog {
                width: 70%;
            }
            .left {
                width: 60%;
                float: left;
                padding: 0 20px;
                border-right: solid 1px #f6f6f6;
            }
            .right {
                width: 40%;
                float: right;
                padding: 0 20px;
                padding-top: 30px;
                .form-item {
                    line-height: 50px;
                    min-height: 50px;
                }
            }
        }
    }
    
    .tabcol {
        text-align: center;
        margin: 30px 0;
        .tabbtn {
            width: 185px;
            height: 40px;
            height: 40px;
            background-color: #fff;
            color: #777;
            font-family: MicrosoftYaHei-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            border: solid 1px #f6f7f9;
            text-align: center;
            outline: none;
            cursor: pointer;
            &.active {
                background-color: $mainColor;
                color: #fff;
            }
            &:hover {
                background-color: $mainColor;
                color: #fff;
            }
            &.active:hover {
                opacity: .8;
            }
        }
    }
    
    .span {
        padding: 0 5px;
        cursor: pointer;
    }
    
    .basic-info {
        padding: 20px 0;
    }
    
    .dialogconstraintContentBottomRow {
        width: 100%;
        margin-bottom: 10px;
    }
    
    .dialogconstraintContentBottomCol_3 {
        width: 20%;
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }
    
    .dialogconstraintContentBottomCol_4 {
        width: 33.33%;
        float: left;
    }
    
    .dialogconstraintContentBottomCol_9 {
        width: 80%;
        float: left;
    }
    
    .dialogconstraintContentBottomCol_9 select {
        width: 50%;
        height: 30px;
        line-height: 30px;
    }
    
    .dialogconstraintContentBottomCol_3.label {}
    
    .dialogconstraintContentBottomCol_3.item {}
    
    .itemBox {
        padding: 0 20px;
        margin-right: 20px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 15px;
        position: relative;
    }
    
    .item_icon_delete {
        position: absolute;
        top: -5px;
        right: 20px;
        cursor: pointer;
        font-style: normal;
    }
    
    .itemBox:hover {
        color: $mainColor;
    }
    
    em {
        margin-right: 5px;
        color: #eb4a1e;
        font-size: 12px;
        font-weight: bold;
        vertical-align: middle;
    }
    
    .add-box {
        padding: 10px 20px 20px !important;
        text-align: right;
    }
    
    .scroll.moreScroll {
        height: calc(100% - 135px);
    }
    
    .offCol {
        position: relative;
        background-color: #f6f7f9;
        margin-left: 10px;
        margin-top: 10px;
        cursor: pointer;
        .offIndex {
            position: absolute;
            top: -10px;
            left: -10px;
            width: 40px;
            height: 40px;
            text-align: center;
            background-color: $mainColor;
            font-family: MicrosoftYaHei-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #ffffff;
        }
        .offProdname {
            font-family: MicrosoftYaHei-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #333333;
            text-indent: 40px;
        }
        .offToggle {
            position: absolute;
            top: 10px;
            right: 20px;
            width: 10px;
            height: 10px;
            background: url(images/zhankai.png) no-repeat center;
            background-size: 10px 10px;
            &.active {
                background: url(images/shousuo.png) no-repeat center;
                background-size: 10px 10px;
            }
        }
    }
    
    .offColcontent {
        padding: 20px;
    }
    
    .moreleafRowcol {
        border-bottom: 2px solid $mainColor;
    }
    
    .moreleafcol {
        cursor: pointer;
        width: 100px;
        background-color: #dff1fc;
        border-radius: 6px 6px 0px 0px;
        margin-right: 10px;
        .moreleafIndex {
            width: 16px;
            height: 16px;
            background-color: #ffffff;
            border-radius: 50%;
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 16px;
            margin: 12px 5px 12px 15px;
            letter-spacing: 0px;
            color: $mainColor;
            text-align: center;
            float: left;
        }
        .moreleafname {
            float: left;
            width: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: $mainColor;
        }
        &.active {
            background-color: $mainColor;
            .moreleafIndex {
                background-color: #ffffff;
                color: $mainColor;
            }
            .moreleafname {
                color: #ffffff;
            }
        }
    }
    
    .moreleafcolcon {
        padding-top: 20px;
    }
    
    .sel-box {
        padding-bottom: 20px;
        width: 50%;
    }
    
    .rstrCol {
        &.col {
            min-height: initial;
            height: 22px;
        }
    }
    .searchAttr{
        width: 300px;
    }
    .app__table__inner {
        .no-wrap {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    
</style>