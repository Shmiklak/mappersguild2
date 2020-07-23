(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"9Rge":function(t,e,s){"use strict";s.r(e);var n=s("wTgm"),i=s.n(n);for(var a in n)"default"!==a&&function(t){s.d(e,t,(function(){return n[t]}))}(a);e.default=i.a},"Ce+S":function(t,e,s){"use strict";s.d(e,"a",(function(){return n})),s.d(e,"b",(function(){return i}));var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[t.submission?s("div",{staticClass:"container bg-container p-3"},[s("div",{staticClass:"text-center"},[s("h4",[t._v("\n                "+t._s(t.submission.contest.name)+"\n            ")]),t._v(" "),s("h5",{attrs:{"data-toggle":"tooltip",title:"anonymized submission name"}},[t._v("\n                "+t._s(t.submission.name)+"\n            ")]),t._v(" "),3178418!=t.submission.creator.osuId?s("p",[t._v("\n                created by\n                "),s("a",{attrs:{href:"https://osu.ppy.sh/users/"+t.submission.creator.osuId,target:"_blank"}},[t._v("\n                    "+t._s(t.submission.creator.username)+"\n                ")])]):t._e()]),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"mx-2"},[s("h5",[t._v("\n                Screening results\n            ")]),t._v(" "),t._l(t.submission.evaluations,(function(e,n){return s("div",{key:e.id},[s("div",[s("div",{staticClass:"ml-3"},[t._v("\n                        User "+t._s(n+1)+"\n                        "),e.vote?s("i",{staticClass:"fas fa-check icon-valid",attrs:{"data-toggle":"tooltip",title:"user placed in top 5"}}):t._e()]),t._v(" "),s("div",{staticClass:"ml-4 mb-2 small text-white-50",staticStyle:{"word-break":"break-word"}},[t._v("\n                        "+t._s(e.comment?e.comment:"[no comment]")+"\n                    ")])])])})),t._v(" "),t._l(t.emptyEvaluationCount,(function(e){return s("div",{key:e},[s("div",[s("div",{staticClass:"ml-3"},[t._v("\n                        User "+t._s(t.submission.evaluations.length+e)+"\n                    ")]),t._v(" "),s("div",{staticClass:"ml-4 mb-2 small text-white-50",staticStyle:{"word-break":"break-word"}},[t._v("\n                        [no comment]\n                    ")])])])}))],2),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"mx-2"},[s("h5",[t._v("\n                Judging results\n            ")]),t._v(" "),t.submission.judgings&&t.submission.judgings.length?s("div",t._l(t.submission.judgings,(function(e,n){return s("div",{key:e.id},[s("div",[s("p",{staticClass:"ml-3"},[t._v("\n                            User "+t._s(n+1)+"\n                        ")]),t._v(" "),s("div",{staticClass:"row"},[s("table",{staticClass:"col-sm-5 ml-4 table table-sm table-hover table-responsive-sm"},[t._m(0,!0),t._v(" "),s("tbody",[t._l(t.filteredAndSortedJudgingScores(e.judgingScores),(function(e){return s("tr",{key:e.id},[s("td",{staticClass:"text-left text-capitalize"},[t._v("\n                                            "+t._s(e.criteria.name)+"\n                                        ")]),t._v(" "),s("td",{staticClass:"text-left"},[t._v("\n                                            "+t._s(e.score)+"/"+t._s(e.criteria.maxScore)+"\n                                        ")])])})),t._v(" "),s("tr",[s("td",{staticClass:"text-left"},[t._v("\n                                            TOTAL\n                                        ")]),t._v(" "),s("td",{staticClass:"text-left"},[t._v("\n                                            "+t._s(t.findTotalJudgingPoints(e.judgingScores))+"/"+t._s(t.findTotalCriteriaPoints(e.judgingScores))+"\n                                        ")])])],2)]),t._v(" "),s("div",{staticClass:"col-sm-6 small"},[t._v("\n                                Comment:\n                                "),s("span",{staticClass:"text-white-50"},[t._v("\n                                    "+t._s(t.findJudgeComment(e.judgingScores))+"\n                                ")])])])])])})),0):s("div",{staticClass:"ml-3"},[t._v("\n                This entry did not receive enough screening votes to reach the judging stage. :(\n            ")])])]):s("div",{staticClass:"text-center p-3"},[t._v("\n        Invalid submission ID\n    ")])])},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"text-left"},[this._v("\n                                            Category\n                                        ")]),this._v(" "),e("th",{staticClass:"text-left"},[this._v("\n                                            Score\n                                        ")])])])}];n._withStripped=!0},Wsqg:function(t,e,s){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=n(s("oCYn")),a=n(s("L2JU")),o=n(s("Y7za"));s("qIrM");const r=n(s("vCLK")),u=n(s("Z1WV"));i.default.mixin(r.default),i.default.use(a.default);const c=new a.default.Store({modules:{toasts:u.default},state:{submission:null},mutations:{setSubmission(t,e){t.submission=e}}});new i.default({el:"#app",store:c,components:{ContestResultsPage:o.default}})},Y7za:function(t,e,s){"use strict";s.r(e);var n=s("Ce+S"),i=s("9Rge");for(var a in i)"default"!==a&&function(t){s.d(e,t,(function(){return i[t]}))}(a);var o=s("KHd+"),r=Object(o.a)(i.default,n.a,n.b,!1,null,null,null);r.options.__file="src/pages/ContestResultsPage.vue",e.default=r.exports},Z1WV:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n={namespace:!1,state:{toastMessages:[]},mutations:{addToastMessage(t,e){t.toastMessages.push(e)},removeFirstToastMessage(t){t.toastMessages.splice(0,1)}},actions:{updateToastMessages({commit:t},e){t("addToastMessage",e),setTimeout(()=>{t("removeFirstToastMessage")},3500)}}};e.default=n},qIrM:function(t,e,s){"use strict";$(document).ready((function(){$("body").tooltip({selector:"[data-toggle=tooltip]",trigger:"hover"})}))},vCLK:function(t,e,s){"use strict";var n=this&&this.__awaiter||function(t,e,s,n){return new(s||(s=Promise))((function(i,a){function o(t){try{u(n.next(t))}catch(t){a(t)}}function r(t){try{u(n.throw(t))}catch(t){a(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,r)}u((n=n.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=i(s("oCYn")),o=i(s("vDqi"));e.default=a.default.extend({methods:{executeGet(t,e){return n(this,void 0,void 0,(function*(){e&&(e.target.disabled=!0),$("[data-toggle='tooltip']").tooltip("hide");try{const s=yield o.default.get(t);return s.data.error?(this.$store.dispatch("updateToastMessages",{message:s.data.error}),{error:s.data.error}):s.data}catch(t){return this.$store.dispatch("updateToastMessages",{message:"Something went wrong!"}),{error:"Something went wrong!"}}finally{e&&(e.target.disabled=!1)}}))},executePost(t,e={},s){return n(this,void 0,void 0,(function*(){s&&(s.target.disabled=!0),$("[data-toggle='tooltip']").tooltip("hide");try{const n=yield o.default.post(t,e);return n.data.error?(this.$store.dispatch("updateToastMessages",{message:n.data.error}),{error:n.data.error}):n.data}catch(t){return this.$store.dispatch("updateToastMessages",{message:"Something went wrong!"}),{error:"Something went wrong!"}}finally{s&&(s.target.disabled=!1)}}))},isError:t=>void 0!==t.error,listUser:(t,e,s)=>t+(e<s-1?", ":"")}})},wTgm:function(t,e,s){"use strict";var n=this&&this.__awaiter||function(t,e,s,n){return new(s||(s=Promise))((function(i,a){function o(t){try{u(n.next(t))}catch(t){a(t)}}function r(t){try{u(n.throw(t))}catch(t){a(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,r)}u((n=n.apply(t,e||[])).next())}))},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=i(s("oCYn")),o=s("L2JU");e.default=a.default.extend({name:"ContestResultsPage",computed:Object.assign(Object.assign({},o.mapState(["submission"])),{voteCount(){let t=0;return this.submission.evaluations.forEach(e=>{isNaN(e.vote)||(t+=e.vote)}),t},emptyEvaluationCount(){return this.submission.contest.screeners.length-this.submission.evaluations.length}}),created(){return n(this,void 0,void 0,(function*(){const t=new URLSearchParams(document.location.search.substring(1));if(t.get("submission")&&t.get("submission").length){const e=yield this.executeGet("/contestResults/searchOnLoad/"+t.get("submission"));this.isError(e)||this.$store.commit("setSubmission",e)}$("#loading").fadeOut(),$("#app").attr("style","visibility: visible").hide().fadeIn()}))},methods:{findTotalJudgingPoints(t){let e=0;return t.forEach(t=>{e+=t.score}),e},findTotalCriteriaPoints(t){let e=0;return t.forEach(t=>{e+=t.criteria.maxScore}),e},findJudgeComment(t){let e="";return t.forEach(t=>{"comments"==t.criteria.name&&(e=t.comment)}),e},filteredAndSortedJudgingScores(t){t=t.filter(t=>"comments"!=t.criteria.name);const e=["musical representation","creativity","limitation","gameplay"];return[...t].sort((function(t,s){return e.indexOf(t.criteria.name)-e.indexOf(s.criteria.name)}))}}})}},[["Wsqg",0,1]]]);