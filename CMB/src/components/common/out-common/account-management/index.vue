<template>
    <transition name="fade">
        <keep-alive :include="componentIncludeList">
            <component :is="currentView" @componentView="changeView" ref="list" :componentData="componentData" :currentData="currentData"></component>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    name: "management",
    data() {
        return {
            componentIncludeList: [],
            currentView: "list",
            currentData: {}
        };
    },
    methods: {
        changeView(view, obj) {
            this.currentView = view;
            this.currentData = obj;
        },
        changeHeight() {
            this.$refs.list.changeHeight('height')
        },
        changeLow() {
            this.$refs.list.changeHeight('low')
        }
    },
    components: {
        list: () => import("./group/list"),
        add: () => import("./group/add"),
        mod: () => import("./group/mod")
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    top: -100% !important;
}
</style>

