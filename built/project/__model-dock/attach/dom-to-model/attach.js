define(["require","exports","module","lodash","./update"],function(e,t,n){var r=e("lodash"),i=e("./update");n.exports=function(){this.$el.on("change",this.inputSelector,r.bind(i,this))}});