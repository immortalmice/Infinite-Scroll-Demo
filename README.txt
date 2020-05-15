#Infinite-Scroll-Demo
--

這是一個可以無限向下捲動的網頁實作
捲動的過程中，背景顏色會隨之漸變，漸變一輪後會循環繼續漸變
漸變規則為RGB三個數值輪流分別進行遞減及遞增

每隔600px會有一個Div，Div中會標示該Div頂端位置時會出現的的背景顏色值
Div內部標示的字串顏色會是該背景顏色的補色

有兩個選項可供使用
- 變化區間
	Y軸位置每隔多少px的捲動進行一次顏色變化
	數值必須大於1，小於1會當作1處理
	預設值為2

- 淡化係數
	顏色輪迴的RGB數值會進行淡化處理，避免刺眼
	數值必須於0~1之間，0是完全淡化，1是不做淡化
	預設值為0.3
	
成果展示：[https://immortalmice.github.io/Infinite-Scroll-Demo/](https://immortalmice.github.io/Infinite-Scroll-Demo/)
