//     model-dock
//     (c) simonfan
//     model-dock is licensed under the MIT terms.

define("__model-dock/attach/model-to-dom/initialize",["require","exports","module","jquery.filler"],function(e,t,o){e("jquery.filler"),o.exports=function(){this.fill=this.$el.filler(this.map)}}),define("__model-dock/attach/dom-to-model/read-dom-value",["require","exports","module","lodash","jquery"],function(e,t,o){var i=e("lodash"),d=e("jquery"),a={"default":function(e){return e.val()},DIV:function(e){return e.html()},INPUT:function(e){return"checkbox"===e.prop("type")?i.map(e.filter(":checked"),function(e){return d(e).val()}):e.val()}};o.exports=function(e){var t=e.prop("tagName"),o=a[t]||a["default"];return o(e)}}),define("__model-dock/attach/dom-to-model/update",["require","exports","module","jquery","./read-dom-value"],function(e,t,o){var i=e("jquery"),d=e("./read-dom-value");o.exports=function(e){var t=i(e.target),o=t.data("_dock_-bound-attribute");if(o){var a=t.data("_dock_-selector"),l=this.$els[a],n=d(l),r=this.parsers[o];n=r?r.call(this,n):n,this.model.set(o,n)}}}),define("__model-dock/attach/dom-to-model/initialize",["require","exports","module","lodash","./update"],function(e,t,o){var i=e("lodash"),d=e("./update");o.exports=function(){this.$els={},i.each(this.map,i.bind(function(e,t){this.bindInput(e,t)},this));var e=i(this.$els).mapValues(function(e,t){return e.is(":input")?t.replace(/\s*->.*$/,""):!1}).values().compact().join(", ");this.$el.on("change",e,i.bind(d,this))}}),define("__model-dock/attach/initialize",["require","exports","module","lodash","lowercase-backbone","./model-to-dom/initialize","./dom-to-model/initialize"],function(e,t,o){var i=(e("lodash"),e("lowercase-backbone")),d=e("./model-to-dom/initialize"),a=e("./dom-to-model/initialize");o.exports=function(){this.render(),d.call(this),a.call(this);var e=this.model||i.model();this.attach(e)}}),define("__model-dock/attach/model-to-dom/update",["require","exports","module","lodash"],function(e,t,o){{var i=e("lodash");o.exports=function(e){var t=this.stringifiers,o=i.mapValues(e.attributes,function(e,o){var i=t[o];return i?i.call(this,e):e});this.fill(o)}}}),define("__model-dock/attach/model-to-dom/attach",["require","exports","module","lodash","./update"],function(e,t,o){{var i=e("lodash"),d=e("./update");o.exports=function(){var e=i.bind(d,this);this.model.on("change",e),e(this.model)}}}),define("__model-dock/attach/dom-to-model/attach",["require","exports","module","lodash","./update"],function(e,t,o){e("lodash"),e("./update");o.exports=function(){}}),define("__model-dock/attach/dom-to-model/bind-input",["require","exports","module","lodash","jquery"],function(e,t,o){{var i=e("lodash");e("jquery")}o.exports=function(e,t){if(i.isArray(e))i.each(e,i.bind(function(e){this.bindInput(e,t)},this));else{var o=this.$els[e]=this.$el.find(e);o.length>0&&o.data("_dock_-bound-attribute",t).data("_dock_-selector",e)}}}),define("__model-dock/attach/index",["require","exports","module","lodash","./model-to-dom/attach","./dom-to-model/attach","./dom-to-model/bind-input"],function(e,t){var o=(e("lodash"),e("./model-to-dom/attach")),i=e("./dom-to-model/attach");t.cache$Els=!0,t.stringifiers={},t.parsers={},t.bindInput=e("./dom-to-model/bind-input"),t.attach=function(e){this.detach(),this.model=e,o.call(this),i.call(this)},t.detach=function(){this.model&&(this.model.off("change",this._updateView),this.model=void 0)}}),define("__model-dock/proxy",["require","exports","module","lodash"],function(e,t){var o=e("lodash");t.proxyMethod=function(e,t){var o=this.model;return o?o[e].apply(o,t):void 0};var i=["set","get","save"];o.each(i,function(e){t[e]=function(){return this.proxyMethod(e,arguments)}})}),define("model-dock",["require","exports","module","lodash","lowercase-backbone","./__model-dock/attach/initialize","./__model-dock/attach/index","./__model-dock/proxy"],function(e,t,o){var i=e("lodash"),d=e("lowercase-backbone"),a=e("./__model-dock/attach/initialize"),l=o.exports=d.view.extend(function(e){d.view.prototype.initialize.apply(this,arguments),i.extend(this,e),a.apply(this,arguments)});l.proto({model:void 0,map:{}}),l.proto(e("./__model-dock/attach/index")),l.proto(e("./__model-dock/proxy"))});