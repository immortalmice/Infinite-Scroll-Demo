var LOAD_OFFSET = window.innerHeight + 1000;
var DIV_AMOUNT_PER_GENERATIOIN = 10;
function TEMPLATE(index, displayText, style){
	return `
	<div class=\"info_div d-flex\">
		<div class=\"align-self-center\">
			<h2 class=\"font-weight-bold\" v-bind:style=\"` + style + `\">Div編號：` + index + `</h2>
			<h4 class=\"font-weight-bold\" v-bind:style=\"` + style + `\">背景顏色：` + displayText + `</h4>
		</div>
	</div>`;
}

Vue.component("info_div", {
	data: function() {
		return {};
	},
	props: ["data", "index"],
	template: TEMPLATE("{{this.index}}", "{{this.displayText}}", "this.style"),
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

var vueSetting = new Vue({
	el: ".footer",
	data: {
		CHANGE_INTERVAL: 2,
		FADE_MODIFIER: 0.3
	}
});

function whenScroll(){
	var YOffset = window.pageYOffset;
	var arrary_length = vue.div_arrary.length;

	//If is near the bottom, generate new div
	if(YOffset + LOAD_OFFSET > arrary_length * 600){
		for(var i = arrary_length; i < arrary_length + DIV_AMOUNT_PER_GENERATIOIN; i ++){
			var YStart = i * 600 + document.getElementById('description_div').offsetHeight;

			var obj = {
				color: getColor(YStart),
				backgroundColor: getBackGroundColor(YStart)
			};

			vue.div_arrary.push(obj);

			//append child using plain javascript START, comment these if you want to use v-for instead
			var new_div = document.createElement("div");
			new_div.innerHTML = TEMPLATE(i, converter(obj.backgroundColor), "");
			var selected = new_div.querySelector("div").querySelector("div");
			selected.querySelector("h2").style.color = converter(obj.color);
			selected.querySelector("h4").style.color = converter(obj.color);

			document.getElementById("info_divs").append(new_div);
			//append child using plain javascript END
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
	if(vueSetting.CHANGE_INTERVAL < 1){
		vueSetting.CHANGE_INTERVAL = 1;
	}
	var gap = 18 * 256;
	var description_div_height = document.getElementById('description_div').offsetHeight;
	YOffset = (YOffset - description_div_height) / vueSetting.CHANGE_INTERVAL;

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
	if(vueSetting.FADE_MODIFIER < 0){
		vueSetting.FADE_MODIFIER = 0;
	}else if(vueSetting.FADE_MODIFIER > 1){
		vueSetting.FADE_MODIFIER = 1;
	}
	return {
		r: Math.floor(255 - (255 - obj.r) * vueSetting.FADE_MODIFIER),
		g: Math.floor(255 - (255 - obj.g) * vueSetting.FADE_MODIFIER),
		b: Math.floor(255 - (255 - obj.b) * vueSetting.FADE_MODIFIER)
	};
}

window.onscroll = whenScroll;
whenScroll();