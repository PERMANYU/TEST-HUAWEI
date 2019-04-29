<template>
       <!--头部-->
    <div class="addAttr">
        <Scroll>
            <div class="t-header">
                <i></i>
                <span class="close" @click="pageClose()"></span>
                <span>添加属性</span>
            </div>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>基本信息</span>
			</div>
            <Form labelWidth="100px" labelAlign="left" class="attr_top">
                <Row>
                    <Col :span="7">
                        <FormItem labelText="选择对应接入类产品：" :requiredIcon="true" :errorMessage="errors.first('follow')">
                            <Select v-validate="'required'" :isSearch="true" :isNullSel="false" @load="replacefollow"  dataLabelStr="prodName"  dataValueStr="prodId"  :data="allAttrObj.followObj"  name="follow" data-vv-as="选择对应接入类产品：" v-model="allAttrObj.followProdId"></Select>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1">
                        <FormItem labelText="选择属性：" :requiredIcon="true" :errorMessage="errors.first('attr')">
                            <Select v-validate="'required'"  :isSearch="true" :isNullSel="false" @load="findProductAttrDetail" @more="moreProductAttrDetail"   name="attr" data-vv-as="选择属性" dataLabelStr="attrName" dataValueStr="attrId" :data="allAttrObj.attrSpecs"  v-model="allAttrObj.attrId"></Select>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1">
                        <FormItem labelText="付费方式："  >
                            <Select multiple  :isNullSel="false"    name="pay" :data="allPay" data-vv-as="付费方式" v-model="allAttrObj.paymentMode"></Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="7">
                        <FormItem labelText="客户类型："  >
                            <Select multiple  :isNullSel="false"  name="cust" :data="allCust" data-vv-as="客户类型" v-model="allAttrObj.custType"></Select>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1">
                        <FormItem labelText="是否必填：" :requiredIcon="true" :errorMessage="errors.first('ifNecessary')">
                            <Select :data="boolArray" v-validate="'required'" name="ifNecessary"  data-vv-as="是否必填" v-model="allAttrObj.ifNecessary"></Select>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1">
                        <FormItem labelText="是否允许变更：" :requiredIcon="true" :errorMessage="errors.first('ifToChange')">
                            <Select :data="boolArray" v-validate="'required'" name="ifToChange" data-vv-as="是否允许变更" v-model="allAttrObj.ifToChange" ></Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="7">
                        <FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('effDate')">
                            <DatePicker type="d" v-validate="'required'" name="effDate" data-vv-as="生效时间" v-model="allAttrObj.effDate" ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1">
                        <FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('expDate')">
                            <DatePicker type="d" v-validate="'required'" name="expDate" data-vv-as="失效时间" v-model="allAttrObj.expDate"  @input="attrEndDateChange(allAttrObj)"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col :span="7" :offset="1" v-show="determineVale() == 1000">
                        <FormItem labelText="默认值："  :errorMessage="errors.first('defaultValue')">
                            <Input type="d" v-validate="" name="defaultValue" data-vv-as="默认值" v-model="defaultValue"  ></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <div class="a_value" v-if="determineVale() == 2000">
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>属性列表</span>
                </div>
                <div class="selectbtn app__btn app__btn-add" @click="attrCommands()">添加</div>

                <div :class="['a_title_bottom',attrRadio.attrValueName ? 'active' : '']">
                    <div class="h-o-item">
                        已选中 <span class="h-o-count">{{this.attrRadio ? '1' : '0'}}</span> 项
                    </div>
                    <div class="h-o-item delete" @click="delChoose()">
                        删除
                    </div>
                </div>
                <Scroll :isShowRight="true" fixedTopClassName="m-title">
                    <div class="m-title a_table app__table">
                        <Row class='app__table-thead'>
                            <Col :span="6">默认值</Col>
                            <Col :span="7">属性名称</Col>
                            <Col :span="7">属性值</Col>
                            <Col :span="4">操作</Col>
                        </Row>

                        <Row class='app__table-item'  v-for="(item,index) in attrAfterValues" :key="index">
                            <Col :span="6"><Radio  name="item" :label="item"  v-model="attrRadio" :value="item" class="checkBox"></Radio></Col>
                            <Col :span="7">{{item.attrValueName  ? item.attrValueName : '无'}}</Col>
                            <Col :span="7">{{item.attrValue ? item.attrValue : '无'}}</Col>
                            <Col :span="4" class="blue-font">
                                <span  @click="delValue(item)">删除</span>
                            </Col>
                        </Row>
                        <Row class="app__data-none" v-show="!attrAfterValues.length">
                            <Col :span="24">
                                <span>暂无数据</span>
                            </Col>
                        </Row>
                    </div>
                </Scroll>
            </div>
            <div class="foot_box" v-if="determineVale() != 2000"></div>
            <div class="foot_btn">
                <Row>
                    <Col :span="19">
                    </Col>
                    <Col :span="2">
                        <span @click="attrTocancel()" class="app__btn app__btn-prev">取消</span>
                    </Col>
                    <Col :span="2">
                        <span @click="attrToConfirm()" class="app__btn app__btn-save">保存</span>
                    </Col>
                </Row>
            </div>
        </Scroll>




        <!-- 属性值列表 -->
		<Dialog :dialogTitle="dialogTitle" ref="addAttrVal" @confirm="addAttrValSubmitDialog()" @close="addAttrValCloseDialog">
            <Scroll>
                <div>
                    <div class="search">
                        <!-- <Search class="" :placeholder="'请输入搜索内容'"  @search="searchValueClick"></Search> -->
                    </div>
                    <div class="app__table" >
                        <Row class="app__table-thead">
                            <Col :span="12">属性值名称</Col>
                            <Col :span="8">属性值</Col>
                            <Col :span="4">操作</Col>
                        </Row>

                        <Row class="app__table-item" v-for="(item,index) in attrSpecsValues" :key="index" @click.stop.native="attrValueClick(item)">
                            <Col :span="12">{{item.attrValueName ? item.attrValueName : '无'}}</Col>
                            <Col :span="8">{{item.attrValue ? item.attrValue : '无'}}</Col>

                            <Col :span="4" class="blue-font">
                                <span :class="[attrValueSel(item) ? 'iconfont icon-xuanzhong-fang' : 'iconfont icon-weixuanzhong-fang']"  ></span>
                            </Col>
                        </Row>

                        <Row class="app__data-none" v-show="attrSpecsValues.length == 0">
                            <span>对不起，暂无数据</span>
                        </Row>
                    </div>
                </div>


				<div class="y-span" v-if="attrSpecsValuesSelTemp.length > 0">
					<Row class="bottom">
						<span>已选择</span>
					</Row>
                    <div class="app__table">
                        <Row class="app__table-thead">
                            <Col :span="12">属性值名称</Col>
                            <Col :span="8">属性值</Col>
                            <Col :span="4">操纵</Col>
                        </Row>

                        <Row class="app__table-item" v-for="(item,index) in attrSpecsValuesSelTemp" :key="index" >
                            <Col :span="12">{{item.attrValueName ? item.attrValueName : ''}}</Col>
                            <Col :span="8">{{item.attrValue ? item.attrValue : ''}}</Col>
                            <Col :span="4" class="blue-font">
                                <span  @click="attrValueClick(item)">删除</span>
                            </Col>
                        </Row>
                    </div>
				</div>

            </Scroll>
		</Dialog>

        <!-- 属性列表 -->
		<Dialog :dialogTitle="dialogTitle" ref="addAttr" :dialogSize="addAttrSize" @confirm="addAttrSubmitDialog()" @close="addAttrCloseDialog">
			<Scroll  class="attr_scroll">
                <div class="search">
                    <Search class="offer-sear" placeholder="请输入搜索内容" @search="attrSearchClick"></Search>
                </div>
                <div class="app__btn app__btn-add search_right" @click.stop.self="addAttrName">添加属性</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="8">属性编码</Col>
						<Col :span="8">属性名称</Col>
						<Col :span="4">属性类型</Col>
						<Col :span="4">操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in attrSpecss" :key="index">

						<Col :span="8">{{item.attrNbr ? item.attrNbr : '无'}}</Col>
						<Col :span="8">{{item.attrName ? item.attrName : '无'}}</Col>
						<Col :span="4">{{findAttrValueType(item.attrValueType)}}</Col>
						<Col :span="4">
                            <Radio  name="item" :label="item"  v-model="attrChoose" :value="item" class="checkBox"></Radio>
						</Col>
					</Row>

					<Row class="app__data-none" v-show="attrSpecss.length == 0">
		                <span>对不起，暂无数据</span>
		            </Row>
				</div>
				<Pagination :pageIndex="attrPageObj.pageIndex" :pageSize="attrPageObj.pageSize" :rowCount="attrPageObj.rowCount" @change="attrPageChange" v-show="attrSpecss.length > 0"></Pagination>
			</Scroll>
		</Dialog>



        <Dialog dialogTitle="添加属性" ref="addAttrName" :dialogSize="addAttrSize" :initBtn="true">
            <Scroll  class="">
                <div class="attr_table">
                    <Form labelWidth="100px" labelAlign="left" data-vv-scope="attrForm">
                        <Row>
                        	<Col :span="12">
                                <FormItem labelText="业务大类：" :requiredIcon="true" :errorMessage="errors.first('attrForm.busiTypeId')">
                                    <Input disabled name="busiTypeId" v-model="attrForm.busiTypeName"
                                           @click.native="showBusiType()" v-validate="'required'" data-vv-as="业务大类"></Input>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="属性编码：" :requiredIcon="true" :errorMessage="errors.first('attrForm.attrNbr')">
                                    <Input v-validate="'required'" name="attrNbr" v-model.trim="attrForm.attrNbr" data-vv-as="属性编码"></Input>
                                </FormItem>
							</Col>
                        </Row>
                        <Row>
                        	<Col :span="12">
                                <FormItem labelText="属性名称：" :requiredIcon="true" :errorMessage="errors.first('attrForm.attrName')">
                                    <Input v-validate="'required'" name="attrName" v-model.trim="attrForm.attrName" data-vv-as="属性名称"></Input>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="属性格式：" :requiredIcon="false" :errorMessage="errors.first('attrForm.attrFormat')">
                                    <Input v-validate="''" name="attrFormat" v-model.trim="attrForm.attrFormat" data-vv-as="属性格式"></Input>
                                </FormItem>
							</Col>
                        </Row>
                        <Row>
                        	<Col :span="12">
                                <FormItem labelText="属性长度：" :requiredIcon="true" :errorMessage="errors.first('attrForm.attrLength')">
                                    <Input v-validate="'required|numeric'" name="attrLength" v-model.trim="attrForm.attrLength" data-vv-as="属性长度"></Input>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="属性值类型：" :requiredIcon="true" :errorMessage="errors.first('attrForm.attrValueDataType')">
                                    <Select :data="attrValList" dataLabelStr="name" v-model="attrForm.attrValueDataType"
                                            v-validate="'required'" name="attrValueDataType" data-vv-as="属性值类型">
                                    </Select>
                                </FormItem>
							</Col>
                        </Row>
                        <Row>
                            <Col :span="12" >
                                <FormItem labelText="结束值：" :requiredIcon="false" :errorMessage="errors.first('attrForm.valueTo')">
                                    <Input v-validate="maxAttr" name="valueTo" v-model.trim="attrForm.valueTo" data-vv-as="结束值"></Input>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="属性值分类：" :requiredIcon="true">
                                    <Radio name="attrValueType" label="1000"
                                           v-model="attrForm.attrValueType">输入型</Radio>
                                    <Radio name="attrValueType" label="2000"
                                           v-model="attrForm.attrValueType">枚举型</Radio>
                                </FormItem>
							</Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="起始值：" :requiredIcon="false" :errorMessage="errors.first('attrForm.valueFrom')">
                                    <Input v-validate="minAttr" name="valueFrom" v-model.trim="attrForm.valueFrom" data-vv-as="起始值"></Input>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="唯一性：" :requiredIcon="true">
                                    <Radio name="isUnique" label="1"
                                           v-model="attrForm.isUnique">是</Radio>
                                    <Radio name="isUnique" label="0"
                                           v-model="attrForm.isUnique">否</Radio>
                                </FormItem>
							</Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="是否动态属性：" :requiredIcon="true">
                                    <Radio name="isDanyAttr" label="1"
                                           v-model="attrForm.isDanyAttr">是</Radio>
                                    <Radio name="isDanyAttr" label="0"
                                           v-model="attrForm.isDanyAttr">否</Radio>
                                </FormItem>
							</Col>
							<Col :span="12">
                                <FormItem labelText="是否可空：" :requiredIcon="true">
                                    <Radio name="isNullable" label="1"
                                           v-model="attrForm.isNullable">是</Radio>
                                    <Radio name="isNullable" label="0"
                                           v-model="attrForm.isNullable">否</Radio>
                                </FormItem>
							</Col>
                        </Row>
                    </Form>
                </div>
                <div class="a-v-title1" v-if="attrForm.attrValueType == '1000'">
					<span class="v-t-item app__tab active">添加属性值</span>
				</div>
				<div class="a-info" v-if="attrForm.attrValueType == '1000'">
					<Row >
						<Form labelWidth="110px">
							<Col :span="6">
                                <FormItem labelText="属性值：" :errorMessage="errors.first('attrForm.defaultValue')">
                                    <Input v-validate="'numeric'" name="defaultValue" v-model.trim="attrForm.defaultValue" data-vv-as="属性值"></Input>
                                </FormItem>
							</Col>
						</Form>
					</Row>
				</div>	
				<div class="a-value"  v-else>
						<div class="a-v-title2">
							<span class="v-t-item app__tab active">添加属性值</span>
							<div class="v-t-add">
								<div class="app__btn app__btn-add" @click="addAttrClick()">添加</div>
							</div>
						</div>

						<!-- <div :class="['a-v-operation',checkboxData.length > 0 ? 'active' : '']">
							<div class="v-o-item">已选中<span class="v-o-count">{{checkboxData.length}}</span>项</div>
							<div class="v-o-item delete" @click="listDelClick()">删除</div>
							<div class="v-o-item modify" @click="listModClick()">修改</div>
						</div> -->

						<div class="a-v-table app__table">
							<Row class="app__table-thead">
								<Col :span="2">默认值</Col>
								<Col :span="6" :offset="1">属性值名称</Col>
								<Col :span="5">属性值</Col>
								<Col :span="6">属性值描述</Col>
								<Col :span="4">操作</Col>
							</Row>

							<Row class="app__table-item"
								v-for="(item,index) in attrValData" :key="index" v-show="item.statusCd!='1100'">
								<Col :span="2">
									<Radio  :label="item" name="item" :value="item" v-model="checkboxData"></Radio>
								</Col>

								<Col :span="6" :offset="1">{{item.attrValueName}}</Col>
								<Col :span="5">{{item.attrValue}}</Col>
								<Col :span="6">{{item.attrValueDesc}}</Col>
								<Col :span="4">
									<span class="span" @click="modAttrClick(item,index)">修改</span>
									<span class="span" @click="delAttrClick(item,index)">删除</span>
								</Col>
							</Row>

							<!--暂无数据-->
							<div class="app__data-none" v-show="showNoData()">
								<span>暂无数据</span>
							</div>
						</div>
					</div>
			</Scroll>
            <template slot="btnBox">
                    <span class="save" @click="addAttrNameSubmitDialog()" v-if="showSubmitProperty">保存</span>
					<span class="save" @click="addAttrSubmitNext()" v-if="shownextProperty">下一步</span>
					<span class="back" @click="addAttrNameCloseDialog()">返回</span>
            </template>
        </Dialog>

        <Dialog dialogTitle="添加属性值" ref="addAttrValue" :dialogSize="addAttrSize"
            :initBtn="true">
            <Scroll  class="">
                <div class="attr_table">
                    <div class="app__title ">
                        <i class="iconfont icon-jibenxinxi"></i>
                        <span>基本信息</span>
                    </div>
                    <Row>
                        <Col :span="12">
                            <FormItem labelText="属性名称：">
                                {{addAttr.attrName}}
                            </FormItem>
                        </Col>
                        <Col :span="12">
                            <FormItem labelText="属性编码：">
                                {{addAttr.attrNbr}}
                            </FormItem>
                        </Col>
                    </Row>
                    <div class="app__title ">
                        <i class="iconfont icon-jibenxinxi"></i>
                        <span>属性取值</span>
                    </div>
                    <div class="selectbtn app__btn app__btn-add" @click="AddValue">添加</div>
                    <div class="selectbtn selectbtn_left app__btn app__btn-del" @click="delValueDialog">删除</div>
                    <div class="app__table">
                        <Row class="app__table-thead">
                            <Col :span="7">属性值</Col>
                            <Col :span="7">属性名称</Col>
                            <Col :span="7">属性值描述</Col>
                            <Col :span="3">操作</Col>
                        </Row>
                        <Row class="app__table-item" v-for="(item,index) in AttrSpecCFGData" :key="index">
                            <Col :span="7">{{item.attrValue}}</Col>
                            <Col :span="7">{{item.attrValueName}}</Col>
                            <Col :span="7">{{item.attrValueDesc}}</Col>
                            <Col :span="3">
                                <Radio  name="item" :label="item"  v-model="attrValueChoose" :value="item" class="checkBox"></Radio>
                            </Col>
                        </Row>
                        <Row class="app__data-none" v-show="AttrSpecCFGData.length == 0">
                            <span>对不起，暂无数据</span>
                        </Row>
                    </div>
                </div>
             </Scroll>
             <template slot="btnBox">
                    <span class="save" @click="addAttrNameSubmitDialog()">保存</span>
					<span class="save" @click="addAttrSubmitBack()" v-if="shownextProperty">上一步</span>
					<span class="back" @click="addAttrNameCloseDialog()">返回</span>
            </template>
        </Dialog>


        <Dialog dialogTitle="新增属性取值" ref="modAttrValue" @confirm="addAttrValueSubmit" @close="addAttrValueClose">
                <div class="attr_table">
                    <Form  data-vv-scope="addAttrValue">
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="属性值排序号：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueSort')">
                                    <Input name="attrValueSort" data-vv-as="属性值排序号码" v-validate="'required|max:3'" v-model.number.trim="addAttrValue.attrValueSort"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="属性值：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValue')">
                                    <Input name="attrValue" data-vv-as="属性值" v-validate="'required'" v-model.trim="addAttrValue.attrValue"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="属性值名称：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueName')">
                                    <Input name="attrValueName" data-vv-as="属性值名称" v-validate="'required'" v-model.trim="addAttrValue.attrValueName"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="属性值描述：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueDesc')">
                                    <Input name="attrValueDesc" data-vv-as="属性值描述" v-validate="'required|max:80'" v-model.trim="addAttrValue.attrValueDesc"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
        </Dialog>
        <!--选择业务大类弹框-->
			<Dialog dialogTitle="选择业务大类" :dialogSize="dialogSize" ref="busiTypeDialog" @confirm="confirmBusiType()">
				<div class="h-dialog-search">
					<Search placeholder="请输入业务大类、属性编码或属性名称" @search="searchBusi"></Search>
				</div>
				<div class="app__table">
				<Row class="app__table-thead">
					<Col :span="4">选择</Col>
					<Col :span="4">业务大类标识</Col>
					<Col :span="4">业务大类编码</Col>
					<Col :span="4">业务大类名称</Col>
                    <Col :span="4">状态</Col>
					<Col :span="4">版本号</Col>
				</Row>

				<Row class="app__table-item" v-for="(item,index) in busiTypeData" :key="index">
					<Col :span="4"><Radio :label="item" :value="item" name="item" v-model="busiTypeObj"></Radio></Col>

					<Col :span="4" class="app__cut-txt" :title="item.busiTypeId">{{item.busiTypeId}}</Col>
					<Col :span="4">{{item.busiTypeNbr}}</Col>
					<Col :span="4">{{item.busiTypeName}}</Col>
					<Col :span="4">{{getStatus(item.statusCd)}}</Col>
                    <Col :span="4">{{item.version}}</Col>
				</Row>

                <!--暂无数据-->
                <div class="app__data-none" v-show="busiTypeData.length===0">
                    <span>暂无数据</span>
                </div>
                </div>

				<div class="h-d-page">
					<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                                :perPages=1 @change="pageChange" :isCenter="true">
					</Pagination>
				</div>
			</Dialog>
			<!--添加属性值弹框-->
			<Dialog :dialogTitle="addTitle" :dialogSize="dialogSize2" ref="addValDialog" @confirm="addAttrConfirm()">
				<Form labelWidth="110px" class="add-attr" data-vv-scope="attrValue">
                    <Row>
                        <Col :span="20">
                        <FormItem labelText="属性值名称：" :requiredIcon="true" :errorMessage="errors.first('attrValue.attrValueName')">
                            <Input v-validate="'required'" name="attrValueName" v-model.trim="attrValForm.attrValueName"
                                   data-vv-as="属性值名称"></Input>
                        </FormItem>
                        </Col>
                    </Row>

					<Row>
						<Col :span="20">
                            <FormItem labelText="属性值排序号：" :requiredIcon="true" :errorMessage="errors.first('attrValue.attrValueSort')">
                                <Input v-validate="'required'" name="attrValueSort" v-model.trim="attrValForm.attrValueSort"
                                       data-vv-as="属性值排序号" maxlength="3"></Input>
                            </FormItem>
						</Col>
					</Row>

					<Row>
						<Col :span="20">
                            <FormItem labelText="属性值：" :requiredIcon="true" :errorMessage="errors.first('attrValue.attrValue')">
                                <Input v-validate="'required'" name="attrValue" v-model.trim="attrValForm.attrValue"
                                       data-vv-as="属性值"></Input>
                            </FormItem>
						</Col>
					</Row>

                    <Row>
                        <Col :span="20">
                            <FormItem labelText="属性值描述：" :requiredIcon="true" :errorMessage="errors.first('attrValueDesc')">
                                <Input v-validate="'required'" name="attrValueDesc" v-model.trim="attrValForm.attrValueDesc"
                                       data-vv-as="属性值描述"></Input>
                            </FormItem>
                        </Col>
                    </Row>
				</Form>
			</Dialog>
    <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>

