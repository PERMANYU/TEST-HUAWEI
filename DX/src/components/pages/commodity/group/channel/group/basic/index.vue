<template>
	<div class="channel-basic">
		<Scroll class="scroll" :isShowRight="true">
			<div class="app__top">
				<span class="app__top-left">关联销售渠道</span>
			</div>
				<div class="main">
				<div class="top">
					<div class="sel-box">
						<i class="title-icon"></i>
						<span class="y-span">待选渠道信息渠道</span>

						 <!--选中的树-->
						<div class="tag-box" v-show="selTemplateType.salesTypeName">
							<span>{{selTemplateType.salesTypeName}}</span>
							<i @click="selTemplateType={}"></i>
						</div>

						<Search class="offer-sear" placeholder="请输入渠道名称"
								@search="searchResource" ref="searchVal"></Search>
					</div>
					<div class="t-left">
						<Scroll :isShowRight="true" ref="scroll">
							<TreeSimple v-for="(item,index) in salesTypeList"  :folder="item" :selLevel="9999" v-model="selTemplateType" :key="index" :children-str="'chandren'" :init-level="1" :level-str="'level'"  :keys="treeShowKeyItems" :defaultSel="treeInputSelObj"></TreeSimple>
						</Scroll>
					</div>
					<div class="t-right">
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="10">渠道名称</Col>
								<Col :span="10">渠道编码</Col>
								<Col :span="4">操作</Col>
							</Row>
							<Row :class="['app__table-item']" v-for="(item,index) in channelList" :key="index">
								<Col :span="10">{{item.channelName ? item.channelName : '无'}}</Col>
								<Col :span="10">{{item.channelNbr ? item.channelNbr : '无'}}</Col>
								<Col :span="4">
									<i v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="channelClick(item)"></i>
									<i v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteClick(item)"></i>
								</Col>
							</Row>
							<Row class="app__data-none" v-if="!channelList.length">
								<Col :span="24">
									<span >暂无数据</span>
								</Col>
							</Row>
						</div>
						<Pagination v-show="channelList.length" class="page" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=1 @change="pageChange" :isCenter="true">
						</Pagination>
					</div>
				</div>
				<div class="sel-box">
					<i class="title-icon"></i>
					<span class="y-span">已选渠道信息列表</span>
				</div>
				<!-- bottom -->
				<div class="group">
					<Row>
						<Col :span="4" v-for="(item,index) in delmkt(offerChannelRels)" :key="index"><a :title="item.channelName">{{item.channelName}}</a><span class="span" @click="configureOfferChannelRels(item)"></span><span @click="deleteOfferChannelRels(item)"></span></Col>
					</Row>
				</div>
			</div>
		</Scroll>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="配置渠道策略" ref="configureOfferChannelRels" @confirm="addChannelConfirm">
			<Scroll>
				<Row>
					<Col :span="24">
						<FormItem labelText="渠道名称：">
							{{templateObj.channelName ? templateObj.channelName : templateObj.salesTypeName}}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="24">
						<FormItem labelText="销售渠道脚本：" :requiredIcon="false" :errorMessage="errors.first('script')">
							<Input v-validate="''" name="script" data-vv-as="销售渠道脚本" v-model="offerChannelScript.script"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="22">
						<FormItem labelText="渠道酬金模板：" :requiredIcon="false" :errorMessage="errors.first('policyTemplate')">
							<Select multiple v-validate="''" :isSearch="false"   :isNullSel="true" @more="morePolicyTemplate"   name="policyTemplate" data-vv-as="渠道酬金模板" dataLabelStr="policyTemplateName" dataValueStr="policyTemplateCode" :data="offerChannelPolicyTemplateRels.policyTemplateObj"  v-model="offerChannelPolicyTemplateRels.policyTemplate"></Select>
						</FormItem>
					</Col>
					<Col class="font-blue" :span="2">
						<span @click.stop.self="morePolicyTemplate">更多</span>
					</Col>
				</Row>
				<Row>
					<Col :span="22">
						<FormItem labelText="选择酬金规则：" :requiredIcon="false" :errorMessage="errors.first('policyRule')">
							<Select  multiple v-validate="''" :isSearch="false"  :isNullSel="true"   @more="morePolicyRule"    name="policyRule" data-vv-as="渠道酬金规则" dataLabelStr="policyRuleName" dataValueStr="policyRuleCode" :data="offerChannelPolicyRuleRels.policyRuleRelObj"  v-model="offerChannelPolicyRuleRels.policyRuleRel"></Select>
						</FormItem>
					</Col>
					<Col class="font-blue" :span="2">
						<span @click.stop.self="morePolicyRule">更多</span>
					</Col>
				</Row>
				<Row>
					<Col :span="24">
						<FormItem labelText="渠道积分：" :requiredIcon="false" :errorMessage="errors.first('policyIntegral')">
							<Select multiple v-validate="''" :isSearch="true" :isNullSel="true" name="policyIntegral"  data-vv-as="渠道积分" dataLabelStr="policyIntegralName" dataValueStr="policyIntegralCode" :data="offerChannelPolicyIntegral.policyIntegralObj"  v-model="offerChannelPolicyIntegral.policyIntegral"></Select>
						</FormItem>
					</Col>
				</Row>
			</Scroll>
		</Dialog>

		<Dialog :dialogSize="dialogSizeTemp" class="" ref="template" dialogTitle="佣金模板列表" @confirm="templateConfirm">
			<Scroll>
				<div>
					<div class="search-dialog">
						<Search class="" :placeholder="'请输入搜索内容'" @search="searchTempClick"></Search>
					</div>
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="10">佣金政策模板编码</Col>
							<Col :span="12">佣金政策模板名称</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerChannelPolicyTemplateRels.policyTemplateObjDialog" :key="index" @click.stop.native='policyClick("template",item)'>
							<Col :span="10">{{item.policyTemplateCode}}</Col>
							<Col :span="12">{{item.policyTemplateName}}</Col>
							<Col :span="2" class="font-blue">
								<span :class="[policySel('template',item) ? 'iconfont icon-xuanzhong-fang' : 'iconfont icon-weixuanzhong-fang']"  ></span>
							</Col>
						</Row>
						<Row class="app__data-none" v-if="offerChannelPolicyTemplateRels.policyTemplateObjDialog.length == 0">
							<Col>
								<span>当前无数据</span>
							</Col>
						</Row>
						<Row>
							<Col :span="24">
								<Pagination :pageIndex="pageInfos.pageIndex" :pageSize="pageInfos.pageSize" isCenter :rowCount="pageInfos.rowCount" @change="pageTemplateChange" v-show="offerChannelPolicyTemplateRels.policyTemplateObj.length > 0"></Pagination>
							</Col>
						</Row>
					</div>
					<div class="choose" v-if="policyTemplateObjChoose.length > 0">
						<div class="sel-box">
							<i class="title-icon"></i>
							<span class="y-span">已选佣金规则模板</span>
						</div>
						<div class="bottom">
							<div class="app__table">
								<Row class="app__table-thead">
									<Col :span="10">佣金政策模板编码</Col>
									<Col :span="12">佣金政策模板名称</Col>
									<Col :span="2">操作</Col>
								</Row>
								<Row :class="['app__table-item']" v-for="(item,index) in policyTemplateObjChoose" :key="index">
									<Col :span="10">{{item.policyTemplateCode}}</Col>
									<Col :span="12">{{item.policyTemplateName}}</Col>
									<Col :span="2" class="font-blue">
										<span  @click.stop.self='policyClick("template",item)'>删除</span>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSizeTemp" class="" ref="rule" dialogTitle="佣金规则列表"  @confirm="ruleConfirm">
			<Scroll>
				<div>
					<div class="search-dialog">
						<Search class="" :placeholder="'请输入搜索内容'" @search="searchRuleClick"></Search>
					</div>
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="10">佣金规则编码</Col>
							<Col :span="12">佣金规则名称</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerChannelPolicyRuleRels.policyRuleRelObjDialog" :key="index"  @click.stop.native='policyClick("rule",item)'>
							<Col :span="10">{{item.policyRuleCode}}</Col>
							<Col :span="12">{{item.policyRuleName}}</Col>
							<Col :span="2" class="font-blue">
								<span :class="[policySel('rule',item) ? 'iconfont icon-xuanzhong-fang' : 'iconfont icon-weixuanzhong-fang']"  ></span>
							</Col>
						</Row>
						<Row class="app__data-none" v-if="offerChannelPolicyRuleRels.policyRuleRelObjDialog.length == 0">
							<Col>
								<span>当前无数据</span>
							</Col>
						</Row>
						<Row>
							<Col :span="24">
								<Pagination :pageIndex="pageInfos.pageIndex" :pageSize="pageInfos.pageSize" isCenter :rowCount="pageInfos.rowCount" @change="pageRuleChange" v-show="offerChannelPolicyRuleRels.policyRuleRelObj.length > 0"></Pagination>
							</Col>
						</Row>
					</div>
					<div class="choose" v-if="policyRuleRelObjChoose.length > 0">
						<div class="sel-box">
							<i class="title-icon"></i>
							<span class="y-span">已选佣金规则模板</span>
						</div>
						<div class="bottom">
							<div class="app__table">
								<Row class="app__table-thead">
									<Col :span="10">佣金规则编码</Col>
									<Col :span="12">佣金规则名称</Col>
									<Col :span="2">操作</Col>
								</Row>
								<Row :class="['app__table-item']" v-for="(item,index) in policyRuleRelObjChoose" :key="index">
									<Col :span="10">{{item.policyRuleCode}}</Col>
									<Col :span="12">{{item.policyRuleName}}</Col>
									<Col :span="2" class="font-blue">
										<span   @click.stop.self='policyClick("rule",item)'>删除</span>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
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
                size: 60,
                min: 600,
                max: 600
            },
            dialogSizeTemp: {
                size: 80,
                min: 600,
                max: 800
            },
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            pageInfo: {
                pageIndex: 1, // 当前页
                pageSize: 5, // 每页条数
                pageCount: 0, // 总页数
                rowCount: 0 // 总条数
            },
            pageInfos: {
                pageIndex: 1, // 当前页
                pageSize: 5, // 每页条数
                pageCount: 0, // 总页数
                rowCount: 0 // 总条数
            },
            offerChannelRels: [],
            treeShowKeyItems: [{ key: "salesTypeName" }],
            treeInputSelObj: {
                key: "salesTypeId",
                allArray: []
            },
            salesTypeList: [],
            selTemplateType: {},
            channelList: [],
            offerChannel: [],
            offerChannelRelsTemp: [],
            offerId: "111",
            templateObj: {},
            offerChannelScript: {
                script: ""
            },
            policyTemplateObjChoose: [],
            policyRuleRelObjChoose: [],
            offerChannelTemplateRels: [],
            offerChannelRuleRels: [],
            offerChannelPolicyTemplateRels: {
                //政策模板佣金
                policyTemplateObj: [],
                policyTemplate: [],
                policyTemplateObjDialog: []
            },
            offerChannelPolicyRuleRels: {
                //关联渠道佣金规则
                policyRuleRelObj: [],
                policyRuleRel: [],
                policyRuleRelObjDialog: []
            },
            offerChannelPolicyIntegral: {
                policyIntegralObj: [
                    { policyIntegralCode: "1", policyIntegralName: "积分A" },
                    { policyIntegralCode: "2", policyIntegralName: "积分B" }
                ],
                policyIntegral: ["1", "2"]
            },
            tipSelData: {},
            searchResourceData: ""
        };
    },
    mounted() {
        this.offerId = this.componentData.offerId;
        this.getData();
        this.getTreeData();
        this.getTreeList();
    },
    watch: {
        selTemplateType(val, oldval) {
            if (val != oldval) {
                this.$refs.searchVal.setValue("");
                this.searchResourceData = "";
                this.getTreeList(val.salesTypeNbr);
            }
        }
    },
    methods: {
        getData() {
            this.$axios
                .get(
                    this.$api.replace(
                        this.$api.OfferChannelRel,
                        ["{offerId}"],
                        [this.offerId]
                    ),
                    {
                        params: {
                            limit: "10",
                            page: "1"
                        }
                    }
                )
                .then(res => {
                    if (res.data.success == true) {
                        this.offerChannelRels = res.data.offerRestrictList;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {});
        },
        reFresh() {
            this.selTemplateType = {};
        },
        searchResource(data) {
            this.searchResourceData = data;
            this.pageInfo.pageIndex = 1;
            this.getTreeList();
        },
        findPolicyTemplate() {
            //佣金政策模板标识
            this.$axios
                .get(this.$api.PolicyTemplate, {
                    params: {
                        policyTemplateCode: "",
                        policyTemplateName: "",
                        statusCd: "1000"
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.offerChannelPolicyTemplateRels.policyTemplateObj = [
                            ...res.data.policyTemplatePage.content
                        ];
                        console.log(
                            this.offerChannelPolicyTemplateRels
                                .policyTemplateObj,
                            "佣金模板"
                        );
                        this.pageInfos.pageSize =
                            res.data.policyTemplatePage.limit;
                        this.pageInfos.rowCount =
                            res.data.policyTemplatePage.total;
                        this.pageInfos.pageIndex =
                            res.data.policyTemplatePage.long;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                });
        },
        morePolicyTemplate() {
            this.pageTemplateChange(1);
            this.policyTemplateObjChoose = [];
            this.offerChannelPolicyTemplateRels.policyTemplate.forEach(item => {
                let obj = {
                    policyTemplateCode: this.offerChannelPolicyTemplateRels.policyTemplateObj.find(
                        val => val.policyTemplateCode == item
                    ).policyTemplateCode,
                    policyTemplateId: this.offerChannelPolicyTemplateRels.policyTemplateObj.find(
                        val => val.policyTemplateCode == item
                    ).policyTemplateId,
                    policyTemplateName: this.offerChannelPolicyTemplateRels.policyTemplateObj.find(
                        val => val.policyTemplateCode == item
                    ).policyTemplateName
                };
                this.policyTemplateObjChoose.push(obj);
            });
            this.$refs.template.show();
        },
        findPolicyRule() {
            //佣金规则
            this.$axios
                .get(this.$api.PolicyRule, {
                    params: {
                        policyRuleCode: "",
                        policyRuleName: "",
                        statusCd: "1000"
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.offerChannelPolicyRuleRels.policyRuleRelObj = [
                            ...res.data.policyRulePage.content
                        ];
                        console.log(
                            this.offerChannelPolicyRuleRels.policyRuleRelObj
                        );
                        this.pageInfos.pageSize = res.data.policyRulePage.limit;
                        this.pageInfos.rowCount = res.data.policyRulePage.total;
                        this.pageInfos.pageIndex = res.data.policyRulePage.long;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                });
        },
        morePolicyRule() {
            this.pageRuleChange(1);
            this.policyRuleRelObjChoose = [];
            this.offerChannelPolicyRuleRels.policyRuleRel.forEach(item => {
                let obj = {
                    policyRuleCode: this.offerChannelPolicyRuleRels.policyRuleRelObj.find(
                        val => val.policyRuleCode == item
                    ).policyRuleCode,
                    policyRuleId: this.offerChannelPolicyRuleRels.policyRuleRelObj.find(
                        val => val.policyRuleCode == item
                    ).policyRuleId,
                    policyRuleName: this.offerChannelPolicyRuleRels.policyRuleRelObj.find(
                        val => val.policyRuleCode == item
                    ).policyRuleName
                };
                this.policyRuleRelObjChoose.push(obj);
            });
            this.$refs.rule.show();
        },
        pageRuleChange(page, data) {
            // console.log(page);
            this.pageInfos.pageIndex = page;
            this.$axios
                .get(this.$api.PolicyRule, {
                    params: {
                        policyRuleCode: "",
                        policyRuleName: data,
                        statusCd: "1000",
                        limit: "5",
                        page: this.pageInfos.pageIndex
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.offerChannelPolicyRuleRels.policyRuleRelObjDialog =
                            res.data.policyRulePage.content;
                        this.pageInfos.pageSize = res.data.policyRulePage.limit;
                        this.pageInfos.rowCount = res.data.policyRulePage.total;
                        this.pageInfos.pageIndex = res.data.policyRulePage.page;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                });
        },
        pageTemplateChange(page, data) {
            this.pageInfos.pageIndex = page;
            this.$axios
                .get(this.$api.PolicyTemplate, {
                    params: {
                        policyTemplateCode: "",
                        policyTemplateName: data,
                        statusCd: "1000",
                        limit: "5",
                        page: this.pageInfos.pageIndex
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.offerChannelPolicyTemplateRels.policyTemplateObjDialog =
                            res.data.policyTemplatePage.content;
                        this.pageInfos.pageSize =
                            res.data.policyTemplatePage.limit;
                        this.pageInfos.rowCount =
                            res.data.policyTemplatePage.total;
                        this.pageInfos.pageIndex =
                            res.data.policyTemplatePage.page;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                });
        },
        templateConfirm() {
            //佣金模板确定
            let newArr = [];
            this.policyTemplateObjChoose.forEach(item => {
                newArr.push(item.policyTemplateCode);
            });
            this.offerChannelPolicyTemplateRels.policyTemplate = [...newArr];
            this.$refs.template.hide();
        },
        ruleConfirm() {
            // 规则确定
            let newArr = [];
            this.policyRuleRelObjChoose.forEach(item => {
                newArr.push(item.policyRuleCode);
            });
            this.offerChannelPolicyRuleRels.policyRuleRel = [...newArr];
            this.$refs.rule.hide();
        },
        searchTempClick(data) {
            //模糊查询
            this.pageTemplateChange(1, data);
        },
        searchRuleClick(data) {
            this.pageRuleChange(1, data);
        },
        policyClick(type, val) {
            console.log(type, val);
            if (type == "template") {
                this.policyTemplateObjChoose.filter(
                    item => item.policyTemplateCode == val.policyTemplateCode
                )[0]
                    ? (this.policyTemplateObjChoose = this.policyTemplateObjChoose.filter(
                          item =>
                              item.policyTemplateCode != val.policyTemplateCode
                      ))
                    : this.policyTemplateObjChoose.push(val);
            } else if (type == "rule") {
                this.policyRuleRelObjChoose.filter(
                    item => item.policyRuleCode == val.policyRuleCode
                )[0]
                    ? (this.policyRuleRelObjChoose = this.policyRuleRelObjChoose.filter(
                          item => item.policyRuleCode != val.policyRuleCode
                      ))
                    : this.policyRuleRelObjChoose.push(val);
            }
        },
        policySel(type, val) {
            if (type == "template") {
                return this.policyTemplateObjChoose.filter(
                    item => item.policyTemplateCode == val.policyTemplateCode
                )[0]
                    ? true
                    : false;
            } else if (type == "rule") {
                return this.policyRuleRelObjChoose.filter(
                    item => item.policyRuleCode == val.policyRuleCode
                )[0]
                    ? true
                    : false;
            }
        },
        getTreeData() {
            this.$axios
                .get(this.$api.SalesType, {
                    params: {
                        //						limit: '10',
                        //						page: '1'
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.salesTypeList = res.data.salesTypeList;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {});
        },
        getTreeList(salesTypeNbr) {
            this.$axios
                .get(this.$api.Channel, {
                    params: {
                        limit: "5",
                        page: this.pageInfo.pageIndex,
                        salesTypeNbr: salesTypeNbr,
                        channelName: this.searchResourceData
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.channelList = res.data.channelList.content;
                        this.pageInfo.rowCount = res.data.channelList.total;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {});
        },
        pageChange(page) {
            this.pageInfo.pageIndex = page;
            this.getTreeList();
        },
        channelClick(item) {
            console.log(item, "channelClick");
            let temp = {
                channelName: item.channelName,
                channelNbr: item.channelNbr,
                channelClass: item.channelClass,
                offerId: this.offerId,
                offerRestrictId: item.offerRestrictId,
                rstrObjId: item.orgId,
                rstrObjType: "2000",
                statusCd: "1000",
                orgId: item.orgId
            };
            this.offerChannelRels.push(temp);
        },
        deleteClick(item) {
            for (var i = 0; i < this.offerChannelRels.length; i++) {
                if (this.offerChannelRels[i].rstrObjId == item.orgId) {
                    this.offerChannelRels.splice(i, 1);
                }
            }
        },
        deleteChannel(item) {
            item.statusCd = "1100";
        },
        addChannelConfirm() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    console.log(this.offerChannelRuleRels);
                    console.log(this.offerChannelTemplateRels);
                    let offerChannelPolicyTemplateRels = [];
                    let offerChannelPolicyRuleRels = [];
                    this.offerChannelPolicyTemplateRels.policyTemplate.map(
                        item => {
                            console.log(item);
                            console.log(
                                this.offerChannelTemplateRels.find(
                                    val => val.policyTemplateCode == item
                                )
                            );
                            let obj = {
                                offerChannelPolicyTemplateRelId: this.offerChannelTemplateRels.find(
                                    val => val.policyTemplateCode == item
                                )
                                    ? this.offerChannelTemplateRels.find(
                                          val => val.policyTemplateCode == item
                                      ).offerChannelPolicyTemplateRelId
                                    : "",
                                policyTemplateId: this.offerChannelPolicyTemplateRels.policyTemplateObj.find(
                                    val => val.policyTemplateCode == item
                                ).policyTemplateId,
                                offerId: this.offerId,
                                channelId: this.templateObj.orgId,
                                createStaff: "5",
                                updateStaff: "5",
                                statusCd: "1000",
                                createDate: "",
                                updateDate: ""
                            };
                            offerChannelPolicyTemplateRels.push(obj);
                        }
                    );
                    this.offerChannelPolicyRuleRels.policyRuleRel.map(item => {
                        let obj = {
                            offerChannelPolicyRuleRelId: this.offerChannelRuleRels.find(
                                val => val.policyRuleCode == item
                            )
                                ? this.offerChannelRuleRels.find(
                                      val => val.policyRuleCode == item
                                  ).offerChannelPolicyRuleRelId
                                : "",
                            policyRuleId: this.offerChannelPolicyRuleRels.policyRuleRelObj.find(
                                val => val.policyRuleCode == item
                            ).policyRuleId,
                            offerId: this.offerId,
                            channelId: this.templateObj.orgId,
                            createStaff: "5",
                            updateStaff: "5",
                            statusCd: "1000",
                            createDate: "",
                            updateDate: ""
                        };
                        offerChannelPolicyRuleRels.push(obj);
                    });
                    this.$axios
                        .post(
                            this.$api.replace(
                                this.$api.OfferChannelStrategy,
                                ["{offerId}"],
                                [this.offerId]
                            ),
                            {
                                offerChannelScript: {
                                    offerChannelScriptId: this
                                        .offerChannelScript.offerChannelScriptId
                                        ? this.offerChannelScript
                                              .offerChannelScriptId
                                        : "",
                                    offerId: this.offerId,
                                    channelId: this.templateObj.orgId,
                                    script: this.offerChannelScript.script,
                                    createStaff: "5",
                                    updateStaff: "5",
                                    statusCd: "1000",
                                    createDate: "",
                                    updateDate: ""
                                },
                                offerChannelPolicyTemplateRels: offerChannelPolicyTemplateRels,
                                offerChannelPolicyRuleRels: offerChannelPolicyRuleRels
                            }
                        )
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message.success({ message: "成功！" });
                                this.$refs.configureOfferChannelRels.hide();
                            } else {
                                this.$message.error({ message: "失败！" });
                            }
                        })
                        .catch(error => {
                            this.$message.error({ message: "失败！" });
                        });
                }
            });
        },
        save(callback) {
            this.$axios
                .post(
                    this.$api.replace(
                        this.$api.OfferRestrict,
                        ["{offerId}"],
                        [this.offerId]
                    ),
                    {
                        offerChannelRels: this.offerChannelRels
                    }
                )
                .then(res => {
                    if (res.data.success == true) {
                        this.getData();
                        this.$message.success({ message: "成功！" });
                        callback(true);
                    } else {
                        this.$message.error({ message: "失败！" });
                        callback(false);
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                    callback(false);
                });
        },
        deleteOfferChannelRels(item) {
            this.tipType = "DEL";
            this.tipSelData = item;
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = `是否确认删除？`;
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
        },
        configureOfferChannelRels(item) {
            //配置
            this.findPolicyTemplate();
            this.findPolicyRule();
            this.templateObj = item;
            this.offerChannelPolicyTemplateRels.policyTemplate = [];
            this.offerChannelPolicyRuleRels.policyRuleRel = [];
            this.offerChannelScript.script = "";
            this.offerChannelPolicyRuleRels.policyRuleRel = [];
            this.offerChannelPolicyIntegral.policyIntegral = [];
            this.$axios
                .get(
                    this.$api.replace(
                        this.$api.OfferChannelStrategy,
                        ["{offerId}"],
                        [this.offerId]
                    ),
                    {
                        params: {
                            offerId: this.offerId,
                            channelId: item.orgId
                        }
                    }
                )
                .then(res => {
                    if (res.data.success == true) {
                        (this.offerChannelTemplateRels = [
                            ...res.data.offerChannelPolicyTemplateRels
                        ]),
                            (this.offerChannelRuleRels = [
                                ...res.data.offerChannelPolicyRuleRels
                            ]);
                        let offerChannelPolicyTemplateRels = [
                            ...res.data.offerChannelPolicyTemplateRels
                        ];
                        let offerChannelPolicyRuleRels = [
                            ...res.data.offerChannelPolicyRuleRels
                        ];
                        console.log(
                            this.offerChannelPolicyTemplateRels.policyTemplate
                        );
                        offerChannelPolicyTemplateRels.forEach(element => {
                            this.offerChannelPolicyTemplateRels.policyTemplate.push(
                                element.policyTemplateCode
                            );
                        });
                        offerChannelPolicyRuleRels.forEach(element => {
                            this.offerChannelPolicyRuleRels.policyRuleRel.push(
                                element.policyRuleCode
                            );
                        });
                        this.offerChannelPolicyIntegral.policyIntegral = [
                            "1",
                            "2"
                        ];
                        this.offerChannelScript = res.data.offerChannelScript;
                    } else {
                        this.$message.error({ message: "失败！" });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "失败！" });
                });
            this.$refs.configureOfferChannelRels.show();
        },
        tipConfirm() {
            console.log(this.tipSelData);
            this.tipSelData.statusCd = "1100";
            this.$refs.tip.hide();
        },
        selectMkt(val) {
            return this.offerChannelRels
                .filter(item => item.statusCd != "1100")
                .find(item => item.channelNbr == val.channelNbr);
        },
        delmkt(arr) {
            return [...arr].filter(item => item.statusCd != "1100");
        }
    }
};
</script>

<style scoped lang="scss">
.channel-basic {
    width: 100%;
    height: 100%;

    .app__top {
        margin-bottom: 0;
    }
    .scroll {
        z-index: 10;
        padding: 20px 20px !important;
        .search-dialog {
            width: 300px;
            margin-bottom: 10px;
        }

        .app__table {
            .span {
                color: $mainColor;
                padding: 0 5px;
                cursor: pointer;
            }
        }
    }
}

.main {
    .top {
        width: 100%;
        height: 300px;
        .t-left {
            width: 30%;
            height: 100%;
            float: left;
            .app__title {
                width: 160px;
                text-align: center;
            }
            .title-span {
                padding: 5px 40px 5px 5px;
                text-align: left;
                margin-left: 10px;
                background: #eff6fc;
                span {
                    display: block;
                    width: 8px;
                    height: 8px;
                    background: url(images/bqsc.png) no-repeat;
                    position: absolute;
                    right: 10px;
                    top: 12px;
                    cursor: pointer;
                }
            }
            .t-span {
                display: block;
                padding-bottom: 10px;
            }
            .scroll {
                border: 1px solid #f6f6f6;
            }
        }
        .t-right {
            width: 70%;
            height: 100%;
            float: right;
            padding-left: 10px;
            .search-span {
                width: 338px;
                margin-bottom: 10px;
                margin-left: 395px;
            }
            .t-span {
                display: block;
                padding-bottom: 10px;
            }
            .t-top {
                padding-top: 40px;
            }
            .page {
                z-index: 10;
            }
        }
    }
    /*表格标题+搜索框*/
    .sel-box {
        width: 100%;
        line-height: 50px;
        padding: 0 20px 0 10px;
        border-left: solid 1px #f6f6f6;
        border-right: solid 1px #f6f6f6;

        .tag-box {
            display: inline-block;
            line-height: 0;
            padding: 10px;
            margin: 10px;
            border: solid 1px #d5e8f9;
            background-color: #eff7fd;
            color: $mainColor;

            i {
                display: inline-block;
                width: 8px;
                height: 8px;
                cursor: pointer;
                margin-left: 10px;
                background: url("./images/bqsc.png") no-repeat;
                background-size: cover;
            }
        }
        /*图标*/
        i.title-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("./../../../sales/images/sjicon.png") no-repeat;
            background-size: cover;
            vertical-align: text-top;
        }
        /*表格标题样式*/
        .y-span {
            display: inline-block;
            margin-left: 4px;
            color: $mainColor;
            font-size: 14px;
            font-weight: bold;
        }
        /*搜索框样式*/
        .offer-sear {
            float: right;
            width: 25%;
            margin-top: 4px;
        }
    }
    .group {
        border-left: solid 1px #f6f6f6;
        border-right: solid 1px #f6f6f6;
        border-bottom: solid 1px #f6f6f6;
        .col {
            background: #eff6fc;
            margin-right: 10px;
            margin-bottom: 10px;
            padding-left: 10px;
            color: $mainColor;
            span {
                display: block;
                width: 8px;
                height: 8px;
                background: url(images/bqsc.png) no-repeat;
                position: absolute;
                right: 10px;
                top: 17px;
                cursor: pointer;
            }
            .span {
                display: block;
                width: 11px;
                height: 12px;
                background: url(images/edit.png) no-repeat;
                position: absolute;
                right: 30px;
                top: 14px;
                cursor: pointer;
            }
            a {
                display: inline-block;
                width: 80%;
                height: 28px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.font-blue {
    color: $mainColor;
    text-align: center;
    cursor: pointer;
}
</style>