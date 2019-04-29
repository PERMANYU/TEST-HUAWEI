<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
export default {
    name: "management",
    data() {
        return {
            componentIncludeList: ['list'],
            currentView: "list",
            currentData: {}
        };
    },
    methods: {
        changeView(view, obj) {
            this.currentView = view;
            this.currentData = obj;
        }
    },
    components: {
        list: () => import("./group/list"),
        add: () => import("./group/add"),
        //mod: () => import("./group/mod"),
        info: () => import("./group/info")
    }
};
</script>

<style lang="scss" scoped>

</style>

