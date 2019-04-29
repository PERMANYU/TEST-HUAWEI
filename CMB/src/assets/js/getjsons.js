import axios from 'axios';
import cpcMain from './api.js';
export default {
    //获取主数据
	getJson(code) {
        return new Promise(async (resolve, reject) => {
            axios.get(cpcMain.mainView + '/attrspec?attrNbr=' + code, {
            })
            .then(res => {
                axios.get(cpcMain.mainView + '/attrspec/' + res.data.attrSpecPage.content[0].attrId, {
                }).then(res1 => {
                    resolve(res1);
                }).catch(error => {
                    resolve(error);
                })
            }).catch(error => {
                resolve(error);
            })
        })
    },
    getJsons(code) {
        return this.getJson(code)
    }
}