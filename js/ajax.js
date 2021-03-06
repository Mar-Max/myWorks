function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	var timer=null;
	json=json || {};
	if(!json.url){
		alert('用法错了');
		return;	
	}
	json.type=json.type || 'get';
	json.data=json.data || {};
	json.time=json.time || 3000;
	json.dataType=json.dataType || 'text';
	
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();	
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	
	//加载状态
	json.fnLoading && json.fnLoading();
	
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				if(json.dataType=='xml'){
					json.succ && json.succ(oAjax.responseXML);	
				}else{
					json.succ && json.succ(oAjax.responseText);	
				}
			}else{
				json.error && json.error(oAjax.status);
			}	
			clearTimeout(timer);
			
			//完成状态
			json.complete && json.complete();	
		}
	};
	
	//超时
	timer=setTimeout(function(){
		alert('网络不给力');
		oAjax.onreadystatechange=null;
	},json.time);
}