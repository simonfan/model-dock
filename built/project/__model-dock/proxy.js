define(["require","exports","module","lodash"],function(e,t,n){var r=e("lodash");t.invokeModelMethod=function(t,n){var r=this.model;if(r)return r[t].apply(r,n)};var i=["set","get","save"];r.each(i,function(e){t[e]=function(){return this.invokeModelMethod(e,arguments)}})});