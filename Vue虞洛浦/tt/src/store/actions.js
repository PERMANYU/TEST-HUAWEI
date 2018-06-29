import * as types from './types';
// import 函数1 from './actions/函数1'
export default {
  [types.SHOW_LOADING]:({state,commit},payload)=>{
    //函数1
    commit(types.SHOW_LOADING)
  },
  HIDE_LOADING:({state,commit},payload)=>{
    //函数2
    commit(types.HIDE_LOADING)
  },
  SHOW_NAV:({state,commit},payload)=>{
    //函数3
    commit('SHOW_NAV')
  },
  HIDE_NAV:({state,commit},payload)=>{
    commit('HIDE_NAV')
  },
  SHOW_FOOT:({state,commit},payload)=>{
    commit('SHOW_FOOT')
  },
  HIDE_FOOT:({state,commit},payload)=>{
    commit('HIDE_FOOT')
  },
  CuserData:({state,commit},payload)=>{
    commit('CuserData',payload)
  },
  SuserData:({state,commit},payload)=>{
    commit('SuserData',payload)
  },
  Cindex:({state,commit},payload)=>{
    commit('Cindex',payload)
  },
  Cnews:({state,commit},payload)=>{
    commit('Cnews',payload)
  }
}