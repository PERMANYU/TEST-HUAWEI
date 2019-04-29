<template>
    <div id="app">
    	<transition name="fade" mode="out-in">
	        <router-view/>
	    </transition>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components:{

        },
        data() {
            return {
                
            }
        },
        mounted() {
            this.appPreloaderHidden();
        },
        methods:{
            appPreloaderHidden(){
                let appPreloader = document.getElementsByClassName('app__preloader')[0];
                // appPreloader.style.opacity = 0;
                appPreloader.className = 'app__preloader hidden';
                setTimeout( () => {
                    appPreloader.style.display = 'none';
                },500)
            },
            appProgressShow(){
                let appProgress = document.getElementsByClassName('app__progress')[0];
                let progressV = 0;
                let timer = setInterval( () => {
                    progressV += Math.random();
                    if(progressV >= 90)  clearInterval(timer);
                    appProgress.style.width = `${progressV}%`;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    #app{
    	width: 100%;
    	height: 100%;
    }

    .fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>

<style lang="scss">
    @import "./assets/css/reset.css";
    @import "./assets/iconfont/iconfont.css";
    
</style>
