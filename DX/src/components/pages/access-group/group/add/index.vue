<template>
    <transition name="fade">
        <div class="product">
			<div class="title">
				<span class="t-name" v-if="this.componentData.groupId">修改访问组</span>
				<span class="t-name" v-else>添加访问组</span>
				<span class="close" @click="pageClose()"></span>
			</div>
			<!-- 步骤条 -->
			<div class="step-item">
				<span :class="['i-name', this.tabFlag == 1 ?'active' : '' ] "> ① 访问组基本信息 
					<span class="before"> </span>
				</span>
				<span :class="['i-name', this.tabFlag == 2 ?'active' : '' ]">② 配置销售品组信息和销售品组关系
					<div class="after"></div>
				</span>
			</div>

			<!-- 配置访问组基本信息 -->
			<div class="access-info" v-if="this.tabFlag === 1" ref="addAttrName">
				<Scroll class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">基本信息</span>
					</div>
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="8">
								<FormItem labelText="组名称：" :requiredIcon="true" :errorMessage="errors.first('groupName')">
									<Input v-validate="'required'" v-model.trim="groupObj.groupName"  name="groupName" data-vv-as="组名称"></Input>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="地区:" >
									<Input  readonly :value="groupObj.area = '上海市'" name="area" data-vv-as="地区"></Input>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="组类型:">
									<Select :data="groupTypeArray"  v-model="groupObj.groupType" name="groupType" data-vv-as="组类型"></Select>
								</FormItem>
							</Col>
							<Col :span="8">
								<FormItem labelText="生效方式:" :requiredIcon="true" :errorMessage="errors.first('effectiveWay')">
									<Select v-validate="'required'" :data="effectiveWay"  v-model="groupObj.effectiveWay" name="effectiveWay" data-vv-as="生效方式" @change="changeEffectiveWayBasic(arguments[0])"></Select>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="生效时间:" :requiredIcon="true" :errorMessage="errors.first('effectiveDate')">
									<DatePicker v-validate="'required'" v-model="groupObj.effectiveDate" name="effectiveDate" placeholder="年/月/日" data-vv-as="生效时间"></DatePicker>	
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="失效时间:" :requiredIcon="true" :errorMessage="errors.first('expiryDate')">
									<DatePicker v-validate="'required'"  v-model="groupObj.expiryDate" name="expiryDate" placeholder="年/月/日" data-vv-as="失效时间"></DatePicker>	
								</FormItem>
							</Col>
							<Col>
								<FormItem labelText="描述:">
									<textarea  v-model="groupObj.groupDesc" name="groupDesc" class="access-textarea"></textarea>
								</FormItem>
							</Col>
							<Col>
								<FormItem labelText="是否邮件通知:">
									<Radio name="publishMode" label="0"
									v-model="groupObj.publishMode">是</Radio>
									<Radio name="publishMode" label="1"
									v-model="groupObj.publishMode">否</Radio>
								</FormItem>
							</Col>
							<Col>
								<div class="search-box">
									<div class="search-items" ref="searchItems">
										<div :class="['search-item']"
											v-for="(item,index) in groupObj.notifyStaffs"
											:key="index">
											<span>{{item.staffName}}</span>
											<span class="item-close" @click="closeSearch(item)"></span>
										</div>
										<div class="app__btn app__btn-add" @click="addStaffsRels()">添加</div>
									</div>
								</div>
							</Col>
						</Form>
					</Row>				
				</Scroll>
			</div>

			<!-- 配置访问组成员 -->
			<div class="access-config" v-if="this.tabFlag === 2" ref="addAttrValue">
				<div class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">访问组成员</span>
					</div>
					<!-- 访问组成员tab栏切换列表 -->
					<Row class="list-box">
						<Col class="l-item">
						<div class="l-content">
							<div class="pane">
								<div class="p-title">
									<div :class="['p-t-block',accessGroupType=='qd' ? 'active' : '']" @click="accessPaneBlockClick('qd')">
										<span>渠道成员</span>
										<span class="t-b-count"></span>
									</div>
									<div :class="['p-t-block',accessGroupType=='jy' ? 'active' : '']" @click="accessPaneBlockClick('jy')">
										<span>经营主体成员</span>
										<span class="t-b-count"></span>
									</div>
									<div :class="['p-t-block',accessGroupType=='yg' ? 'active' : '']" @click="accessPaneBlockClick('yg')">
										<span>员工成员</span>
										<span class="t-b-count"></span>
									</div>
									
								</div>
								<!-- 渠道成员 -->
								<div class="p-content main" v-if="this.accessGroupType == 'qd'">
									<Col class="search" :span="6">
										<Search placeholder="请输入渠道名称" @search="qdMemberData"></Search>
									</Col>

									<div class="btn-box">
										<span class="app__btn app__btn-confirm" @click="addChannelMemberRels()">添加</span>
										<span class="app__btn app__btn-confirm" @click="downLoadManage">下载模板</span>
										<span class="app__btn app__btn-confirm" @click="channelImport">导入
											<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="offer-file" ref="fileRef" @change="channelImportChange" />
										</span>
									</div>
									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="qdListScroll">
										<Row class="app__table-thead">
											<Col :span="5">渠道名称</Col>
											<Col :span="3">渠道编码</Col>
											<Col :span="5">区域</Col>
											<Col :span="3">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
											<Col :span="2">操作</Col>
										</Row>

										<Row :class="['app__table-item']" v-for="(item,index) in channelMemberList" :key="index">
											<Col :span="5" class="no-wrap">{{item.channelName}}</Col>
											<Col :span="3">{{item.channelNbr}}</Col>
											<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
											<Col :span="3" v-if="item.effectiveWay == '1'">立即生效</Col>
											<Col :span="3" v-else>用户指定时间生效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
											<Col :span="2">
												<span class="iconfont icon-xiugai" @click="editChannelMember(item)"></span>
												<span class="iconfont icon-shanchu" @click="delChannelMember(item, index)"></span>
											</Col>
										</Row>

										
										<Row v-if="!channelMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>
								<div class="p-footer" v-if="this.accessGroupType == 'qd'">
									<Pagination :pageIndex="channelMemberPageInfo.pageIndex" :pageSize="channelMemberPageInfo.pageSize" :rowCount="channelMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
								</div>

								<!-- 经营主体成员 -->
								<div class="p-content main" v-if="this.accessGroupType == 'jy'">
									<Col class="search" :span="6">
										<Search placeholder="请输入经营主体名称" @search="jyMemberData"></Search>
									</Col>

									<div class="btn-box">
										<span class="app__btn app__btn-confirm" @click="addOperatorsMemberRels()">添加</span>
										<span class="app__btn app__btn-confirm" @click="downLoadManage">下载模板</span>
										<span class="app__btn app__btn-confirm"  @click="operatorsImport">导入
											<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="offer-file" ref="fileRef" @change="operatorsImportChange" />
										</span>
									</div>

									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="listScroll">
										<Row class="app__table-thead">
											<Col :span="7">经营主体名称</Col>
											<Col :span="3">经营主体编码</Col>
											<Col :span="4">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
											<Col :span="4">操作</Col>
										</Row>
										<Row :class="['app__table-item']" v-for="(item,index) in operatorsMemberList" :key="index">
											<Col :span="7" class="no-wrap">{{item.operatorsName}}</Col>
											<Col :span="3">{{item.operatorsNbr}}</Col>
											<Col :span="4" v-if="item.effectiveWay == '1'">立即生效</Col>
											<Col :span="4" v-else>用户指定时间失效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
											<Col :span="4">
												<span class="iconfont icon-xiugai" @click="editOperatorsMember(item)"></span>
												<span class="iconfont icon-shanchu" @click="delOperatorsMember(item, index)"></span>
											</Col>
										</Row>
										
										<Row v-if="!operatorsMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>
								<div class="p-footer" v-if="this.accessGroupType == 'jy'">
									<Pagination :pageIndex="operatorsMemberPageInfo.pageIndex" :pageSize="operatorsMemberPageInfo.pageSize" :rowCount="operatorsMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
								</div>
								
								<!-- 员工成员 -->
								<div class="p-content main" v-if="this.accessGroupType == 'yg'">
									<Col class="search" :span="6">
										<Search placeholder="请输入员工名称" @search="ygMemberData"></Search>
									</Col>

									<div class="btn-box big">
										<span class="app__btn app__btn-confirm"  @click="addStaffMemberRels()">添加</span>
										<span class="app__btn app__btn-confirm" @click="downLoadManage('100023')">下载模板(工号)</span>
										<span class="app__btn app__btn-confirm" @click="downLoadManage('100024')">下载模板(账号)</span>
										<span class="app__btn app__btn-confirm"  @click="staffImport">导入
											<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="offer-file" ref="fileRef" @change="staffImportChange" />
										</span>
									</div>

									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="listScroll">
										<Row class="app__table-thead">
											<Col :span="2">员工姓名</Col>
											<Col :span="3">员工工号</Col>
											<Col :span="3">员工账号</Col>
											<Col :span="5">员工属地</Col>
											<Col :span="3">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
											<Col :span="2">操作</Col>
										</Row>

										<Row :class="['app__table-item']" v-for="(item,index) in staffMemberList" :key="index">
											<Col :span="2" class="no-wrap">{{item.staffName}}</Col>
											<Col :span="3">{{item.staffCode}}</Col>
											<Col :span="3">{{item.staffAccount}}</Col>
											<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
											<Col :span="3" v-if="item.effectiveWay == '1'">立即生效</Col>
											<Col :span="3" v-else>用户指定时间失效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
											<Col :span="2">
												<span class="iconfont icon-xiugai" @click="editStaffMember(item)"></span>
												<span class="iconfont icon-shanchu" @click="delStaffMember(item, index)"></span>
											</Col>
										</Row>
										<Row v-if="!staffMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>

								<div class="p-footer" v-if="this.accessGroupType == 'yg'">
									<Pagination :pageIndex="staffMemberPageInfo.pageIndex" :pageSize="staffMemberPageInfo.pageSize" :rowCount="staffMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
								</div>
							</div>
						</div>
						</Col>
						
						
						</Col>
					</Row>
					
						
				</div>
			</div>
			<!-- 访问组基本信息员工集合添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="addStaffsRels" @confirm="addStaffsSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入员工名称" @search="searchStaffsData"></Search>
					</div>

					<div class="app__table__inner">
						<!-- 表头 -->
						<Row class="app__table-thead">
							<Col :span="2">员工名称</Col>
							<Col :span="4">员工工号</Col>
							<Col :span="4">员工账号</Col>
							<Col :span="5">区局</Col>
							<Col :span="5">组织渠道</Col>
							<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in staffsList" :key="index">
							<Col :span="2" class="no-wrap">{{item.staffName}}</Col>
							<Col :span="4">{{item.staffCode}}</Col>
							<Col :span="4">{{item.staffAccount}}</Col>
							<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
							<Col :span="5">{{item.orgName}}</Col>
							<Col :span="4">
								<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addOfferPage(item)"></span>
								<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferPage(item)"></span>
							</Col>
						</Row>
						<Row v-if="staffsList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="staffsPageInfo.pageIndex" :pageSize="staffsPageInfo.pageSize" :rowCount="staffsPageInfo.rowCount"  @change="staffsPageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="staffsSelected.length>0" ref="yxScrollRef">已选员工</span>
					<!-- 已选员工的表格 -->
					<Scroll  :isShowBottom="true" v-if="staffsSelected.length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="2">员工名称</Col>
								<Col :span="4">员工工号</Col>
								<Col :span="4">员工账号</Col>
								<Col :span="5">区局</Col>
								<Col :span="5">组织渠道</Col>
								<Col :span="4">操作</Col>   
							</Row>

							<Row :class="['app__table-item']"  v-for="(item,index) in staffsSelected" :key="index">
								<Col :span="2" :title="item.staffName" class="no-wrap">{{item.staffName}}</Col>
								<Col :span="4" >{{item.staffCode}}</Col>
								<Col :span="4" >{{item.staffAccount}}</Col>
								<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
								<Col :span="5" >{{item.orgName}}</Col>
								<Col :span="4" >
									<span class="iconfont icon-shanchu" @click="deleteClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>

			<!-- 渠道成员添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="addChannelMemberRels" @confirm="addChannelMemberSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入渠道名称" @search="searchChannelData"></Search>
					</div>

					<div class="app__table__inner">
						<!-- 表头 -->
						<Row class="app__table-thead">
								<Col :span="4">渠道名称</Col>
								<Col :span="4">渠道编码</Col>
								<Col :span="3">渠道分类</Col>
								<Col :span="3">渠道类型</Col>
								<Col :span="6">区域名称</Col>
								<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in channelList" :key="index">
								<Col :span="4" class="no-wrap">{{item.channelName}}</Col>
								<Col :span="4">{{item.channelNbr}}</Col>
								<Col :span="3">{{item.channelClass}}</Col>
								<Col :span="3">{{item.channelType}}</Col>
								<Col :span="6" class="no-wrap">{{item.regionName}}</Col>
								
								<Col :span="4">
									<span v-if="!selectMktChannel(item)" class="iconfont icon-weixuanzhong-fang" @click="addChannelPage(item)"></span>
									<span v-if="selectMktChannel(item)" class="iconfont icon-xuanzhong-fang" @click="deleteChannelPage(item)"></span>
								</Col>
						</Row>
						<Row v-if="channelList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="channelPageInfo.pageIndex" :pageSize="channelPageInfo.pageSize" :rowCount="channelPageInfo.rowCount"  @change="channelPageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="getNewDialogData(channelSelected).length>0" ref="yxScrollRef">已选渠道</span>
					<!-- 已选渠道的表格 -->
					<Scroll  :isShowBottom="true" v-if="getNewDialogData(channelSelected).length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="3">渠道名称</Col>
								<Col :span="3">渠道编码</Col>
								<Col :span="3">渠道分类</Col>
								<Col :span="2">渠道类型</Col>
								<Col :span="2">区域名称</Col>
								<Col :span="3">生效方式</Col>   
								<Col :span="3">生效时间</Col>   
								<Col :span="3">失效时间</Col>   
								<Col :span="2">操作</Col>   
							</Row>

							<Row :class="['app__table-item']"  v-for="(item,index) in getNewDialogData(channelSelected)" :key="index">
								<Col :span="3" :title="item.channelName" class="no-wrap">{{item.channelName}}</Col>
								<Col :span="3" >{{item.channelNbr}}</Col>
								<Col :span="3" >{{item.channelClass}}</Col>
								<Col :span="2" >{{item.channelType}}</Col>
								<Col :span="2" class="no-wrap">{{item.regionName}}</Col>
								<Col :span="3" >
									<Select :class="{validate:!item.effectiveWay}" :data="effectiveWay" v-model="item.effectiveWay"
									@change="changeEffectiveWay(arguments[0],item)"
									></Select>
								</Col>
								<Col :span="3" :class="{validate:!item.effectiveDate}" class="date-picker">
									<DatePicker v-model="item.effectiveDate"></DatePicker>
								</Col>
								<Col :span="3" :class="{validate:!item.expiryDate}" class="date-picker">
									<DatePicker v-model="item.expiryDate"></DatePicker>
								</Col>
								<Col :span="2" >
									<span class="iconfont icon-shanchu" @click="deleteChannelClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>

			<!-- 渠道成员修改 -->
			<Dialog :dialogSize="editOfferDialogSize" dialogTitle="修改渠道" ref="editChannelRelsDialog" @confirm="editChannelMemberSubmit">
				<Form labelWidth="100px" data-vv-scope="editOffer">
					<div class="edit-offer-dialog">
						<Row>
							<Col :span="12">
								<FormItem labelText="渠道名称:">
									{{editChannelMemberObj.channelName}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="渠道编码:">
									{{editChannelMemberObj.channelNbr}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="渠道分类:">
									{{editChannelMemberObj.channelClass}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="渠道类型:">
									{{editChannelMemberObj.channelType}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="区域名称:">
									{{editChannelMemberObj.regionName}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="生效方式:" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveWay')">
										<Select v-validate="'required'" :data="effectiveWay"  v-model="editChannelMemberObj.effectiveWay" name="effectiveWay" data-vv-as="生效方式"
										@change="changeEffectiveWayChannel(arguments[0])"
										></Select>
									</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveDate')">
									<DatePicker v-validate="'required'" name="effectiveDate" v-model="editChannelMemberObj.effectiveDate" data-vv-as="生效时间"></DatePicker>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.expiryDate')">
									<DatePicker v-validate="'required'" name="expiryDate" v-model="editChannelMemberObj.expiryDate" data-vv-as="失效时间"></DatePicker>
								</FormItem>
							</Col>
						</Row>
						
					</div>
				</Form>
			</Dialog>

			<!-- 经营主体成员添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="addOperatorsMemberRels" @confirm="addOperatorsMemberSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入经营主体名称" @search="searchOperatorsData"></Search>
					</div>

					<div class="app__table__inner">
						<!-- 表头 -->
						<Row class="app__table-thead">
								<Col :span="7">经营主体名称</Col>
								<Col :span="4">经营主体编码</Col>
								<Col :span="3">经营主体类型</Col>
								<Col :span="3">经营主体级别</Col>
								<Col :span="5">区域名称</Col>
								<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in operatorsList" :key="index">
								<Col :span="7" class="no-wrap">{{item.operatorsName}}</Col>
								<Col :span="4">{{item.operatorsNbr}}</Col>
								<Col :span="3">{{item.operatorsTypeCd}}</Col>
								<Col :span="3">{{item.operatorsLevel}}</Col>
								<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
								<Col :span="2">
									<span v-if="!selectMktOperators(item)" class="iconfont icon-weixuanzhong-fang" @click="addOperatorsPage(item)"></span>
									<span v-if="selectMktOperators(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOperatorsPage(item)"></span>
								</Col>
						</Row>
						<Row v-if="operatorsList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="operatorsPageInfo.pageIndex" :pageSize="operatorsPageInfo.pageSize" :rowCount="operatorsPageInfo.rowCount"  @change="operatorsPageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="getNewDialogData(operatorsSelected).length > 0" ref="yxScrollRef">已选经营主体</span>
					<!-- 已选经营主体的表格 -->
					<Scroll  :isShowBottom="true" v-if="getNewDialogData(operatorsSelected).length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="6">经营主体名称</Col>
								<Col :span="4">经营主体编码</Col>
								<Col :span="4">生效方式</Col>   
								<Col :span="4">生效时间</Col>   
								<Col :span="4">失效时间</Col>   
								<Col :span="2">操作</Col>   
							</Row>

							<Row :class="['app__table-item']"  v-for="(item,index) in getNewDialogData(operatorsSelected)" :key="index">
								<Col :span="6" :title="item.channelName" class="no-wrap">{{item.operatorsName}}</Col>
								<Col :span="4" >{{item.operatorsNbr}}</Col>
								<Col :span="4" >
									<Select :class="{validate:!item.effectiveWay}" :data="effectiveWay" v-model="item.effectiveWay"
									@change="changeEffectiveWay(arguments[0],item)"
									></Select>
								</Col>
								<Col :span="4" :class="{validate:!item.effectiveDate}" class="date-picker">
									<DatePicker v-model="item.effectiveDate"></DatePicker>
								</Col>
								<Col :span="4" :class="{validate:!item.expiryDate}" class="date-picker">
									<DatePicker v-model="item.expiryDate"></DatePicker>
								</Col>
								<Col :span="2" >
									<span class="iconfont icon-shanchu" @click="deleteOperatorsClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>

			<!-- 经营主体成员修改 -->
			<Dialog :dialogSize="editOfferDialogSize" dialogTitle="修改经营主体" ref="editOperatorsRelsDialog" @confirm="editOperatorsMemberSubmit">
				<Form labelWidth="100px" data-vv-scope="editOffer">
					<div class="edit-offer-dialog">
						<Row>
							<Col>
								<FormItem labelText="经营主体名称:">
									{{editOperatorsMemberObj.operatorsName}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="经营主体编码:">
									{{editOperatorsMemberObj.operatorsNbr}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="生效方式:" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveWay')">
										<Select v-validate="'required'" :data="effectiveWay"  v-model="editOperatorsMemberObj.effectiveWay" name="effectiveWay" data-vv-as="生效方式"
										@change="changeEffectiveWayOperators(arguments[0])"
										></Select>
									</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveDate')">
									<DatePicker v-validate="'required'" name="effectiveDate" v-model="editOperatorsMemberObj.effectiveDate" data-vv-as="生效时间"></DatePicker>
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.expiryDate')">
									<DatePicker v-validate="'required'" name="expiryDate" v-model="editOperatorsMemberObj.expiryDate" data-vv-as="失效时间"></DatePicker>
								</FormItem>
							</Col>
						</Row>
						
					</div>
				</Form>
			</Dialog>

			<!-- 员工成员添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="addStaffMemberRels" @confirm="addStaffMemberSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入员工名称" @search="searchStaffData"></Search>
					</div>

					<div class="app__table__inner">
						<!-- 表头 -->
						<Row class="app__table-thead">
							<Col :span="2">员工名称</Col>
							<Col :span="4">员工工号</Col>
							<Col :span="4">员工账号</Col>
							<Col :span="5">区局</Col>
							<Col :span="5">组织渠道</Col>
							<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in staffList" :key="index">
							<Col :span="2" class="no-wrap">{{item.staffName}}</Col>
							<Col :span="4">{{item.staffCode}}</Col>
							<Col :span="4">{{item.staffAccount}}</Col>
							<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
							<Col :span="5">{{item.orgName}}</Col>
							<Col :span="4">
								<span v-if="!selectMktStaff(item)" class="iconfont icon-weixuanzhong-fang" @click="addStaffPage(item)"></span>
								<span v-if="selectMktStaff(item)" class="iconfont icon-xuanzhong-fang" @click="deleteStaffPage(item)"></span>
							</Col>
						</Row>
						<Row v-if="staffList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="staffPageInfo.pageIndex" :pageSize="staffPageInfo.pageSize" :rowCount="staffPageInfo.rowCount"  @change="staffPageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="getNewDialogData(staffSelected).length > 0" ref="yxScrollRef">已选员工</span>
					<!-- 已选员工的表格 -->
					<Scroll  :isShowBottom="true" v-if="getNewDialogData(staffSelected).length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="4">员工名称</Col>
								<Col :span="3">员工工号</Col>
								<Col :span="3">员工账号</Col>
								<Col :span="4">生效方式</Col>   
								<Col :span="4">生效时间</Col>   
								<Col :span="4">失效时间</Col>   
								<Col :span="2">操作</Col>   
							</Row>

							<Row :class="['app__table-item']"  v-for="(item,index) in getNewDialogData(staffSelected)" :key="index">
								<Col :span="4" :title="item.channelName" class="no-wrap">{{item.staffName}}</Col>
								<Col :span="3" >{{item.staffCode}}</Col>
								<Col :span="3" >{{item.staffAccount}}</Col>
								<Col :span="4" >
									<Select :class="{validate:!item.effectiveWay}" :data="effectiveWay" v-model="item.effectiveWay"
									@change="changeEffectiveWay(arguments[0],item)"
									></Select>
								</Col>
								<Col :span="4" :class="{validate:!item.effectiveDate}" class="date-picker">
									<DatePicker v-model="item.effectiveDate"></DatePicker>
								</Col>
								<Col :span="4" :class="{validate:!item.expiryDate}" class="date-picker">
									<DatePicker v-model="item.expiryDate"></DatePicker>
								</Col>
								<Col :span="2" >
									<span class="iconfont icon-shanchu" @click="deleteStaffClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>

			<!-- 员工成员修改 -->
			<Dialog :dialogSize="editOfferDialogSize" dialogTitle="修改员工" ref="editStaffRelsDialog" @confirm="editStaffMemberSubmit">
				<Form labelWidth="100px" data-vv-scope="editOffer">
					<div class="edit-offer-dialog">
						<Row>
							<Col :span="12">
								<FormItem labelText="员工姓名:">
									{{editStaffMemberObj.staffName}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="员工工号:">
									{{editStaffMemberObj.staffCode}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="员工账号:">
									{{editStaffMemberObj.staffAccount}}
								</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="员工属地:">
									{{editStaffMemberObj.regionName}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="生效方式:" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveWay')">
										<Select v-validate="'required'" :data="effectiveWay"  v-model="editStaffMemberObj.effectiveWay" name="effectiveWay" data-vv-as="生效方式"
										@change="changeEffectiveWayStaff(arguments[0])"
										></Select>
									</FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.effectiveDate')">
									<DatePicker v-validate="'required'" name="effectiveDate" v-model="editStaffMemberObj.effectiveDate" data-vv-as="生效时间"></DatePicker>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
								<FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.expiryDate')">
									<DatePicker v-validate="'required'" name="expiryDate" v-model="editStaffMemberObj.expiryDate" data-vv-as="失效时间"></DatePicker>
								</FormItem>
							</Col>
						</Row>
						
					</div>
				</Form>
			</Dialog>
			<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

			<div class="footer">
				<span class="app__btn app__btn-confirm" @click="submit()"  v-if="this.tabFlag === 1">下一步</span>
				<span class="app__btn app__btn-clear" @click="globalback()" v-if="this.tabFlag === 1">返回</span>
				<span class="app__btn app__btn-confirm" @click="submitgroup()" v-if="this.tabFlag === 2">保存</span>
				<span class="app__btn app__btn-clear" @click="submitback()" v-if="this.tabFlag === 2">上一步</span>
			</div>
        </div>
    </transition>
</template> 

<script>
    export default {
        props:{
			componentData:{},
        },
        data() {
            return {
				// 成员
				channelMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				operatorsMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				staffMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 通知人集合的pageinfo
				staffsPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 添加渠道的pageinfo
				channelPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 添加经营主体的pageinfo
				operatorsPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 添加员工的pageinfo
				staffPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				currentView:'',
				currentStep: {},
				componentNodes:[],
				dialogTitle: '',
				dialogSize: {
					size: 100,
					min: 800,
					max: 1200
				},
				editOfferDialogSize:{
					size: 60,
					min: 600,
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
				tabFlag: 1,
				// 组类型
				groupTypeArray: [{
					label: '省个性化组',
					value: '0'
				},{
					label: '特殊权限组',
					value: '1'
				},{
					label: '限制组',
					value: '2'
				}],
				// 生效方式
				effectiveWay: [{
					label: '用户指定时间生效',
					value: '0'
				},{
					label: '立即生效',
					value: '1'
				}],
				// 访问组基本信息
				groupObj: {
					groupName: '',
					area: '',
					groupType: '',
					effectiveWay: '',
					effectiveDate: '',
					expiryDate: '',
					groupDesc: '',
					publishMode: '0',
					notifyStaffs: []
	
				},
				
				// 通知人集合
				staffs: [],
				// 添加员工 员工列表(通知人集合)
				staffsList: [],
				staffsSelected: [], // 员工选中的集合(通知人)
				staffId: '',
				staffsTemp: [],
				searchObjStaffs: {
					staffCode: '',
					staffName: ''
				},
				staff: '11222',

				// 添加渠道 渠道列表
				channelList: [],
				channelSelected: [],
				channelId: '',
				channelTemp: [],
				searchObjChannel: {
					channelNbr: '',
					channelName: ''
				},

				// 添加经营主体  经营主体列表
				operatorsList: [],
				operatorsSelected: [],
				operatorsId: '',
				operatorsTemp: [],
				searchObjOperators: {
					operatorsNbr: '',
					operatorsName: ''
				},
				// 添加员工  员工列表
				staffList: [],
				staffSelected: [],
				staffId: '',
				staffTemp: [],
				searchObjStaff: {
					staffCode: '',
					staffName: ''
				},
				// 渠道成员修改
				editChannelMemberObj: {},
				groupMemberId: '',

				// 经营主体成员修改
				editOperatorsMemberObj: {},
				
				// 员工成员修改
				editStaffMemberObj: {},

				// 配置访问组成员列表
				groupId: '',
				// 渠道成员
				accessGroupType: 'qd', // qd jy yg
				searchObjChannelMember: {
					channelName: '',
					channelNbr: ''
				},
				channelMemberList: [],

				// 经营主体成员
				searchObjOperatorsMember: {
					operatorsNbr: '',
					operatorsName: ''
				},
				operatorsMemberList: [],

				// 员工成员
				searchObjStaffMember: {
					staffCode: '',
					staffName: ''
				},
				staffMemberList: []
            }
		},
		created() {
		},
		watch: {
			// groupObj: {
			// 	handler(val, oldVal) {
			// 		this.groupObj.effectiveDate = val.effectiveDate;
			// 		if (val.effectiveWay == "1") {
			// 			let newDate = new Date(),
			// 			dateYear = newDate.getFullYear(),
			// 			dateMonth = newDate.getMonth() + 1,
			// 			dateDay = newDate.getDate(),
			// 			dateArray = [dateYear,dateMonth,dateDay];
			// 			newDate = dateArray.join("-");
			// 			this.groupObj.effectiveDate = newDate;
			// 		}
			// 	},
			// 	deep: true
			// }
		},
		mounted() {
			if(this.componentData.groupId) this.getDetaileData();
		},
        methods:{
			// 获取详情
			getDetaileData() {
				this.$axios.get(this.$api.replace(this.$api.QueryAccessGroupTask, ['{groupId}'], [this.componentData.groupId]), {
					params: {
						groupId: this.componentData.groupId
					}
				}).then(res => {
					if (res.data.success) {
						this.groupObj = res.data.accessGroup;
						if (this.groupObj.notifyStaffs == null) {
							this.groupObj.notifyStaffs = [];
						}
					} else {
						this.$message.error({ message: '查询访问组详情失败!' })
					}
				}).catch(error => {
					this.$message.error({ message: '查询访问组详情失败!' })
				})
			},
			// 生效方式的监听
			changeEffectiveWay(arg, item) {
				if (arg.value == '1') { // 立即生效
					let newDate = new Date(),
						dateYear = newDate.getFullYear(),
						dateMonth = newDate.getMonth() + 1,
						dateDay = newDate.getDate(),
						dateArray = [dateYear,dateMonth,dateDay];
						newDate = dateArray.join("-");
						item.effectiveDate = newDate;
				}
				// this.qdTemp = item
			},

			// 基本信息生效方式监听
			changeEffectiveWayBasic(arg) {
				if (arg.value == '1') { // 立即生效
					let newDate = new Date(),
						dateYear = newDate.getFullYear(),
						dateMonth = newDate.getMonth() + 1,
						dateDay = newDate.getDate(),
						dateArray = [dateYear,dateMonth,dateDay];
						newDate = dateArray.join("-");
						this.groupObj.effectiveDate = newDate;
				}
			},

			// 渠道成员修改生效方式的监听
			changeEffectiveWayChannel(arg) {
				if (arg.value == '1') { // 立即生效
					let newDate = new Date(),
						dateYear = newDate.getFullYear(),
						dateMonth = newDate.getMonth() + 1,
						dateDay = newDate.getDate(),
						dateArray = [dateYear,dateMonth,dateDay];
						newDate = dateArray.join("-");
						this.editChannelMemberObj.effectiveDate = newDate;
				}
			},
			// 经营主体成员修改生效方式的监听
			changeEffectiveWayOperators(arg) {
				if (arg.value == '1') { // 立即生效
					let newDate = new Date(),
						dateYear = newDate.getFullYear(),
						dateMonth = newDate.getMonth() + 1,
						dateDay = newDate.getDate(),
						dateArray = [dateYear,dateMonth,dateDay];
						newDate = dateArray.join("-");
						this.editOperatorsMemberObj.effectiveDate = newDate;
				}
			},
			// 员工成员修改生效方式的监听
			changeEffectiveWayStaff(arg) {
				if (arg.value == '1') { // 立即生效
					let newDate = new Date(),
						dateYear = newDate.getFullYear(),
						dateMonth = newDate.getMonth() + 1,
						dateDay = newDate.getDate(),
						dateArray = [dateYear,dateMonth,dateDay];
						newDate = dateArray.join("-");
						this.editStaffMemberObj.effectiveDate = newDate;
				}
			},

			changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
			},
			isActive(item, index){
				return this.tabFlag == 1 ? 'active' : '';
			},

			// 是否选中(通知人集合)
			selectMkt(val) {
				return this.staffsSelected.find(item => item.staffId == val.staffId) || this.groupObj.notifyStaffs.find(item => item.staffId == val.staffId);
			},
			
			// 是否选中(渠道列表)
			selectMktChannel(val) {
				return this.channelSelected.find(item => item.channelNbr == val.channelNbr)
			},

			// 是否选中(经营主体列表)
			selectMktOperators(val) {
				return this.operatorsSelected.find(item => item.operatorsNbr == val.operatorsNbr)
			},
			
			// 是否选中(员工列表)
			selectMktStaff(val) {
				return this.staffSelected.find(item => item.staffCode == val.staffCode)
			},
			// 选中员工(通知人集合)
			addOfferPage(item) {
				if(item.staffId == this.staffId) {
					this.$message.warning({message: '不可选择当前员工！'});
				} else {
					let Temp = {
						staffId: item.staffId,
						staffCode: item.staffCode,
						staffAccount: item.staffAccount,
						staffName: item.staffName,
						regionName: item.regionName,
						orgName: item.orgName
					}
					this.staffsSelected.push(Temp);
				}
			},

			// 选中渠道
			addChannelPage(item) {
				if(item.channelId == this.channelId) {
					this.$message.warning({message: '不可选择当前渠道！'});
				} else {
					let Temp = {
						channelId: item.channelId,
						channelName: item.channelName,
						channelNbr: item.channelNbr,
						channelClass: item.channelClass,
						channelType: item.channelType,
						regionName: item.regionName,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate,
						expiryDate: item.expiryDate
					}

					this.channelSelected.push(Temp);
				}
			},
			// 选中经营主体
			addOperatorsPage(item) {
				if(item.operatorsId == this.operatorsId) {
					this.$message.warning({message: '不可选择当前经营主体！'});
				} else {
					let Temp = {
						operatorsId: item.operatorsId,
						operatorsName: item.operatorsName,
						operatorsNbr: item.operatorsNbr,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate,
						expiryDate: item.expiryDate
					}

					this.operatorsSelected.push(Temp);
				}
			},
			// 选中员工
			addStaffPage(item) {
				if(item.staffId == this.staffId) {
					this.$message.warning({message: '不可选择当前员工！'});
				} else {
					let Temp = {
						staffId: item.staffId,
						staffName: item.staffName,
						staffCode: item.staffCode,
						staffAccount: item.staffAccount,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate,
						expiryDate: item.expiryDate
					}
					this.staffSelected.push(Temp);
				}
			},

			// 再次点击删除选中(通知人集合)
			deleteOfferPage(item) {
				for(var i=0;i<this.staffsSelected.length;i++){
					if(this.staffsSelected[i].staffId == item.staffId){
						this.staffsSelected.splice(i,1);
					}
				}
			},

			// 再次点击删除选中(渠道)
			deleteChannelPage(item) {
				for(var i=0;i<this.channelSelected.length;i++){
					if(this.channelSelected[i].channelId == item.channelId){
						this.channelSelected.splice(i,1);
					}
				}
			},
			// 再次点击删除选中(经营主体)
			deleteOperatorsPage(item) {
				for(var i=0;i<this.operatorsSelected.length;i++){
					if(this.operatorsSelected[i].operatorsId == item.operatorsId){
						this.operatorsSelected.splice(i,1);
					}
				}
			},
			// 再次点击删除选中(员工)
			deleteStaffPage(item) {
				for(var i=0;i<this.staffSelected.length;i++){
					if(this.staffSelected[i].staffId == item.staffId){
						this.staffSelected.splice(i,1);
					}
				}
			},

			// 已选员工的删除(通知人集合)
			deleteClick(item) {
				for(var i=0;i<this.staffsSelected.length;i++){
					if(this.staffsSelected[i].staffId == item.staffId){
						this.staffsSelected.splice(i,1);
					}
				}
			},

			// 已选渠道的删除
			deleteChannelClick(item) {
				for(var i=0;i<this.channelSelected.length;i++){
					if(this.channelSelected[i].channelId == item.channelId){
						this.channelSelected.splice(i,1);
					}
				}
			},
			// 已选经营主体的删除
			deleteOperatorsClick(item) {
				for(var i=0;i<this.operatorsSelected.length;i++){
					if(this.operatorsSelected[i].operatorsId == item.operatorsId){
						this.operatorsSelected.splice(i,1);
					}
				}
			},
			// 已选员工的删除
			deleteStaffClick(item) {
				for(var i=0;i<this.staffSelected.length;i++){
					if(this.staffSelected[i].staffId == item.staffId){
						this.staffSelected.splice(i,1);
					}
				}
			},

			// 添加员工数据保存(通知人集合)
			addStaffsSubmit() {
				this.staffsSelected.filter( item => {
					if(!this.groupObj.notifyStaffs.find(notifyItem => notifyItem.staffId == item.staffId)){
						this.groupObj.notifyStaffs.push(item)
					} 
				})
				this.$refs.addStaffsRels.hide();
			},

			// 添加渠道数据保存
			addChannelMemberSubmit() {
				this.channelTemp = [];
				let tempArr = [...this.getNewDialogData(this.channelSelected)];
				if(tempArr.length == 0) {
					this.$refs.addChannelMemberRels.hide();
					return;
				}

				// 添加渠道校验
				for(let ele of tempArr) {
					if (!ele.effectiveWay || !ele.effectiveDate || !ele.expiryDate) {
						this.$message.warning({message: '请输入红框值!'});
						return;
					} else {
						if (new Date(ele.effectiveDate).getTime() > new Date(ele.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}
					}
				}
				this.channelTemp = tempArr.map( item => {
					return {
						channelId: item.channelId,
						channelName: item.channelName,
						channelNbr: item.channelNbr,
						channelClass: item.channelClass,
						channelType: item.channelType,
						regionName: item.regionName,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
					}
				})

				this.channelMemberList = this.channelTemp;
				let tempArray = this.channelMemberList.map(item => {
					return {
						groupId: this.groupId,
						memberType: '0',
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
						memberId: item.channelId,
						createStaff: this.$user.getInfo().id
					}
				})

				this.$axios.post(this.$api.AddChannelMember, tempArray).then(res => {
					if (res.data.success == true) {
						this.$message.success({message: '渠道成员添加成功!'});
						this.$refs.addChannelMemberRels.hide();
						this.getChannelMemberData();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({message: '渠道成员增加失败!'})
				})

			},

			// 添加经营主体数据保存
			addOperatorsMemberSubmit() {
				this.operatorsTemp = [];
				let tempArr = [...this.getNewDialogData(this.operatorsSelected)];
				if (tempArr.length == 0) {
					this.$refs.addOperatorsMemberRels.hide();
					return;
				}
				
				// 添加经营主体校验
				for(let ele of tempArr) {
					if (!ele.effectiveWay || !ele.effectiveDate || !ele.expiryDate) {
						this.$message.warning({message: '请输入红框值!'});
						return;
					} else {
						if (new Date(ele.effectiveDate).getTime() > new Date(ele.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}
					}
				}

				this.operatorsTemp = tempArr.map(item => {
					return {
						operatorsId: item.operatorsId,
						operatorsName: item.operatorsName,
						operatorsNbr: item.operatorsNbr,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
					}
				})

				this.operatorsMemberList = this.operatorsTemp;
				let tempArray = this.operatorsMemberList.map(item => {
					return {
						groupId: this.groupId,
						memberType: '1',
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
						memberId: item.operatorsId,
						createStaff: this.$user.getInfo().id
					}
				})

				this.$axios.post(this.$api.AddOperatorsMember, tempArray).then(res => {
					if (res.data.success == true) {
						this.$message.success({message: '经营主体成员添加成功!'});
						this.$refs.addOperatorsMemberRels.hide();
						this.getOperatorsMemberData();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({message: '经营主体成员增加失败!'})
				})
			},

			// 添加员工数据保存
			addStaffMemberSubmit() {
				this.staffTemp = [];
				let tempArr = [...this.getNewDialogData(this.staffSelected)];
				if (tempArr.length == 0) {
					this.$refs.addStaffMemberRels.hide();
					return;
				}
				// 添加员工校验
				for(let ele of tempArr) {
					if (!ele.effectiveWay || !ele.effectiveDate || !ele.expiryDate) {
						this.$message.warning({message: '请输入红框值!'});
						return;
					} else {
						if (new Date(ele.effectiveDate).getTime() > new Date(ele.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}
					}
				}

				this.staffTemp = tempArr.map(item => {
					return {
						staffId: item.staffId,
						staffName: item.staffName,
						staffCode: item.staffCode,
						staffAccount: item.staffAccount,
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
					}
				})

				this.staffMemberList = this.staffTemp;
				let tempArray = this.staffMemberList.map(item => {
					return {
						groupId: this.groupId,
						memberType: '2',
						effectiveWay: item.effectiveWay,
						effectiveDate: item.effectiveDate ? new Date(item.effectiveDate) : '',
						expiryDate: item.expiryDate ? new Date(item.expiryDate) : '',
						memberId: item.staffId,
						createStaff: this.$user.getInfo().id
					}
				})

				this.$axios.post(this.$api.AddStaffMember, tempArray).then(res => {
					if (res.data.success == true) {
						this.$message.success({message: '员工成员添加成功!'});
						this.$refs.addStaffMemberRels.hide();
						this.getStaffMemberData();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({message: '员工成员增加失败!'})
				})
			},

			// 渠道成员列表修改,删除
			editChannelMember(item) {
				this.editChannelMemberObj = JSON.parse(JSON.stringify(item));
				this.$refs.editChannelRelsDialog.show();
			},
			delChannelMember(item, index) {
				this.groupMemberId = item.groupMemberId
				if(item.groupMemberId){
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除渠道成员？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}else{
					this.channelMemberList.splice(index,1);
				}
			},

			// 经营主体成员列表修改,删除
			editOperatorsMember(item) {
				this.editOperatorsMemberObj = JSON.parse(JSON.stringify(item));
				this.$refs.editOperatorsRelsDialog.show();
			},
			delOperatorsMember(item, index) {
				this.groupMemberId = item.groupMemberId
				if(item.groupMemberId){
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除经营主体成员？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}else{
					this.operatorsMemberList.splice(index,1);
				}
			},

			// 员工成员列表修改,删除
			editStaffMember(item) {
				this.editStaffMemberObj = JSON.parse(JSON.stringify(item));
				this.$refs.editStaffRelsDialog.show();
			},
			delStaffMember(item, index) {
				this.groupMemberId = item.groupMemberId
				if(item.groupMemberId){
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除员工成员？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}else{
					this.staffMemberList.splice(index,1);
				}
			},


			// 渠道成员列表修改,删除确认
			editChannelMemberSubmit() {
				this.$validator.validateAll('editOffer').then(result => {
					if (result) {
						if (new Date(this.editChannelMemberObj.effectiveDate).getTime() > new Date(this.editChannelMemberObj.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						this.$axios.put(this.$api.replace(this.$api.QueryChannelMemberTask, ['{groupMemberId}'], [this.editChannelMemberObj.groupMemberId]), {
							groupMemberId: this.editChannelMemberObj.groupMemberId,
							effectiveWay: this.editChannelMemberObj.effectiveWay,
							effectiveDate: this.editChannelMemberObj.effectiveDate ? new Date(this.editChannelMemberObj.effectiveDate) : '',
							expiryDate: this.editChannelMemberObj.expiryDate ? new Date(this.editChannelMemberObj.expiryDate) : '',
							updateStaff: this.$user.getInfo().id
						}).then(res => {
							this.getChannelMemberData();
							this.$refs.editChannelRelsDialog.hide()
						}).catch(error => {
							this.$message.error({ message : "修改失败!" })
						})
					}
					
				})
			},
			// 经营主体成员列表修改,删除确认
			editOperatorsMemberSubmit() {
				this.$validator.validateAll('editOffer').then(result => {
					if (result) {
						if (new Date(this.editOperatorsMemberObj.effectiveDate).getTime() > new Date(this.editOperatorsMemberObj.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						this.$axios.put(this.$api.replace(this.$api.QueryOperatorsMemberTask, ['{groupMemberId}'], [this.editOperatorsMemberObj.groupMemberId]), {
							groupMemberId: this.editOperatorsMemberObj.groupMemberId,
							effectiveWay: this.editOperatorsMemberObj.effectiveWay,
							effectiveDate: this.editOperatorsMemberObj.effectiveDate ? new Date(this.editOperatorsMemberObj.effectiveDate) : '',
							expiryDate: this.editOperatorsMemberObj.expiryDate ? new Date(this.editOperatorsMemberObj.expiryDate) : '',
							updateStaff: this.$user.getInfo().id
						}).then(res => {
							this.getOperatorsMemberData();
							this.$refs.editOperatorsRelsDialog.hide()
						}).catch(error => {
							this.$message.error({ message : "修改失败!" })
						})
					}
					
				})
			},
			// 员工成员列表修改,删除确认
			editStaffMemberSubmit() {
				this.$validator.validateAll('editOffer').then(result => {
					if (result) {
						if (new Date(this.editStaffMemberObj.effectiveDate).getTime() > new Date(this.editStaffMemberObj.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						this.$axios.put(this.$api.replace(this.$api.QueryStaffMemberTask, ['{groupMemberId}'], [this.editStaffMemberObj.groupMemberId]), {
							groupMemberId: this.editStaffMemberObj.groupMemberId,
							effectiveWay: this.editStaffMemberObj.effectiveWay,
							effectiveDate: this.editStaffMemberObj.effectiveDate ? new Date(this.editStaffMemberObj.effectiveDate) : '',
							expiryDate: this.editStaffMemberObj.expiryDate ? new Date(this.editStaffMemberObj.expiryDate) : '',
							updateStaff: this.$user.getInfo().id
						}).then(res => {
							this.getStaffMemberData();
							this.$refs.editStaffRelsDialog.hide()
						}).catch(error => {
							this.$message.error({ message : "修改失败!" })
						})
					}
					
				})
			},
			// tab栏切换内容
			accessPaneBlockClick(val) {
				this.accessGroupType = val;
				if (val == "qd") {
					this.searchObjChannelMember.channelName = '';
					this.getChannelMemberData();
				} else if (val == "jy") {
					this.searchObjOperatorsMember.operatorsName = '';
					this.getOperatorsMemberData();
				} else if (val == "yg") {
					this.searchObjStaffMember.staffName = '';
					this.getStaffMemberData();
				}
			},

			// tab栏中的数据
			// 渠道成员列表
			getChannelMemberData() {
				this.$axios.get(this.$api.QueryChannelMemberList, {
					params: {
						groupId: this.groupId,
						channelNbr: this.searchObjChannelMember.channelNbr,
						channelName: this.searchObjChannelMember.channelName,
						limit: this.channelMemberPageInfo.pageSize,
						page: this.channelMemberPageInfo.pageIndex

					}
				}).then(res => {
					if (res.data.success === true) {
						this.channelMemberList = res.data.channelMembers.content;
						this.channelMemberPageInfo.rowCount = res.data.channelMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--渠道成员列表!"})
				})
			},

			// 经营主体成员列表
			getOperatorsMemberData() {
				this.$axios.get(this.$api.QueryOperatorsMemberList, {
					params: {
						groupId: this.groupId,
						operatorsNbr: this.searchObjOperatorsMember.operatorsNbr,
						operatorsName: this.searchObjOperatorsMember.operatorsName,
						limit: this.operatorsMemberPageInfo.pageSize,
						page: this.operatorsMemberPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.operatorsMemberList = res.data.operatorsMembers.content;
						this.operatorsMemberPageInfo.rowCount = res.data.operatorsMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--经营主体成员列表!"})
				})
			},
			// 员工成员列表
			getStaffMemberData() {
				this.$axios.get(this.$api.QueryStaffMemberList, {
					params: {
						groupId: this.groupId,
						staffCode: this.searchObjStaffMember.staffCode,
						staffName: this.searchObjStaffMember.staffName,
						limit: this.staffMemberPageInfo.pageSize,
						page: this.staffMemberPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.staffMemberList = res.data.staffMembers.content;
						this.staffMemberPageInfo.rowCount = res.data.staffMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--员工成员列表!"})
				})
			},

			// 添加对话框中的数据
			// 员工列表(通知人集合)
			getStaffsData() {
				this.$axios.get(this.$api.QueryStaffList, {
					params: {
						staffCode: this.searchObjStaffs.staffCode,
						staffName: this.searchObjStaffs.staffName,
						limit: this.staffsPageInfo.pageSize,
						page: this.staffsPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.staffsList = res.data.staffs.content;
						this.staffsPageInfo.rowCount = res.data.staffs.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--员工列表!"})
				})
			},

			// 渠道列表 
			getChannelData() {
				this.$axios.get(this.$api.QueryChannelList, {
					params: {
						channelNbr: this.searchObjChannel.channelNbr,
						channelName: this.searchObjChannel.channelName,
						limit: this.channelPageInfo.pageSize,
						page: this.channelPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.channelList = res.data.channels.content;
						this.channelPageInfo.rowCount = res.data.channels.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--渠道列表!"})
				})
			},
			// 经营主体列表 
			getOperatorsData() {
				this.$axios.get(this.$api.QueryOperatorsList, {
					params: {
						operatorsNbr: this.searchObjOperators.operatorsNbr,
						operatorsName: this.searchObjOperators.operatorsName,
						limit: this.operatorsPageInfo.pageSize,
						page: this.operatorsPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.operatorsList = res.data.operatorss.content;
						this.operatorsPageInfo.rowCount = res.data.operatorss.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--经营主体列表!"})
				})
			},
			// 员工列表
			getStaffData() {
				this.$axios.get(this.$api.QueryStaffList, {
					params: {
						
						staffCode: this.searchObjStaff.staffCode,
						staffName: this.searchObjStaff.staffName,
						limit: this.staffPageInfo.pageSize,
						page: this.staffPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.staffList = res.data.staffs.content;
						this.staffPageInfo.rowCount = res.data.staffs.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--员工列表!"})
				})
			},

			// 渠道成员搜索
			qdMemberData(val) {
				this.channelMemberPageInfo.pageIndex = 1;
				this.searchObjChannelMember.channelName = val;
				this.getChannelMemberData();
			},

			// 经营主体成员搜索
			jyMemberData(val) {
				this.operatorsMemberPageInfo.pageIndex = 1;
				this.searchObjOperatorsMember.operatorsName = val;
				this.getOperatorsMemberData();
			},
			// 员工成员搜索
			ygMemberData(val) {
				this.staffMemberPageInfo.pageIndex = 1;
				this.searchObjStaffMember.staffName = val;
				this.getStaffMemberData();
				
			},
			// 员工搜索(通知人集合)
			searchStaffsData(val) {
				this.staffsPageInfo.pageIndex = 1;
				this.searchObjStaffs.staffName = val;
				this.getStaffsData();

			},

			// 渠道搜索
			searchChannelData(val) {
				this.channelPageInfo.pageIndex = 1;
				this.searchObjChannel.channelName = val;
				this.getChannelData();

			},
			// 经营主体搜索
			searchOperatorsData(val) {
				this.operatorsPageInfo.pageIndex = 1;
				this.searchObjOperators.operatorsName = val;
				this.getOperatorsData();

			},
			// 员工搜索
			searchStaffData(val) {
				this.staffPageInfo.pageIndex = 1;
				this.searchObjStaff.staffName = val;
				this.getStaffData();

			},
			// 员工列表的page(通知人集合)
			staffsPageChange(page) {
				this.staffsPageInfo.pageIndex = page;
				this.getStaffsData();
			},
			// 渠道列表的page
			channelPageChange(page) {
				this.channelPageInfo.pageIndex = page;
				this.getChannelData();
			},
			// 经营主体列表的page
			operatorsPageChange(page) {
				this.operatorsPageInfo.pageIndex = page;
				this.getOperatorsData();
			},
			// 员工列表的page
			staffPageChange(page) {
				this.staffPageInfo.pageIndex = page;
				this.getStaffData();
			},
			// tab栏列表(成员)page切换
			pageChange(page) {
				if (this.accessGroupType == 'qd') {
					this.channelMemberPageInfo.pageIndex = page;
					this.getChannelMemberData();
				} else if (this.accessGroupType == 'jy') {
					this.operatorsMemberPageInfo.pageIndex = page;
					this.getOperatorsMemberData();
				} else if (this.accessGroupType == 'yg') {
					this.staffMemberPageInfo.pageIndex = page;
					this.getStaffMemberData();
				}
				
			},
			// 导入
			// 渠道成员导入
			channelImport() {
				this.$refs.fileRef.click();
            },
            //下载模板 
            downLoadManage(type) {
                switch (this.accessGroupType) {
                    case 'yg':
                        this.downLoadIng(type)
                        break;
                    case 'qd':
                        this.downLoadIng('100026')
                        break;
                    case 'jy':
                        this.downLoadIng('100025')
                        
                        break;
                    default:
                        break;
                }
            },
            downLoadIng(item) {
                 window.open(this.$api.GetTemplateDocumentFile + item);
            },
			channelImportChange(event) {
				let files = Array.from(event.target.files);
				let formData = new FormData();
				formData.append('groupId', this.groupId);
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				event.target.value = '';
				this.$axios.post(this.$api.ChannelMemberImport, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if (res.data.success) {
						this.$message.success({ message: '渠道成员导入成功！'});
						this.getChannelMemberData();
					}
				}).catch(error => {
					this.$message.error({message: '导入失败！'})
				})
			},

			// 经营主体成员导入
			operatorsImport() {
				this.$refs.fileRef.click();
			},
			operatorsImportChange(event) {
				let files = Array.from(event.target.files);
				let formData = new FormData();
				formData.append('groupId', this.groupId);
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				event.target.value = '';
				this.$axios.post(this.$api.OperatorsMemberImport, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if (res.data.success) {
						this.$message.success({ message: '经营主体成员导入成功！'});
						this.getOperatorsMemberData();
					}
				}).catch(error => {
					this.$message.error({message: '导入失败！'})
				})
			},

			// 员工成员导入
			staffImport() {
				this.$refs.fileRef.click();
			},
			staffImportChange(event) {
				let files = Array.from(event.target.files);
				let formData = new FormData();
				formData.append('groupId', this.groupId);
				formData.append('file', files[0]);
				formData.append('createStaff', this.$user.getInfo().id);
				event.target.value = '';
				this.$axios.post(this.$api.StaffMemberImport, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if (res.data.success) {
						this.$message.success({ message: '员工成员导入成功！'});
						this.getStaffMemberData();
					}
				}).catch(error => {
					this.$message.error({message: '导入失败！'})
				})
			},

			// 下一步
			submit() {
				// this.tabFlag = 2
				// 访问组基信息校验
				this.$validator.validateAll().then((result) => {
					if (result) {
						if (new Date(this.groupObj.effectiveDate).getTime() > new Date(this.groupObj.expiryDate).getTime()) {
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						let tempGroupId = this.componentData.groupId || this.groupId;

						if(tempGroupId){
							this.$axios.put(this.$api.replace(this.$api.QueryAccessGroupTask, ['{groupId}'], [tempGroupId]), {
								groupId: tempGroupId,
								groupName: this.groupObj.groupName,
								area: this.groupObj.area,
								groupType: this.groupObj.groupType,
								effectiveWay: this.groupObj.effectiveWay,
								effectiveDate: this.groupObj.effectiveDate ? new Date(this.groupObj.effectiveDate) : '',
								expiryDate: this.groupObj.expiryDate ? new Date(this.groupObj.expiryDate) : '',
								groupDesc: this.groupObj.groupDesc,
								publishMode: this.groupObj.publishMode,
								notifyStaffs: this.groupObj.notifyStaffs || [],
								staffId: '',
								staffName: '',
								updateStaff: this.$user.getInfo().id
							}).then(res => {
								this.groupId = tempGroupId;
								// 访问组新增成功到访问组配置页面
								this.tabFlag = 2;
								// 新增成功后返回groupId调用
								if (this.accessGroupType == 'qd') {
									this.getChannelMemberData();
								}
								
							}).catch((error) => {
								this.$message.error({ message : "修改失败!" })
							})
						}else{
							this.$axios.post(this.$api.AddAccessGroup, {
									groupId: this.groupObj.groupId,
									groupName: this.groupObj.groupName,
									area: this.groupObj.area,
									groupType: this.groupObj.groupType,
									effectiveWay: this.groupObj.effectiveWay,
									effectiveDate: this.groupObj.effectiveDate ? new Date(this.groupObj.effectiveDate): '',
									expiryDate: this.groupObj.expiryDate ? new Date(this.groupObj.expiryDate): '',
									groupDesc: this.groupObj.groupDesc,
									publishMode: this.groupObj.publishMode,
									notifyStaffs: this.groupObj.notifyStaffs || [],
									createStaff: this.$user.getInfo().id      
								
							}).then(res => {
								if(res.data.success === true) {
									this.$message.success({ message : "访问组基本信息添加成功" })
									this.groupId = res.data.accessGroup.groupId;
									// 访问组新增成功到访问组配置页面
										this.tabFlag = 2;
									// 新增成功后返回groupId调用
									if (this.accessGroupType == 'qd') {
										this.getChannelMemberData();
									}
								} else {
									this.$message.error({ "message": "访问组基本信息添加成功" })
								}
							}).catch(error => {
								this.$message.error({ "message": "组名称不可重复!" })
							})
						}

						
					}
				})
			},
			
			// 返回
			globalback() {
				this.$emit('componentView', 'list')
			},

			// 上一步
			submitback() {
				this.tabFlag = 1;
			},
			// 保存
			submitgroup() {
				this.$message.success({ message : "添加成功!" });
				this.$emit('componentView', 'list')
			},
			
            pageClose(){
                this.$emit('componentView','list',this.componentData)
			},

			// 获取弹框可显示的数据
			getNewDialogData(arr){
				return arr.filter( item => !item.isOldList)
			},
			// 已选员工的删除(通知人集合)
			closeSearch(item){
				this.tipType = 'DEL';
				this.tipInfo.iconType = 3;
				this.tipItem = item;
				this.tipInfo.msg = `确定删除吗?`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},

			// 添加对话框
			// 添加员工通知人集合
			addStaffsRels() {
				this.$refs.addStaffsRels.show();
				this.dialogTitle = '添加员工';
				this.searchObjStaffs.staffName = '';
				this.getStaffsData();
			},
			// 添加渠道
			addChannelMemberRels() {
				this.dialogTitle = "添加渠道";
				this.searchObjChannel.channelName = '';
				this.$refs.addChannelMemberRels.show();
				this.channelSelected = this.channelMemberList.filter( item => {
					item.isOldList = true;
					return true;
				})
				this.getChannelData();
			},
			// 添加经营主体
			addOperatorsMemberRels() {
				this.dialogTitle = "添加经营主体";
				this.searchObjOperators.operatorsName = '';
				this.$refs.addOperatorsMemberRels.show();
				this.operatorsSelected = this.operatorsMemberList.filter( item => {
					item.isOldList = true;
					return true;
				})
				this.getOperatorsData();
			},
			// 添加员工
			addStaffMemberRels() {
				this.dialogTitle = "添加员工";
				this.searchObjStaff.staffName = '';
				this.$refs.addStaffMemberRels.show();
				this.staffSelected = this.staffMemberList.filter(item => {
					item.isOldList = true;
					return true;
				})
				this.getStaffData();
			},
			
			tipConfirm() {
				if (this.tipInfo.msg == `确定删除吗?`) {
					this.staffsSelected = this.staffsSelected.filter( item => item.staffId != this.tipItem.staffId); //列表已选删除
					this.groupObj.notifyStaffs = this.groupObj.notifyStaffs.filter( item => item.staffId != this.tipItem.staffId);// 通知人集合删除
					this.$refs.tip.hide();
				} else if (this.tipInfo.msg ==  `是否确认删除渠道成员？`) {
					this.$axios.delete(this.$api.replace(this.$api.QueryChannelMemberTask, ['{groupMemberId}'], [this.groupMemberId]), {
						params: {
							groupMemberId: this.groupMemberId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '渠道成员删除成功!'});
							this.getChannelMemberData();
							this.channelSelected.splice(this.tipIndex, 1);

						} else {
							this.$message.error({ message : '渠道成员删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '删除失败!'});
					})
				} else if (this.tipInfo.msg ==  `是否确认删除经营主体成员？`) {
					this.$axios.delete(this.$api.replace(this.$api.QueryOperatorsMemberTask, ['{groupMemberId}'], [this.groupMemberId]), {
						params: {
							groupMemberId: this.groupMemberId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '经营主体成员删除成功!'});
							this.getOperatorsMemberData();
							this.operatorsSelected.splice(this.tipIndex, 1);
						} else {
							this.$message.error({ message : '经营主体成员删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '经营主体成员删除失败!'});
					})
				} else if (this.tipInfo.msg ==  `是否确认删除员工成员？`) {
					this.$axios.delete(this.$api.replace(this.$api.QueryStaffMemberTask, ['{groupMemberId}'], [this.groupMemberId]), {
						params: {
							groupMemberId: this.groupMemberId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '员工成员删除成功!'});
							this.getStaffMemberData();
							this.staffSelected.splice(this.tipIndex, 1);
						} else {
							this.$message.error({ message : '员工成员删除失败!'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '员工成员删除失败!'});
					})
				}
			}
        },
        components:{
           
        }
    }
</script>
<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

	.step-item {
		display: inline-block;
		width: 100%;
		//max-width: 160px;
		font-size: 0;
		text-align: center;
		margin-top: 20px;
		.i-name {
			font-size: 16px;
			display: inline-block;
			width: 28%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #e4e4e4;
			color: #5c9cf3;
			background-color: #fff;
			position: relative;
			margin: 0;
			font-weight: bold;
			&.active {
				background-color: #5c9cf3;
				color: #fff;
				.before {
					content: '';
					display: block;
					position: absolute;
					top: -1px;
					right: -20px;
					width: 0;
					height: 0;
					border-style: solid;
					border-color: transparent transparent transparent #5c9cf3;
					border-width: 20px 0 20px 20px;
					z-index: 1;
				}
				.after {
					content: '';
					display: block;
					position: absolute;
					top: -1px;
					left: -2px;
					width: 0;
					height: 0;
					border-style: solid;
					border-color: transparent transparent transparent #fff;
					border-width: 20px 0 20px 20px;
					z-index: 1;
				}
			
			}
			
		}
		
	}


		.search-box{
		width: 90%;
		line-height: 40px;
		&.search-long{
			padding: 0 30px 0 80px;
		}

		.search-name{
			position: absolute;
			width: 75px;
			top: 0;
			left: 0;
			text-align: right;
			white-space: nowrap;
		}

		.search-items{
			width: 90%;
			height: 100%;
		}

		.search-item{
			display: inline-block;
			height: 34px;
			line-height: 34px;
			padding: 0 20px;
			margin-right: 50px;
			border: 1px solid #f5f5f5;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			.item-close{
				position: absolute;
				display: block;
				width: 40px;
				height: 34px;
				top: -1px;
				right: -40px;
				background-image: url(./images/close.png);
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;

				&:hover{
					background-image: url(./images/close_hover.png);
				}
			}
		}
	}

      .product{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        overflow: auto;
        background-color: #fff;

		.title{
			//position: absolute;
			display: block;
			//top: 0;
			//left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			text-align: center;
			border-bottom: 1px solid #e4e4e4;
			font-weight: 700;
			span {
				position : none;
			}
        }

       
        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(./images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }

			.basic-info {
				padding: 10px 30px 30px 30px;
				padding-bottom: 0;
				height: 86%;
				//border: 1px solid #eeeeee;
				background: #fff;
				.c_title {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-weight: bold;
					font-size: 14px;
					
					.c-t-name {
						display: inline-block;
						height: 20px;
						line-height: 20px;
						padding-left: 8px;
						border-left-width: 8px;
						border-left-color: #5c9cf3;
						border-left-style: solid;
					}
				}
				.form-item {
					//padding-left: 60px !important;
					//margin-left: 10px;
					.f-i-l {
						font-size: 16px;
					}

					.access-textarea {
						width: 100%;
						height: 60px;
						padding: 5px;
						outline: 0;
						border: 1px solid #d8dcdf;
						border-radius: 4px;
						resize: none;
						color: #7a7a86;
					}
				}
				
				.span {
					padding: 5px 10px;
					border: 1px solid #75d3aa;
					color: #75d3aa;
					border-radius: 5px;
					margin-right: 20px;
					cursor: pointer;
					.file {
						position: absolute;
						top: 0;
						left: 0;
						width: 0;
						height: 0;
						opacity: 0;
						z-index: -1;
					}
				}
				.have-span {
					padding: 0 50px 0 10px;
					background: #eff7fe;
					margin-right: 10px;
					margin-bottom: 10px;
					color: $mainColor;
					display: inline-block;
					.delete {
						//background: url(images/bqsc.png) no-repeat;
						width: 8px;
						height: 8px;
						position: absolute;
						top: 12px;
						right: 20px;
						cursor: pointer;
					}
				}
			}
			.app__btn-add {
				background-color: $mainColor;
				color: #fff;
				background-image: url(./images/add_hover.png);
				background-repeat: no-repeat;
				background-position: 10px;
				border: 1px solid #5c9cf3;
			}
            .footer{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                border-top: 1px solid #f5f5f5;
                text-align: right;
                background-color: #fff;

                .save{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    border-radius: 4px;
                    background-color: $mainColor;
                    color: #fff;
                    cursor: pointer;

                    &:hover{
                        opacity: .8;
                    }
                }
            }	
    }

		// 对话框表格中的样式
	.app__table__inner {
		// text-align: center;
		min-height: 160px;
		.no-wrap {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.span {
			padding: 0 5px;
			cursor: pointer;
		}
		.validate /deep/ input{
			border-color: red;
		}
	}

	
		.icon-xiugai,
		.icon-shanchu{
			padding: 0 5px;
		}

		.icon-xiugai,
		.icon-shanchu,
		.icon-weixuanzhong-fang,
		.icon-xuanzhong-fang{
			cursor: pointer;
		}
	
	
	.offer-rels-table{
		min-height: 280px;
		margin-bottom: 20px;
		/deep/ .src-content{
			min-height: 280px;
		}
		.col {
			&:hover {
				.col-search {
					display: block;
					z-index: 1;
				}
			}
		}

		.app__table-thead{
			.pull-line{
				z-index: 1;
			}
			.offer-title-name {
				display: block;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.app__table-item{
			.col {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	.main {
		padding: 20px;
		.search {
			width: 300px;
			// margin-bottom: 20px;
		}

		.yx-scroll{
			min-height: 160px;
		}

		.y-span {
			display: block;
			margin: 10px 0;
			//color: #b6de8f;
			font-weight: bold;
			font-size: 14px;
		}
		.date-picker {
			overflow: inherit !important;
		}
		.icon-xuanzhong-fang{
			color: $mainColor;
		}

		.edit-offer-dialog{
			padding: 20px;
		}
	}



	// 渠道列表样式

	.src-content {
		overflow: scroll;
		// display: inline-block;
	}
	.scroll .src-content {
		display: inline-block;
	}
	.list-box {
	width: 100%;
	height: calc( 100% - 195px);
	margin-top: 15px;
	.l-item {
		padding-left: 15px;
		&:first-child {
			padding-left: 0;
		}
		.l-content {
			width: 100%;
			height: 100%;
			.pane {
				width: 100%;
				height: 100%;
				background-color: #fff;
				.p-title {
					width: 100%;
					height: 30px;
					line-height: 29px;
					border-top: 1px solid #e9e9e9;
					background-color: #fafafa;
					.p-t-block {
						display: block;
						width: 150px;
						top: 0;
						text-align: center;
						font-size: 12px;
						border-top-left-radius: 4px;
						border-top-right-radius: 4px;
						color: #254063;
						float: left;
						transition: all .3s ease;
						cursor: pointer;
						&.active {
							height: 35px;
							line-height: 32px;
							top: -5px;
							color: $mainColor;
							border-top: 3px solid $mainColor;
							background-color: #fff;
							box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
						}
						.iconfont {
							font-size: 12px;
						}
						.t-b-count {
							color: #ff8f04;
						}
					}
					.p-t-more {
						margin-right: 15px;
						color: #d6d9e2;
						float: right;
						cursor: pointer;
						&:hover {
							color: $mainColor;
						}
					}
				}
				.p-content {
					width: 100%;
					height: calc(100% - 80px);
					padding: 20px 20px 0;
					.span{
						color: $mainColor;
						cursor: pointer;
					}
					.p-search {
						width: 50%;
						height: 36px;
						line-height: 36px;
						.iconfont {
							position: absolute;
							left: 0;
							top: 12px;
							width: 40px;
							height: 16px;
							line-height: normal;
							color: $mainColor;
							font-size: 16px;
							text-align: center;
							border-right: 1px solid #eee;
							z-index: 1;
						}
						/deep/ input {
							height: 36px;
							padding: 0 60px 0 55px;
							border-radius: 0;
						}
						.p-s-go {
							position: absolute;
							right: 0;
							top: 2px;
							width: 54px;
							height: 36px;
							background-image: url(./images/go.png);
							background-repeat: no-repeat;
							background-position: center;
							cursor: pointer;
						}
					}
					.scroll {
						height: calc(100% - 50px) !important;
						margin-top: 14px;
					}
					
				}
				.p-footer {
					height: 50px;
				}
			}
		}
	}

	.btn-box {
		margin-left: 75%;
        &.big {
		    margin-left: 68%;
        }
	}
}
.file {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		opacity: 0;
		z-index: -1;
}

.offer-file {
	display: none;
}
</style>
