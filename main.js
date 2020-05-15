var LOAD_OFFSET = window.innerHeight + 1000;
var DIV_AMOUNT_PER_GENERATIOIN = 10;
var CHANGE_INTERVAL = 2;
var FADE_MODIFIER = 0.5;

Vue.component("info_div", {
	data: function() {
		return {};
	},
	props: ["data", "index"],
	template: `
		<div class=\"info_div d-flex\">
			<div class=\"align-self-center\">
				<h2 class=\"font-weight-bold\" v-bind:style=\"this.style\">Div編號：{{this.index}}</h2>
				<h4 class=\"font-weight-bold\" v-bind:style=\"this.style\">背景顏色：{{this.displayText}}</h4>
			</div>
		</div>`,
	computed: {
		displayText: {
			get: function(){
				return converter(this.data.backgroundColor);
			}
		},
		textColor: {
			get: function(){
				return converter(this.data.color);
			}
		},
		style: {
			get: function(){
				return {
					color: this.textColor
				};
			}
		}
	}
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

	//If is near the bottom, generate new div
	if(YOffset + LOAD_OFFSET > arrary_length * 600){
		for(var i = arrary_length; i < arrary_length + DIV_AMOUNT_PER_GENERATIOIN; i ++){
			var YStart = i * 600 + document.getElementById('description_div').offsetHeight;

			vue.div_arrary.push({
				color: getColor(YStart),
				backgroundColor: getBackGroundColor(YStart)
			});
		}
	}

	document.body.style.backgroundColor = converter(getBackGroundColor(YOffset));
}

function getColor(YOffset){
	var backgroundColor = getBackGroundColor(YOffset);

	return {
		r: 255 - backgroundColor.r,
		g: 255 - backgroundColor.g,
		b: 255 - backgroundColor.b
	};
}

function getBackGroundColor(YOffset){
	var gap = 18 * 256;
	var description_div_height = document.getElementById('description_div').offsetHeight;
	YOffset = (YOffset - description_div_height) / CHANGE_INTERVAL;

	var remainder = YOffset < description_div_height ? 0 : (YOffset - description_div_height) % gap;
	var zone_id = Math.floor(remainder / 256);

	var returnObj = { r: 255, g: 255, b: 255};

	switch(zone_id){
		case 1:
		case 2:
		case 9:
		case 10:
		case 14:
		case 15:
			returnObj.r = 0;
			break;
		case 4:
		case 5:
		case 6:
		case 7:
		case 12:
		case 17:
			returnObj.r = 255;
			break;
		case 0:
		case 8:
		case 13:
			returnObj.r = 255 - (remainder % 256);
			break;
		default:
			returnObj.r = remainder % 256;
			break;
	}

	switch(zone_id){
		case 2:
		case 3:
		case 7:
		case 8:
		case 15:
		case 16:
			returnObj.g = 0;
			break;
		case 0:
		case 5:
		case 10:
		case 11:
		case 12:
		case 13:
			returnObj.g = 255;
			break;
		case 1:
		case 6:
		case 14:
			returnObj.g = 255 - (remainder % 256);
			break;
		default:
			returnObj.g = remainder % 256;
			break; 
	}

	switch(zone_id){
		case 3:
		case 4:
		case 8:
		case 9:
		case 13:
		case 14:
			returnObj.b = 0;
			break;
		case 0:
		case 1:
		case 6:
		case 11:
		case 16:
		case 17:
			returnObj.b = 255;
			break;
		case 2:
		case 7:
		case 12:
			returnObj.b = 255 - (remainder % 256);;
			break;
		default:
			returnObj.b = remainder % 256;
			break;
	}

	returnObj = fade(returnObj);

	return returnObj;
}

function converter(obj){
	var returnStr = "#";

	var red = obj.r.toString(16);
	returnStr += red.length == 1 ? "0" + red : red;
	var green = obj.g.toString(16);
	returnStr += green.length == 1 ? "0" + green : green;
	var blue = obj.b.toString(16);
	returnStr += blue.length == 1 ? "0" + blue : blue;

	return returnStr;
}

function fade(obj){
	return {
		r: Math.floor(256 - (256 - obj.r) * FADE_MODIFIER),
		g: Math.floor(256 - (256 - obj.g) * FADE_MODIFIER),
		b: Math.floor(256 - (256 - obj.b) * FADE_MODIFIER)
	};
}

window.onscroll = whenScroll;
whenScroll();