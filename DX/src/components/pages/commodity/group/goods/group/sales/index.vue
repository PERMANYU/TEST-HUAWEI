<template>
	<div class="sales">
		<div class="app__top" @click="glzShowClick()">
			<span class="app__top-left">关联组关系</span>
			<i :class="['iconfont','icon-xiala12',glzIsShow ? 'active' : '']" @click.stop="glzShowClick()"></i>
		</div>
		<div class="h-a-add" v-show="glzIsShow">
			<Row>
				<Col :span="19">
					<div class="app__btn app__btn-add" @click="addSales()">添加</div>
				</Col>
				<Col :span="5">
					<div class="app__btn app__btn-add" @click="batchEdit()">批量修改</div>
					<div class="app__btn app__btn-add" @click="batchDelete()">批量删除</div>
				</Col>
			</Row>
		</div>
		<Scroll class="app__table__inner offer-rels-table" v-if="glzIsShow" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerGrpParams" @dragchange="dragchange">
				<Col :class="['m-item']" :width="tableTitleCheckboxObj.width">
					
				</Col>
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerGrpParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
				<Col :width="150">
					操作
				</Col>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(offerGrpRelaDTOList)" :key="'offerRel' + index">
				<Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkArr" :label="offerRelitem"></Checkbox>
				</Col>
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerGrpParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>

				<Col :width="150">
					<span class="iconfont icon-xiugai" @click="editSales(offerRelitem)"></span>
					<span class="span iconfont icon-shanchu" @click="deleteSales(offerRelitem)"></span>
				</Col>
			</Row>
			<Row v-if="offerGrpRelaDTOList.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据</span>
				</Col>
			</Row>
		</Scroll>
		<div class="app__top s-title" @click="gszShowClick()">
			<span class="app__top-left">归属组</span>
			<i :class="['iconfont','icon-xiala12',gszIsShow ? 'active' : '']" @click.stop="gszShowClick()"></i>
		</div>
		<div class="h-a-add" v-show="gszIsShow">
			<div class="app__btn app__btn-add" @click="addGroup()">添加</div>
		</div>
		<div class="group" v-show="gszIsShow && offerGrpDTOList.length > 0">
			<Row>
				<Col class="no-wrap" :title="item.offerGrpName" :span="4" v-for="(item,index) in offerGrpDTOList" :key="index">{{item.offerGrpName}}<span @click="deleteOfferGrp(item)"></span></Col>
			</Row>
		</div>
		<Row v-if="offerGrpDTOList.length == 0 && gszIsShow" class="app__data-none">
			<Col :span="24">
			<span>当前无数据 请先选择销售品组</span>
			</Col>
		</Row>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加归属组" ref="addGroup" @confirm="addGroupConfirm">
			<Scroll class="main" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入销售品组名称搜索" @search="search"></Search>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="8">销售品组名称</Col>
						<Col :span="8">销售品组编码</Col>
						<Col :span="8">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in offerGrpPage" :key="index">
						<Col :span="8">{{item.offerGrpName}}</Col>
						<Col :span="8">{{item.offerGrpNbr}}</Col>
						<Col :span="8">
						<span v-if="!selectGroupMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addOfferGrpPage(item)"></span>
						<span v-if="selectGroupMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferGrpPage(item)"></span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="pageInfo.ZpageIndex" :pageSize="pageInfo.ZpageSize" :rowCount="pageInfo.ZrowCount" :perPages=5 @change="ZpageChange" :isCenter="true">
				</Pagination>
				<span class="y-span" v-show="groupSelected.length>0">已选</span>
				<div class="app__table__inner" v-show="groupSelected.length>0">
					<Row class="app__table-thead">
						<Col :span="8">销售品组名称</Col>
						<Col :span="8">销售品组编码</Col>
						<Col :span="8">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in delmkt(groupSelected)" :key="index">
						<Col :span="8">{{item.offerGrpName}}</Col>
						<Col :span="8">{{item.offerGrpNbr}}</Col>
						<Col :span="8">
						<span class="iconfont icon-shanchu" @click="deleteGroup(item,index)"></span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="更多信息" ref="offerGrpRelaMore" :showBtn="false">
			<div class="main">
				<Form labelWidth="110px">
					<div class="a-info">
						<Row>
							<Col :span="10">
							<FormItem labelText="最大值：">
								<span>{{offerGrpRelaMoreData.maxNum}}</span>
							</FormItem>
							</Col>
							<Col :span="10">
							<FormItem labelText="最小值：">
								<span>{{offerGrpRelaMoreData.minNum}}</span>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10">
							<FormItem labelText="生效时间：">
								<span>{{offerGrpRelaMoreData.effDate | date}}</span>
							</FormItem>
							</Col>
							<Col :span="10">
							<FormItem labelText="失效时间：">
								<span>{{offerGrpRelaMoreData.expDate | date}}</span>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		</Dialog>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加关联关系" ref="addSales" @confirm="addSalesConfirm">
			<Scroll class="main" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入销售品组名称搜索" @search="search"></Search>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="8">销售品组名称</Col>
						<Col :span="8">销售品组编码</Col>
						<Col :span="8">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in offerGrpPage" :key="index">
						<Col :span="8">{{item.offerGrpName}}</Col>
						<Col :span="8">{{item.offerGrpNbr}}</Col>
						<Col :span="8">
						<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addClick(item)"></span>
						<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteGrp(item)"></span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="pageInfo.ZpageIndex" :pageSize="pageInfo.ZpageSize" :rowCount="pageInfo.ZrowCount" :perPages=5 @change="ZpageChange" :isCenter="true">
				</Pagination>
				<span class="y-span" v-show="offerPageSelected.length>0">已选</span>
				<div class="app__table__inner" v-show="offerPageSelected.length>0">
					<Row class="app__table-thead">
						<Col :span="4">当前销售品</Col>
						<Col :span="2">关联关系</Col>
						<Col :span="2">关联方向</Col>
						<Col :span="4">销售品组名称</Col>
						<Col :span="2">最大值</Col>
						<Col :span="2">最小值</Col>
						<Col :span="3">生效时间</Col>
						<Col :span="3">失效时间</Col>
						<Col :span="2">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in delmkt(offerPageSelected)" :key="index">
						<Col :span="4" class="no-wrap" :title="item.wOfferName">{{item.wOfferName}}</Col>
						<!--<Col :span="4" v-if="item.direction == 2">{{item.mOfferName}}</Col>-->
						<Col :span="2">
						<Select :class="{validate:!item.relType}" :data="relType" v-model="item.relType"></Select>
						</Col>
						<Col :span="2">
							<Select v-if="item.relType != '200000'" :data="direction" v-model="item.direction" :isNullSel="false"></Select>
							<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
						</Col>
						<Col :span="4" class="no-wrap" :title="item.mOfferName">{{item.mOfferName}}</Col>
						<!--<Col :span="4" v-if="item.direction == 2">{{item.wOfferName}}</Col>-->
						<Col :span="2" :class="{validate:valiateInput(item.maxNum)}">
						<Input v-model="item.maxNum" number></Input>
						</Col>
						<Col :span="2" :class="{validate:valiateInput(item.minNum)}">
						<Input v-model="item.minNum" number></Input>
						</Col>
						<Col :span="3" :class="{validate:!item.effDate}">
						<DatePicker v-model="item.effDate"></DatePicker>
						</Col>
						<Col :span="3" :class="{validate:!item.expDate}">
						<DatePicker v-model="item.expDate"></DatePicker>
						</Col>
						<Col :span="2">
						<span class="iconfont icon-shanchu" @click="deleteClick(item)"></span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="editSalesDialogSize" class="h-dialog" dialogTitle="修改关联关系" ref="editSales" @confirm="editSalesConfirm">
            <Form labelWidth="100px" data-vv-scope="editSales">
                <div class="edit-sales-dialog">
                    <Row>
                        <Col>
                            <FormItem labelText="Z端销售品或组名称：">
                                {{editSalesObj.zName}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="关联关系：" :requiredIcon="true" :errorMessage="errors.first('editSales.relType')">
                                <Select v-validate="'required'" name="relType" :data="relType" v-model="editSalesObj.relType" data-vv-as="关联关系"></Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="关联方向：">
                            	<Select v-if="editSalesObj.relType != '200000'" :data="direction" v-model="editSalesObj.direction" :isNullSel="false"></Select>
								<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="A端销售品或组名称：">
                                {{editSalesObj.aName}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="最大值：" :requiredIcon="true" :errorMessage="errors.first('editSales.maxNum')">
                                <Input v-validate="'required'" name="maxNum" v-model="editSalesObj.maxNum" number data-vv-as="最大值"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="最小值：" :requiredIcon="true" :errorMessage="errors.first('editSales.minNum')">
                                <Input v-validate="'required'" name="minNum" v-model="editSalesObj.minNum" number data-vv-as="最小值"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editSales.effDate')">
                                <DatePicker v-validate="'required'" name="effDate" v-model="editSalesObj.effDate" data-vv-as="生效时间"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editSales.expDate')">
                                <DatePicker v-validate="'required'" name="expDate" v-model="editSalesObj.expDate" data-vv-as="失效时间"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
		</Dialog>
		<Dialog :dialogSize="editSalesDialogSize" class="h-dialog" dialogTitle="批量修改关联关系" ref="editSalesMore" @confirm="editSalesMoreConfirm">
            <Form labelWidth="100px" data-vv-scope="editSales">
                <div class="edit-sales-dialog">
                    <Row>
                        <Col>
                            <FormItem labelText="Z端销售品或组名称：">
                                {{componentData.offerName}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="关联关系：" :requiredIcon="true" :errorMessage="errors.first('editSales.relType')">
                                <Select v-validate="'required'" name="relType" :data="relType" v-model="editSalesObj.relType" data-vv-as="关联关系"></Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="关联方向：">
                            	<Select v-if="editSalesObj.relType != '200000'" :data="direction" v-model="editSalesObj.direction" :isNullSel="false"></Select>
								<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="最大值：" :requiredIcon="true" :errorMessage="errors.first('editSales.maxNum')">
                                <Input v-validate="'required'" name="maxNum" v-model="editSalesObj.maxNum" number data-vv-as="最大值"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="最小值：" :requiredIcon="true" :errorMessage="errors.first('editSales.minNum')">
                                <Input v-validate="'required'" name="minNum" v-model="editSalesObj.minNum" number data-vv-as="最小值"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editSales.effDate')">
                                <DatePicker v-validate="'required'" name="effDate" v-model="editSalesObj.effDate" data-vv-as="生效时间"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editSales.expDate')">
                                <DatePicker v-validate="'required'" name="expDate" v-model="editSalesObj.expDate" data-vv-as="失效时间"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipMore" :tipObj="tipInfo" @confirm="tipConfirmMore()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 90,
					min: 800,
					max: 1000
				},
                editSalesDialogSize:{
                    size: 40,
                    min: 500,
                    max: 1000
                },
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0, // 总条数
					ZpageIndex: 1, // 当前页
					ZpageSize: 5, // 每页条数
					ZpageCount: 0, // 总页数
					ZrowCount: 0 // 总条数
				},
				offerId: '',
				offerGrpRelaDTOList: [],
				offerGrpDTOList: [],
				offerPage: [],
				offerPageSelected: [],
				direction: [{
					value: '1',
					label: '正向'
				}, {
					value: '2',
					label: '反向'
				}],
				relType: [{
					value: '140000',
					label: '松融合'
				}, {
					value: '150000',
					label: '关联包'
				}, {
					value: '160000',
					label: '要求'
				}, {
					value: '170000',
					label: '可选'
				}, {
					value: '200000',
					label: '互斥'
				}, {
					value: '600000',
					label: '接续'
				}],
				groupSelected: [],
				offerGrpRelaTemp: [],
				offerGrpPage: [],
				offerGrpMemberTemp: [],
				name: '',
				nbr: '',
				offerGrpRelaMoreData: {},
				editOfferGrpRelaData: {},
				idTemp: [],
				tipSelData: {},
				glzIsShow: false,
				gszIsShow: false,
                editSalesObj:{},
                shuangxiang: '0',
				directionData: [{
					value: '0',
					label: '双向'
				}],
				checkArr: [],
				offerGrpParams: [{
					name: 'Z端销售品或组名称',
					param: 'zName',
					width: 300
				},{
					name: 'Z端销售品或组编码',
					param: 'zNbr',
					width: 150
				},{
					name: '关系类型',
					param: 'relType',
					width: 100
				},{
					name: 'A端销售品或组名称',
					param: 'aName',
					width: 300
				},{
					name: 'A端销售品或组编码',
					param: 'aNbr',
					width: 150
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '生效时间',
					param: 'effDate',
					width: 100
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100
				}],
				tableTitleCheckboxObj: {
					name: '',
					param: '',
					width: 100
				}
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			reInitData(){
				this.getData();
			},
			getData() {
				this.$axios.get(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
					params: {
						//						limit: '10',
						//						page: '1'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerGrpRelaDTOList = res.data.offerGrpRelaDTOList;
						this.offerGrpDTOList = res.data.offerGrpDTOList;
						for(let ele of this.offerGrpRelaDTOList) {
							if(this.componentData.offerId == ele.aId) {
								this.idTemp[ele].offerId = ele.zId
							} else {
								this.idTemp.push({
									offerId: ele.aId
								})
							}
						}
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			addSales() {
				this.offerPageSelected = [];
				for(let ele of this.offerGrpRelaDTOList) {
					let temp = {};
					if(this.componentData.offerId == ele.aId) {
						temp = {
							direction: '2',
							wOfferName: ele.aName,
							wOfferId: ele.aId,
							relType: ele.relType,
							mOfferName: ele.zName,
							mOfferId: ele.zId,
							maxNum: ele.maxNum,
							minNum: ele.minNum,
							effDate: ele.effDate,
							expDate: ele.expDate,
							offerGrpRelId: ele.offerGrpRelId,
							statusCd: ele.statusCd
						}
						this.offerPageSelected.push(temp);
					} else {
						temp = {
							direction: '1',
							wOfferName: ele.zName,
							wOfferId: ele.zId,
							relType: ele.relType,
							mOfferName: ele.aName,
							mOfferId: ele.aId,
							maxNum: ele.maxNum,
							minNum: ele.minNum,
							effDate: ele.effDate,
							expDate: ele.expDate,
							offerGrpRelId: ele.offerGrpRelId,
							statusCd: ele.statusCd
						}
						this.offerPageSelected.push(temp);
					}
				}
				this.$refs.addSales.show();
				this.getOfferGrp()
			},
			getOfferGrp(offerGrpName){
				this.$axios.get(this.$api.OfferGrp, {
					params: {
						limit: this.pageInfo.ZpageSize,
						page: this.pageInfo.ZpageIndex,
						offerGrpName: offerGrpName
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerGrpPage = res.data.offerGrpPage.content;
						this.pageInfo.ZrowCount = res.data.offerGrpPage.total;
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			search(val) {
				this.getOfferGrp(val);
			},
			offerGrpRelaMore(item) {
				this.$refs.offerGrpRelaMore.show();
				this.offerGrpRelaMoreData = item;
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.getOfferGrp();
			},
			addClick(item) {
				let Temp = {
					direction: '1',
					wOfferName: this.componentData.offerName,
					wOfferNbr: this.componentData.memberCode,
					wOfferId: this.componentData.offerId,
					relType: '',
					mOfferName: item.offerGrpName,
					mOfferNbr: item.offerGrpNbr,
					mOfferId: item.offerGrpId,
					maxNum: '1',
					minNum: '0',
					effDate: new Date().getTime(),
					expDate: '2050-12-31',
					offerGrpRelId: '',
					statusCd: '1000'
				}
				this.offerPageSelected.push(Temp);
			},
			deleteGrp(item) {
				for(var i=0;i<this.offerPageSelected.length;i++){
					if(this.offerPageSelected[i].mOfferId == item.offerGrpId){
						this.offerPageSelected.splice(i,1);
					}
				}
			},
			deleteClick(item) {
				item.statusCd = '1100';
			},
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			addSalesConfirm() {
				this.offerGrpRelaTemp = [];
				for(var i = 0; i < this.offerPageSelected.length; i++) {
						if(!this.offerPageSelected[i].offerGrpRelId && this.offerPageSelected[i].statusCd == '1100') {
							this.offerPageSelected.splice(i, 1);
						}
					}
				for(let ele of this.offerPageSelected){
					if(ele.statusCd == '1100') continue;
					if(!ele.relType || this.valiateInput(ele.maxNum) || this.valiateInput(ele.minNum) || !ele.effDate || !ele.expDate){
						console.log('min', ele.minNum)
						this.$message.warning({message: '请输入红框值！'});
						return;
					}else{
						if(Number(ele.minNum)>Number(ele.maxNum)){
							this.$message.warning({message: '最小值必须小于最大值！'});
							return
						}else{
							if(new Date(ele.effDate).getTime()>new Date(ele.expDate).getTime()){
								this.$message.warning({message: '生效时间必须小于失效时间！'});
								return
							}
						}
					}
				}
				for(let ele of this.offerPageSelected) {
					let temp = {}
					if(ele.direction == 1) {
						temp = {
							"offerGrpRelId": ele.offerGrpRelId,
							"aId": ele.mOfferId,
							"aName": ele.mOfferName,
							"aNbr": ele.mOfferNbr,
							"aType": '2000',
							"zId": ele.wOfferId,
							"zName": ele.wOfferName,
							"zNbr": ele.wOfferNbr,
							"zType": '1000',
							"relType": ele.relType,
							"maxNum": ele.maxNum,
							"minNum": ele.minNum,
							"effDates": ele.effDate ? new Date(ele.effDate) : '',
							"expDates": ele.expDate ? new Date(ele.expDate) : '',
							"createStaff": ele.createStaff,
							"updateStaff": ele.updateStaff,
							"statusCd": ele.statusCd
						}
						this.offerGrpRelaTemp.push(temp);
					} else {
						temp = {
							"offerGrpRelId": ele.offerGrpRelId,
							"aId": ele.wOfferId,
							"aName": ele.wOfferName,
							"aNbr": ele.wOfferNbr,
							"aType": '1000',
							"zId": ele.mOfferId,
							"zName": ele.mOfferName,
							"zNbr": ele.mOfferNbr,
							"zType": '2000',
							"relType": ele.relType,
							"maxNum": ele.maxNum,
							"minNum": ele.minNum,
							"effDates": ele.effDate ? new Date(ele.effDate) : '',
							"expDates": ele.expDate ? new Date(ele.expDate) : '',
							"createStaff": ele.createStaff,
							"updateStaff": ele.updateStaff,
							"statusCd": ele.statusCd
						}
						this.offerGrpRelaTemp.push(temp);
					}
				}
				for(var i =0;i<this.offerGrpRelaTemp.length;i++){
					if(!this.offerGrpRelaTemp[i].offerGrpRelId && this.offerGrpRelaTemp[i].statusCd == '1100') {
						this.offerGrpRelaTemp.splice(i,1);
					}
				}


				this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
					"offerGrpMemberDTOList": [],
					"offerGrpRelaDTOList": this.offerGrpRelaTemp
				}).then(res => {
					if(res.data.success == true) {
						this.getData();
						this.$message.success({ message: '成功！' });
						this.$refs.addSales.hide();
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			editSales(item) {
                item.direction = this.componentData.offerId == item.aId ? '2' : '1';

                this.editSalesObj = JSON.parse(JSON.stringify(item));


				this.$refs.editSales.show();
				this.editOfferGrpRelaData = item;
			},
			editSalesConfirm() {
                this.$validator.validateAll('editSales').then((result) => {
                    if(result) {
                    	let tempEditSalesObj = JSON.parse(JSON.stringify(this.editSalesObj));

                        if(Number(tempEditSalesObj.minNum)>Number(tempEditSalesObj.maxNum)){
                            this.$message.warning({message: '最小值必须小于最大值！'});
                            return;
                        }

                        if(new Date(tempEditSalesObj.effDate).getTime()>new Date(tempEditSalesObj.expDate).getTime()){
                            this.$message.warning({message: '生效时间必须小于失效时间！'});
                            return;
                        }

                        if((this.componentData.offerId == tempEditSalesObj.aId && tempEditSalesObj.direction == '1') || (this.componentData.offerId == tempEditSalesObj.zId && tempEditSalesObj.direction == '2')){
                            let tId = tempEditSalesObj.aId,
                                tName = tempEditSalesObj.aName,
                                tNbr = tempEditSalesObj.aNbr,
                                tType = tempEditSalesObj.aType;

                            tempEditSalesObj.aId = tempEditSalesObj.zId;
                            tempEditSalesObj.aName = tempEditSalesObj.zName;
                            tempEditSalesObj.aNbr = tempEditSalesObj.zNbr;
                            tempEditSalesObj.aType = tempEditSalesObj.zType;

                            tempEditSalesObj.zId = tId;
                            tempEditSalesObj.zName = tName;
                            tempEditSalesObj.zNbr = tNbr;
                            tempEditSalesObj.zType = tType;
                        }


                        this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
                            "offerGrpMemberDTOList": [],
                            "offerGrpRelaDTOList": [tempEditSalesObj]
                        }).then(res => {
                            if(res.data.success == true) {
                                this.$message.success({ message: '成功！' });
                                this.$refs.editSales.hide();
                                this.getData();
                            } else {
                                this.$message.error({ message: '失败！' });
                            }
                        }).catch(error => {
                            this.$message.error({ message: error.response.data.msg });
                        })

                    }
                })
			},
			deleteSales(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				if(this.tipSelData.offerGrpRelId) {
					this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
						"offerGrpMemberDTOList": [],
						"offerGrpRelaDTOList": [{
							"offerGrpRelId": this.tipSelData.offerGrpRelId,
							"aId": this.tipSelData.wOfferId,
							"aName": this.tipSelData.wOfferName,
							"aNbr": this.tipSelData.wOfferNbr,
							"aType": '1000',
							"zId": this.tipSelData.mOfferId,
							"zName": this.tipSelData.mOfferName,
							"zNbr": this.tipSelData.mOfferNbr,
							"zType": '2000',
							"relType": this.tipSelData.relType,
							"maxNum": this.tipSelData.maxNum,
							"minNum": this.tipSelData.minNum,
							"effDates": this.tipSelData.effDate ? new Date(this.tipSelData.effDate) : '',
							"expDates": this.tipSelData.expDate ? new Date(this.tipSelData.expDate) : '',
							"createStaff": this.tipSelData.createStaff,
							"updateStaff": this.tipSelData.updateStaff,
							"statusCd": '1100',
							"createDate": "2018-10-18T10:54:54Z",
							"updateDate": "2018-10-18T10:54:54Z"
						}]
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	                   this.$message.error({ message: error.response.data.msg });
					})
				}else {
					this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
					"offerGrpMemberDTOList": [{
						"offerGrpMemberId": this.tipSelData.offerGrpMemberId,
						"offerId": this.tipSelData.offerId,
						"offerGrpId": this.tipSelData.offerGrpId,
						"offerGrpName": this.tipSelData.offerGrpName,
						"offerGrpNbr": this.tipSelData.offerGrpNbr,
						"grpRelType": this.tipSelData.grpRelType,
						"grpType": this.tipSelData.grpType,
						"createStaff": this.tipSelData.createStaff,
						"updateStaff": this.tipSelData.updateStaff,
						"statusCd": '1100',
						"createDate": this.tipSelData.createDate,
						"updateDate": this.tipSelData.updateDate
					}],
					"offerGrpRelaDTOList": []
				}).then(res => {
					if(res.data.success == true) {
						this.getData();
						this.$message.success({ message: '成功！' });
						this.$refs.tip.hide();
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
				})
				}
			},
			addGroup(offerGrpName) {
				this.groupSelected = [];
				for(let ele of this.offerGrpDTOList) {
					let temp = {
						"offerGrpMemberId": ele.offerGrpMemberId,
						"offerId": ele.offerId,
						"offerGrpId": ele.offerGrpId,
						"offerGrpName": ele.offerGrpName,
						"offerGrpNbr": ele.offerGrpNbr,
						"grpRelType": ele.grpRelType,
						"grpType": ele.grpType,
						"createStaff": ele.createStaff,
						"updateStaff": ele.updateStaff,
						"statusCd": ele.statusCd,
						"createDate": ele.createDate,
						"updateDate": ele.updateDate
					}
					this.groupSelected.push(temp);
				}
				this.$refs.addGroup.show();
				this.$axios.get(this.$api.OfferGrp, {
					params: {
						limit: this.pageInfo.ZpageSize,
						page: this.pageInfo.ZpageIndex,
						offerGrpName: offerGrpName
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerGrpPage = res.data.offerGrpPage.content;
						this.pageInfo.ZrowCount = res.data.offerGrpPage.total;
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			ZpageChange(page) {
				this.pageInfo.ZpageIndex = page;
				this.addGroup();
			},
			addOfferGrpPage(item) {
				this.groupSelected.push(item)
			},
			deleteOfferGrpPage(item) {
				for(var i=0;i<this.groupSelected.length;i++){
					if(this.groupSelected[i].offerGrpId == item.offerGrpId){
						this.groupSelected.splice(i,1);
					}
				}
			},
			addGroupConfirm() {
				this.offerGrpMemberTemp = [];
				for(let ele of this.groupSelected) {
					let temp = {
						"offerGrpMemberId": ele.offerGrpMemberId,
						"offerId": this.componentData.offerId,
						"offerGrpId": ele.offerGrpId,
						"offerGrpName": ele.offerGrpName,
						"offerGrpNbr": ele.offerGrpNbr,
						"grpRelType": ele.grpRelType,
						"grpType": ele.grpType,
						"createStaff": ele.createStaff,
						"updateStaff": ele.updateStaff,
						"statusCd": ele.statusCd,
						"createDate": ele.createDate,
						"updateDate": ele.updateDate
					}
					this.offerGrpMemberTemp.push(temp);
				}
				for(var i =0;i<this.offerGrpMemberTemp.length;i++){
					if(!this.offerGrpMemberTemp[i].offerGrpMemberId && this.offerGrpMemberTemp[i].statusCd == '1100'){
						this.offerGrpMemberTemp.splice(i,1);
					}
				}
				this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
					"offerGrpMemberDTOList": this.offerGrpMemberTemp,
					"offerGrpRelaDTOList": []
				}).then(res => {
					if(res.data.success == true) {
						this.getData();
						this.$message.success({ message: '成功！' });
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
				})
				this.$refs.addGroup.hide();
			},
			deleteGroup(item,index) {
				if(item.offerGrpMemberId){
					item.statusCd = '1100';
				}else{
					this.groupSelected.splice(index,1);
				}
			},
			deleteOfferGrp(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			selectMkt(val) {
				return this.offerPageSelected.filter(item => item.statusCd != '1100').find(item => item.mOfferId == val.offerGrpId)
			},
			selectGroupMkt(val) {
				return this.groupSelected.filter(item => item.statusCd != '1100').find(item => item.offerGrpId == val.offerGrpId)
			},
			dateChange(val) {
				val.split("",10).join();
			},
			glzShowClick(){
				this.glzIsShow = !this.glzIsShow;
			},
			gszShowClick(){
				this.gszIsShow = !this.gszIsShow;
			},
			batchEdit() {
				if(this.checkArr.length>0){
					this.$refs.editSalesMore.show();
					this.editSalesObj = {};
				}else{
					this.$message.error({ message: '请先选择关联组关系！' });
					return;
				}
			},
			editSalesMoreConfirm() {
                this.$validator.validateAll('editSales').then((result) => {
                    if(result) {
                    	let tempEditSalesObj = JSON.parse(JSON.stringify(this.editSalesObj));

                        if(Number(tempEditSalesObj.minNum)>Number(tempEditSalesObj.maxNum)){
                            this.$message.warning({message: '最小值必须小于最大值！'});
                            return;
                        }

                        if(new Date(tempEditSalesObj.effDate).getTime()>new Date(tempEditSalesObj.expDate).getTime()){
                            this.$message.warning({message: '生效时间必须小于失效时间！'});
                            return;
                        }
                        tempEditSalesObj.effDate = new Date(tempEditSalesObj.effDate);
						tempEditSalesObj.expDate = new Date(tempEditSalesObj.expDate);

                        tempEditSalesObj.aId = '';
                        tempEditSalesObj.aName = '';
                        tempEditSalesObj.aNbr = '';
                        tempEditSalesObj.aType = '';

                        tempEditSalesObj.zId = this.componentData.offerId;
                        tempEditSalesObj.zName = this.componentData.offerName;
                        tempEditSalesObj.zNbr = this.componentData.offerNbr;
//                      tempEditSalesObj.zType = tType;
						let tempEditSalesArr = [];
						for(let ele of this.checkArr){
							let temp = {
								aId: '',
								aName: '',
								aNbr: '',
								aType: '',
								effDates: tempEditSalesObj.effDate,
								expDates: tempEditSalesObj.expDate,
								maxNum: tempEditSalesObj.maxNum,
								minNum: tempEditSalesObj.minNum,
								relType: tempEditSalesObj.relType,
								zId: tempEditSalesObj.zId,
								zName: tempEditSalesObj.zName,
								zNbr: tempEditSalesObj.zNbr,
								zType: '',
								offerGrpRelId: ele.offerGrpRelId,
								statusCd: '1000'
							}
							tempEditSalesArr.push(temp);
						}

                        this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
                            "offerGrpMemberDTOList": [],
                            "offerGrpRelaDTOList": tempEditSalesArr
                        }).then(res => {
                            if(res.data.success == true) {
                            	this.checkArr = [];
                                this.$message.success({ message: '成功！' });
                                this.$refs.editSalesMore.hide();
                                this.getData();
                            } else {
                                this.$message.error({ message: '失败！' });
                            }
                        }).catch(error => {
                            this.$message.error({ message: error.response.data.msg });
                        })

                    }
                })
			},
			batchDelete() {
				if(this.checkArr.length>0){
					this.tipType = 'DEL';
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认批量删除？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tipMore.show();
				}else{
					this.$message.error({ message: '请先选择关联组关系！' });
				}
			},
			tipConfirmMore() {
				let offerGrpRelaDTOList = [];
				for(let ele of this.checkArr){
					let temp = {
						"offerGrpRelId": ele.offerGrpRelId,
						"aId": ele.wOfferId,
						"aName": ele.wOfferName,
						"aNbr": ele.wOfferNbr,
						"aType": '1000',
						"zId": ele.mOfferId,
						"zName": ele.mOfferName,
						"zNbr": ele.mOfferNbr,
						"zType": '2000',
						"relType": ele.relType,
						"maxNum": ele.maxNum,
						"minNum": ele.minNum,
						"effDates": ele.effDate ? new Date(ele.effDate) : '',
						"expDates": ele.expDate ? new Date(ele.expDate) : '',
						"createStaff": ele.createStaff,
						"updateStaff": ele.updateStaff,
						"statusCd": '1100',
						"createDate": "2018-10-18T10:54:54Z",
						"updateDate": "2018-10-18T10:54:54Z"
					}
					offerGrpRelaDTOList.push(temp);
				}
				this.$axios.post(this.$api.replace(this.$api.OfferGrpRela, ['{offerId}'], [this.componentData.offerId]), {
						"offerGrpMemberDTOList": [],
						"offerGrpRelaDTOList": offerGrpRelaDTOList
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.checkArr = [];
							this.$message.success({ message: '成功！' });
							this.$refs.tipMore.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	                   this.$message.error({ message: error.response.data.msg });
					})
			},
			valiateInput(val){
				return !val && val !== 0;
			},
			dragchange(val){
				this.offerGrpParams = val;
			},
			pullEnd(){
				this.$refs.offerRelsScroll.initScroll();
			},
			pullMove(w,item){
				item.width = w;
			},
			adjustTabelItemText(item,param){
				let val = item[param];
				if(param == 'relType'){
					val = this.getRelType(val);
				}
				return val;
			},
			getRelType(relType){
				return {
					'140000':'松融合',
					'150000':'关联包',
					'160000':'要求',
					'170000':'可选',
					'200000':'互斥',
					'600000':'接续'
				}[relType];
			},
		}
	}
</script>

<style scoped lang="scss">
	.sales {
		width: 100%;

		.app__top{
			cursor: pointer;
            pointer-events: auto;

			.icon-xiala12{
				position: absolute;
				top: 8px;
				right: 10px;
				font-size: 16px;
				color: $mainColor;
				transition: all .3s ease;

				&.active{
					transform: rotate(-180deg);
				}
			}
		}
		
		.h-a-add {
			margin: 10px 0;
		}
		.app__table__inner {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.span {
				padding: 0 5px;
				cursor: pointer;
			}
		}
		.s-title {
			margin-top: 20px;
		}
		.group {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.col {
				background: #eff6fc;
				margin-right: 10px;
				margin-bottom: 10px;
				padding-left: 10px;
				padding-right: 30px;
				color: $mainColor;
				span {
					display: block;
					width: 8px;
					height: 8px;
					background: url(images/bqsc.png) no-repeat;
					position: absolute;
					right: 10px;
					top: 18px;
					cursor: pointer;
				}
			}
		}
	}
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin: 20px 0;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
		.validate /deep/ input{
			border-color: red;
		}
		.a-info {
			padding-top: 30px;
			margin-bottom: 30px;
		}
		span{
			cursor: pointer;
		}
	}

    .edit-sales-dialog{
        padding: 20px;
    }
</style>