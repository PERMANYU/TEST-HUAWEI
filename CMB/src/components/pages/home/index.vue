<template>
    <div class="main">
        <Header/>
        <Content/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {

        },
        components: {
			Header:() => import('@/components/common/home/header'),
            Content:() => import('./groups/content'),
		},
    }
</script>

<style lang="scss" scoped>
    .main {
        width: 100%;
        height: 100%;
    }
</style>
