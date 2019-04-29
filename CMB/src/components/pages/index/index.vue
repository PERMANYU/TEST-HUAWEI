<template>
    <div class="main" > <!-- @contextmenu.prevent="" -->
        <Header/>
        <Nav/>
        <div class="page-tab">
            <Tab/>    
        </div>
        <div class="m-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
        },
        components: {
            Header:() => import('@/components/common/home/header'),
            Nav:() => import('@/components/common/home/nav'),
            Tab:() => import('./groups/tab')
        },
    }
</script>
<style scoped lang="scss">
	.main{
        width: 100%;
        height: 100%;
		padding: 50px 0 0;
        background-color: #f7fbfc;

        .header {
            position: absolute;
            top: 0;
            width: 100%;
        }

        .page-tab{
            margin: 10px 10px 10px 60px;
            width: calc(100% - 70px);
        }

		.m-content{
            margin: 10px 10px 10px 60px;
			width: calc(100% - 70px);
            height: calc(100% - 60px);
            background-color: #fff;
		}
	}
</style>
