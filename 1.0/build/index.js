/*
combined files : 

1.0/index

*/
KISSY.add('gallery/fluidLayout/1.0/index',function (S) {
	var D = S.DOM;
	function WaterFall(param) {
	    this.id = typeof param.container == 'string' ? D.get("#" + param.container) : param.container;
	    this.colWidth = param.colWidth;
	    this.colCount = param.colCount || 4;
	    this.cls = param.cls && param.cls != '' ? param.cls : 'wf-cld';
		this.init();
	}
	S.augment(WaterFall, {
		 maxArr:function(arr){
	        var len = arr.length,temp = arr[0];
	        for(var ii= 1; ii < len; ii++){
	            if(temp < arr[ii]){
	                temp = arr[ii];
	            }
	        }
	        return temp;
	     },
		 getMar:function(node){
	        var dis = 0;
	        if(node.currentStyle){
	            dis = parseInt(node.currentStyle.marginBottom);
	        }else if(document.defaultView){
	            dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
	        }
	        return dis;
	     },
		 getMinCol:function(arr){
	        var ca = arr,cl = ca.length,temp = ca[0],minc = 0;
	        for(var ci = 0; ci < cl; ci++) {
	            if(temp > ca[ci]) {
	                temp = ca[ci];
	                minc = ci;
	            }
	        }
	        return minc;
	    },
		init: function() {
	        var col = [],//列高
	            iArr = [];//索引
	        var nodes = D.query("." + this.cls, this.id),len = nodes.length;
	        for(var i = 0; i < this.colCount; i++) {
	            col[i] = 0;
	        }
	        for(var i = 0; i < len; i++) {
	            nodes[i].h = nodes[i].offsetHeight + this.getMar(nodes[i]);
	            iArr[i] = i;
	        }         
	        for(var i = 0; i < len; i++) {
	            var ming = this.getMinCol(col);
	            nodes[i].style.left = ming * this.colWidth + "px";
	            nodes[i].style.top = col[ming] + "px";
	            col[ming] += nodes[i].h;
	        }
	        this.id.style.height = this.maxArr(col) + "px";
		}					
	});
	return WaterFall;
});
