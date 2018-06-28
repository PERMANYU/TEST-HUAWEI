function ajaxGet(url,msg){
	var p = new Promise(function(success,error){
		if(XMLHttpRequest){
			var ajax = new XMLHttpRequest();
		}else{
			var ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		url = url + "?";
		if(msg){
			for(var i in msg){
				url = url + i+"="+msg[i] + "&";
			}
		}
		ajax.open("GET",url+"t="+new Date().getTime(),true);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}else{
				if(ajax.readyState == 4 && ajax.status != 200){
					error(ajax.status)
				}
			}
		}
		ajax.send(null);
	})
	return p;
}

function ajaxPost(url,data){
	var p = new Promise(function(success,error){
		if(XMLHttpRequest){
			var ajax = new XMLHttpRequest();
		}else{
			var ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open("POST",url+"?t="+new Date().getTime());
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}else{
				if(ajax.readyState == 4 && ajax.status != 200){
					error(ajax.status)
				}
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var str = ""
		if(data){
			for(var i in data){
				str += i+"="+data[i] + "&";
			}
	//	str = str.slice(0,str.length-1);
		}else{
			str = null
		}
		ajax.send(str);
	})
	return p;
}