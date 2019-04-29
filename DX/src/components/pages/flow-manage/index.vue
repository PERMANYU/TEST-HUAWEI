<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
export default {
    data() {
        return {
            componentIncludeList:['flow'],
            currentView: "flow",
            currentData: {}
        };
    },
    components: {
        flow: () => import("./group/detail-list"),
        detailFlow: () => import("./group/detail-flow"),
        detailExample: () => import("./group/detail-example"),
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
</style>