define(["require","exports","module","lodash","./update"],function(e,t,n){var r=e("lodash"),i=e("./update");n.exports=function(){this.$els={},r.each(this.map,r.bind(function(e,t){this.bindInput(e,t)},this));var t=r(this.$els).mapValues(function(e,t){return e.is(":input")?t.replace(/\s*->.*$/,""):!1}).values().compact().join(", ");this.$el.on("change",t,r.bind(i,this))}});