function Drag(id){
	if(!id)return;
	this.oDiv=document.getElementById(id);
	this.disX=0;
	this.disY=0;
	var _this=this;
	
	this.oDiv.onmousedown=function(ev){
		var oEvent=ev || event;
		_this.fnDown(oEvent);
		return false;
	};
}
Drag.prototype.fnDown=function(ev){
	this.disX=ev.clientX-this.oDiv.offsetLeft;
	this.disY=ev.clientY-this.oDiv.offsetTop;
	var _this=this;
	document.onmousemove=function(ev){
		var oEvent=ev || event;
		_this.fnMove(oEvent);
	};
	
	document.onmouseup=function(){
		_this.fnUp();
	};
};
Drag.prototype.fnMove=function(ev){
	this.oDiv.style.left=ev.clientX-this.disX+'px';
	this.oDiv.style.top=ev.clientY-this.disY+'px';
	this.oDiv.innerHTML=ev.clientX;
	this.oDiv.style.color='#fff';
};
Drag.prototype.fnUp=function(){
	document.onmousemove=null;
	document.onmouseup=null;
};