<template>
    <div class="list">
        <!--加载详情组件-->
        <div class="d-c-info">
            <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentView: "list",
            currentData: {}
        };
    },
    components: {
        list:() => import('./group/list'),
        detail:() => import('./group/detail'),
        detailIntance:() => import('./group/detail-intance')
    },
    methods: {
        changeView(view, obj) {
            this.currentView = view;
            this.currentData = obj;
        }
    }
};
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    height: 100%;
        .d-c-info {
            width: 100%;
            height: 100%;
            float: right;
            font-size: 12px;
            padding: 20px 20px 60px;
        }
}
</style>