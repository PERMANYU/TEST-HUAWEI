<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
				<div class="h-a-title">
					<div class="left-title">
						<p>客户批量导入</p>
						<p>Customer Bluk <span>Import</span></p>
					</div>
				</div>
			</div>
		</div>
		<div class="main">
            <div class="title">
                <span>选择批量导入类型</span>
            </div>
            <div class="template-col" ref="tempCol" v-for="(item, index) in templateConfigurationData" :key="index">
                <div class="template-title">
                    <span class="template-text" :class="item.code">{{item.title}}</span>
                </div>
                <ul class="enter-data">
                    <li @click="item2.isShow ? handleCllick(item, item2) : ''" class="feature-type" 
                        v-for="(item2, index2) in item.feature" 
                        :key="index2">
                        <span v-if="item2.isShow">{{item2.text}}</span>
                    </li>
                </ul>
            </div>
		</div>

        <!-- 客户信息修改S -->
        <Dialog ref="download" :dialogTitle="dialogTitle" :dialogSize="dialogSize" :initBtn="true">
            <ShuttleBox ref="shuttleBox" :configure="configure" :configuration="configurationData"></ShuttleBox>
            <div slot="btnBox">
                <span class="back" @click="cancel">取消</span>
                <span class="save" @click="handleDownload">下载模板</span>
            </div>
        </Dialog>
        <!-- 客户信息修改E -->

        <!-- 导入数据S -->
        <Dialog ref="uploadDialog" :dialogTitle="uploadDialogTitle" :dialogSize="uploadDialogSize" :initBtn="true">
            <div class="upload-style">
                <Col :span="3" :offset="2" class="text-style">
                    <span>上传文件：</span>
                </Col>
                <Col :span="8">
                    <Input :value="fileName"></Input>
                </Col>
                <Col :span="4">
                    <Upload multiple @change="getFile"></Upload>
                </Col>
            </div>
            
			<template slot="btnBox">
				<span class="back" @click="cancelUpload">取消</span>
				<span class="save" @click="uploadFile">导入</span>
			</template>
		</Dialog>
        <!-- 导入数据E -->
        <!-- 导入成功结果展示S -->
        <Dialog ref="uploadSuccessDialog" :dialogTitle="dialogResultTitle" :dialogSize="uploadSuccessSize" :initBtn="true">
            <div class="cus-main">本次导入
                <span class="upload-total">{{successList.length + failList.length}}</span> 条，成功
                <span class="upload-succ">{{successList.length}}</span> 条，失败
                <span class="upload-error">{{failList.length}}</span> 条
            </div>
            
            <div slot="btnBox">
                <span class="back" @click="handleBack">确定</span>
            </div>
        </Dialog>
        <!-- 导入成功结果展示E -->
	</div>
</template>

