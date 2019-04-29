import ShuttleBox from './src/main'

ShuttleBox.install = function (Vue) {
    Vue.component(ShuttleBox.name, ShuttleBox);
};

export default ShuttleBox 