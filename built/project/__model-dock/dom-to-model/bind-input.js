define(["require","exports","module","lodash","jquery","./bind-input"],function(e,t,n){var r=e("lodash"),i=e("jquery"),s=e("./bind-input");n.exports=function o(e,t){if(r.isArray(e))r.each(e,r.bind(function(e){o.call(this,e,t)},this));else{var n=this.$els[e]=this.$el.find(e);n.length>0&&n.data("_dock_-bound-attribute",t).data("_dock_-selector",e)}}});