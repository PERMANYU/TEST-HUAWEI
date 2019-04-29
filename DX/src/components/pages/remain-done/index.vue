<template>
	<keep-alive :include="componentIncludeList">
		<component :is="currentView" @componentView="changeView" :componentData="currentData" ref="component"></component>
	</keep-alive>
</template>

<script>
	export default {
		name: 'remain-done',
		data() {
			return {
				componentIncludeList: ['list'],
				currentView: 'list',
				currentData: {}
			}
		},
		watch: {
			currentView(to, from) {
				if(to === 'list') {
					this.removeComponentInclude('list')
				} else {
					this.addComponentInclude('list')
				}
			}
		},
		mounted() {
			if(this.$route.params.route) {
				this.currentView = this.$route.params.route;
				this.currentData = this.$route.params.val;
			}
		},
		methods: {
			changeView(view, obj) {
				this.currentView = view;
				this.currentData = obj;
			},
			addComponentInclude(val) {
				this.componentIncludeList.find(item => item === val) ? '' :
					this.componentIncludeList.push(val);
			},
			removeComponentInclude(val) {
				this.componentIncludeList = this.componentIncludeList.filter(item => item !== val);
			},
			globalback() {
				let component = this.$refs.component;
				try {
					if(typeof(eval(component.globalback)) == "function") {
						component.globalback();
					} else {
						this.$router.push({ path: '/'})
					}
				} catch(e) {
					this.$router.push({ path: '/'})
				}
			}
		},
		components: {
			list: () => import('./group/list'),
			info: () => import('./group/info'),
			review: () => import('./group/review'),
			commodity: () => import('@/components/pages/commodity'),
			prodApproval: () => import('@/components/pages/product/group/approval'),
			prodCatalog: () => import('@/components/pages/requirement/group/prod-catalog'),
			requirementProdInfo: () => import('@/components/pages/requirement/group/prod-info'),
			requirementInfo: () => import('@/components/pages/requirement/group/requirementInfo'),
            product: () => import('@/components/pages/product'),
		}
	}
</script>

<style>

</style>