<script type="text/javascript">
export default {
    data(){
        return{
            dialogTitle: '下载模板',
            dialogSize: {
                max: 600
            },
            configurationData: [],        // 模板数据
            templateConfigurationData: [
                {
                    "title": "客户重新分配",
                    "code": "distrubite",
                    "feature": [
                        {"text": "历史查询", isShow: false},
                        {"text": "下载模板", isShow: false},
                        {"text": "导入数据", isShow: false}
                    ]
                },
                {
                    "title": "子客户遗漏",
                    "code": "omit",
                    "feature": [
                        {"text": "历史查询", isShow: false},
                        {"text": "下载模板", isShow: false},
                        {"text": "导入数据", isShow: false}
                    ]
                },
                {
                    "title": "子客户误归",
                    "code": "return",
                    "feature": [
                        {"text": "历史查询", isShow: false},
                        {"text": "下载模板", isShow: false},
                        {"text": "导入数据", isShow: false}
                    ]
                },
                {
                    "title": "根客户部门变更",
                    "code": "alteration",
                    "feature": [
                        {"text": "历史查询", isShow: false},
                        {"text": "下载模板", isShow: false},
                        {"text": "导入数据", isShow: false}
                    ]
                },
                {
                    "title": "客户信息修改",
                    "code": "infoChange",
                    "feature": [
                        {"text": "下载模板", isShow: false},
                        {"text": "导入数据", isShow: false}
                    ]
                },
                // {
                //     "title": "账户批量导入",
                //     "code": "guestAccount",
                //     "feature": [
                //         {"text": "历史查询", isShow: true},
                //         {"text": "下载模板", isShow: true},
                //         {"text": "导入数据", isShow: true}
                //     ]
                // }
            ],
            fileName: '',
            uploadDialogTitle: '导入文件',
            uploadDialogSize: {
                max: 620
            },
            uploadSuccessSize: {
                max: 500
            },
            dialogResultTitle: '导入结果',
            importType: '',
            failList: [],
            successList: [],
            configure: false,     // 是否可以配置多条数据
            downloadType: '',      // 哪个类型的下载模板
        }
    },
    mounted () {
        // 循环权限数
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-100501':
                    // 待需求和交互稿出来
                    break;
                case 'F-CMB-100502':
                    this.templateConfigurationData[0].feature[0].isShow = true
                    break;
                case 'F-CMB-100503':
                    this.templateConfigurationData[0].feature[1].isShow = true
                    break;
                case 'F-CMB-100504':
                    this.templateConfigurationData[0].feature[2].isShow = true
                    break;
                case 'F-CMB-100505':
                    this.templateConfigurationData[1].feature[0].isShow = true
                    break;
                case 'F-CMB-100506':
                    this.templateConfigurationData[1].feature[1].isShow = true
                    break;
                case 'F-CMB-100507':
                    this.templateConfigurationData[1].feature[2].isShow = true
                    break;
                case 'F-CMB-100508':
                    this.templateConfigurationData[2].feature[0].isShow = true
                    break;
                case 'F-CMB-100509':
                    this.templateConfigurationData[2].feature[1].isShow = true
                    break;
                case 'F-CMB-100510':
                    this.templateConfigurationData[2].feature[2].isShow = true
                    break;
                case 'F-CMB-100511':
                    this.templateConfigurationData[3].feature[0].isShow = true
                    break;
                case 'F-CMB-100512':
                    this.templateConfigurationData[3].feature[1].isShow = true
                    break;
                case 'F-CMB-100513':
                    this.templateConfigurationData[3].feature[2].isShow = true
                    break;
                case 'F-CMB-100514':
                    this.templateConfigurationData[4].feature[0].isShow = true
                    break;
                case 'F-CMB-100515':
                    this.templateConfigurationData[4].feature[1].isShow = true
                    break;
                default:
                    break;
            }
        })

        this.setTempWidth()
    },
    methods: {
        // 动态设置模板的宽度
        setTempWidth () {
            let tempWid = this.$refs.tempCol,                   // 获取节点元素
                singleWid = Math.floor(100 / tempWid.length);   // 将每个元素宽度暂存起来，供后面计算
            for (let $el of tempWid) {
                $el.style.width = `calc(${singleWid}% - 20px)`
            }
        },

        // 批量类型
        handleCllick (data, data2) {
            if (data2.text === '下载模板') {
                switch (data.code) {
                    case 'distrubite':
                        window.location.href = this.$api.ClientDownFile + "/load"
                        break;
                    case 'omit':
                        window.location.href = this.$api.ApplicationFormDownFile + "/load?type=B"
                        break;
                    case 'return':
                        window.location.href = this.$api.ApplicationFormDownFile + "/load?type=A"
                        break;
                    case 'alteration':
                        window.location.href = this.$api.ApplicationFormDownFile + "/load?type=C"
                        break;
                    case 'infoChange':
                        this.$refs.download.show()
                        this.configurationData = []
                        this.getTemplate('infoChange')
                        this.configure = false
                        break;
                    case 'guestAccount':
                        this.$refs.download.show()
                        this.configurationData = []
                        this.getTemplate('guestAccount')
                        this.configure = true
                        break;
                    default:
                        break;
                }
            } else if (data2.text === '历史查询') {
                if (data.code !== 'guestAccount') {
                    this.$emit("componentView", "history", data.code)
                } else {
                    this.$emit("componentView", "account", data.code)
                }
            } else if (data2.text === '导入数据') {
                this.importType = data.code
                this.$refs.uploadDialog.show()
                this.successList = [];
                this.failList = []
            }
            
        },

        // 取消
        cancel () {
            this.$refs.download.hide()
        },

        // 获取模板数据
        getTemplate (val) {
            this.downloadType = val
            let infoUrl = this.$api.GetClientTemp + '/columns',
                guestAccountUrl = this.$api.AccounBatchDownload + '/columns';
            this.$axios({
                method: 'get',
                url: val == 'infoChange' ? infoUrl : guestAccountUrl,
            })
            .then(res => {
                if (res) {
                    this.configurationData = res.data
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },

        // 点击下载模板
        handleDownload () {
            if (!this.$refs.shuttleBox.rightItemData.length) {
                return
            }
            let rightItemData = this.$refs.shuttleBox.rightItemData,
            // 组装数据
            textStr = rightItemData.map(item => item.name).join(',');

            if (this.downloadType == 'infoChange') {
                // 客户信息修改下载               
                this.downloadRequest(this.$api.ClientDistribution, textStr)
            } else if (this.downloadType == 'guestAccount') {
                this.downloadRequest(this.$api.AccounBatchDownload, textStr)
            }           
            this.$refs.download.hide()
        },

        // 下载模板接口
        downloadRequest (url, data) {
            window.location.href = url + "/load?columns=" + data
        },

        // 取消导入弹窗
        cancelUpload () {
            this.$refs.uploadDialog.hide()
        },

        // 获取文件
        getFile (data) {
            this.file = data;
            this.fileName = this.file[0].name;
        },           

        // 导入
        uploadFile () {
            if (typeof this.file === 'undefined' ) {
                this.$message.warning({"message": "请选择文件"})
                return
            } else {
                this.judge()
            }
        },

        // 判断上传的是哪一个模块
        // http://10.4.31.42:9703/custPostnRel/importExcel
        // http://10.4.31.42:9703/applyOrder/importExcel
        // http://10.4.31.42:9703/customer/importExcel
        judge () {
            let staffId = '',
                staffName = '';
            if (this.$user.getStaffId()) {
                staffId = this.$user.getStaffId() ? this.$user.getStaffId() : 1;
                staffName = this.$user.getStaffId() ? this.$user.getStaffName() : '';
            }
            let fileUrl = '',
                type = '';
            switch(this.importType){
                case 'distrubite':
                    fileUrl = this.$api.ClientManagerList + '/importExcel';
                    break;
                case 'omit':
                    fileUrl = this.$api.ClientApplicationForm + '/importExcel';
                    type = 'A';
                    break;
                case 'return':
                    fileUrl = this.$api.ClientApplicationForm + '/importExcel';
                    type = 'B';
                    break;
                case 'alteration':
                    fileUrl = this.$api.ClientApplicationForm + '/importExcel';
                    type = 'C';
                    break;
                case 'infoChange':
                    fileUrl = this.$api.ImportClientTemp + '/importExcel';
                    break;
                case 'guestAccount':
                    fileUrl = this.$api.AccounBatchImport + '/importExcel';
                    break;
                default:                  
                    break;
            }
            if (!this.file) {
                this.$message.warning({"message": "请选择文件"})             
            } else {
                let formData = new FormData();
                formData.append("file", this.file[0]);
                formData.append("createStaff", staffId);
                formData.append("createStaffName", staffName);
                formData.append("orgId", this.$user.getOrgId());
                formData.append("roleId", this.$user.getSysRoleId());
                if(this.importType == 'omit' || this.importType == 'return' || this.importType == 'alteration'){
                    formData.append("type", type);
                }
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }

                this.$axios.post(fileUrl, formData, config).then((res) => {
                    if (res) {
                        this.fileName = '';
                        if(res.data.successList != null && res.data.failList != null){
                            this.successList = res.data.successList;
                            this.failList = res.data.failList;
                        }
                        
                        this.$message.success({"message": "成功"})
                        this.$refs.uploadDialog.hide()
                        this.$refs.uploadSuccessDialog.show()
                    } else {
                        this.$message.error({"message": "失败"})
                    }
                }).catch((err) => {
                    this.$message.error({"message": err.response.data.message})
                })
            }
        },

        // 关闭导入结果
        handleBack () {
            this.$refs.uploadSuccessDialog.hide()
        }
    }
}
</script>

<style scoped lang="scss">
    
	.list{
		padding: 80px 0;
		width: 100%;
		height: 100%;

		.header{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 80px;

			.h-all{
				padding: 20px 20px 0;

				.h-a-title{
					.left-title{
						float: left;
					}
					p:first-child{
						font-size: 24px;
						color: #373f45;
					}
					p:last-child{
						padding-top: 4px;
						font-size: 12px;
						color: #373f45;

						span{
							color: $mainColor;
						}
					}
					
				}

				.h-a-add{
					position: absolute;
					top: 25px;
					right: 10px;
					height: 30px;
				}
			}
		}

		.main {
			width: 100%;
			height: 100%;
            padding: 0 100px;
            .title {
                margin: 50px auto;
                text-align: center;
                font-size: 14px;
                span {
                    color: #333333;
                    font-weight: 600;
                }
            }
            .template-col {
                float: left;
                // width: calc(16.5% - 20px);
                margin-right: 20px;
                border: 1px solid #eee;
                border-top: 2px solid $mainColor;
                text-align: center;
                .template-title {
                    position: relative;
                    height: 50px;
                    border-bottom: 1px solid #eee;
                    text-align: center;
                    
                    .template-text {
                        position: relative;
                        display: inline-block;
                        font-size: 14px;
                        color: #999;
                        line-height: 50px;
                    }
                    .template-text:before {
                        content: "";
                        position: absolute;
                        left: -25px;
                        top: 15px;
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        vertical-align: middle;
                        background-size: cover;
                    }
                    .distrubite:before {
                        background: url('./images/distrubite.png') no-repeat;
                    }
                    .omit:before {
                        background: url('./images/omit.png') no-repeat;
                    }
                    .return:before {
                        background: url('./images/return.png') no-repeat;
                    }
                    .alteration:before {
                        background: url('./images/alteration.png') no-repeat;
                    }
                    .infoChange:before {
                        background: url('./images/change.png') no-repeat;
                    }
                    .guestAccount:before {
                        background: url('./images/change.png') no-repeat;
                    }
                }
                .enter-data {
                    padding: 15px 0 25px;
                    font-size: 14px;
                    color: #999;
                    .feature-type {
                        height: 30px;
                        line-height: 30px;
                        margin: 10px 0;
                        cursor: pointer;
                        &:hover {
                            color: $mainColor;
                        }
                    }
                }
                &:last-child {
                    margin-right: 0;
                }
            }
		}

        // 导入数据
        .upload-style {
            margin: 30px 0 0 0;
            .text-style {
                line-height: 25px;
            }
        }

        .cus-main{
            margin-top: 10px;       
            padding-left: 24px;
            line-height: 40px;
            border-radius: 6px;
            background: #f9fcfe;
            font-size: 14px;
            .upload-total,
            .upload-succ {
                color: #00c0ff;
            }
            .upload-error {
                color: #ff0000;
            }
        }
	}
</style>