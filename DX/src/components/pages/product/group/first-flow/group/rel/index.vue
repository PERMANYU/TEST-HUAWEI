<template>
	<div class="rel">
		<Scroll>
			<!-- 依赖块 -->
			<template v-if="mainProdId != this.componentData.prodId">
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>产品依赖关系</span>
                </div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('reverse','rely')">被依赖关系视图</div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','rely')">添加</div>
                <Scroll :isShowBottom="true" fixedTopClassName="app__table-thead" fixedRightClassName="app__table-right" scrollWidth="12px"  ref="scroll">
                        <div class="app__table" :class="isNoExistVaild(allRelyProdList) ? '' : 'height'">
                            <Row class='app__table-thead' :inline="true">
                                <Col :width="200">A端产品名称</Col>
                                <Col :width="250">A端付费方式</Col>
                                <Col :width="200">A端客户类型</Col>
                                <Col :width="200">A端接入类产品</Col>
                                <Col :width="200">Z端产品名称</Col>
                                <Col :width="250">Z端付费方式</Col>
                                <Col :width="200">Z端客户类型</Col>
                                <Col :width="200">Z端接入类产品</Col>
                                <!-- <Col :width="100">构成角色名称</Col> -->
                                <Col :width="100">生效时间</Col>
                                <Col :width="100">失效时间</Col>
                                <Col :width="100">最大数量</Col>
                                <Col :width="100">最小数量</Col>
                                <Col :width="100">约束类型</Col>
                                <Col class="app__table-right" :width="50">操作</Col>
                            </Row>
                            <Row  class="app__table-item" v-for="(item,index) in allRelyProdList" :key="index" v-if="item.actType != 'DEL'" :inline="true">
                                <Col :width="200">{{item.aProdName ? item.aProdName : '无'}}</Col>
                                <Col :width="250">
                                    <Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.aPaymentMode"></Select>
                                </Col>
                                <Col :width="200">
                                    <Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.aCustType"></Select>
                                </Col>
                                <Col :width="200">
                                    <Input readonly  type="text" v-model="item.aFollowProdName" :class="[item.aFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('afollow',item)"></Input>
                                </Col>
                                <Col :width="200">
                                    <span class="s-input-block" @click="operation('add','master')">{{item.zProdName ? item.zProdName : '无'}}</span>
                                </Col>
                                <Col :width="250">
                                    <Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.zPaymentMode"></Select>
                                </Col>
                                <Col :width="200">
                                    <Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.zCustType"></Select>
                                </Col>
                                <Col :width="200">
                                    <Input readonly  type="text" v-model="item.zFollowProdName" :class="[item.zFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('zfollow',item)"></Input>
                                </Col>
                                <!-- <Col :width="100">
                                    <Input :class="['s-input-block',item.roleName ? '' : 'validate-error']" @click.stop.native="roleChange(item)" v-model="item.roleName" ref="validataItem"></Input>
                                </Col> -->
                                <Col :width="100">
                                    <DatePicker type="d" placeholder="" class=" " v-model="item.effDate" :class="[item.effDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodActChange(item)" value-format="yyyy-MM-dd"></DatePicker>
                                </Col>
                                <Col :width="100">
                                    <DatePicker type="d" placeholder="" class=" " v-model="item.expDate" :class="[item.expDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodEndDateChange(item)" value-format="yyyy-MM-dd"></DatePicker>
                                </Col>
                                <Col :width="100">
                                    <Input type="number" name="" v-model="item.maxNum" :class="[typeof(item.maxNum) == 'number' || item.maxNum ? '' : 'validate-error']" ref="validataItem" @change="prodActChange(item)"></Input>
                                </Col>
                                <Col :width="100">
                                    <Input type="number" name="" v-model="item.minNum" :class="[typeof(item.minNum) == 'number' || item.minNum ? '' : 'validate-error']" ref="validataItem" @input="prodEndNumberChange(item)"></Input>
                                </Col>
                                <Col :width="100">
                                    <Select v-model="item.rstrType" :data="rstrTypeList">
                                    </Select>
                                </Col>
                                <Col class="app__table-right" :width="50">
                                    <span class="" @click="delRels(item,'master')">删除</span>
                                </Col>
                            </Row>
				            <!-- <Row v-show="!isNoExistVaild(allRelyProdList)" :class="['m-item app__table-item']"  v-for="item in (5 - allRelyProdList.length)" :key="item.id"></Row> -->
                            <Row class="app__data-none" v-show="isNoExistVaild(allRelyProdList)">
                                <span >暂无数据</span>
                            </Row>
                        </div>
                </Scroll>
			</template>

			<!-- 主从块 -->
			<template v-if="mainProdId == this.componentData.prodId">
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>产品主从关系</span>
                </div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('all','master')">产品树</div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','master')">添加</div>
                <Scroll :isShowBottom="true" fixedTopClassName="app__table-thead" fixedRightClassName="app__table-right" scrollWidth="12px"  ref="scroll">
                    <div class="app__table" :class="isNoExistVaild(masterSlaveRelProdList) ? '' : 'height'">
                        <Row class="app__table-thead" :inline="true">
							<Col :width="200">A端产品名称</Col>
							<Col :width="250">A端付费方式</Col>
							<Col :width="200">A端客户类型</Col>
							<Col :width="200">A端接入类产品</Col>
							<Col :width="200">Z端产品名称</Col>
							<Col :width="250">Z端付费方式</Col>
							<Col :width="200">Z端客户类型</Col>
							<Col :width="200">Z端接入类产品</Col>
                            <!-- <Col :width="100">构成角色名称</Col> -->
                            <Col :width="100">生效时间</Col>
                            <Col :width="100">失效时间</Col>
                            <Col :width="100">最大数量</Col>
                            <Col :width="100">最小数量</Col>
                            <Col :width="100">约束类型</Col>
							<Col class="app__table-right" :width="50">操作</Col>
						</Row>
						<Row   class="app__table-item" v-for="(item,index) in masterSlaveRelProdList" :key="index" v-if="item.actType != 'DEL'" :inline="true">
							<Col :width="200">{{item.aProdName ? item.aProdName : '无'}}</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.aPaymentMode"></Select>
							</Col>
							<Col :width="200">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.aCustType"></Select>
							</Col>
							<Col :width="200">
								<Input readonly  type="text" v-model="item.aFollowProdName" :class="[item.aFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('afollow',item)"></Input>
							</Col>
							<Col :width="200">
								<span class="s-input-block" @click="operation('add','master')">{{item.zProdName ? item.zProdName : '无'}}</span>
							</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.zPaymentMode"></Select>
							</Col>
							<Col :width="200">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.zCustType"></Select>
							</Col>
							<Col :width="200">
								<Input readonly  type="text" v-model="item.zFollowProdName" :class="[item.zFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('zfollow',item)"></Input>
							</Col>
                            <!-- <Col :width="100">
                                <Input :class="[item.roleName ? '' : 'validate-error']" @click.stop.native="roleChange(item)" ref="validataItem" v-model="item.roleName"></Input>
                            </Col> -->
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class=" " v-model="item.effDate" :class="[item.effDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodActChange(item)" value-format="yyyy-MM-dd"></DatePicker>
                            </Col>
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class=" " v-model="item.expDate" :class="[item.expDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodEndDateChange(item)" value-format="yyyy-MM-dd"></DatePicker>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.maxNum" :class="[typeof(item.maxNum) == 'number' || item.maxNum ? '' : 'validate-error']" ref="validataItem" @input="prodActChange(item)"></Input>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.minNum" :class="[typeof(item.minNum) == 'number' || item.minNum ? '' : 'validate-error']" ref="validataItem" @input="prodEndNumberChange(item)"></Input>
                            </Col>
                            <Col :width="100">
                                <Select v-model="item.rstrType" :data="rstrTypeList">
                                </Select>
                            </Col>
                            <Col class="app__table-right" :width="50">
                                <span class="" @click="delRels(item,'master')">删除</span>
                            </Col>
						</Row>
                        <!-- <Row v-show="!isNoExistVaild(masterSlaveRelProdList)" :class="['m-item app__table-item']"  v-for="item in (5 - masterSlaveRelProdList.length)" :key="item.id"></Row> -->
                        <Row class="app__data-none" v-show="isNoExistVaild(masterSlaveRelProdList)">
                            <span>暂无数据</span>
                        </Row>
                    </div>
                </Scroll>
			</template>

			<!-- 互斥块 -->
			<template v-if="mainProdId != this.componentData.prodId">
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>产品互斥关系</span>
                </div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','mutex')">添加</div>
                <Scroll :isShowBottom="true" fixedTopClassName="app__table-thead" fixedRightClassName="app__table-right" scrollWidth="12px"  ref="scroll">
                    <div class="app__table" :class="isNoExistVaild(mutexRelProdList) ? '' : 'height'">
						<Row class="app__table-thead" :inline="true">
                            <Col :width="200">A端产品名称</Col>
							<Col :width="250">A端付费方式</Col>
							<Col :width="300">A端客户类型</Col>
							<Col :width="200">A端接入类产品</Col>
							<Col :width="200">Z端产品名称</Col>
							<Col :width="250">Z端付费方式</Col>
							<Col :width="300">Z端客户类型</Col>
							<Col :width="200">Z端接入类产品</Col>
                            <!-- <Col :width="100">构成角色名称</Col> -->
                            <Col :width="100">生效时间</Col>
                            <Col :width="100">失效时间</Col>
                            <Col :width="100">最大数量</Col>
                            <Col :width="100">最小数量</Col>
							<Col class="app__table-right" :width="50">操作</Col>
						</Row>
						<Row  class="app__table-item" v-for="(item,index) in mutexRelProdList" :key="index" v-if="item.actType != 'DEL'" :inline="true">
							<Col :width="200">
								<span class="s-input-block" @click="operation('add','rely')">{{item.aProdName ? item.aProdName : '无'}}</span>
							</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.aPaymentMode"></Select>
							</Col>
							<Col :width="300">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.aCustType"></Select>
							</Col>
							<Col :width="200">
								<Input readonly  type="text" v-model="item.aFollowProdName" :class="[item.aFollowProdId ? '' : 'validate-error' ]" @click.stop.native="replacefollow('afollow',item)"></Input>
							</Col>
							<Col :width="200">
								{{item.zProdName ? item.zProdName : '无'}}
							</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.zPaymentMode"></Select>
							</Col>
							<Col :width="300">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.zCustType"></Select>
							</Col>
							<Col :width="200">
								<Input readonly  type="text" v-model="item.zFollowProdName" :class="[item.zFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('zfollow',item)"></Input>
							</Col>
                            <!-- <Col :width="200">
                                <Input :class="[item.roleName ? '' : 'validate-error']" @click.stop.native="roleChange(item)" ref="validataItem" v-model="item.roleName"></Input>
                            </Col> -->
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class=" " v-model="item.effDate" :class="[item.effDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodActChange(item)"></DatePicker>
                            </Col>
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class=" " v-model="item.expDate" :class="[item.expDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodEndDateChange(item)"></DatePicker>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.maxNum" :class="[typeof(item.maxNum) == 'number' || item.maxNum ? '' : 'validate-error']" ref="validataItem" @change="prodActChange(item)"></Input>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.minNum" :class="[typeof(item.minNum) == 'number' || item.minNum ? '' : 'validate-error']" ref="validataItem" @input="prodEndNumberChange(item)"></Input>
                            </Col>
                            <Col class="app__table-right" :width="50">
								<span class="" @click="delRels(item,'mutex')">删除</span>
							</Col>
						</Row>
                        <!-- <Row v-show="!isNoExistVaild(mutexRelProdList)" :class="['m-item app__table-item']"  v-for="item in (5 - mutexRelProdList.length)" :key="item.id"></Row> -->
                        <Row class="app__data-none" v-show="isNoExistVaild(mutexRelProdList)">
                            <span>暂无数据</span>
                        </Row>
				    </div>
                </Scroll>    
                    
			</template>

			<!-- 捆绑块 -->
			<template v-if="mainProdId == this.componentData.prodId">
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>产品捆绑关系</span>
                </div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','binding')">添加</div>
                <Scroll :isShowBottom="true" fixedTopClassName="app__table-thead" fixedRightClassName="app__table-right" scrollWidth="12px"  ref="scroll">
				    <div class="app__table" :class="isNoExistVaild(bindingRelProdList) ? '' : 'height'">
						<Row class="app__table-thead" :inline="true">
							<Col :width="200">A端产品名称</Col>
							<Col :width="250">A端付费方式</Col>
							<Col :width="200">A端客户类型</Col>
							<Col :width="200">A端接入类产品</Col>
							<Col :width="200">Z端产品名称</Col>
							<Col :width="250">Z端付费方式</Col>
							<Col :width="200">Z端客户类型</Col>
							<Col :width="200">Z端接入类产品</Col>
                            <!-- <Col :width="100">构成角色名称</Col> -->
                            <Col :width="100">生效时间</Col>
                            <Col :width="100">失效时间</Col>
                            <Col :width="100">最大数量</Col>
                            <Col :width="100">最小数量</Col>
                            <Col class="app__table-right" :width="50">操作</Col>
						</Row>
						<Row  class="app__table-item" v-for="(item,index) in bindingRelProdList" :key="index" v-if="item.actType != 'DEL'" :inline="true">
							<Col :width="200">{{item.aProdName ? item.aProdName : '无'}}</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.aPaymentMode"></Select>
							</Col>
							<Col :width="200">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.aCustType"></Select>
							</Col>
							<Col :width="200">
								<Input readonly type="text" v-model="item.aFollowProdName" :class="[item.aFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('afollow',item)"></Input>
							</Col>
							<Col :width="200">
								<span class="s-input-block" @click="operation('add','binding')">{{item.zProdName ? item.zProdName : '无'}}</span>
							</Col>
							<Col :width="250">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allPay"  v-model="item.zPaymentMode"></Select>
							</Col>
							<Col :width="200">
								<Select multiple  :isNullSel="false" @change="prodActChange(item)" :data="allCust" v-model="item.zCustType"></Select>
							</Col>
							<Col :width="200">
								<Input  readonly type="text" v-model="item.zFollowProdName" :class="[item.zFollowProdId ? '' : 'validate-error']" @click.stop.native="replacefollow('zfollow',item)"></Input>
							</Col>
                            <!-- <Col :width="100">
                                <Input :class="['s-input-block',item.roleName ? '' : 'validate-error']" @click.stop.native="roleChange(item)" ref="validataItem" v-model="item.roleName"></Input>
                            </Col> -->
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class="" v-model="item.effDate" :class="[item.effDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodActChange(item)" ></DatePicker>
                            </Col>
                            <Col :width="100">
                                <DatePicker type="d" placeholder="" class="" v-model="item.expDate" :class="[item.expDate ? '' : 'picker-validate-error']" ref="validataItem" @input="prodEndDateChange(item)" ></DatePicker>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.maxNum" :class="[typeof(item.maxNum) == 'number' || item.maxNum ? '' : 'validate-error']" ref="validataItem" @change="prodActChange(item)"></Input>
                            </Col>
                            <Col :width="100">
                                <Input type="number" name="" v-model="item.minNum" :class="[typeof(item.minNum) == 'number' || item.minNum ? '' : 'validate-error']" ref="validataItem" @input="prodEndNumberChange(item)"></Input>
                            </Col>
                            <Col class="app__table-right" :width="50">
								<span class="" @click="delRels(item,'binding')">删除</span>
							</Col>
						</Row>
                        <!-- <Row v-show="!isNoExistVaild(bindingRelProdList)" :class="['m-item app__table-item']"  v-for="item in (5 - bindingRelProdList.length)" :key="item.id"></Row> -->
                        <Row class="app__data-none" v-show="isNoExistVaild(bindingRelProdList)">
                            <span>暂无数据</span>
                        </Row>
                    </div>
                </Scroll>  
			</template>
			
			
			<!-- <template>
				<div class="app__title app__title-basic">产品关系</div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add')">添加</div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('all','master')">产品树</div>

				<div class="app__table">
						<Row class='app__table-thead'>
							<Col :span="2">A端产品</Col>
							<Col :span="3">对应接入类产品</Col>
							<Col :span="2">付费方式</Col>
							<Col :span="2">客户类型</Col>
							<Col :span="2">关系类型</Col>
							<Col :span="2">Z端产品</Col>
							<Col :span="3">对应接入类产品</Col>
							<Col :span="2">付费方式</Col>
							<Col :span="2">客户类型</Col>
							<Col :span="2">更多信息</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row  class="app__table-item" v-for="(item,index) in allRelyProdList" :key="index" v-if="item.actType != 'DEL'">
							<Col :span="2">{{item.aProdName ? item.aProdName : '无'}}</Col>
							<Col :span="3">对应接入类产品</Col>
							<Col :span="2">付费方式</Col>
							<Col :span="2">客户类型</Col>
							<Col :span="2">关系类型</Col>
							<Col :span="2">Z端产品</Col>
							<Col :span="3">对应接入类产品</Col>
							<Col :span="2">付费方式</Col>
							<Col :span="2">客户类型</Col>
							<Col :span="2" class="blue-font" @click.stop.native="showMessage()">更多</Col>
							<Col :span="2" class="blue-font" @click.stop.native="delRels()">删除</Col>
						</Row>
				</div>
				
				<Row class="app__data-none" v-show="isNoExistVaild(allRelyProdList)">
					<span >暂无数据</span>
				</Row>
			</template> -->

			

			
			<!-- 号码类型块 -->
			<template>
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>产品号码类型关系(集团)</span>
                </div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','num')">添加</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="5">产品编码</Col>
						<Col :span="6">产品名称</Col>
						<Col :span="6">号码类型</Col>
						<Col :span="6">是否前台选号</Col>
						<Col :span="1">操作</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in numTypeRelProdList" :key="index" v-if="item.actType != 'DEL'">
						<Col :span="5">{{componentData.prodNbr ? componentData.prodNbr : '空'}}</Col>
						<Col :span="6">{{componentData.prodName ? componentData.prodName : '空'}}</Col>
						<Col :span="6">
							<Select class="s-w-min" v-model="item.numType" :data="numTypeList" @change="prodActChange(item)">
							</Select>
						</Col>
						<Col :span="6">
							<Select class="s-w-min" v-model="item.isSelectFlag" :data="chooseOption" @change="prodActChange(item)">
							</Select>
						</Col>
						<Col :span="1" class="blue-font">
							<span @click.stop.self="delRels1(item,'num',index)">删除</span>
						</Col>
					</Row>
					<Row class="app__data-none" v-show="isNoExistVaild(numTypeRelProdList)">
                        <span>暂无数据</span>
                    </Row>
				</div>
			</template>


			<!-- 账目类型块 -->
			<!-- <template>
				<div class="app__title app__title-basic">产品账目类型关系(集团)</div>
				<div class="selectbtn app__btn app__btn-add" @click="operation('add','acct')">添加</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="10">产品名称</Col>
						<Col :span="10">账目类型标识</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in acctItemTypeRelProdList" :key="index" v-if="item.actType != 'DEL'">
						<Col :span="10">{{componentData.prodName}}</Col>
						<Col :span="10">
							<Input type="" name="" class="s-w-min" v-model="item.acctItemTypeRelId" :class="[typeof(item.acctItemTypeRelId) == 'number' || item.acctItemTypeRelId ? '' : 'validate-error']" ref="validataItem" @change="prodActChange(item)"></Input>
						</Col>
						<Col :span="4" class="blue-font">
							<span @click="delRels1(item,'acct',index)">删除</span>
						 </Col>
					</Row>
					<Row class="app__data-none" v-show="isNoExistVaild(acctItemTypeRelProdList)">
                        <span>暂无数据</span>
                    </Row>
				</div>
			</template> -->
		</Scroll>



			<!-- 被依赖关系视图 -->
		<Dialog :dialogTitle="dialogTitle" ref="reverseDialog" :showConfirmBtn="false">
			<div  class="reverse-dialog app__table">
				<Row class="app__table-thead">
					<Col :span="4">被依赖产品名称</Col>
					<Col :span="4">关系类型</Col>
					<Col :span="3">生效时间</Col>
					<Col :span="3">失效时间</Col>
					<Col :span="3">最大数量</Col>
					<Col :span="3">最小数量</Col>
				</Row>
				<Row class="app__table-item" v-for="(item,index) in allRelyProdReverseList" :key="index">
					<Col :span="4">{{item.zProdName ? item.zProdName : '无'}}</Col>
					<Col :span="4">{{findRelType(item.relType)}}</Col>
					<Col :span="3">{{item.effDate}}</Col>
					<Col :span="3">{{item.expDate}}</Col>
					<Col :span="3">{{item.maxNum}}</Col>
					<Col :span="3">{{item.minNum}}</Col>
				</Row>
				<Row class="app__data-none" v-show="allRelyProdReverseList.length == 0">
	                <span>对不起，暂无数据</span>
	            </Row>
			</div>
		</Dialog>

		<!-- 选择产品 -->
		<Dialog :dialogTitle="dialogTitle" ref="prodDialog" :dialogSize="prodSize" @confirm="prodDialogSubmit()" @close="prodDialogClose()">
			<Scroll class="p-dialog app__table">
                <div class="s-l-search">    
                    <Search placeholder="请输入产品名称" @search="searchResource"></Search>
                </div>    
                <div class="app__table" >
                    <Row class="app__table-thead">
                        <Col :span="3">产品本地编码</Col>
                        <Col :span="3">产品编码</Col>
                        <Col :span="4">产品名称</Col>
                        <Col :span="3">管理级别</Col>
                        <Col :span="4">产品功能类型</Col>
                        <Col :span="3">是否独立销售</Col>
                        <Col :span="2">版本</Col>
                        <Col :span="2">操作</Col>
                    </Row>
                    <Row class="app__table-item" v-for="(item,index) in qureyOrdProdList" :key="index" @click.stop.native="qureyOrdProdListClick(item)">
                        <Col :span="3">{{item.prodLocalNbr ? item.prodLocalNbr : '无'}}</Col>
                        <Col :span="3">{{item.prodNbr ? item.prodNbr : '无'}}</Col>
                        <Col :span="4">{{item.prodName ? item.prodName : '无'}}</Col>
                        <Col :span="3">{{getManageGrade(item.manageGrade)}}</Col>
                        <Col :span="4">{{getProdFuncType(item.prodFuncType)}}</Col>
                        <Col :span="3">{{getiFIndependentSale(item.ifIndependentSale)}}</Col>
                        <Col :span="2">{{item.version ? item.version : '0'}}</Col>
                        <Col :span="2" class="blue-font">
                            <span :class="[qureyOrdProdListSel(item) ? 'icon-xuanzhong-fang' :'icon-weixuanzhong-fang','iconfont']"></span>
                        </Col>
                    </Row>
                    <Row class="app__data-none" v-show="qureyOrdProdList.length == 0">
                        <span>对不起，暂无数据</span>
                    </Row>
                </div>

				<Pagination :pageIndex="pageObj.pageIndex" :pageSize="pageObj.pageSize" :isCenter="true" :rowCount="pageObj.rowCount" @change="prodPageChange" v-show="qureyOrdProdList.length > 0"></Pagination>
				<div class="r-d-sel" v-show="qureyOrdProdListTemp.length > 0">
					<Row class="r-d-top">
						<span>已选择</span>
					</Row>
					<Row class="app__table-thead">
						<Col :span="3">产品本地编码</Col>
						<Col :span="3">产品编码</Col>
						<Col :span="4">产品名称</Col>
						<Col :span="3">管理级别</Col>
						<Col :span="4">产品功能类型</Col>
						<Col :span="3">是否独立销售</Col>
                        <!-- <Col :span="3">构成角色名称</Col> -->
						<Col :span="2">版本</Col>
						<Col :span="2">操作</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in qureyOrdProdListTemp" :key="index">
						<Col :span="3">{{item.prodLocalNbr ? item.prodLocalNbr : '无'}}</Col>
                        <Col :span="3">{{item.prodNbr ? item.prodNbr : '无'}}</Col>
                        <Col :span="4">{{item.prodName ? item.prodName : '无'}}</Col>
                        <Col :span="3">{{getManageGrade(item.manageGrade)}}</Col>
                        <Col :span="4">{{getProdFuncType(item.prodFuncType)}}</Col>
                        <Col :span="3">{{getiFIndependentSale(item.ifIndependentSale)}}</Col>
                        <Col :span="2">{{item.version ? item.version : '0'}}</Col>
						<Col :span="2" class="app__table-right">
							<span class="" @click="qureyOrdProdListClick(item)">删除</span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>


		

		<!-- 产品树展示 -->
		<Dialog :dialogTitle="dialogTitle" ref="treeProdDialog" :showConfirmBtn="false">
			<div class="p-dialog app__table">
				<Row class="app__table-thead">
					<Col :span="4">产品名称</Col>
					<Col :span="4">产品编码</Col>
					<Col :span="4">产品关系</Col>
					<Col :span="4">最大值</Col>
					<Col :span="4">最小值</Col>
					<Col :span="4">默认值</Col>
				</Row>

				<Scroll class="app__table-item">
					<TreeSimple  v-for="(item,index) in prodTrees" :keys="prodTreeShowKeyItems" :folder="item" :key="index"  :children-str="'children'"  :init-level="1" :level-str="'level'">
					</TreeSimple>
				</Scroll>
			</div>
		</Dialog>



		<!-- 根产品列表 -->
		<Dialog :dialogTitle="dialogTitle" ref="followDialog" @confirm="addfollowSumbit()" @close="addfollowSubmitClose()">
			<div class="follow-dialog">
				<div class="flowTableWrap app__table">
						<Row class="app__table-thead">
							<Col :span="8"></Col>
							<Col :span="8">产品编码</Col>
							<Col :span="8">产品名称</Col>
						</Row>
						<Row class="app__table-item"  v-if="followList.length>0" v-for="(item, index) in followList" :key="index" @click.stop.native="followCheck(item)">
							<Col :span="8" class="blue-font"><span :class="[productNameSel(item) ? 'icon-xuanzhong-fang' :'icon-weixuanzhong-fang','iconfont']"></span></Col>
							<Col :span="8">{{item.prodNbr ? item.prodNbr : '空'}}</Col>
							<Col :span="8">{{item.prodName ? item.prodName : '空'}}</Col>
						</Row>
					<Pagination v-if="followList.length>0"  :pageIndex="pageFollObj.pageIndex" :pageSize="pageFollObj.pageSize" :rowCount="pageFollObj.pageCount"></Pagination>
				</div>
				<Row class="app__data-none" v-show="followList.length == 0">
					<span>对不起，暂无数据</span>
				</Row>
			</div>
		</Dialog>
		
		<!-- 号码类型关系 -->
		<Dialog :dialogTitle="dialogTitle"  :dialogSize="numberDialogSize" ref="numberDialog" @confirm="addnumberSumbit()" @close="numberSubmitClose()">
			<Scroll>
				<div class="smalldialog">
					<FormItem labelText="号码类型">
						<Select v-model="DialogNumType" :data="numTypeList"></Select>
					</FormItem>
					<FormItem labelText="是否前台选号">
						<Select v-model="DialogIsSelectFlag" :data="chooseOption"></Select>
					</FormItem>
				</div>
			</Scroll>
		</Dialog>

		<!-- 查看详情
		<Dialog :dialogTitle="dialogTitle"  ref="viewDetails" @confirm="watchDialogSubmit()">
			<div class="smallDialog">
				<div>A端产品</div>
				<div>Z端产品</div>
				<div>参数</div>
				<div>参数</div>
			</div>
		</Dialog> -->

		<!-- 账目类型块
		<Dialog :dialogTitle="dialogTitle"  ref="acctDialog" @confirm="acctDialogSubmit()" @close="acctDialogClose">
				<Scroll :isShowRight="true" ref="scroll"> 
						<div class="s-l-search">
							<Row>
								<Search placeholder="请输入账目类型编码或名称" @click.stop.native=""></Search>
							</Row>   
						</div>
						<div class="s-l-all app__table">
							<Row class="app__table-thead">
								<Col :span='10'>账目类型编码</Col>
								<Col :span='10'>账目类型名称</Col>
								<Col :span='4'>操作</Col>
							</Row>
							<div class="app__table">
								<Row class="app__table-item" @click.stop.native="clickNbr(item)" v-for="(item,index) in acctItemTypeRelProdList"
										:key="index">
									<Col :span='10'>{{item.acctItemTypeRelId}}</Col>
									<Col :span='10'>{{item.acctItemTypeRelName}}</Col>
									<Col :span='4'>
									<i v-if="showYes(item)" class="app__icon-btn app__icon-choose"></i>
									<i v-else class="app__icon-btn app__icon-plus"></i>
									</Col>
								</Row>

								<Row class="app__data-none" v-show="acctItemTypeRelProdList.length < 1">
									<span>对不起，暂无数据</span>
								</Row>
							</div>

							<Pagination :pageIndex="pageObj.pageIndex" :pageSize="pageObj.pageSize"
								:rowCount="pageObj.rowCount"
								v-show="acctItemTypeRelProdList.length > 0">
							</Pagination>
						</div>
						<div class="s-l-sel app__table" v-show="!isNoExistVaild(selectNbr)">
                            <div class="r-d-top">
							    <h6>已选择</h6>
                            </div>
							<Row class="app__table-thead">
								<Col :span='10'>账目类型编码</Col>
								<Col :span='10'>账目类型名称</Col>
								<Col :span='4'>操作</Col>
							</Row>
							<div class="app__table">
								<Row class="app__table-item" v-for="(item,index) in selectNbr" v-if="item.actType != 'DEL'"
										:key="item.serviceStandardId">
									<Col :span='10'>{{item.acctItemTypeRelId}}</Col>
									<Col :span='10'>{{item.acctItemTypeRelName}}</Col>
									<Col :span='4'>
										<i @click.stop.native="delSelectNbr(item,index)" class="app__icon-btn app__icon-delete"></i>
									</Col>
								</Row>
							</div>
						</div>
				</Scroll>
		</Dialog> -->

		<!-- 查看详情 -->
		<!-- <Dialog :dialogTitle="dialogTitle" :dialogSize="messageDialogSize"  ref="showMessage" @confirm="messageDialogSubmit()" @close="messageDialogClose">
				<Scroll :isShowRight="true" ref="scroll"> 
					<div class="smalldialog">
						<div class="app__title app__title-basic">A端产品</div>
						<Row>
							<Col :span="12">
								<FormItem labelText="产品编码：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="产品名称：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="付费方式：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="客户类型：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<div class="app__title app__title-basic">Z端产品</div>
						<Row>
							<Col :span="12">
								<FormItem labelText="产品编码：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="产品名称：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="付费方式：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="客户类型：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<div class="app__title app__title-basic">参数</div>
						<Row>
							<Col :span="12">
								<FormItem labelText="关联关系：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="依赖方向：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<div class="app__title app__title-basic">参数</div>
						<Row>
							<Col :span="12">
								<FormItem labelText="最大值：">
									<Input></Input>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="最小值：">
									<Input></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="生效时间：">
									<DatePicker type="d"></DatePicker>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="失效时间：">
									<DatePicker type="d"></DatePicker>
								</FormItem>
							</Col>
						</Row>
					</div>
				</Scroll>
		</Dialog> -->


		<!-- 构成角色展示 -->
		<Dialog :dialogTitle="dialogTitle"  ref="roleDialog" @confirm="roleDialogSubmit()">
			<div  class="role-dialog">
				<Row class="r_title">
					<Col>角色名称</Col>
				</Row>

				<div class="tree-sub">
					<TreeSimple v-for="(item,index) in roleTrees" :keys="roleTreeShowKeyItems" v-model="roleProdObj" :folder="item" :key="index"   :init-level="0" :level-str="'level'" :isInputSel="true" :isIndent="false">
					</TreeSimple>
				</div>
			</div>
		</Dialog>
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
export default {
    props: {
        componentData: {},
        mainProdId: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            DialogNumType: "",
            DialogIsSelectFlag: "",
            numberDialogSize: {
                size: 60,
                min: 300,
                max: 400
            },
            staff: 2222,
            dialogTitle: "",
            pageFollObj: {
                pageIndex: 1,
                pagecount: 1,
                pageSize: 10
            },
            prodSize: {
                //选择产品dialog尺寸
                size: 80,
                min: 600,
                max: 900
            },
            messageDialogSize: {
                //查看详情dialog尺寸
                size: 60,
                min: 400,
                max: 500
            },
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            pageObj: {
                //分页信息
                pageIndex: 1,
                pageSize: 5,
                rowCount: 0
            },
            chooseOption: [
                { value: "1", label: "是" },
                { value: "0", label: "否" }
            ],
            selectNbr: [], //选中的编码列表
            relyRelTypeList: [
                {
                    //依赖关系类型
                    value: "100000",
                    label: "强制依赖"
                },
                {
                    value: "100100",
                    label: "可选依赖"
                },
                {
                    value: "100200",
                    label: "默认依赖"
                }
            ],
            relTypeList: [
                {
                    //关系类型
                    value: "100000",
                    label: "强制依赖"
                },
                {
                    value: "100100",
                    label: "可选依赖"
                },
                {
                    value: "100200",
                    label: "默认依赖"
                },
                {
                    value: "100600",
                    label: "主从关系"
                },
                {
                    value: "200000",
                    label: "互斥"
                },
                {
                    value: "100001",
                    label: "捆绑关系"
                }
            ],
            rstrTypeList: [
                {
                    //主从关系的约束类型
                    value: "1000",
                    label: "默认约束"
                },
                {
                    value: "2000",
                    label: "必选约束"
                },
                {
                    value: "3000",
                    label: "可选约束"
                }
            ],
            numTypeList: [
                {
                    value: "1000",
                    label: "业务号码"
                },
                {
                    value: "2000",
                    label: "账号"
                }
            ],
            prodList: [],
            prodRelyOnRels: [],
            curProdRel: "",
            searchProdObj: {
                fitterProdId: "",
                parProdId: "",
                prodNbr: "",
                prodName: "",
                effDate: "",
                expDate: "",
                prodFuncType: "",
                prodUseType: "",
                ifIndependentSale: "",
                correctState: ""
            },
            areaSelectedOpen: false, //是否展开
            RelNameData: [],
            followObj: {},
            followList: [],
            selectCust: [],
            selectPay: [],
            allCust: [
                {
                    value: "1100",
                    label: "公众客户"
                },
                {
                    // 所有的客户
                    value: "1000",
                    label: "政企客户"
                }
            ],
            allPay: [
                {
                    // 所有的付费方式
                    value: "1200",
                    label: "后付费"
                },
                {
                    value: "1201",
                    label: "准预付费"
                },
                {
                    value: "2100",
                    label: "预付费"
                }
            ],
            prodTrees: [], //产品树数据
            prodTreeShowKeyItems: [
                { key: "prodName" , span:4},
                { key: "prodNbr" , span:4},
                {
                    key: "retrType",
                    ps: {
                        key: "find",
                        group: [
                            { value: "1000", name: "默认开通" },
                            { value: "2000", name: "必选开通" },
                            { value: "3000", name: "可选开通" }
                        ]
                    },
                    span:4
                },
                { key: "maxNum" , span:4},
                { key: "minNum" , span:4},
                { key: "defaultValue" , span:4 }
            ],
            qureyOrdProdList: [],
            qureyOrdProdListTemp: [],
            allRelyProdList: [], //依赖关系
            allRelyProdReverseList: [], //被依赖关系
            masterSlaveRelProdList: [], //主从关系
            mutexRelProdList: [], //互斥关系
            bindingRelProdList: [], //捆绑关系
            numTypeRelProdList: [], //号码类型
            acctItemTypeRelProdList: [], //账目类型
            roleTrees: [], //构成角
            roleTreeShowKeyItems: [{ key: "roleName" }],
            roleProdSel: {},
            roleProdObj: "",
            afollowObj: {},
            zfollowObj: {}
        };
    },
    watch: {
        componentData: function(val, newValue) {
            this.findProdRel();
        }
    },
    mounted() {
        this.findProdRel();
    },
    methods: {
        findProdRel() {
            this.$axios
                .post(this.$api.QryOrdProdRelDetail, {
                        prodId: this.componentData.prodId,
                        scopeInfos: [
                            {
                                //依赖
                                scope: "prodRelyOnRel",
                                relDirection: "1000"
                            },
                            {
                                //互斥
                                scope: "prodMutexRel"
                            },
                            {
                                //捆绑
                                scope: "prodBindingRel"
                            },
                            {
                                //主从
                                scope: "prodMasterSlaveRel"
                            },
                            {
                                //号码类型
                                scope: "prodNumTypeRel"
                            },
                            {
                                //账目类型
                                scope: "prodAcctItemTypeRel"
                            }
                        ]
                })
                .then(res => {
                    if (res.data.success == true) {
                        let newProdList1 = res.data.prodRelyOnRelList.prodRels;
                        //依赖
                        this.allRelyProdList = [
                            ...newProdList1.filter(item => {
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.split("|")
                                    : [];
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.split("|")
                                    : [];
                                item.aCustType = item.aCustType
                                    ? item.aCustType.split("|")
                                    : [];
                                item.zCustType = item.zCustType
                                    ? item.zCustType.split("|")
                                    : [];
                                return true;
                            })
                        ];
                        let newProdList2 = res.data.prodMasterSlaveRelList.prodRels;
                        //主重
                        this.masterSlaveRelProdList = [
                            ...newProdList2.filter(item => {
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.split("|")
                                    : [];
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.split("|")
                                    : [];
                                item.aCustType = item.aCustType
                                    ? item.aCustType.split("|")
                                    : [];
                                item.zCustType = item.zCustType
                                    ? item.zCustType.split("|")
                                    : [];
                                return true;
                            })
                        ];
                        let newProdList3 = res.data.prodMutexRel.prodRels;
                        //互斥关系
                        this.prodMutexRels = [
                            ...newProdList3.filter(item => {
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.split("|")
                                    : [];
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.split("|")
                                    : [];
                                item.aCustType = item.aCustType
                                    ? item.aCustType.split("|")
                                    : [];
                                item.zCustType = item.zCustType
                                    ? item.zCustType.split("|")
                                    : [];
                                return true;
                            })
                        ];
                        let newProdList4 = res.data.prodBindingRelList.prodRels;
                        //捆绑关系
                        this.bindingRelProdList = [
                            ...newProdList4.filter(item => {
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.split("|")
                                    : [];
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.split("|")
                                    : [];
                                item.aCustType = item.aCustType
                                    ? item.aCustType.split("|")
                                    : [];
                                item.zCustType = item.zCustType
                                    ? item.zCustType.split("|")
                                    : [];
                                return true;
                            })
                        ];
                        this.numTypeRelProdList = res.data.prodNumTypeRelList.prodNumTypeRels; //号码类型
                        this.acctItemTypeRelProdList =
                            res.data.prodAcctItemTypeRelList.prodAcctItemTypeRelList; //账目类型
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .then(res => {
                });
        },
        getManageGrade(type) {
            switch (type) {
                case "10":
                    return "集团级";
                case "11":
                    return "省级";
                case "12":
                    return "本地网级";
                case "13":
                    return "海外级";
                case "14":
                    return "两级共管";
                default:
                    return "未知";
            }
        },
        getProdFuncType(type) {
            switch (type) {
                case "101":
                    return "接入类产品";
                case "102":
                    return "功能类产品";
                case "103":
                    return "内容类产品";
                case "104":
                    return "资源类产品";
                case "105":
                    return "服务类产品";
                case "109":
                    return "其他类";
                default:
                    return "未知";
            }
        },
        getiFIndependentSale(type) {
            //是否独立销售
            switch (type) {
                case "1000":
                    return "是";
                case "2000":
                    return "否";
                default:
                    return "未知";
            }
        },
        searchResource(data) {
            this.prodPageChange(1,data)
        },
        roleChange(item) {
            this.roleTrees = [];
            this.roleProdSel = item;
            this.$axios
                .post(this.$api.QryProdRelRoleTree, {
                    body: {
                        roleId: ""
                    }
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.dialogTitle = "构成列表";
                        this.$refs.roleDialog.show();
                        this.roleTrees = res.data.body.prodRelRoles;
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(res => {});
        },
        save() {
            if (this.$refs.validataItem) {
                for (let item of this.$refs.validataItem) {
                    let itemCN = item.$el ? item.$el.className : item.className;
                    if (
                        itemCN.indexOf("picker-validate-error") > 0 ||
                        itemCN.indexOf("validate-error") > 0
                    ) {
                        this.$message.error({ message: "红框必须全部输入" });
                        return;
                    }
                }
            }
            this.$axios
                .post(this.$api.replace(this.$api.ModRequirementProductRel, ['{prodId}'], [this.componentData.prodId]), {
                        prodId: this.componentData.prodId,
                        staff: "2222",
                        prodRels: [
                            ...JSON.parse(
                                JSON.stringify(this.allRelyProdList)
                            ).filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.join("|")
                                    : "";
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.join("|")
                                    : "";
                                item.aCustType = item.aCustType
                                    ? item.aCustType.join("|")
                                    : "";
                                item.zCustType = item.zCustType
                                    ? item.zCustType.join("|")
                                    : "";
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            }),
                            ...JSON.parse(
                                JSON.stringify(this.masterSlaveRelProdList)
                            ).filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.join("|")
                                    : "";
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.join("|")
                                    : "";
                                item.aCustType = item.aCustType
                                    ? item.aCustType.join("|")
                                    : "";
                                item.zCustType = item.zCustType
                                    ? item.zCustType.join("|")
                                    : "";
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            }),
                            ...JSON.parse(
                                JSON.stringify(this.mutexRelProdList)
                            ).filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.join("|")
                                    : "";
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.join("|")
                                    : "";
                                item.aCustType = item.aCustType
                                    ? item.aCustType.join("|")
                                    : "";
                                item.zCustType = item.zCustType
                                    ? item.zCustType.join("|")
                                    : "";
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            }),
                            ...JSON.parse(
                                JSON.stringify(this.bindingRelProdList)
                            ).filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.aPaymentMode = item.aPaymentMode
                                    ? item.aPaymentMode.join("|")
                                    : "";
                                item.zPaymentMode = item.zPaymentMode
                                    ? item.zPaymentMode.join("|")
                                    : "";
                                item.aCustType = item.aCustType
                                    ? item.aCustType.join("|")
                                    : "";
                                item.zCustType = item.zCustType
                                    ? item.zCustType.join("|")
                                    : "";
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            })
                        ],
                        prodNumTypeRels: [
                            ...this.numTypeRelProdList.filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            })
                        ],
                        prodAcctItemTypeRels: [
                            ...this.acctItemTypeRelProdList.filter(item => {
                                item.actType ? "" : (item.actType = "KIP");
                                item.staff = item.createStaff
                                    ? item.createStaff
                                    : this.staff;
                                return true;
                            })
                        ]
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.$message.success({ message: '成功！' });
                        this.findProdRel();
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },
        operation(type, rel = "") {
            this.curProdRel = rel ? rel : this.curProdRel;
            switch (type) {
                case "reverse": //被依赖视图
                    this.$axios
                        .post(this.$api.QryOrdProdRelDetail, {
                            body: {
                                prodId: this.componentData.prodId,
                                scopeInfos: [
                                    {
                                        //依赖
                                        scope: "prodRelyOnRel",
                                        relDirection: "2000"
                                    }
                                ]
                            }
                        })
                        .then(res => {
                            this.dialogTitle = "被依赖关系";
                            this.$refs.reverseDialog.show();

                            if (res.data.code == 0) {
                                this.allRelyProdReverseList =
                                    res.data.body.prodRelyOnRels;
                            } else {
                                this.$message.error({ message: res.data.msg });
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        });

                    break;
                case "add": //添加产品
                    for (let val in this.searchProdObj) {
                        this.searchProdObj[val] = "";
                    }

                    if (rel == "rely") {
                        //依赖
                        this.searchProdObj.childProdId = this.componentData.prodId;
                        this.searchProdObj.fitterProdId = this.componentData.prodId;
                        this.searchProdObj.prodUseType = "2000";

                        this.qureyOrdProdListTemp = [];
                        for (let rel of this.allRelyProdList) {
                            if (rel.actType == "DEL") continue;
                            this.qureyOrdProdListTemp.push({
                                prodId: rel.aProdId
                            });
                        }
                    } else if (rel == "mutex") {
                        //互斥
                        this.searchProdObj.childProdId = this.componentData.prodId;
                        this.searchProdObj.fitterProdId = this.componentData.prodId;
                        this.searchProdObj.prodUseType = "2000";

                        this.qureyOrdProdListTemp = [];
                        for (let rel of this.mutexRelProdList) {
                            if (rel.actType == "DEL") continue;
                            this.qureyOrdProdListTemp.push({
                                prodId: rel.zProdId
                            });
                        }
                    } else if (rel == "master") {
                        //主从
                        // this.searchProdObj.parProdId = this.mainProdId;
                        this.searchProdObj.fitterProdId = this.mainProdId;
                        this.searchProdObj.prodUseType = "2000";

                        this.qureyOrdProdListTemp = [];
                        for (let rel of this.masterSlaveRelProdList) {
                            console.log(rel);
                            if (rel.actType == "DEL") continue;
                            this.qureyOrdProdListTemp.push({
                                prodId: rel.zProdId
                            });
                        }
                    } else if (rel == "binding") {
                        //捆绑
                        // this.searchProdObj.parProdId = this.mainProdId;
                        this.searchProdObj.fitterProdId = this.mainProdId;
                        this.searchProdObj.prodUseType = "1000";
                        this.searchProdObj.ifIndependentSale = "1000";

                        this.qureyOrdProdListTemp = [];
                        for (let rel of this.bindingRelProdList) {
                            if (rel.actType == "DEL") continue;
                            this.qureyOrdProdListTemp.push({
                                prodId: rel.zProdId
                            });
                        }
                    } else if (rel == "num") {
                        (this.DialogIsSelectFlag = ""),
                            this.$refs.numberDialog.show();

                        return;
                    } else if (rel == "acct") {
                        this.acctItemTypeRelProdList.push({
                            prodAcctItemTypeRelId: "",
                            prodId: this.componentData.prodId,
                            acctItemTypeRelId: "",
                            staff: this.staff,
                            actType: "ADD"
                        });
                        return;
                    }
                    this.prodPageChange(1);

                    break;
                case "all": //产品树展示
                    this.$axios
                        .get(this.$api.QureyOrdProdTree, {
                            params: {
                                prodId: this.componentData.prodId,
                                createStaff: this.staff
                            }
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                this.prodTrees = res.data.products.products;
                                this.dialogTitle = "产品信息";
                                this.$refs.treeProdDialog.show();
                            } else {
                                this.$message.error({ message: res.data.msg });
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        });

                    break;
                case "del":
                    break;
                default:
                    break;
            }
        },
        replacefollow(type, item) {
            //选择接入产品
            this.RelNameData = [];
            this.fType = type;
            if (type == "afollow") {
                this.afollowObj = item;
            } else {
                this.zfollowObj = item;
            }
            this.$axios
                .get(this.$api.replace(this.$api.QureyOrdParProdList, ['{prodId}'], [this.componentData.prodId]), {
                    params: {
                        prodId: this.componentData.prodId,
                        staff: this.staff
                    }
                })
                .then(res => {
                    this.dialogTitle = "选择接入产品";
                    this.$refs.followDialog.show();
                    this.followList = [];
                    if (res.data.success == true) {
                        this.followList = res.data.products;
                        console.log(this.followList);
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(res => {
                    this.$message.error({ message: res.data.msg });
                });
        },
        followCheck(rel) {
            this.RelNameData.filter(item => item.prodName == rel.prodName)[0]
                ? (this.RelNameData = [])
                : (this.RelNameData = [rel]);
        },
        prodPageChange(page,name) {
            this.pageObj.pageIndex = page;
            this.$axios
                .get(this.$api.QureyOrdRequirementProdList, {
                    params: {
                        prodName:name,
                        parProdId: this.searchProdObj.parProdId,
                        childProdId: this.searchProdObj.childProdId,
                        fitterProdId: this.searchProdObj.fitterProdId,
                        prodUseType: this.searchProdObj.prodUseType,
                        ifIndependentSale: this.searchProdObj.ifIndependentSale,
                        page: this.pageObj.pageIndex,
                        limit: this.pageObj.pageSize
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.dialogTitle = "产品列表";
                        this.$refs.prodDialog.show();
                        this.qureyOrdProdList = res.data.products.content
                            ? res.data.products.content
                            : [];
                        this.pageObj.rowCount= res.data.products.total;
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(res => {
                    this.$message.error({ message: res.data.msg });
                });
        },
        qureyOrdProdListClick(val) {
            //选择产品点击
            this.qureyOrdProdListTemp.filter(
                item => item.prodId == val.prodId
            )[0]
                ? (this.qureyOrdProdListTemp = this.qureyOrdProdListTemp.filter(
                      item => item.prodId != val.prodId
                  ))
                : this.qureyOrdProdListTemp.push(val);
        },
        qureyOrdProdListSel(val) {
            //产品默认是否选中
            for (
                let prodTempIndex = 0;
                prodTempIndex < this.qureyOrdProdListTemp.length;
                prodTempIndex++
            ) {
                if (
                    this.qureyOrdProdListTemp[prodTempIndex].prodId ==
                    val.prodId
                ) {
                    this.qureyOrdProdListTemp[prodTempIndex] = val;
                    return true;
                }
            }
        },
        addfollowSumbit() {
            //选择接入产品弹窗确定
            if (this.RelNameData.length != 0) {
                if (this.fType == "afollow") {
                    this.$set(
                        this.afollowObj,
                        "aFollowProdId",
                        this.RelNameData[0].prodId
                    );
                    this.$set(
                        this.afollowObj,
                        "aFollowProdName",
                        this.RelNameData[0].prodName
                    );
                } else {
                    this.$set(
                        this.zfollowObj,
                        "zFollowProdId",
                        this.RelNameData[0].prodId
                    );
                    this.$set(
                        this.zfollowObj,
                        "zFollowProdName",
                        this.RelNameData[0].prodName
                    );
                }
            }

            this.$refs.followDialog.hide();
        },
        addfollowSubmitClose() {
            this.RelNameData = [];
        },
        prodDialogSubmit() {
            console.log(this.curProdRel,'2222');
            if (this.curProdRel == "rely") {
                this.allRelyProdList = this.prodDialogSubmitAdjust(
                    this.allRelyProdList,
                    "100200"
                );
            } else if (this.curProdRel == "mutex") {
                this.mutexRelProdList = this.prodDialogSubmitAdjust(
                    this.mutexRelProdList,
                    "200000"
                );
            } else if (this.curProdRel == "master") {
                this.masterSlaveRelProdList = this.prodDialogSubmitAdjust(
                    this.masterSlaveRelProdList,
                    "100600"
                );
            } else if (this.curProdRel == "binding") {
                this.bindingRelProdList = this.prodDialogSubmitAdjust(
                    this.bindingRelProdList,
                    "100001"
                );
            }
            this.$refs.prodDialog.hide();
        },
        prodDialogClose() {//产品弹窗关闭

        },
        prodDialogSubmitAdjust(rels, relType) {
            let newRels = rels.filter(rel => {
                return (
                    rel.actType == "DEL" ||
                    this.qureyOrdProdListTemp.filter(item => {
                        if (this.curProdRel == "rely") {
                            return rel.aProdId == item.prodId;
                        } else {
                            return rel.zProdId == item.prodId;
                        }
                    })[0]
                );
            });

            for (let item of this.qureyOrdProdListTemp) {
                let rel = newRels.filter(rel => {
                    if (this.curProdRel == "rely") {
                        return rel.aProdId == item.prodId;
                    } else {
                        return rel.zProdId == item.prodId;
                    }
                })[0];

                if (!rel || rel.actType == "DEL") {
                    let newDate = `${new Date().getFullYear()}-${new Date().getMonth() +
                        1}-${new Date().getDate()}`;
                    newRels.push({
                        prodRelId: "",
                        roleId: -1,
                        roleName: "",
                        effDate: this.curProdRel == "mutex" ? newDate : "",
                        expDate: "2050-12-31",
                        rstrType: "",
                        minNum: "",
                        maxNum: "",
                        staff: this.staff,
                        zProdId:
                            this.curProdRel == "rely"
                                ? this.componentData.prodId
                                : item.prodId,
                        zProdName:
                            this.curProdRel == "rely"
                                ? this.componentData.prodName
                                : item.prodName,
                        aPaymentMode: [],
                        zPaymentMode: [],
                        aCustType: [],
                        zCustType: [],
                        zProdNbr:
                            this.curProdRel == "rely"
                                ? this.componentData.prodNbr
                                : item.prodNbr,
                        aProdId:
                            this.curProdRel == "rely"
                                ? item.prodId
                                : this.componentData.prodId,
                        aProdName:
                            this.curProdRel == "rely"
                                ? item.prodName
                                : this.componentData.prodName,
                        aProdNbr:
                            this.curProdRel == "rely"
                                ? item.prodNbr
                                : this.componentData.prodNbr,
                        relType: relType,
                        rstrType: this.curProdRel == "master" ? "1000" : "",
                        staff: this.staff,
                        actType: "ADD",
                        delObj: "", //待删除的对象
                    });
                }
            }
            return [...newRels];
        },
        prodActChange(item) {
            if (item.actType == "ADD") return;
            this.$set(item, "actType", "MOD");
        },
        prodEndDateChange(item) {
            if (!item.effDate) {
                this.$message.error({ message: "请先选择生效时间" });
                item.expDate = "";
                return;
            }
            if (item.expDate < item.effDate) {
                this.$message.error({ message: "失效时间不可比生效时间早" });
                item.expDate = "";
                return;
            }
            if (item.actType == "ADD") return;
            this.$set(item, "actType", "MOD");
        },
        prodEndNumberChange(item) {
            let minNum = parseInt(item.minNum);
            let maxNum = parseInt(item.maxNum);
            if (!item.maxNum) {
                this.$message.error({ message: "请先输入最大值" });
                item.minNum = "";
                return;
            }
            if (maxNum < minNum) {
                this.$message.error({ message: "请输入正确的数值" });
                item.minNum = "";
                return;
            }
            if (item.actType == "ADD") return;
            this.$set(item, "actType", "MOD");
        },
        delRels(item, relType) {
            this.delObj = item;
            this.relType = relType;
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = "确认要删除选择的记录吗？";
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
        },
        delRels1(item, relType, index) {
            if (item.actType == "ADD") {
                if (relType == "num") {
                    this.numTypeRelProdList.splice(index, 1);
                } else if (relType == "acct") {
                    this.acctItemTypeRelProdList.splice(index, 1);
                }
            } else {
                this.$set(item, "actType", "DEL");
            }
        },
        tipConfirm() {
            if (this.actType == "ADD") {
                if (this.relType == "rely") {
                    this.allRelyProdList = this.allRelyProdList.filter(rel => {
                        return rel.aProdId != this.delObj.aProdId;
                    });
                    this.$refs.tip.hide();
                } else if (this.relType == "mutex") {
                    this.mutexRelProdList = this.mutexRelProdList.filter(
                        rel => {
                            return rel.zProdId != this.delObj.zProdId;
                        }
                    );
                    this.$refs.tip.hide();
                } else if (this.relType == "master") {
                    this.masterSlaveRelProdList = this.masterSlaveRelProdList.filter(
                        rel => {
                            return rel.zProdId != this.delObj.zProdId;
                        }
                    );
                    this.$refs.tip.hide();
                } else if (this.relType == "binding") {
                    this.bindingRelProdList = this.bindingRelProdList.filter(
                        rel => {
                            return rel.zProdId != this.delObj.zProdId;
                        }
                    );
                }
                this.$refs.tip.hide();
            } else {
                this.$set(this.delObj, "actType", "DEL");
                this.$refs.tip.hide();
            }
        },
        roleDialogSubmit() {
            this.$set(this.roleProdSel, "roleId", this.roleProdObj.roleId);
            this.$set(this.roleProdSel, "roleName", this.roleProdObj.roleName);
            this.$refs.roleDialog.hide();
        },
        findRelType(type) {
            let relType = this.relTypeList.filter(item => {
                return item.value == type;
            })[0];
            return relType ? relType.label : "无";
        },
        isNoExistVaild(arr) {
            let arrTemp = arr.filter(item => item.actType != "DEL");
            return arrTemp == 0;
        },
        closeDialog() {
            // 关闭弹窗回调
        },
        closeDialogPay() {
            // 关闭弹窗回调
        },
        addnumberSumbit() {
            //号码类型关系
            this.numTypeRelProdList.push({
                prodNumTypeId: "",
                prodId: this.componentData.prodId,
                numType: this.DialogNumType,
                isSelectFlag: this.DialogIsSelectFlag,
                staff: this.staff,
                actType: "ADD"
            });
            this.$refs.numberDialog.hide();
        },
        numberSubmitClose() {
            //号码类型关系关闭弹窗回调
        },
        acctDialogSubmit() {
            //弹框确定账目类型
            this.acctItemTypeRelProdList.push({
                prodAcctItemTypeRelId: "",
                prodId: this.componentData.prodId,
                acctItemTypeRelId: "",
                staff: this.staff,
                actType: "ADD"
            });
            this.$refs.acctDialog.hide();
        },
        acctDialogClose() {
            //弹框关闭回调
        },
        clickNbr(item) {
            //点击弹窗内账目类型
            this.selectNbr.filter(
                obj => obj.acctItemTypeRelId == item.acctItemTypeRelId
            )[0]
                ? (this.selectNbr = this.selectNbr.filter(
                      obj => obj.acctItemTypeRelId != item.acctItemTypeRelId
                  ))
                : this.selectNbr.push(item);
        },
        showYes(item) {
            //账目类型是否选中
            return this.selectNbr.filter(
                obj => obj.acctItemTypeRelId == item.acctItemTypeRelId
            )[0]
                ? true
                : false;
        },
        delSelectNbr(item) {
            //账目类型点击弹框删除
            console.log(item);
            this.selectNbr.filter(
                obj => obj.acctItemTypeRelId == item.acctItemTypeRelId
            )[0]
                ? (this.selectNbr = this.selectNbr.filter(
                      obj => obj.acctItemTypeRelId != item.acctItemTypeRelId
                  ))
                : this.selectNbr.push(item);
        },
        showMessage(item) {
            //查看详情
            console.log(11111);
            this.dialogTitle = "查看详情";
            this.$refs.showMessage.show();
        },
        productNameSel(rel) {
            return this.RelNameData.filter(
                item => item.prodName == rel.prodName
            )[0]
                ? true
                : false;
        },
        messageDialogSubmit() {
            //查看详情保存
        },
        messageDialogClose() {
            //查看详情弹窗回调
        }
    }
};
</script>

<style scoped lang="scss">
.rel {
    width: 100%;
    height: 100%;
    padding: 0 20px !important;
    .selectbtn {
        float: right;
        margin-top: 15px;
        margin-left: 10px;
    }
    .r_title {
        display: flex;
        width: 100%;
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
        font-size: 14px;
        color: $mainColor;
        padding-left: 30px;
    }
}

.r-d-sel {
    margin-top: 20px;

    .r-d-top {
        text-align: left;
        font-weight: bold;
        height: 30px;
        color: #b6de8f;
        line-height: 30px;
    }
}
//号码类型弹框
.smalldialog {
    padding: 20px;
}

/*选择客户弹框*/
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
                background-image: url(./../../images/choose.png) no-repeat;
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

        .activeArea {
            color: $mainColor;
            border: solid 1px $mainColor;

            i {
                display: inline-block;
                width: 12px;
                height: 10px;
                background-image: url(./../../images/choose.png) no-repeat;
                background-size: 100% 100%;
                float: left;
                margin-top: 6px;
                margin-left: 6px;
            }
        }
    }
}
.p-dialog {
    padding: 20px 10px;
}
.s-l-search {
    padding-bottom:5px;
    width: 50%;
}
.blue-font {
    color: $mainColor;
    cursor: pointer;
}
.app__table-right span {
    color: $mainColor;
}
</style>
    <style lang="scss" scoped>
.picker-validate-error input {
    border: 1px solid #f1886b !important;
}
.validate-error input {
    border: 1px solid #f1886b !important;
}
.validate-error-dialog input {
    border: 1px solid #f1886b !important;
}
.src-content {
    min-height: 200px;
}
.height {
    min-height: 250px;
}
</style>
