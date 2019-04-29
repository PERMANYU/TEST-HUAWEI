<template>
	<div class="main-wrap">
		<div class="require-state">
			<Row class="search-row">
				<Col :span="3" class="require-statelabel">
                    <i class="icon-all"></i>
                    <i :class="['icon-down',downFlag?'active':'']" @click="toggleDown()"></i>
                    <DropSel :obj="tabs" :text="tabInfo.label" @change="dropChange"></DropSel>
				</Col>
				<Col :span="5">
					<Search placeholder="请输入礼包名称" @search="search"></Search>
				</Col>
				<Col :span="13">
					<div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
						<SearchBox v-model="searchData"></SearchBox>
					</div>
				</Col>
				<Col class="col-btn" :span="3">
					<div class="app__btn app__btn-newRequire" @click="newOfferGroup()">新建礼包</div>
				</Col>
			</Row>
		</div>

		<div class="require-data">
			<keep-alive>
				<component :is="currentView" @changeSearchData="changeSearchData" v-if="currentView = 'grouplist'" ref="groupList"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'grouplist',
				tabs: [
				    {
                        label: '全部礼包',
                        value: '2000',
                        flag:1
                    }, {
                        label: '我的礼包',
                        value: '',
                        flag:2
                    }
				],
                //已选下拉信息
                tabInfo: {
                    label: '我的礼包',
                    value: '',
                    flag:2
                },
				downFlag: false,
				searchData:[],
			}
		},

        watch: {
            //监听searchData
            searchData: function(val,oldval){
                this.$refs.groupList.titleSearch(this.searchData);
            }
        },
        mounted(){

        },

		methods: {
            //修改searchData
            changeSearchData(val){
                this.searchData = this.searchData.filter( item => item.label != val.label);
				this.searchData.push(val);
			},		
            dropChange(val){
                this.tabInfo = val;
                this.$refs.groupList.tabChange(val);
            },
			toggleDown() {
				this.downFlag = !this.downFlag
			},
			newOfferGroup() {
				this.$emit('componentView', 'add',{})
			},
			search(val) {
				this.$refs.groupList.search(val);
			},
		},
		components: {
			grouplist: () =>import('./group/grouplist')
		}
	}
</script>

<style scoped lang="scss">
	.main-wrap {
		height: 100%;
		padding: 0 20px 50px;
		.require-state {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			position: relative;
			z-index: 3;
			.require-statelabel {
				float: left;
				height: 30px;
				line-height: 30px;
				padding: 5px 0 0 20px;
				.icon-all {
					position: absolute;
					display: block;
					width: 18px;
					height: 18px;
					margin-top: 6px;
					margin-right: 8px;
					background: url(images/all.png) no-repeat center;
					background-size: 18px 18px;
				}
				.drop-sel {
                    min-width: 100px;
					padding: 0 20px 0 20px;
				}
				.icon-down {
					position: absolute;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 10px;
					left: 130px;
					background: url(images/down.png) no-repeat center;
					background-size: 10px 6px;
				}
			}
		}
		.require-data {
			height: 100%;
			.require-data-header {
				height: 50px;
				line-height: 50px;
				.all-data {
					float: left;
				}
				.cpc__btn-tab-box {
					float: right;
				}
			}
		}
	}
	.h-operation{
		width: 100%;
		padding: 0 10px;
		transition: .3s all ease;
		background-color: #fff;
	}
</style>
