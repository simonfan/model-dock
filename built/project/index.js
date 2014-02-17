//     model-dock
//     (c) simonfan
//     model-dock is licensed under the MIT terms.

define(["require","exports","module","lodash","lowercase-backbone","./__model-dock/attach/initialize","./__model-dock/attach/index","./__model-dock/proxy"],function(e,t,n){var r=e("lodash"),i=e("lowercase-backbone"),s=e("./__model-dock/attach/initialize"),o=n.exports=i.view.extend(function(t){r.extend(this,t),s.apply(this,arguments)});o.proto({model:void 0,map:{}}),o.proto(e("./__model-dock/attach/index")),o.proto(e("./__model-dock/proxy"))});