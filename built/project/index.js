//     model-dock
//     (c) simonfan
//     model-dock is licensed under the MIT terms.

define(["require","exports","module","lodash","lowercase-backbone","./__model-dock/initialize-attach","./__model-dock/methods"],function(e,t,n){var r=e("lodash"),i=e("lowercase-backbone"),s=e("./__model-dock/initialize-attach"),o=n.exports=i.view.extend({initialize:function(){i.view.prototype.initialize.apply(this,arguments),this.initializeModelDock.apply(this,arguments)},initializeModelDock:function(t){this.map=t.map||this.map,this.model=t.model||this.model,this.parsers=t.parsers||this.parsers,this.sringifiers=t.stringifiers||this.stringifiers,this.cache$Els=t.cache$Els||this.cache$Els,s.apply(this,arguments)},model:void 0,map:{}});o.proto(e("./__model-dock/methods"))});