<script>
    export default {
        props:{
            prodObj:{}
        },
        data() {
            return {
                staff:222,
                dialogTitle:'',
                attrPageObj:{
					pageIndex:1,
					pageSize:5
				},
                attrPageObjs:{
					pageIndex:1,
					pageSize:10
				},
                attrValSearchObj:{
					attrNbr:'',
					attrName:''
                },
                addAttrSize:{
                    size: 100,
					min: 500,
					max: 800
                },
                tipInfo:{
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
                defaultValue:'',//输入型默认值
                addAttr:{
                    attrNbr:'',
                    attrName:'',
                    attrDesc:'',
                    defaultValue:'',
                    startValue:'',
                    endValue:'',
                    single:'1',
                    empty:'1',
                    trendsValue:'1',
                    attrClassify:'1000',
                    getValue:'1500',
                    attrFormat:'',
                    attrLength:'',
                    attrId:'',
                    statusCd:''
                },
                addAttrValue:{
                },
                boolSelectArray:[{
                    label:'是',
                    value:'1'
                },{
                    label:'否',
                    value:'0'
                }],
                ValueSelectArray:[
                    {
                        label:'日期型',
                        value:'1000'
                    },
                    {
                        label:'日期时间型',
                        value:'1100'
                    },
                    {
                        label:'字符型',
                        value:'1200'
                    },
                    {
                        label:'浮点型',
                        value:'1300'
                    },
                    {
                        label:'布尔型',
                        value:'1500'
                    },
                    {
                        label:'整数型',
                        value:'1400'
                    },
                    {
                        label:'计算型',
                        value:'1600'
                    },
                ],
                attrSpecss:[],
                attrSpecsSelTemp:[],
                attrSpecsValues:[],//属性值列表
                attrSpecsValuesSelTemp:[],//属性值已选列表
                attrAfterValues:[],//属性值保存后的列表
                attrObj:{},
                allAttrObj:{
                    paymentMode:[],
                    custType:[],
                    attrSpecs:[],
                    followObj:[],
                    ifNecessary:'',
                    ifToChange:'',
                    effDate:'',
                    expDate:'',
                    followProdId:'',
                    attrId:'',
                    attrName:'',
                },
                attrRadio:'',
                attrValueTypeArray:[{
					value:'1000',
					label:'输入型'
				},{
					value:'2000',
					label:'枚举型'
				}],
                allPay:[
                    {            // 所有的付费方式
                        value: "1200",
                        label: '后付费'
                    },{
                        value: "1201",
                        label: '准预付费'
                    },{
                        value: "2100",
                        label: '预付费'
                    }
                ],
                allCust:[
                    {
                        value: "1100",
                        label: '公众客户'
                    },
                    {            // 所有的客户
                        value: "1000",
                        label: '政企客户'
                    }
                ],
                attrChoose:'',//选择属性
                attrValueChoose:'',//选择属性值
                boolArray: [
                    {
                    value: "1",
                    label: "是"
                    },
                    {
                    value: "0",
                    label: "否"
                    }
                ],
                showSubmitProperty:true,
                shownextProperty:false,
                attrValues:[],
                AttrSpecCFGData:[],
                delValueObj:'',
                // attrEndDate:[],
                staffId:'111',        //登录人id
                step: '1000',         //当前的步骤
                attrId: '',          //属性id(第一步生成)
                busiTypeData: [],      //业务大类列表
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 5,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
				},
				busiTypeObj:'',//业务大类
				//属性表单信息
                attrForm:{
                    busiTypeName:'',        //业务大类名称
                    busiTypeInfo:'',       //业务大类信息
                    attrNbr:'',            //属性编码
                    attrName:'',            //属性名称
                    attrFormat:'',           //属性格式
                    attrLength:'',           //属性长度
                    attrValueDataType:'',    //属性值类型
                    defaultValue:'',          //默认值
                    isUnique:'1',           //唯一性
                    attrValueType:'1000',       //属性值分类
                    valueFrom:'',             //起始值
                    valueTo:'',                //结束值
                    isDanyAttr:'1',           //是否动态属性
                    isNullable:'1',          //是否可空
                },
                //属性值类型(下拉框数据)
                attrValList: [
                    {name:'日期型', value:'1000'},
                    {name:'日期时间型', value:'1100'},
                    {name:'字符型', value:'1200'},
                    {name:'浮点型', value:'1300'},
                    {name:'整数型', value:'1400'},
                    {name:'布尔型', value:'1500'},
                    {name:'计算型', value:'1600'}
                ],
                 /*第二步，属性值添加==============*/
                //属性值添加
                attrValForm:{
                    attrValueSort: "",              //属性值排序号
                    attrValue: "",                 //属性值
                    attrValueName: "",              //属性值名称
                    attrValueDesc: "",              //属性值描述
                },
			    attrValData: [],            //属性取值列表
                modAttrIndex: '', 
                addTitle:'添加属性值',       //添加修改属性弹框标题
                //选择业务大类弹框大小
				dialogSize: {
					size:60,
					min: 430, //最小宽度(px)
					max: 700 //最大宽度(px)
				},
                //添加属性值弹框大小
				dialogSize2: {
					size:60,
					min: 400, //最小宽度(px)
					max: 400 //最大宽度(px)
				},
				checkboxData: '',         //批量操作(未用到)
            }
        },
        watch: {
            'allAttrObj.attrId':function(newValue,oldValue){
                this.determineVale();
            },
            "addAttr.attrClassify":function(newValue,oldValue){
                if(newValue == "1000"){
                    this.showSubmitProperty = true;
                    this.shownextProperty = false;
                }else{
                    this.showSubmitProperty = false;
                    this.shownextProperty = true;
                }
            },
        },
        computed: {
			progressWidth() {
				return this.step == 1 ? `0` : this.step == 2 ? `50%` : '100%';
            },
            maxAttr() {
				return `min_value:${this.attrForm.valueFrom}|numeric`;
			},
			minAttr() {
				return `max_value:${this.attrForm.valueTo}|numeric`;
			}
		},
        mounted() {
        	if(this.prodObj.isShow){
        		this.moreProductAttrDetail();
        	}
            this.replacefollow();
        },
        methods: {
            findProductAttrDetail(val){//属性列表查询
                this.$axios.get(this.$api.Attrspec, {
                    params: {
                        attrName: val,
                        limit: 5,
                        page: 1
                    }
                }).then(res => {
                    if(res.data.success){
                        this.allAttrObj.attrSpecs= res.data.attrSpecPage.content||[];
                        this.attrPageObj = {
                            pageIndex: res.data.attrSpecPage.page,
                            pageSize: res.data.attrSpecPage.limit,
                            rowCount: res.data.attrSpecPage.total,
                            pageCount: Math.ceil(res.data.attrSpecPage.total/res.data.attrSpecPage.limit)
                        };
                    }else{
                        this.$message.error({ message : res.data.msg })
                    }
                });
            },
            delValue(item){
                this.delValueObj = item;
                this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show()

            },
            pageClose() {
                 this.$emit('componentView','attrlist',this.attrObj)
            },
            determineVale(){//判断类型
                this.attrValueType = this.allAttrObj.attrSpecs.filter( item => item.attrId == this.allAttrObj.attrId )[0]
                return this.attrValueType ?  this.attrValueType.attrValueType : ''
            },
            getAttrName(){//根据id取名字
                this.attrName = this.allAttrObj.attrSpecs.filter(item => item.attrId == this.allAttrObj.attrId )[0]
                return this.attrName ? this.attrName.attrName : ''
            },
            getFollowProdName(){
               let followObj = this.allAttrObj.followObj.filter(item => item.prodId == this.allAttrObj.followProdId)[0]
               return followObj ? followObj.prodName : '';
            },
            replacefollow(val) {//选择接入产品
                this.$axios.get(this.$api.replace(this.$api.QureyOrdParProdList, ['{prodId}'], [this.prodObj.prodId]),{
                    params : {
                        followProdName:val,
                        prodId:this.prodObj.prodId,
                        staff:this.staff
                    }
                }).then((res) => {
                    if(res.data.success == true ){
                        res.data.products == null ? this.$message.error({ message : res.data.msg }) :
                        this.allAttrObj.followObj = res.data.products ? res.data.products : [];
                    }else{
                        this.$message.error({ message : res.data.msg })
                    }
                }).catch(res => {
                    this.$message.error({ message : res.data.msg })
                })
            },
            moreProductAttrDetail(){
                this.attrPageChange(1)
                this.$refs.addAttr.show();
                // console.log(11111);
            },
            attrSearchClick(inputData){
                console.log("1111111");
				this.attrPageChange(1,inputData);
            },
            addAttrName(){//弹框添加属性
                this.attrForm.busiTypeName = '';
                this.attrForm.attrNbr = '';
                this.attrForm.attrName = '';
                this.attrForm.attrFormat = '';
                this.attrForm.attrLength = '';
                this.attrForm.attrValueDataType = '';
                this.attrForm.valueTo = '';
                this.attrForm.valueFrom = '';
                this.attrForm.attrValueType = '1000';
                this.attrForm.defaultValue = '';
                this.$refs.addAttrName.show();
                this.getBusiTypeData();
                this.attrValData = [];
//              this.$refs.addAttr.hide()
            },
            attrAgainSearchClick(inputData){
				this.attrPageChangeAgain(1,inputData);
            },
            addAttrNameSubmitDialog(){//添加属性弹框确认按钮
				this.$validator.validateAll('attrForm').then((result) => {
                    if(result) {
							this.$axios.post(this.$api.AddOrdAttrSpecDetail, {
								"actType": "ADD",
								busiTypeId: this.attrForm.busiTypeInfo.busiTypeId,         //业务大类id
								attrNbr: this.attrForm.attrNbr,                            //属性编码
								attrName: this.attrForm.attrName,                          //属性名称
								attrFormat: this.attrForm.attrFormat,                     //属性格式
								attrLength: this.attrForm.attrLength,                    //属性长度
								attrValueDataType: this.attrForm.attrValueDataType,       //属性值类型
								defaultValue: this.attrForm.attrValueType == '2000' ? this.checkboxData.attrValue : this.attrForm.defaultValue,                //默认值
								isUnique: this.attrForm.isUnique,                      //唯一性
								attrValueType: this.attrForm.attrValueType,              //属性值分类
								valueFrom: this.attrForm.valueFrom,                    //起始值
								valueTo: this.attrForm.valueTo,                       //结束值
								isDanyAttr: this.attrForm.isDanyAttr,                 //是否动态属性
								isNullable: this.attrForm.isNullable,                  //是否可空
								createStaff: this.staffId,                           //创建人id
								ordAttrValueList:this.attrValData,
								statusCd:'1200'
		//                        updateStaff: this.staffId,                           //修改人id
						}).then(res => {
							if(res.data.success == true) {
								this.$axios.post(this.$api.replace(this.$api.ReleaseAttrSpec, ['{attrId}'], [res.data.attrSpecDetail.attrId]), {
                                        "attrId": res.data.attrSpecDetail.attrId,
                                        "staff": 2333333
                                }).then((res) => {
                                    if(res.data.success == true) {
                                        this.$message.success({ message : '发布成功'})
                                        this.$refs.addAttrName.hide();
								 		this.attrPageChange(1);
                                    } else {
                                        this.$message.error({ message : '发布失败'})
                                    }
                                }).catch((error) => {
                                    this.$message.error({message:'发布失败'})
                                })
								//数据行跳回列表页，枚举型添加属性值
							} else {
								this.$message.error({ message: '操作失败！'});
							}
						}).catch(error => {

						})
                    }
                })
            },
            addAttrSubmitNext(){
                this.$validator.validateAll('addAttr').then((result) => {
                if(result) {
                    this.$refs.addAttrName.hide()
                    this.$refs.addAttrValue.show()
                    }
                })
            },
            AddValue(){
                this.addAttrValue = {}
                this.$refs.modAttrValue.show();
            },
            delValueDialog(){
                if(!this.attrValueChoose.attrValue){
                    this.$message.error({ message : '请先选择'})
                    return
                }
                this.AttrSpecCFGData.filter( obj => obj.attrValue == this.attrValueChoose.attrValue )[0] ?
                this.AttrSpecCFGData = this.AttrSpecCFGData.filter( obj => obj.attrValue != this.attrValueChoose.attrValue ) :
                this.AttrSpecCFGData.push(this.attrValueChoose)
                this.attrValueChoose.attrValue = ''
            },
            tipConfirm(){
                this.attrAfterValues.filter( obj => obj.attrValue == this.delValueObj.attrValue )[0] ?
                this.attrAfterValues = this.attrAfterValues.filter( obj => obj.attrValue != this.delValueObj.attrValue ) :
                this.attrAfterValues.push(this.delValueObj)
                this.$refs.tip.hide()
            },
            //添加属性值枚举
            addAttrValueSubmit(){
                 this.$validator.validateAll('addAttrValue').then((result) => {
                if(result) {
                    this.AttrSpecCFGData.push(this.addAttrValue)
                    this.$refs.modAttrValue.hide()
                    }
                })
            },
            addAttrValueClose(){
            },
            addAttrSubmitBack(){
                this.$refs.addAttrName.show()
                this.$refs.addAttrValue.hide()
            },
            addAttrNameCloseDialog(){//添加属性弹框关闭回调
              this.$refs.addAttrName.hide();
              this.$refs.addAttrValue.hide();
              this.AttrSpecCFGData = [];
            },
            attrPageChange(page,data){
                this.attrPageObj.pageIndex = page;

                this.$axios.get(this.$api.Attrspec, {
                    params: {
                        attrNbr:data,
						attrName:this.attrValSearchObj.attrName,
                        limit: this.attrPageObj.pageSize,
                        page: this.attrPageObj.pageIndex
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.$refs.addAttr.show();
                        this.dialogTitle = '属性列表';

                        this.attrSpecss = res.data.attrSpecPage.content||[];
                        this.allAttrObj.attrSpecs= res.data.attrSpecPage.content||[];
                        this.attrPageObj = {
                            pageIndex: res.data.attrSpecPage.page,
                            pageSize: res.data.attrSpecPage.limit,
                            rowCount: res.data.attrSpecPage.total,
                            pageCount: Math.ceil(res.data.attrSpecPage.total/res.data.attrSpecPage.limit)
                        };
                    }else{
                        this.$message.error({message:res.data.msg})
                    }
                })
			},
            attrTocancel(){//添加属性弹框取消按钮
                this.allAttrObj = {},
                this.$emit('componentView','attrlist',this.attrObj)
            },
            attrToConfirm() {//添加属性确认按钮
                if(this.determineVale() == 2000 && this.attrRadio == ''){
                    this.$message.error({ message : "请选择默认值"})
                    return
                }

                this.$validator.validateAll().then((result) => {
                    if(result){
                        let prodAttrValues = [];
                        this.attrAfterValues.forEach(item=>{
                                let objAttrValue = {
                                    "prodAttrValueId": "",//新增时为空
                                    "prodAttrId": "",
                                    "attrValueName":item.attrValueName,
                                    "attrValueId": item.attrValueId,
                                    "attrValue":item.attrValue,
                                    "effDate": "",
                                    "expDate": "",
                                    "staff": this.staff,
                                    "paymentMode":item.paymentMode,  //属性值的付费方式
                                    "actType": "ADD"
                                }
                                prodAttrValues.push(objAttrValue)
                        })
                        let objProdAttr = {
                                "prodAttrId": "",//添加时为空
                                "prodId": this.prodObj.prodId,
                                "attrName":this.getAttrName(),
                                "attrId":this.allAttrObj.attrId,
                                "parProdAttrId": "",
                                "defaultValue": this.attrRadio.attrValueId ? this.attrRadio.attrValueId : this.defaultValue,
                                "attrValueType":this.determineVale(),
                                "comments": "",
                                "ifNecessary": this.allAttrObj.ifNecessary,
                                "ifToChange": this.allAttrObj.ifToChange,
                                "effDate": this.allAttrObj.effDate ? new Date(this.allAttrObj.effDate) : '',
                                "expDate": this.allAttrObj.expDate ? new Date(this.allAttrObj.expDate) : '',
                                "staff": this.staff,
                                "actType": "ADD",
                                "paymentMode": this.allAttrObj.paymentMode,
                                "followProdName":this.getFollowProdName(),
                                "followProdId": this.allAttrObj.followProdId,
                                "custType": this.allAttrObj.custType,
                                "prodAttrValues":prodAttrValues
                            }
                            console.log(objProdAttr);
                            this.attrObj = objProdAttr
                        this.$emit('componentView','attrlist',objProdAttr)
                        this.$message.success({ message　: '保存成功' })
                    }
                })
            },

            attrCommands(){//添加属性值弹框
                this.attrSpecsValuesSelTemp = [];
                for(let attrVal of this.attrAfterValues){
                    this.attrSpecsValuesSelTemp.push({
                        attrValueId:attrVal.attrValueId,
                        attrValueName: attrVal.attrValueName,
                        attrValue: attrVal.attrValue
                    })
                }
//                this.$axios.post(this.$api.AttrSpecCFGDetail,{
//                    body:{
//                        attrId:this.allAttrObj.attrId
//                    }
//                }).then( res => {
//                    if(res.data.code == 0){
//                        this.attrSpecsValues = res.data.body.attrValues;
//                        this.dialogTitle = '添加属性';
//                        this.$refs.addAttrVal.show();
//                    }else{
//                        this.$message.error({ message : res.data.msg })
//                    }
//                })

                // 查属性值
                this.$axios.get(this.$api.replace(this.$api.AttrSpecMore, ['{attrId}'], [this.allAttrObj.attrId]),{
                    params: {

                    }
                }).then(res => {
                    if(res.data.success) {
                        this.attrSpecsValues = res.data.attrSpecDetail.attrValueList || [];
                        this.dialogTitle = '添加属性';
                        this.$refs.addAttrVal.show();

                    } else {
                        this.$message.error({ message : res.data.msg });
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            attrValueClick(val){//属性值点击
                this.attrSpecsValuesSelTemp.filter( item => item.attrValueId == val.attrValueId)[0] ?
				this.attrSpecsValuesSelTemp = this.attrSpecsValuesSelTemp.filter( item => item.attrValueId != val.attrValueId) :
				this.attrSpecsValuesSelTemp.push(val);
            },
            addAttrValSubmitDialog(){//添加属性确认按钮
                let obj = []
                this.attrSpecsValuesSelTemp.forEach(element=>{
                    obj.push(element)
                })
                this.attrAfterValues = [...obj]
                this.$refs.addAttrVal.hide();
            },
            addAttrValCloseDialog(){//添加属性值弹窗
            },
            attrValueSel(val){ //属性值默认是否选中
                    return this.attrSpecsValuesSelTemp.filter(
                        item => item.attrValueId == val.attrValueId
                        )[0]
                        ? true
                        : false;
            },
            searchValueClick(){//属性值模糊查询

            },
            attrEndDateChange(item){
                if(!item.effDate){
                    this.$message.error({ message :  '请先选择生效时间'})
                    item.expDate = ''
                    return;
                }
                if(item.expDate < item.effDate){
                    this.$message.error({ message :  '失效时间不可比生效时间早'})
                    item.expDate = '';
                    return;
                }
            },
            delChoose(){//删除已选中}
                this.attrRadio = ''
            },
            attrSel(attr){ //属性默认是否选中
				for(let attrTempIndex = 0; attrTempIndex < this.attrSpecsSelTemp.length; attrTempIndex++){
            		if(this.attrSpecsSelTemp[attrTempIndex].attrId == attr.attrId){
            			this.attrSpecsSelTemp[attrTempIndex] = attr;
            			return true;
            		}
            	}
            },
            findAttrValueType(value){ //查找属性值分类
				let attrValueType = this.attrValueTypeArray.filter( item => item.value == value)[0];
				return attrValueType ? attrValueType.label : '无';
            },
            addAttrSubmitDialog(){
                this.$set(this.allAttrObj,'attrId',this.attrChoose.attrId)
                this.$set(this.allAttrObj,'attrName',this.attrChoose.attrName)
                this.$refs.addAttr.hide();
            },

            addAttrCloseDialog(){ //属性弹框
             this.attrChoose = {};
            },
            modValue(item){

            },
             //是否展示属性值列表暂无数据
            showNoData(){
                return !this.attrValData.find( obj => obj.statusCd == '1000');
            },
             //获取业务大类列表
            getBusiTypeData(name){
                this.$axios.get(this.$api.BusiType, {
                    params: {
                        busiTypeName: name,
                        busiTypeNbr: '',
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        this.pageInfo = {
                            pageIndex: res.data.busiTypePage.page,
                            pageSize: res.data.busiTypePage.limit,
                            rowCount: res.data.busiTypePage.total,
                            pageCount: Math.ceil(res.data.busiTypePage.total/res.data.busiTypePage.limit)
                        };
                        this.busiTypeData = res.data.busiTypePage.content;
                    } else {
                        this.$message.error({ message: '操作失败！'});
                    }
                }).catch(error => {

                })
			},
			getStatus(type){
				switch (type) {
					case '1000':
						return '有效'	
						break;
					case '1100':
						return '无效'	
						break;
					case '1200':
						return '未生效'	
						break;
					case '1300':
						return '已归档'	
					default:
						return '未知'
						break;
				}
			},
			searchBusi(data){
                this.pageInfo.pageIndex = 1;
                this.busiTypeObj = '';  //刷新是将绑定变为空
				this.getBusiTypeData(data)
			},
			//业务大类分页
            pageChange(page){
                this.pageInfo.pageIndex = page;
                this.getBusiTypeData();
            },
            //打开选择业务大类弹框
            showBusiType() {
				this.busiTypeObj = '';
                this.$refs.busiTypeDialog.show();
            },
            //业务大类选择确认
            confirmBusiType(){
                    this.attrForm.busiTypeInfo = this.busiTypeObj;
                    this.attrForm.busiTypeName = this.busiTypeObj.busiTypeName;
                this.$refs.busiTypeDialog.hide();
            },
            //点击属性值添加按钮
            addAttrClick() {
				this.attrForm.defaultValue = '';
                this.addTitle='添加属性值';
                this.$refs.addValDialog.show();
                this.attrValForm = {};
            },
            //点击属性值修改按钮
            modAttrClick(item,index) {
                this.$refs.addValDialog.show();
                this.addTitle='修改属性值';
                this.attrValForm={...item};
                this.modAttrIndex = index;
            },
             //点击添加/修改弹框确认
            addAttrConfirm() {
                this.$validator.validateAll('attrValue').then((result) => {
                    if(result) {
                        if(this.addTitle == '添加属性值'){
                            this.attrValData.unshift({
								actType:'ADD',
                                attrId: this.attrId,
                                attrValueSort: this.attrValForm.attrValueSort,
                                attrValue: this.attrValForm.attrValue,
                                attrValueName: this.attrValForm.attrValueName,
                                attrValueDesc: this.attrValForm.attrValueDesc,
                                statusCd: '1000',
                                createStaff: this.staffId,
                            });
                            this.$refs.addValDialog.hide();
                        }else if(this.addTitle == '修改属性值'){
                            this.attrValData.splice(this.modAttrIndex,1);
                            this.attrValData.unshift({
								actType:'ADD',
                                attrId: this.attrId,
                                attrValueSort: this.attrValForm.attrValueSort,
                                attrValue: this.attrValForm.attrValue,
                                attrValueName: this.attrValForm.attrValueName,
                                attrValueDesc: this.attrValForm.attrValueDesc,
                                statusCd: '1000',
                                createStaff: this.staffId,
                            });
                            this.$refs.addValDialog.hide();
                        }
                    }
                });
            },
            //点击属性值删除按钮
            delAttrClick(item,index) {
                if(item.attrValueId){
                    this.attrValData[index].statusCd='1100';
                }else{
                    this.attrValData.splice(index,1);
                }
            },

        },
    }
</script>

<style scoped lang="scss">


        // 添加属性
        .addAttr{
            position: fixed;
            width: 100%;
            height: 100%;
            margin: 0 auto;
			padding: 20px;
            top: 0;
            left: 0;
            z-index: 202;
            overflow: auto;
            background-color: #fff;
            .a_value{
                z-index: 0;
            }
                    .selectbtn{
                        float: right;
                        margin-top: 15px;
                        &.selectbtn_left{
                            margin-right:10px;
                        }
                    }

                    .y-span {
                        display: block;
                        margin: 10px 0;
                    }
                    .search{
                        width: 300px;
                        margin: 20px 10px;
                    }
                    .search_right{
                        position: absolute;
                        top: 10px;
                        right: 20px;
                    }
				//头部
				.t-header{
					text-align: center;
					margin: 0 auto;
                            i{
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                margin-top: 4px;
                                background: url("./../../images/add__attr.png") no-repeat;
                                background-size: cover;
                            }
					span{
						color: #222222;
						font-size: 16px;
					}
                }
                .bottom{
                    font-weight: 200;
                    font-size: 16px;
                    color:#A1D76E;
                }
                .close{
                    position: absolute;
                    display: block;
                    top: 0;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    background: url('./../../images/close_page.png') no-repeat center;

                    &:hover{
                        opacity: .8;
                    }
                }
				.attr_top{
					border-bottom:5px solid #eeeeee;
				}
                .a_title_bottom{
                    z-index: 3;
                    position: absolute;
                    top: 48px;
                    left: -100%;
                    width: 100%;
                    height: 20px;
                    transition: .3s all ease;
                    vertical-align: middle;
                        &.active {
                            top: 48px;
                            left: 0;
                        }
                    .h-o-item {
                        display: inline-block;
                        padding: 0 20px;
                        cursor: pointer;
                        &.delete {
                            background: url('./../../images/delete_gery.png') no-repeat;
                            background-position: 0;
                        }
                        &:hover {
                            color: $mainColor;
                            &.delete {
                                background: url('./../../images/delete_blue.png') no-repeat;
                                background-position: 0;
                            }
                        }
                    }
				}
				.a_table{
					padding-top: 25px;
				}
                .foot_box{
                    width: 100%;
                    height:100%;
                }
                .foot_btn{
                    position:fixed;
                    width:100%;
                    height:20px;
                    bottom:20px;
                }
                .attr_table{
                    padding: 20px;
                }
            }
                .blue-font span{
                    color: $mainColor !important;
                    cursor: pointer;
                }
                .a-v-title1,
			.a-v-title2 {
				height: 30px;
				line-height: 30px;
				border-bottom: 2px solid #fafafa;
				.v-t-item {
					display: block;
					width: 80px;
					margin-left: 20px;
					text-align: center;
					color: $mainColor;
				}
			}
			.a-info {
			padding-top: 20px;
			color: #999;
			.no-first {
				margin-left: 30px;
			}
		}
		.a-value {
			.a-v-title1,
			.a-v-title2 {
				height: 30px;
				line-height: 30px;
				border-bottom: 2px solid #fafafa;
				.v-t-item {
					display: block;
					width: 80px;
					margin-left: 20px;
					text-align: center;
					color: $mainColor;
				}
			}
			.a-v-title2 {
				height: 30px;
				line-height: 30px;
				.v-t-add {
					position: absolute;
					top: 0;
					right: 10px;
				}
			}
			.a-v-info {
				height: 100px;
				padding: 30px 0 0 20px;
				border-bottom: 10px solid #f8f8f8;
				.v-i-label {
					color: #777;
				}
			}
			.a-v-table {
				padding: 0px 20px 20px 20px;
				top: 30px;
				.v-t-title {
					color: #333;
					font-weight: bold;
					background-color: #f5fafd;
				}
				.v-t-item {
					color: #777;
					text-align: left;
				}
				.v-t-checkbox {
					text-align: center;
				}
			}
		}
		.add-attr{
				margin:20px 10px 0 10px;
			}
			.attr_scroll{
				padding: 20px;
			}
</style>
