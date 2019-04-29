
import Dialog from '@/components/plugs/dialog/index.js';
import Tip from '@/components/plugs/tip/index.js';
import Form from '@/components/plugs/form/index.js';
import FormItem from '@/components/plugs/form-item/index.js';
import Pagination from '@/components/plugs/pagination/index.js';
import Ripple from '@/components/plugs/ripple/index.js';
import Scroll from '@/components/plugs/scroll/index.js';
import Message from '@/components/plugs/message/index.js';
import Radio from '@/components/plugs/radio/index.js';
import Checkbox from '@/components/plugs/checkbox/index.js';
import Row from '@/components/plugs/row/index.js';
import Col from '@/components/plugs/col/index.js';
import DatePicker from '@/components/plugs/date-picker/index.js';
import Select from '@/components/plugs/select/index.js';
import LeftDialog from '@/components/plugs/left-dialog/index.js';
import Loading from '@/components/plugs/loading/index.js';
import Tree from '@/components/plugs/tree/index.js';
import TreeSimple from '@/components/plugs/tree-simple/index.js';
import Input from '@/components/plugs/input/index.js';
import ColSel from '@/components/plugs/col-sel/index.js';
import Progress from '@/components/plugs/progress/index.js';
import DragGroup from '@/components/plugs/drag-group/index.js';
import DragItem from '@/components/plugs/drag-item/index.js';
import OnOff from '@/components/plugs/on-off/index.js';
import DropSel from '@/components/plugs/drop-sel/index.js';
import Step from '@/components/plugs/step/index.js';
import Search from '@/components/plugs/search/index.js';
import Shrink from '@/components/plugs/shrink/index.js';
import TabBox from '@/components/plugs/tab-box/index.js';
import TabPane from '@/components/plugs/tab-pane/index.js';
import SearchBox from '@/components/plugs/search-box/index.js';
import Upload from '@/components/plugs/upload/index.js';
import Pile from '@/components/plugs/pile/index.js';
import PullLine from '@/components/plugs/pull-line/index.js';



const components = [
	Dialog,
	Tip,
	Form,
	FormItem,
	Pagination,
	Ripple,
	Scroll,
	Radio,
	Checkbox,
	Row,
	Col,
	DatePicker,
	Select,
	LeftDialog,
	Tree,
	Input,
	ColSel,
	DragGroup,
	DragItem,
	OnOff,
	DropSel,
	Step,
	Search,
	Shrink,
	TabBox,
	TabPane,
	SearchBox,
	Upload,
	TreeSimple,
	Pile,
	PullLine
];


const install = function(Vue, opts = {}) {
	components.map(component => {
		component.install(Vue);
	});

	Vue.prototype.$message = Message;
	Vue.prototype.$loading = Loading;
	Vue.prototype.$progress = Progress
};

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}


export {
	Dialog,
	Tip,
	Form,
	FormItem,
	Pagination,
	Ripple,
	Scroll,
	Radio,
	Checkbox,
	Row,
	Col,
	DatePicker,
	Select,
	LeftDialog,
	Message,
	Loading,
	Tree,
	Input,
	ColSel,
	Progress,
	DragGroup,
	DragItem,
	Switch,
	DropSel,
	Step,
	Search,
	Shrink,
	TabBox,
	TabPane,
	SearchBox,
	Upload,
	TreeSimple,
	Pile,
	PullLine
};

export default { install };


// module.exports.default = module.exports;