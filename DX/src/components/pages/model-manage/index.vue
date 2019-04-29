<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
export default {
    data() {
        return {
            componentIncludeList:['model'],
            currentView: "model",
            currentData: {}
        };
    },
    components: {
        model: () => import("./group/model"),
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