<template>
    <transition name="fade">
	    <div class="add">
            <Scroll :isShowRight="true" ref="scroll" class="self-adaption">
                <div class="a-header">
					<div class="a-title">新增客户树</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>

                 <div class="tree-wrap">
                    <div class="identical-block">
                        <div class="tree-title">
                            <span class="tree-icon"></span>
                            <b class="tree-text">树信息</b>
                        </div>
                        <!-- 第一级树 -->
                       
                        <Treet :folder="treeData"></Treet>
                
                    </div>
                </div>

                <div>
                    <!-- {{treeData}} -->
                </div>
            </Scroll>
             <div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					<span class="app__btn app__btn-save" @click="mainBtnSave()">保存</span>
				</div>
			</div>
	    </div>
    </transition>
</template>
<script type="text/javascript">
	import Treet from './business/tree/main';

	export default{
		data(){
			return{
                treeData:{},
                isAddSuccess: false
			}
		},
        methods:{
            // 返回
            btnBack () {
                this.$emit('componentView','list')
            },

            // 保存
            mainBtnSave () {              
                if (this.treeData.name === '' || this.treeData.name == undefined) {
                    this.$message.warning({"message": "请填写树名称"});
                    return;
                }
                let userStorage = this.$user.getUserStorage();
                this.$axios.post(this.$api.clientTree, {
                        createDate: '',
                        createStaff: userStorage.staffId,
                        custTreeDesc: '',
                        custTreeName: this.treeData.name,
                        custTreeType: '1000',
                        remark: '',
                        statusCd: userStorage.statusCd,
                        statusDate: '',
                        updateDate: '',
                        updateStaff: userStorage.staffId,
                        siebelRowId: '',
                        childerNode: this.treeData.childerNode
                }).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "保存成功"});
                        this.$emit('componentView','list');
                        this.isAddSuccess = true
                    }
                })
            }
        },
        components:{
            Treet
        }
	}
</script>
<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active{
		transition: all .3s ease;
	}

	.fade-enter, .fade-leave-to{
		top: -100% !important;
	}
    .add {
        position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;
        .self-adaption {
			padding: 20px 40px 0 !important;
		}
		.a-header{
			width: 100%;
			height: 50px;
			line-height: 50px;
			border: 1px solid #fafafa;
			text-align: center;
			color: #333940;

			.a-title{
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
			}

			.a-close{
				position: absolute;
				width: 30px;
				height: 30px;
				top: 11px;
				right: 11px;
				cursor: pointer;
				background: url('./images/close.png') no-repeat center;
			}
		}

        /* 树结构样式*/
        $color-gray: #f6f6f6;
        $color-blue: #00c0ff;
        .tree-wrap {
            width: 100%;
            margin: 16px auto;
            padding: 20px 35px;
            border: 1px solid $color-gray;
            .identical-block {
                padding: 16px 24px;
                border: 1px solid $color-gray;
                background: #fdfdfd;
                .tree-title {
                    margin: 0 0 20px 0;
                    padding: 0 0 10px 0;
                    color: $color-blue;
                    .tree-icon {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        background: url('./images/basic.png') no-repeat center;
                        background-size: cover;
                        vertical-align: middle;
                    }
                    .tree-text {
                        margin-left: 10px;
                        font-size: 14px;
                    }
                    &:after {
                        content: "";
                        position: absolute;
                        left: 4%;
                        bottom: 0;
                        width: 95%;
                        border-bottom: 1px solid $color-blue;
                    }
                }
            }
        }

        .a-operation{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;

			.btn-page-box{
				text-align: right;
				padding-right: 20px;

				span{
					margin-left: 20px;
				}
			}
		}
    }
</style>