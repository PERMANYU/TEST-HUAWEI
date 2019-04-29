<template>
	<div class="basic">

		<Scroll  :isShowRight="false" ref="scroll">
            <!--头部-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>基本信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
					<Col :span='7'>
							<FormItem labelText="产品名称："
							:successMessageInline="false"
							:errorMessage="errors.first('prodName')"
							 :requiredIcon="true">
								<Input v-model.trim="productObj.prodName" data-vv-as="产品名称"  name="prodName" v-validate="'required|max:250'" ></Input>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品集团编码："
							:successMessageInline="false"
							:errorMessage="errors.first('prodNbr')"
							:requiredIcon="true">
								<Input v-model.trim="productObj.prodNbr" data-vv-as="产品集团编码" name="prodNbr"  v-validate="'required|numeric|max:20'"  ></Input>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品本地编码："
							:errorMessage="errors.first('prodLocalNbr')"
							:successMessageInline="false"
							 :requiredIcon="true"
							>
								<Input v-model.trim="productObj.prodLocalNbr" data-vv-as="产品本地编码" name="prodLocalNbr"   v-validate="'required|numeric|max:20'" ></Input>
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="管理级别："
							:errorMessage="errors.first('manageGrade')"
							:successMessageInline="false"
							:requiredIcon="true">
								<Select v-model.trim="productObj.manageGrade" name="manageGrade" data-vv-as="管理级别"  v-validate="'required'" :data="manageGradeOption"  class=""></Select>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品功能类型："
							:errorMessage="errors.first('prodFuncType')"
							:successMessageInline="false"
							>
								<Select v-model.trim="productObj.prodFuncType" name="prodFuncType" data-vv-as="产品功能类型"  v-validate="'required'" :data="prodFuncTypeOption"  class=""></Select>
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="计费产品分类："
							:requiredIcon="true"
							:errorMessage="errors.first('billProdType')"
							:successMessageInline="false"

							>
								<Select v-model.trim="productObj.billProdType" name="billProdType" data-vv-as="计费产品分类"  v-validate="'required'" :data="billProdTypeOption"  class=""></Select>
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="产品主附类型："
							:errorMessage="errors.first('prodUseType')"
							:successMessageInline="false"
							:requiredIcon="true">
								<Select v-model.trim="productObj.prodUseType" name="prodUseType" data-vv-as="产品主附类型"  v-validate="'required'" :data="prodUseTypeOption"  class=""></Select>
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="生效时间："
							:errorMessage="errors.first('effDate')"
							:successMessageInline="false"
							:requiredIcon="true">
								<DatePicker :endDate="productObj.expDate"  v-model.trim="productObj.effDate"  name="effDate" data-vv-as="生效时间"  v-validate="'required'"   class=""></DatePicker>
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="失效时间："
							:errorMessage="errors.first('expDate')"
							:successMessageInline="false"
							:requiredIcon="true">
								<DatePicker :startDate="productObj.effDate"  v-model.trim="productObj.expDate"  name="expDate" data-vv-as="失效时间"  v-validate="'required'"  class=""></DatePicker>
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="产品构成类型："
							:errorMessage="errors.first('prodCompType')"
							:successMessageInline="false"
							:requiredIcon="true">
								<Select  v-model.trim="productObj.prodCompType" name="prodCompType" data-vv-as="产品构成类型"  v-validate="'required'" :data="prodCompTypeOption"  ></Select>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="目录位置："
							:errorMessage="errors.first('catalogItemName')"
							:successMessageInline="false"
							:requiredIcon="true">
								<Input readonly @click.stop.native="showCatalogSelect()" name="catalogItemName" data-vv-as="目录位置"  v-validate="'required'" v-model.trim="catalogEnd.catalogItemName"   class=""></Input>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="是否独立销售："
							:errorMessage="errors.first('ifIndependentSale')"
							:successMessageInline="false"
							:requiredIcon="true">
								<Select  v-model.trim="productObj.ifIndependentSale" name="ifIndependentSale" data-vv-as="是否独立销售"  v-validate="'required'" :data="ifIndependentSaleOption"  ></Select>
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="上架系统："  >
								<ul class="selected" :class="{open:systemSelectedOpen}" @click.stop.self="showSystemSelect()">
								<img @click="systemSelectedOpen=!systemSelectedOpen" src="./images/info-down.png" alt="展开">
								<li v-for="(item,index) in systemEnd" :key="index">{{item.platName}}
									<i @click="delSystem(item)" class="el-icon el-icon-close"></i>
								</li>
								</ul>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="版本："

							:errorMessage="errors.first('version')"
							:successMessageInline="false"
							>
								<Input v-model.trim="productObj.version" name="version" disabled class=""></Input>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品ID："
							:errorMessage="errors.first('prodId')"
							:successMessageInline="false"
							>
								<Input readonly v-model.trim="productObj.prodId"  name="prodId" disabled class=""></Input>
							</FormItem>
					</Col>

				</Row>
                <Row>
                    <Col :span='24'>
                            <FormItem labelText="产品描述："  >
                                <textarea name="prodUpperPlats" v-model.trim="productObj.prodDesc" class="app__textarea"
                                        v-validate="'max:250'"></textarea>
                            </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品扩展信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
					<Row>
						<Col :span='7'>
								<FormItem labelText="设备号获取方式："
								:errorMessage="errors.first('accNbrAcquisitionMode')"
								:successMessageInline="false"
								:requiredIcon="true">
								<Select v-model.trim="productObj.productExt.accNbrAcquisitionMode" name="accNbrAcquisitionMode" data-vv-as='设备获取方式' v-validate="'required'" :data="accNbrAcquisitionModeOption" ></Select>
								</FormItem>
						</Col>

						<Col :span='7' :offset="1">
								<FormItem labelText="是否前台代缴费："
								:errorMessage="errors.first('ifFrontDeskPay')"
								:successMessageInline="false"
                :requiredIcon="true"
								>
								<Select v-model.trim="productObj.productExt.ifFrontDeskPay" name="ifFrontDeskPay" data-vv-as='是否前台代缴费' v-validate="'required'" :data="chooseOption" ></Select>
								</FormItem>
						</Col>

						<Col :span='7' :offset="1">
								<FormItem labelText="是否独立安装："

								:errorMessage="errors.first('ifIndependInstall')"
								:successMessageInline="false"
								>
								<Select :disabled="productObj.prodUseType=='2000'" name="ifIndependInstall" :class="{disabled:productObj.prodUseType=='2000'}" v-model.trim="productObj.productExt.ifIndependInstall" :data="chooseOption" ></Select>
								</FormItem>
						</Col>
					</Row>

					<Row>
						<Col :span='7'>
								<FormItem labelText="是否独立开账："
								:errorMessage="errors.first('ifIndependAccount')"
								:successMessageInline="false"
								>
								<Select readonly disabled v-model.trim="productObj.productExt.ifIndependAccount" name="ifIndependAccount" :data="chooseOption" ></Select>
								</FormItem>
						</Col>
						<Col :span='7' :offset="1">
								<FormItem labelText="是否作为资产跟踪："

								:errorMessage="errors.first('ifAssetTracking')"
								:successMessageInline="false"
								>
								<Select  :disabled="productObj.prodUseType=='1000'"  :class="{disabled:productObj.prodUseType=='1000'}" v-model.trim="productObj.productExt.ifAssetTracking" name="ifAssetTracking" :data="chooseOption" ></Select>
								</FormItem>
						</Col>
                        <Col :span='7' :offset="1">
								<FormItem labelText="是否发送IBP："
								:errorMessage="errors.first('isSendIbp')"
								:successMessageInline="false"
								>
								<Select   v-model.trim="productObj.productExt.isSendIbp" name="isSendIbp" :data="chooseOption" ></Select>
								</FormItem>
						</Col>
					</Row>

			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>平台信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
					<Row>
                        <Col :span='7'>
                            <FormItem labelText="平台机房物理地点："
                            :errorMessage="errors.first('platComputerAdress')"
                            :successMessageInline="false"
                            >
                                <Input v-model.trim="productObj.productExt.platComputerAdress" name="platComputerAdress" data-vv-as="field" v-validate="'max:100'" class=""></Input>
                            </FormItem>
                        </Col>
                        <Col :span='7' :offset="1">
                            <FormItem labelText="平台厂商："
                            :errorMessage="errors.first('platVendor')"
                            :successMessageInline="false"
                            >
                                <Input v-model.trim="productObj.productExt.platVendor" name="platVendor" data-vv-as="field" v-validate="'max:100'"  class=""></Input>
                            </FormItem>
                        </Col>
                        <Col :span='7' :offset="1">
                            <FormItem labelText="平台能力管理："
                            :errorMessage="errors.first('platCapabilityManage')"
                            :successMessageInline="false"
                            >
                                <Input v-model.trim="productObj.productExt.platCapabilityManage" name="platCapabilityManage" data-vv-as="field" v-validate="'max:100'" class=""></Input>
                            </FormItem>
                        </Col>
                    </Row>
                 <Row>
                    <Col :span='7'>
                        <div class="input-container">
                        <FormItem labelText="平台名称："
                        :errorMessage="errors.first('platName')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.platName" name="platName" data-vv-as="平台名称" v-validate="'required|max:50'" class=""></Input>
                        </FormItem>
                        </div>
                    </Col>
                    <Col :span='7' :offset="1">
                    <div class="input-container">
                        <FormItem labelText="平台系统编码："
                        :errorMessage="errors.first('platSysNbr')"
                        :successMessageInline="false"
                        :requiredIcon="true"
                        >
                            <Input v-model.trim="productObj.platSysNbr" name="platSysNbr" data-vv-as="平台系统编码" v-validate="'required|numeric|max:30'" class=""></Input>
                        </FormItem>
                    </div>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="平台系统ID："

                        :errorMessage="errors.first('platId')"
                        :successMessageInline="false"
                        >
                            <Input v-model.trim="productObj.platId" name="platId" data-vv-as="field" v-validate="'numeric|max:16'"  class=""></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span='7'>
                        <FormItem labelText="人工工单处理单位："

                        :errorMessage="errors.first('artificialTreatment')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.artificialTreatment" name="artificialTreatment" data-vv-as="人工工单处理单位" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="业务运营单位："

                        :errorMessage="errors.first('businessOpertation')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.businessOpertation" name="businessOpertation"  data-vv-as="业务运营单位" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="平台运维单位："

                        :errorMessage="errors.first('platPeration')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.platPeration" name="platPeration"  data-vv-as="平台运维单位" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>计费账务</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
                <Row>
                    <Col :span='7'>
                            <FormItem labelText="计费模式："

                            :errorMessage="errors.first('billingModel')"
                            :successMessageInline="false"
                            :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.billingModel" name="billingModel" data-vv-as="计费模式" v-validate="'required|max:100'"  class=""></Input>
                            </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="采集点说明："

                        :errorMessage="errors.first('acquisitionPointDesc')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.acquisitionPointDesc" name="acquisitionPointDesc" data-vv-as="采集点说明" v-validate="'required|max:100'"  class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="批价方式："

                        :errorMessage="errors.first('pricingMethod')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                        <Input v-model.trim="productObj.productExt.pricingMethod" name="pricingMethod" data-vv-as="批价方式" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span='7'>
                        <FormItem labelText="采集方式和调度："

                        :errorMessage="errors.first('acquisitionModeFrequency')"
                        :successMessageInline="false"
                        >
                            <Input v-model.trim="productObj.productExt.acquisitionModeFrequency" name="acquisitionModeFrequency" data-vv-as="field" v-validate="'max:100'"  class=""></Input>
                        </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>综合结算</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                    <FormItem labelText="结算要求："

                    :errorMessage="errors.first('settlementRequirement')"
                    :successMessageInline="false"
                    :requiredIcon="true">
                    <Input v-model.trim="productObj.productExt.settlementRequirement" name="settlementRequirement" data-vv-as="结算要求" v-validate="'required|max:100'" class=""></Input>
                    </FormItem>
                    </Col>
                 </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>管理流程</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                        <FormItem labelText="欠费催账流程："

                        :errorMessage="errors.first('arrearProcess')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.arrearProcess" name="arrearProcess" data-vv-as="欠费催账流程" v-validate="'required|max:100'"  class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="投诉处理流程："

                        :errorMessage="errors.first('complaintHabdProcess')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                            <Input v-model.trim="productObj.productExt.complaintHabdProcess" name="complaintHabdProcess" data-vv-as="投诉处理流程" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="售后服务流程："

                        :errorMessage="errors.first('altersaleProcess')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                        <Input v-model.trim="productObj.productExt.altersaleProcess" name="altersaleProcess" data-vv-as="售后服务流程" v-validate="'required|max:100'"  class=""></Input>
                        </FormItem>
                        </Col>
                </Row>

                <Row>
                    <Col :span='7'>
                            <FormItem labelText="收入归属及分摊方法："
                            labelWidth="135px"
                            :errorMessage="errors.first('attributionApportionment')"
                            :successMessageInline="false"
                            >
                            <Input v-model.trim="productObj.productExt.attributionApportionment" name="attributionApportionment" data-vv-as="field" v-validate="'max:100'"  class=""></Input>
                        </FormItem>
                    </Col>
                </Row>
			</Form>
            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>统计</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                        <div class="input-container">
                            <FormItem labelText="相关分析统计："

                            :errorMessage="errors.first('analysisStstistics')"
                            :successMessageInline="false"
                            :requiredIcon="true">
                                <Input v-model.trim="productObj.productExt.analysisStstistics" name="analysisStstistics" data-vv-as="相关分析统计" v-validate="'required|max:100'" class=""></Input>
                            </FormItem>

                        </div>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="合作单位结算方法："
                        :errorMessage="errors.first('settlementMethod')"
                        :successMessageInline="false"
                        :requiredIcon="true">
                        <Input v-model.trim="productObj.productExt.settlementMethod" name="settlementMethod" data-vv-as="合作单位结算方法" v-validate="'required|max:100'" class=""></Input>
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="产品适用区域："    >
                            <ul class="selected" :class="{open:areaSelectedOpen}" @click.stop.self="showAreaSelect()">
                            <img @click="areaSelectedOpen=!areaSelectedOpen" src="./images/info-down.png" alt="展开">
                            <li v-for="(area,index) in areaEnd" :key="index">{{area.regionName}}
                                <span @click="delArea(area)">X</span>
                            </li>
                        </ul>
                        </FormItem>
                    </Col> 
                </Row>
			</Form>
		</Scroll>
		<!--选择地域弹框-->
			<Dialog dialogTitle="选择地域" ref="areaSelect" @close="closeDialog()" @confirm="areaSure()">
				<Scroll :isShowRight="true" class="app__table" ref="scroll">
					<div class="i-area">
						<div class="i-title">
							<span>上海</span>
							<button @click="allSelect"><i></i>全选</button>
						</div>
						<div class="i-content">
							<div @click="clickArea(area)" class="area" :class="{activeArea: showActive(area)}"
								v-for="(area,index) in allArea" :key="index"><i></i>{{area.regionName}}
							</div>
						</div>
					</div>
				</Scroll>
			</Dialog>

			<!--选择上架系统弹框-->
			<Dialog dialogTitle="上架系统" ref="systemSelect" @close="closeDialog()" @confirm="systemSure()">
				<Scroll :isShowRight="true" class="app__table" ref="scroll">
					<div>
						<!--全部待选列表-->
						<div class="propertyWrap">
							<div class="">
								<Row class="app__table-thead">
									<Col :span="10">平台名称</Col>
									<Col :span="10">平台编码</Col>
									<Col :span="4">选中</Col>
								</Row>

								<Row class="app__table-item" v-for="(item, index) in allSystem" :key="item.platId" @click.native="clickSystem(item)">
									<Col :span="10">{{item.platName}}</Col>
									<Col :span="10">{{item.platSysNbr}}</Col>
									<Col :span="4">
									<i v-if="showYes(item)" class="el-icon el-icon-yes"></i>
									<i v-else class="el-icon el-icon-plus"></i>
									</Col>
								</Row>

								<Row class="app__data-none" v-show="allSystem.length < 1">
									<span>对不起，暂无数据</span>
								</Row>

								<Pagination :pageIndex="systemPageObj.pageIndex" :pageSize="systemPageObj.pageSize"
										:rowCount="systemPageObj.rowCount" @change="systemPageChange"
										v-show="allSystem.length > 0">
								</Pagination>
						</div>
						</div>

							<!--已选列表-->
						<div class="table-main selected-List" v-show="selectSystem.length > 0">
							<h6>选中结果</h6>
							<div class="propertyWrap">
								<div class="app__table">
									<Row class="app__table-thead">
										<Col :span="10">平台名称</Col>
										<Col :span="10">平台编码</Col>
										<Col :span="4">操作</Col>
									</Row>

									<Row class="app__table-item" v-for="(item, index) in selectSystem" :key="item.platId">
										<Col :span="10">{{item.platName}}</Col>
										<Col :span="10">{{item.platSysNbr}}</Col>
										<Col :span="4">
										<i @click="clickSystem(item)" class="icon icon-del"></i>
										</Col>
									</Row>
								</div>
							</div>
						</div>
					</div>
				</Scroll>
			</Dialog>

			<!--选择产品目录位置-->
			<Dialog dialogTitle="产品目录位置" ref="catalogSelect" @close="closeDialog()" @confirm="catalogSure()">
				<Scroll :isShowRight="true" class="i-catalog">
					<div class="i-content">
							<div>
								<Tree v-for="(item,index) in catalogData" v-model="selTemplateType" :keys="treeShowKeyItems" :folder="item" :key="index"  :children-str="'children'"  :init-level="1" :level-str="'level'" :isInputSel="true" :isLastInputSel="true" :inputSelObj="treeInputSelObj"></Tree>
					        </div>
                            <!--<div class="catalog-list">
                                <div class="first" v-for="(first,index) in catalogData" :key="index">
                                    <span @click.stop="showTree(first,1)">
                                        <i class="el-icon" :class="[first.children.length<1 ? 'iconSelect' : 'iconFile',
                                            {selectActive:first.catalogItemId==firstCatalogId&&first.children.length<1},
                                            {fileActive:first.catalogItemId==firstCatalogId&&first.children.length>=1}]"
                                        ></i>
                                        {{first.catalogItemName}}
                                    </span>

                                    <div v-show="first.catalogItemId==firstCatalogId" class="second"
                                        v-for="(second,index) in first.children" :key="index">
                                        <span @click.stop="showTree(second,2)">
                                            <i class="el-icon" :class="[second.children.length<1 ? 'iconSelect' : 'iconFile',
                                            {selectActive:second.catalogItemId==secondCatalogId&&second.children.length<1},
                                            {fileActive:second.catalogItemId==secondCatalogId&&second.children.length>=1}]"></i>

                                            {{second.catalogItemName}}
                                        </span>

                                        <div v-show="second.catalogItemId==secondCatalogId" class="third"
                                            v-for="(third,index) in second.children" :key="index">
                                            <span @click.stop="showTree(third,3)">
                                                <i class="el-icon iconSelect" :class="{selectActive:third.catalogItemId==thirdCatalogId}"></i>

                                                {{third.catalogItemName}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
						    </div>-->

                        <div class="app__data-none" v-show="catalogData.length < 1">
                            <span>对不起，暂无数据</span>
                        </div>
				    </div>
				</Scroll>
			</Dialog>
		</div>
</template>

<script type="text/javascript">
export default {
    props:{
      componentData:{},
      mainProdId: {
        type: String,
        default: ""
        }
    },
    data() {
        return {
        productObj: {
            prodUseType:'',
            prodId:'',
            prodFuncType:'',
            ifIndependentSale:'',
            productExt: {}
        },
        selTemplateType:'',
        treeShowKeyItems: [{ key: "catalogItemName" }],
        treeInputSelObj: {
            key: "catalogItemId",
            allArray: []
        },
        allSystem: [
        ],
        manageGradeOption: [
            { value: 10, label: "集团级" },
            { value: 11, label: "省级" },
            { value: 7, label: "本地网级" },
            { value: 13, label: "海外级" },
            { value: 14, label: "两级共管" }
        ],
        prodFuncTypeOption: [
            { value: 101, label: "接入类产品" },
            { value: 102, label: "功能类产品" },
            { value: 103, label: "内容类产品" },
            { value: 104, label: "资源类产品" },
            { value: 105, label: "服务类产品" },
            { value: 109, label: "其他类" }
        ],
        billProdTypeOption: [
            { value: 1000, label: "接入类产品" },
            { value: 2000, label: "单产品功能类产品" },
            { value: 2100, label: "组合功能类产品" },
            { value: 3000, label: "内容类产品" },
            { value: 4000, label: "资源类产品" },
            { value: 5000, label: "其他产品" },
            { value: 6000, label: "服务类产品" }
        ],
        prodUseTypeOption: [
            { value: 1000, label: "主" },
            { value: 2000, label: "附" },
            { value: 3000, label: "并存" }
        ],
        prodCompTypeOption: [
            { value: 10, label: "原子产品" },
            { value: 11, label: "产品组合" },
            { value: 7, label: "组合产品" },
            { value: 13, label: "群组产品" }
        ],
        ifIndependentSaleOption: [
            { value: 1000, label: "独立销售品" },
            { value: 2000, label: "捆绑销售品" }
        ],
        accNbrAcquisitionModeOption: [
            { value: 1000, label: "通过订单行项目录入" },
            { value: 2000, label: "号码选占" },
            { value: 3000, label: "后端完工返回生成" }
        ],
        chooseOption: [{ value: '1', label: "是" }, { value: '0', label: "否" }],
        productExt: {
            accNbrAcquisitionMode: "",
            ifFrontDeskPay: "",
            ifIndependInstall: "",
            ifIndependAccount: "",
            ifAssetTracking: "",
            isSendIbp:'',
            platComputerAdress: "",
            platVendor: "",
            platCapabilityManage: "",
            platPeration: "",
            artificialTreatment: "",
            businessOpertation: "",
            billingModel: "",
            acquisitionPointDesc: "",
            acquisitionModeFrequency: "",
            pricingMethod: "",
            settlementRequirement: "",
            arrearProcess: "",
            complaintHabdProcess: "",
            altersaleProcess: "",
            attributionApportionment: "",
            analysisStstistics: "",
            settlementMethod: ""
        },
        resultShowTip: false,
        catalogSelect: {
            catalogItemId: "",
            catalogItemName: ""
        },
        catalogEnd: {
            catalogItemId: "",
            catalogItemName: ""
        },
        firstCatalogId: "",
        secondCatalogId: "",
        thirdCatalogId: "",
        catalogData: [],

        searchObj: {
            platName: "",
            platSysNbr: ""
        },
        systemPageObj: {
            pageIndex: 1,
            pageSize: 10,
            rowCount: 0
        },
        platId: [],
        systemSelectedOpen: false,
        selectSystem: [], // 选中的编码列表
        systemEnd: [
            //                    {
            //                        platId: 1,
            //                        platName: "W"
            //                    }
        ], // 确定选中的系统
        areaSelectedOpen: false, // 是否展开
        applyRegionId: [], // 传给后台的的地域参数
        selectArea: [], // 选择的地域
        allArea: [
            {
            // 所有的地域
            applyRegionId: 8310101,
            regionName: "黄浦区"
            },
            {
            applyRegionId: 8310104,
            regionName: "徐汇区"
            },
            {
            applyRegionId: 8310105,
            regionName: "长宁区"
            },
            {
            applyRegionId: 8310106,
            regionName: "静安区"
            },
            {
            applyRegionId: 8310107,
            regionName: "普陀区"
            },
            {
            applyRegionId: 8310108,
            regionName: "闸北区"
            },
            {
            applyRegionId: 8310109,
            regionName: "虹口区"
            },
            {
            applyRegionId: 8310110,
            regionName: "杨浦区"
            },
            {
            applyRegionId: 8310112,
            regionName: "闵行区"
            },
            {
            applyRegionId: 8310113,
            regionName: "宝山区"
            },
            {
            applyRegionId: 8310114,
            regionName: "嘉定区"
            },
            {
            applyRegionId: 8310115,
            regionName: "浦东新区"
            },
            {
            applyRegionId: 8310116,
            regionName: "金山区"
            },
            {
            applyRegionId: 8310117,
            regionName: "松江区"
            },
            {
            applyRegionId: 8310118,
            regionName: "青浦区"
            },
            {
            applyRegionId: 8310120,
            regionName: "奉贤区"
            },
            {
            applyRegionId: 8310230,
            regionName: "崇明县"
            }
        ],
        areaEnd: [
            //                    {
            //                        applyRegionId: 8310115,
            //                        regionName: '浦东新区'
            //                    }
            ] // 确定选中的地域
        };
    },
    watch: {
        componentData:function(val,newValue){
            this.findMainData(val.prodId)
            this.productObj.prodId = val.prodId;
            this.$validator.reset();
        }
    },
    mounted() {
        this.findMainData();
        this.getAreaEnd();
        this.productObj.prodId = this.componentData.prodId;
    },
    methods: {
        dateTest(){
            if(this.productObj.effDate&&this.productObj.expDate){
                let effDate = new Date(this.productObj.effDate).getTime();
                let expDate = new Date(this.productObj.expDate).getTime();
                if(effDate - expDate > 0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        findMainData(prodId = '') { // 查询基本信息
            this.$axios
            .get(this.$api.replace(this.$api.QryOrdProductBasicInfo, ['{prodId}'], [this.componentData.prodId]),{
            params: {
//              prodId: prodId || this.componentData.prodId
            }
            })
            .then(res => {
            if (res.data.success == true) {
                if (!res.data.productBasicIfo.productExt) {
                res.data.productBasicIfo.productExt = this.productExt;
                }
                this.productObj = res.data.productBasicIfo;

                if (this.mainProdId != this.componentData.prodId) {
                this.productObj.ifIndependentSale =
                    this.productObj.ifIndependentSale == "1000" ? "1000" : "2000";
                }

                this.productObj.prodUseType = res.data.productBasicIfo.prodUseType;

                if(this.productObj.prodUseType == '1000'){
                    this.productObj.prodFuncType = 101;
                    this.productObj.ifIndependentSale = 1000;
                    this.productObj.productExt.ifIndependInstall = 1;
                    this.productObj.productExt.ifIndependAccount = 1;
                    this.productObj.productExt.ifAssetTracking = 1;
                }else{
                    this.productObj.prodFuncType = 102;
                    this.productObj.ifIndependentSale = 2000;
                    this.productObj.productExt.ifIndependInstall = 0;
                    this.productObj.productExt.ifIndependAccount = 0;
                    this.productObj.productExt.ifAssetTracking = 0;
                }
                this.productObj.expDate = this.productObj.expDate
                ? this.productObj.expDate
                : "2050-12-31";

                if (res.data.productBasicIfo.prodRegionRels) {
                this.areaEnd = res.data.productBasicIfo.prodRegionRels;
                }
                for(let ele of this.areaEnd){
                	for(let val of this.allArea){
                		if(ele.applyRegionId == val.applyRegionId){
                			ele.regionName = val.regionName
                		}
                	}
                }
                if (res.data.productBasicIfo.prodUpperPlats) {
                this.systemEnd = res.data.productBasicIfo.prodUpperPlats;
                }
                if (res.data.productBasicIfo.prodCatalogLocations.length>0) {
                this.catalogEnd =
                    res.data.productBasicIfo.prodCatalogLocations[0];
                this.catalogEnd.catalogItemName =
                    res.data.productBasicIfo.prodCatalogLocations[0].catalogItemName;
                }
                this.prodUseTypeChange();
            } else {
                this.$message.error({ message : res.data.msg})
            }
            })
            .then(res => {
                // this.$message.error({ message : res.data.msg})
            });
        },
        showSystemSelect() { // 弹出系统选择弹框
        this.selectSystem = [...this.systemEnd];
        this.$refs.systemSelect.show();
        this.systemPageChange(1);
        },
        systemPageChange(page) {
        this.systemPageObj.pageIndex = page;
        this.$axios
            .get(this.$api.QryPlatInfo, {
            params: {
                platName: this.searchObj.platName,
                platSysNbr: this.searchObj.platSysNbr,
                page: this.systemPageObj.pageIndex,
                limit: this.systemPageObj.pageSize
            }
            })
            .then(res => {
            if (res.data.success == true) {
                if (res.data.platInfos.content) {
                this.allSystem = res.data.platInfos.content;
                }
                this.systemPageObj.rowCount = res.data.platInfos.total;
            } else {
                this.$message.error({ message: res.data.msg });
            }
            })
            .catch(res => {
            });
        },
        showYes(item) {// 属性是否选中
        return this.selectSystem.filter(obj => obj.platId == item.platId)[0]
            ? true
            : false;
        },
        delSystem(item) {// 点击删除
        this.systemEnd = this.systemEnd.filter(obj => obj.platId != item.platId);
        },
        clickSystem(item) { // 点击系统（弹窗内）
        this.selectSystem.filter(obj => obj.platId == item.platId)[0]
            ? (this.selectSystem = this.selectSystem.filter(
                obj => obj.platId != item.platId
            ))
            : this.selectSystem.push(item);
        },
        save() {// 提交基本信息
            this.$validator.validateAll().then(result => {
            if (result && !this.dateTest()) {
                this.$axios
                .put(this.$api.replace(this.$api.ModProductBasicInfo2, ['{prodId}'], [this.componentData.prodId]), {
                    staff: this.staff,
                    prodId: this.componentData.prodId,
                    requirementId: this.requirementId,
                    prodLocalNbr: this.productObj.prodLocalNbr,
                    prodNbr: this.productObj.prodNbr,
                    prodName: this.productObj.prodName,
                    prodDesc: this.productObj.prodDesc,
                    manageGrade: this.productObj.manageGrade,
                    effDates: this.productObj.effDate,
                    expDates: this.productObj.expDate,
                    prodFuncType: this.productObj.prodFuncType,
                    billProdType: this.productObj.billProdType,
                    prodUseType: this.productObj.prodUseType,
                    prodCompType: this.productObj.prodCompType,
                    ifIndependentSale: this.productObj.ifIndependentSale,
                    catalogItemId: this.catalogEnd.catalogItemId,
                    platName: this.productObj.platName,
                    platId: this.productObj.platId,
                    platSysNbr: this.productObj.platSysNbr,
                    prodUpperPlats: this.systemEnd,

                    productExt: {
                    productExtId: this.productObj.productExt.productExtId ? this.productObj.productExt.productExtId : '',
                    prodId: this.componentData.prodId,
                    accNbrAcquisitionMode: this.productObj.productExt
                        .accNbrAcquisitionMode,
                    ifFrontDeskPay: this.productObj.productExt.ifFrontDeskPay,
                    ifIndependInstall: this.productObj.productExt
                        .ifIndependInstall,
                    ifIndependAccount: this.productObj.productExt
                        .ifIndependAccount,
                    ifAssetTracking: this.productObj.productExt.ifAssetTracking,
                    platComputerAdress: this.productObj.productExt
                        .platComputerAdress,
                    platVendor: this.productObj.productExt.platVendor,
                    platCapabilityManage: this.productObj.productExt
                        .platCapabilityManage,
                    platPeration: this.productObj.productExt.platPeration,
                    artificialTreatment: this.productObj.productExt
                        .artificialTreatment,
                    businessOpertation: this.productObj.productExt
                        .businessOpertation,
                    billingModel: this.productObj.productExt.billingModel,
                    acquisitionPointDesc: this.productObj.productExt
                        .acquisitionPointDesc,
                    acquisitionModeFrequency: this.productObj.productExt
                        .acquisitionModeFrequency,
                    pricingMethod: this.productObj.productExt.pricingMethod,
                    settlementRequirement: this.productObj.productExt
                        .settlementRequirement,
                    arrearProcess: this.productObj.productExt.arrearProcess,
                    complaintHabdProcess: this.productObj.productExt
                        .complaintHabdProcess,
                    altersaleProcess: this.productObj.productExt.altersaleProcess,
                    attributionApportionment: this.productObj.productExt
                        .attributionApportionment,
                    analysisStstistics: this.productObj.productExt
                        .analysisStstistics,
                    settlementMethod: this.productObj.productExt.settlementMethod,
                    isSendIbp: this.productObj.productExt.isSendIbp,
                    },
                    prodRegionRels: this.areaEnd
                }).then(res => {
                            if (res.data.success == true) {
                                this.$message.success({ message: '成功！'})
                            } else {
                                this.$message.error({ message: res.data.msg})
                            }
                        })
                    .catch(res => {
                    });
                }else{
                    this.scrollTo();
                }
            });
        },  
        allSelect() { // 地域全选
            if (this.selectArea.length < this.allArea.length) {
                this.selectArea = this.allArea;
            } else {
                this.selectArea = [];
            }
        },
        scrollTo() {
            console.log(this.$refs.scroll);
            this.$refs.scroll.setHeightScrollTop(0,0)
        },
        areaSure() {// 地域确定
        	for(let ele of this.selectArea){
        		for(let val of this.areaEnd){
        			if(ele.applyRegionId == val.applyRegionId){
        				val.prodRegionRelId = ele.prodRegionRelId
        			}
        		}
        	}
            this.areaEnd = [...this.selectArea];
            this.$refs.areaSelect.hide();
        },
        clickArea(item) {// 点击地域名
        this.selectArea.filter(obj => obj.applyRegionId == item.applyRegionId)[0]
            ? (this.selectArea = this.selectArea.filter(
                obj => obj.applyRegionId != item.applyRegionId
            ))
            : this.selectArea.push(item);
        },
        delArea(item) { // 删除地域
        this.areaEnd = this.areaEnd.filter(
            obj => obj.applyRegionId != item.applyRegionId
        );
        },
        showAreaSelect() { // 弹出区域选择框
        this.selectArea = [...this.areaEnd];
        this.$refs.areaSelect.show();
        },
        showActive(area) {
        return this.selectArea.filter(
            obj => obj.applyRegionId == area.applyRegionId
        )[0]
            ? true
            : false;
        },
        getAreaEnd() {// 根据applyRegionId获取areaEnd
            for (let i = 0; i < this.allArea.length; i++) {
                if (
                this.applyRegionId.filter(
                    obj => obj == this.allArea[i].applyRegionId
                )[0]
                ) {
                this.areaEnd.push(this.allArea[i]);
                }
            }
        },
        closeDialog() { // 关闭弹窗回调
        },
        systemSure() { // 选择系统确定
        this.systemEnd = [...this.selectSystem];
        this.$refs.systemSelect.hide();
        },
        prodUseTypeChange() {  // 改变产品主附类型
        if (this.productObj.prodUseType == "1000") {
            this.productObj.productExt.ifIndependInstall = "1";
            this.productObj.productExt.ifIndependAccount = "1";
            this.productObj.productExt.ifAssetTracking = "1";
        } else if (this.productObj.prodUseType == "2000") {
            this.productObj.productExt.ifIndependInstall = "0";
            this.productObj.productExt.ifIndependAccount = "0";
            this.productObj.productExt.ifAssetTracking = "0";
        }
        },
        showCatalogSelect() {  // 弹出目录选择框
        this.catalogSelect = {
            catalogItemId: "",
            catalogItemName: ""
        };
        this.firstCatalogId = "";
        this.secondCatalogId = "";
        this.thirdCatalogId = "";
        this.getCatalogList();
        this.$refs.catalogSelect.show();
        },

//        //获取目录列表
//        getCatalogList() {
//            this.$axios.post(this.$api.QryCatalogDetail, {
//                body: {
//                    catalogNbr: 800
//                }
//            }).then(res => {
//                if (res.data.code == 0) {
//                    this.catalogData = res.data.body.catalogItems;
//                } else {
//                    this.$message.error({ message : res.data.msg})
//                }
//            }).then(res => {

//            });
//        },

        //获取产品目录树
        getCatalogList() {
            this.$axios.get(this.$api.Catalog+'/10104',{
                params:{

                }
            }).then(res => {
                if (res.data.success) {
                    this.catalogData = res.data.catalogDetail.catalogItems||[];

                }else{
                    this.$message.error({message: res.data.msg})
                }
            }).catch( error => {
                this.$message.error({message: error.response.data.msg})
            })
        },


        catalogSure() {// 选择目录确定
        this.templateType = this.objCopy(this.selTemplateType);
        this.catalogEnd = this.templateType;
        this.$refs.catalogSelect.hide();
        },
        objCopy(obj) {
        let newObj = {};
        for(let attr in obj){
            newObj[attr] = obj[attr];
        }
        return newObj;
        }
    }
};
</script>

<style scoped lang="scss">
.basic {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;


   /*已选*/
    .selected {
      height: 30px;
      min-height: 30px;
      line-height: 30px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
       img {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 6px;
        right: 4px;
        cursor: pointer;
      }

      li {
        display: inline-block;
        line-height: 12px;
        padding: 2px 4px;
        margin-left: 4px;
        background-color: #f5fafd;
        border: solid 1px #23c9ff;
        border-radius: 4px;
        font-size: 12px;
        color: #23c9ff;

        .el-icon-close:before {
          content: "\E60F";
          color: #23c9ff;
          cursor: pointer;
        }
      }
    }
}
/*选择地域弹框*/
.i-area {
  padding: 10px 0;

  .i-title {
    border-bottom: solid 1px #f0f0f0;

    span {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: white;
      text-align: center;
      background-color: $mainColor;
      border-radius: 4px 4px 0 0;
    }
    button {
      float: right;
      width: 60px;
      height: 24px;
      line-height: 22px;
      font-size: 12px;
      color: $mainColor;
      background-color: white;
      border-radius: 4px;
      border: solid 1px $mainColor;
      outline: none;
      cursor: pointer;

      i {
        display: inline-block;
        width: 12px;
        height: 10px;
        background-image: url("./images/info-yes.png");
        background-size: 100% 100%;
        float: left;
        margin-top: 6px;
        margin-left: 6px;
      }
    }
  }

  .i-content {
    padding-top: 16px;
    padding-bottom: 10px;

    .area {
      text-align: center;
      display: inline-block;
      width: 20%;
      height: 24px;
      line-height: 22px;
      font-size: 12px;
      color: #333333;
      background-color: white;
      border-radius: 4px;
      border: solid 1px #d5d5d5;
      margin: 8px 2%;
      cursor: pointer;
    }
    label {
      position: absolute;
      left: 0;
      top: 0;
      height: 30px;
      line-height: 30px;
      width: 130px;
      text-align: right;
      color: #666666;
    }

    .activeArea {
      color: $mainColor;
      border: solid 1px $mainColor;

      i {
        display: inline-block;
        width: 12px;
        height: 10px;
        background-image: url("./images/info-yes.png");
        background-size: 100% 100%;
        float: left;
        margin-top: 6px;
        margin-left: 6px;
      }
    }
  }
}

</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  top: -100% !important;
}

  .icon {
		display: inline-block;
		width: 14px;
		height: 14px;
		background-size: 100% 100%;
		cursor: pointer;
	}
	.icon-del {
		width: 12px;
		height: 12px;
		background-image: url("./../../images/delete.png");
	}

	.icon-yes {
		width: 12px;
		height: 12px;
		background-image: url("./../../images/choose.png");
	}

	.icon-plus{
		width: 12px;
		height: 12px;
		background-image: url("./../../images/plus.png");
	}
</style>
