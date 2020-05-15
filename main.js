var LOAD_OFFSET = window.innerHeight + 1000;
var DIV_AMOUNT_PER_GENERATIOIN = 10;

Vue.component("info_div", {
	data: function() {
		return {};
	},
	props: ["data"],
	template: `<div class=\"info_div\"><p>{{data.color}}</p></div>`
});

var vue = new Vue({
	el: "#info_divs",
	data: {
		div_arrary: []
	}
});

function whenScroll(){
	var YOffset = window.pageYOffset;
	var arrary_length = vue.div_arrary.length;

	if(YOffset + LOAD_OFFSET > arrary_length * 600){
		for(var i = arrary_length; i < arrary_length + DIV_AMOUNT_PER_GENERATIOIN; i ++){
			vue.div_arrary.push({
				color: getColor(i)
			});
		}
	}
}

function getColor(index){
	return index;
}

window.onscroll = whenScroll;
whenScroll();