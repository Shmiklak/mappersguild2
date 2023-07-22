var e=Object.defineProperty,s=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,i=(s,t,a)=>t in s?e(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a,o=(e,o)=>{for(var r in o||(o={}))t.call(o,r)&&i(e,r,o[r]);if(s)for(var r of s(o))a.call(o,r)&&i(e,r,o[r]);return e};import{d as r,m as l,p as n,a as d,h as c,o as p,b as u,f as m,j as h,t as f,k as g,e as y,n as P,i as U,l as k,O as b,s as v,w as x,g as w,F as M,L as q,q as $,y as F}from"./vendor.b9ef672a.js";import{_ as S}from"./ModalDialog.4a9168b4.js";import{a as C}from"./task.5925ddbb.js";import{_ as I,a as Q}from"./index.b6199a6d.js";import{_ as O}from"./FilterBox.b3263039.js";import{_ as A,F as B}from"./extras.acd395c6.js";var _=r({name:"UserCard",props:{user:{type:Object,required:!0}},computed:l(["filterMode"]),methods:{selectUser(){this.$store.commit("users/setSelectedUserId",this.user.id)}}});n("data-v-f7557302");const j=["src"],E={class:"mb-2"},V={class:"text-secondary"},D={class:"card-text small"},N={class:"card-text small"},T=m("i",{class:"fas fa-coins"},null,-1),G={key:0,class:"card-text small"},R={key:1,class:"card-text small"},L={key:2,class:"card-text small"},J={key:3,class:"card-text small"};d(),_.render=function(e,s,t,a,i,o){const r=c("user-link");return p(),u("div",{class:"col-sm-6 col-md-4 col-lg-4 col-xl-3 my-2",onClick:s[0]||(s[0]=s=>e.selectUser())},[m("div",{class:P(["card card-hover card-level-2 card-body","border-rank-"+e.user.rank]),"data-bs-toggle":"modal","data-bs-target":"#extendedInfo"},[m("img",{src:"https://a.ppy.sh/"+e.user.osuId,class:"card-avatar-img"},null,8,j),m("div",E,[h(r,{user:e.user},null,8,["user"])]),m("div",V,[m("div",D,[m("b",null,"Total points: "+f(e.user.totalPoints),1)]),m("div",N,[g(" Available points: "+f(e.user.availablePoints)+" ",1),T]),"osu"==e.filterMode?(p(),u("p",G," osu! points: "+f(Math.round(10*e.user.osuPoints)/10),1)):"taiko"==e.filterMode?(p(),u("p",R," osu!taiko points: "+f(Math.round(10*e.user.taikoPoints)/10),1)):"catch"==e.filterMode?(p(),u("p",L," osu!catch points: "+f(Math.round(10*e.user.catchPoints)/10),1)):"mania"==e.filterMode?(p(),u("p",J," osu!mania points: "+f(Math.round(10*e.user.maniaPoints)/10),1)):y("",!0)])],2)])},_.__scopeId="data-v-f7557302";var H=r({name:"UserPointsRow",props:{points:{type:Number,required:!0},display:{type:String,required:!0},tooltipTitle:{type:String,required:!0}}});const W={class:"text-secondary"},z={scope:"row"},K={scope:"row"};H.render=function(e,s,t,a,i,o){const r=U("bs-tooltip");return p(),u("tr",W,[k(m("td",z,[g(f(e.display),1)],512),[[r,e.tooltipTitle,"left"]]),m("td",K,f(Math.round(10*e.points)/10),1)])};var X=r({name:"UserInfo",components:{UserPointsRow:H,ModalDialog:S,ModesIcons:I},data:()=>({currentQuests:[],currentMissions:[],createdQuestNames:[],spentPoints:[],userBeatmaps:[],sortOrder:Object.values(C)}),computed:o(o({},l(["loggedInUser"])),b("users",["selectedUser"])),watch:{async selectedUser(){await this.loadEverything()}},async created(){await this.loadEverything()},methods:{async loadEverything(){if(!this.selectedUser)return;this.$router.push(`/users?id=${this.selectedUser.id}`),this.currentQuests=[],this.currentMissions=[],this.createdQuestNames=[],this.spentPoints=[],this.userBeatmaps=[];const[e,s,t,a,i]=await Promise.all([this.$http.executeGet(`/users/${this.selectedUser.id}/quests`),this.$http.executeGet(`/users/${this.selectedUser.id}/missions`),this.$http.executeGet(`/users/findCreatedQuests/${this.selectedUser.id}`),this.$http.executeGet(`/users/findSpentPoints/${this.selectedUser.id}`),this.$http.executeGet(`/users/findUserBeatmaps/${this.selectedUser.id}`)]);if(this.$http.isError(e)||(this.currentQuests=e),this.$http.isError(s)||(this.currentMissions=s),this.$http.isError(t)||(this.createdQuestNames=t),this.$http.isError(a)||(this.spentPoints=a),!this.$http.isError(i)){const e=["WIP","Done","Qualified","Ranked"];this.userBeatmaps=i.sort((function(s,t){return e.indexOf(s.status)-e.indexOf(t.status)}))}},findIcon:e=>e==Q.WIP?"fa-ellipsis-h":e==Q.Done?"fa-check":e==Q.Qualified||e==Q.Ranked?"fa-check-circle":"",userTasks(e){[...e.tasks].sort(((e,s)=>this.sortOrder.indexOf(e.name)-this.sortOrder.indexOf(s.name)));let s="";return e.tasks.forEach((e=>{e.mappers.forEach((t=>{t.id==this.selectedUser.id&&(s+=e.name+", ")}))})),s.slice(0,-2)},calculatePoints(e){let s=25;return e.art||(s+=10),e.requiredMapsets<1?s=727:1==e.requiredMapsets?s+=100:e.requiredMapsets<10&&(s+=7.5*(10-e.requiredMapsets)),s},findSpentPointsAction(e){switch(e){case"acceptQuest":return"Accepted quest:";case"reopenQuest":return"Reopened quest:";case"extendDeadline":return"Extended quest deadline:";case"createQuest":return"Created quest:";default:return"undefined action"}},findSpentPointsValue(e,s){switch(e){case"acceptQuest":return s.price;case"reopenQuest":return s.reopenPrice;case"extendDeadline":return 10;case"createQuest":return this.calculatePoints(s);default:return 0}}}});const Y={class:"row"},Z={class:"col-md-6"},ee={class:"table table-sm"},se=m("thead",null,[m("tr",null,[m("th",{scope:"col"}," Task "),m("th",{scope:"col"}," Points ")])],-1),te=m("td",{scope:"row"}," Total points earned ",-1),ae={scope:"row"},ie=m("td",{scope:"row"}," Available points ",-1),oe={scope:"row"},re=m("i",{class:"fas fa-coins"},null,-1),le={class:"col-md-6"},ne={class:"small"},de=g(" Rank: "),ce={key:1,class:"text-secondary"},pe={key:0,class:"small"},ue={class:"p-0 mb-2 ms-4"},me=["href"],he={key:1,class:"small"},fe={class:"p-0 mb-2 ms-4"},ge=["href"],ye=m("div",{class:"small"}," Completed priority quests: ",-1),Pe={class:"p-0 mb-2 ms-4"},Ue=["href"],ke=m("div",{class:"small"}," Completed quests: ",-1),be={class:"p-0 mb-2 ms-4"},ve=["href"],xe={key:4,class:"small"},we={class:"p-0 mb-2 ms-4"},Me=m("div",{class:"radial-divisor"},null,-1),qe={class:"row"},$e={class:"col-sm"},Fe=m("p",null,"Mappers' Guild beatmaps:",-1),Se={class:"table table-sm"},Ce=m("thead",null,[m("tr",null,[m("th",{scope:"col"}," Mapset "),m("th",{scope:"col"}," Host "),m("th",{scope:"col"}," Tasks "),m("th",{scope:"col"})])],-1),Ie={key:0},Qe=[m("td",{scope:"row"}," ... ",-1),m("td",{scope:"row"}," ... ",-1),m("td",{scope:"row"}," ... ",-1),m("td",{scope:"row"},null,-1)],Oe={scope:"row"},Ae=["href"],Be={scope:"row"},_e={scope:"row",class:"text-secondary"},je={scope:"row",class:"text-secondary"},Ee=["href"],Ve=[m("i",{class:"fas fa-link"},null,-1)],De=m("div",{class:"radial-divisor"},null,-1),Ne={class:"row"},Te={class:"col-sm"},Ge=m("p",null,"Spent points logs:",-1),Re={class:"table table-sm"},Le=m("thead",null,[m("tr",null,[m("th",{scope:"col"}," Action "),m("th",{scope:"col"}," Spent points ")])],-1),Je={key:0},He=[m("td",{scope:"row"}," ... ",-1),m("td",{scope:"row"}," ... ",-1)],We={scope:"row",class:"text-secondary"},ze=["href"],Ke={scope:"row",class:"text-secondary"},Xe=m("i",{class:"fas fa-coins"},null,-1),Ye=m("div",{class:"radial-divisor"},null,-1),Ze={class:"float-end"};X.render=function(e,s,t,a,i,o){const r=c("user-link"),l=c("user-points-row"),n=c("modes-icons"),d=c("modal-dialog"),b=U("bs-tooltip");return p(),v(d,{id:"extendedInfo",loaded:Boolean(e.selectedUser),"header-class":e.selectedUser?"bg-rank-"+e.selectedUser.rank:""},{header:x((()=>[h(r,{class:"text-dark",user:e.selectedUser},null,8,["user"])])),default:x((()=>[m("div",Y,[m("div",Z,[m("table",ee,[se,m("tbody",null,[e.selectedUser.easyPoints?(p(),v(l,{key:0,points:e.selectedUser.easyPoints,display:"mapping Easy difficulties","tooltip-title":"~5 points per difficulty. +2 if quest mapset"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.normalPoints?(p(),v(l,{key:1,points:e.selectedUser.normalPoints,display:"mapping Normal difficulties","tooltip-title":"~6 points per difficulty. +2 if quest mapset"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.hardPoints?(p(),v(l,{key:2,points:e.selectedUser.hardPoints,display:"mapping Hard difficulties","tooltip-title":"~7 points per difficulty. +2 if quest mapset"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.insanePoints?(p(),v(l,{key:3,points:e.selectedUser.insanePoints,display:"mapping Insane difficulties","tooltip-title":"~8 points per difficulty. +2 if quest mapset"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.expertPoints?(p(),v(l,{key:4,points:e.selectedUser.expertPoints,display:"mapping Expert difficulties","tooltip-title":"~8 points per difficulty. +2 if quest mapset"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.storyboardPoints?(p(),v(l,{key:5,points:e.selectedUser.storyboardPoints,display:"creating storyboards","tooltip-title":"2, 7.5, or 10 points per storyboard"},null,8,["points","tooltip-title"])):y("",!0),e.selectedUser.questPoints?(p(),v(l,{key:6,points:e.selectedUser.questPoints,display:"completing quests","tooltip-title":"7 bonus points for completing quests on time"},null,8,["points"])):y("",!0),e.selectedUser.missionPoints?(p(),v(l,{key:7,points:e.selectedUser.missionPoints,display:"completing priority quests","tooltip-title":"5-24 bonus points for completing priority quests"},null,8,["points"])):y("",!0),e.selectedUser.modPoints?(p(),v(l,{key:8,points:e.selectedUser.modPoints,display:"modding mapsets","tooltip-title":"~1 point per mod"},null,8,["points"])):y("",!0),e.selectedUser.hostPoints?(p(),v(l,{key:9,points:e.selectedUser.hostPoints,display:"hosting mapsets","tooltip-title":"5 points per mapset hosted"},null,8,["points"])):y("",!0),e.selectedUser.contestCreatorPoints?(p(),v(l,{key:10,points:e.selectedUser.contestCreatorPoints,display:"FA contest creation","tooltip-title":"creation of FA beatmapping contests hosted on Mappers' Guild"},null,8,["points"])):y("",!0),e.selectedUser.contestParticipantPoints?(p(),v(l,{key:11,points:e.selectedUser.contestParticipantPoints,display:"FA contest participation","tooltip-title":"participating in FA beatmapping contests hosted on Mappers' Guild"},null,8,["points"])):y("",!0),e.selectedUser.contestScreenerPoints?(p(),v(l,{key:12,points:e.selectedUser.contestScreenerPoints,display:"FA contest screening","tooltip-title":"screening entries in FA beatmapping contests hosted on Mappers' Guild"},null,8,["points"])):y("",!0),e.selectedUser.contestJudgePoints?(p(),v(l,{key:13,points:e.selectedUser.contestJudgePoints,display:"FA contest judging","tooltip-title":"judging entries in FA beatmapping contests hosted on Mappers' Guild"},null,8,["points"])):y("",!0),e.selectedUser.legacyPoints?(p(),v(l,{key:14,points:e.selectedUser.legacyPoints,display:"legacy","tooltip-title":"points for things that are no longer applicable to Mappers' Guild"},null,8,["points"])):y("",!0),e.selectedUser.osuPoints?(p(),v(l,{key:15,points:e.selectedUser.osuPoints,display:"Total osu! points","tooltip-title":"mapping osu! game mode"},null,8,["points"])):y("",!0),e.selectedUser.taikoPoints?(p(),v(l,{key:16,points:e.selectedUser.taikoPoints,display:"Total osu!taiko points","tooltip-title":"mapping osu!taiko game mode"},null,8,["points"])):y("",!0),e.selectedUser.catchPoints?(p(),v(l,{key:17,points:e.selectedUser.catchPoints,display:"Total osu!catch points","tooltip-title":"mapping osu!catch game mode"},null,8,["points"])):y("",!0),e.selectedUser.maniaPoints?(p(),v(l,{key:18,points:e.selectedUser.maniaPoints,display:"Total osu!mania points","tooltip-title":"mapping osu!mania game mode"},null,8,["points"])):y("",!0),m("tr",null,[te,m("td",ae,f(e.selectedUser.totalPoints),1)]),m("tr",null,[ie,m("td",oe,[g(f(e.selectedUser.availablePoints)+" ",1),re])])])])]),m("div",le,[m("p",ne,[de,e.selectedUser.rank>0?k((p(),u("i",{key:0,class:P(["fas fa-crown","text-rank-"+e.selectedUser.rank])},null,2)),[[b,`rank ${e.selectedUser.rank} user`]]):(p(),u("span",ce," None "))]),e.currentMissions.length?(p(),u("div",pe," Current missions: ")):y("",!0),m("ul",ue,[(p(!0),u(M,null,w(e.currentMissions,(e=>(p(),u("li",{key:e.id,class:"small text-secondary"},[m("a",{href:"/missions?id="+e.id,target:"_blank"},f(e.name.length>40?e.name.slice(0,40)+"...":e.name),9,me)])))),128))]),e.currentQuests.length?(p(),u("div",he," Current quests: ")):y("",!0),m("ul",fe,[(p(!0),u(M,null,w(e.currentQuests,(e=>(p(),u("li",{key:e.id,class:"small text-secondary"},[m("a",{href:"/quests?id="+e.id,target:"_blank"},f(e.name.length>40?e.name.slice(0,40)+"...":e.name),9,ge)])))),128))]),e.selectedUser.completedMissions&&e.selectedUser.completedMissions.length?(p(),u(M,{key:2},[ye,m("ul",Pe,[(p(!0),u(M,null,w(e.selectedUser.completedMissions,(e=>(p(),u("li",{key:e.id,class:"small text-secondary"},[m("a",{href:"/missions?id="+e.id,target:"_blank"},f(e.name.length>40?e.name.slice(0,40)+"...":e.name),9,Ue)])))),128))])],64)):y("",!0),e.selectedUser.completedQuests&&e.selectedUser.completedQuests.length?(p(),u(M,{key:3},[ke,m("ul",be,[(p(!0),u(M,null,w(e.selectedUser.completedQuests,(e=>(p(),u("li",{key:e.id,class:"small text-secondary"},[m("a",{href:"/quests?id="+e.id,target:"_blank"},f(e.name.length>40?e.name.slice(0,40)+"...":e.name),9,ve)])))),128))])],64)):y("",!0),e.createdQuestNames.length?(p(),u("div",xe," Created quests: ")):y("",!0),m("ul",we,[(p(!0),u(M,null,w(e.createdQuestNames,(e=>(p(),u("li",{key:e,class:"small text-secondary"},f(e.length>40?e.slice(0,40)+"...":e),1)))),128))])])]),Me,m("div",qe,[m("div",$e,[Fe,m("table",Se,[Ce,m("tbody",null,[e.userBeatmaps.length?y("",!0):(p(),u("tr",Ie,Qe)),(p(!0),u(M,null,w(e.userBeatmaps,(s=>(p(),u("tr",{key:s.id},[m("td",Oe,[k(m("i",{class:P(["fas me-1",["text-"+s.status.toLowerCase(),e.findIcon(s.status)]])},null,2),[[b,s.status]]),m("a",{href:"/beatmaps?id="+s.id,target:"_blank",class:"me-1"},f(s.song.artist)+" - "+f(s.song.title),9,Ae),"osu"!==s.mode?(p(),v(n,{key:0,modes:[s.mode]},null,8,["modes"])):y("",!0)]),m("td",Be,[h(r,{user:s.host},null,8,["user"])]),m("td",_e,f(e.userTasks(s)),1),m("td",je,[s.url?(p(),u("a",{key:0,href:s.url,target:"_blank"},Ve,8,Ee)):y("",!0)])])))),128))])])])]),De,m("div",Ne,[m("div",Te,[Ge,m("table",Re,[Le,m("tbody",null,[e.spentPoints.length?y("",!0):(p(),u("tr",Je,He)),(p(!0),u(M,null,w(e.spentPoints,(s=>(p(),u("tr",{key:s.id},[m("td",We,[g(f(e.findSpentPointsAction(s.category))+" ",1),m("a",{href:"/quests/?id="+s.quest.id,target:"_blank"},f(s.quest.name),9,ze)]),m("td",Ke,[g(f(e.findSpentPointsValue(s.category,s.quest))+" ",1),Xe])])))),128))])])])]),Ye,m("p",Ze," Joined: "+f(e.selectedUser.createdAt.slice(0,10)),1)])),_:1},8,["loaded","header-class"])};var es=r({name:"UserPageFilters",components:{FilterBox:O,ModeFilters:A},data:()=>({sorted:!1,sortOptions:{username:"Name",rank:"Rank",createdAt:"Joined"}}),computed:l("users",["sortBy","filterMode","filterValue"]),methods:o({},q("users",["updateSorting","updateFilterValue","updateFilterMode"]))});const ss={class:"card card-body mb-2"},ts={class:"container"},as={class:"row small mt-3"},is=m("div",{class:"col-auto filter-title"}," Sort ",-1),os={class:"col"},rs=["onClick"];es.render=function(e,s,t,a,i,o){const r=c("mode-filters"),l=c("filter-box");return p(),u("div",ss,[m("div",ts,[h(l,{placeholder:"enter to search for username...","filter-value":e.filterValue,"onUpdate:filterValue":s[1]||(s[1]=s=>e.updateFilterValue(s))},{filters:x((()=>[h(r,{"filter-mode":e.filterMode,"onUpdate:filterMode":s[0]||(s[0]=s=>e.updateFilterMode(s))},null,8,["filter-mode"])])),_:1},8,["filter-value"]),m("div",as,[is,m("div",os,[(p(!0),u(M,null,w(e.sortOptions,((s,t)=>(p(),u("a",{key:t,class:P(e.sortBy===t?"sorted":"unsorted"),href:"#",onClick:$((s=>e.updateSorting(t)),["prevent"])},f(s),11,rs)))),128))])])])])};var ls={namespaced:!0,state:{users:[],selectedUserId:null,filterValue:"",filterMode:B.any,sortBy:"rank",sortDesc:!0,pagination:{page:1,limit:16,maxPages:1}},mutations:{setUsers(e,s){e.users=s},setFilterValue(e,s){e.filterValue=s},setFilterMode(e,s){e.filterMode=s},setSelectedUserId(e,s){e.selectedUserId=s},updateUser(e,s){const t=e.users.findIndex((e=>e.id===s.id));-1!==t&&(e.users[t]=s)},setSortBy(e,s){e.sortBy=s},setSortDesc(e,s){e.sortDesc=s},increasePaginationPage(e){e.pagination.page+=1},decreasePaginationPage(e){e.pagination.page-=1},resetPaginationPage(e){e.pagination.page=1},updatePaginationMaxPages(e,s){e.pagination.maxPages=s}},getters:{filteredUsers:e=>{let s=[...e.users];if(e.filterMode!==B.any){const t=e.filterMode;s=s.filter((e=>!("osu"!=t||!e.osuPoints)||(!("taiko"!=t||!e.taikoPoints)||(!("catch"!=t||!e.catchPoints)||!("mania"!=t||!e.maniaPoints)))))}return e.filterValue.length>2&&(s=s.filter((s=>s.username.toLowerCase().includes(e.filterValue.toLowerCase())))),"createdAt"===e.sortBy?s.sort(((e,s)=>+e.createdAt-+s.createdAt)):"username"===e.sortBy?s.sort(((e,s)=>s.username.toLowerCase().localeCompare(e.username.toLowerCase()))):"rank"===e.sortBy&&("osu"===e.filterMode?s.sort(((e,s)=>e.osuPoints-s.osuPoints)):"taiko"===e.filterMode?s.sort(((e,s)=>e.taikoPoints-s.taikoPoints)):"catch"===e.filterMode?s.sort(((e,s)=>e.catchPoints-s.catchPoints)):"mania"===e.filterMode?s.sort(((e,s)=>e.maniaPoints-s.maniaPoints)):s.sort(((e,s)=>e.totalPoints-s.totalPoints))),e.sortDesc&&s.reverse(),s},paginatedUsers:(e,s)=>s.filteredUsers.slice(e.pagination.limit*(e.pagination.page-1),e.pagination.limit*e.pagination.page),selectedUser:e=>e.users.find((s=>s.id===e.selectedUserId)),allUsers:e=>e.users},actions:{updateFilterMode({commit:e},s){e("resetPaginationPage"),e("setFilterMode",s)},updateFilterValue({commit:e},s){e("resetPaginationPage"),e("setFilterValue",s)},updatePaginationMaxPages({commit:e,getters:s,state:t}){e("updatePaginationMaxPages",Math.ceil(s.filteredUsers.length/t.pagination.limit))},updateSorting({commit:e,state:s},t){s.sortBy!==t||!1===s.sortDesc?e("setSortDesc",!0):e("setSortDesc",!1),e("setSortBy",t)}}},ns=r({name:"UserPage",components:{UserCard:_,UserInfo:X,UserPageFilters:es},computed:o(o({},l("users",["pagination"])),b("users",["paginatedUsers","allUsers"])),watch:{paginatedUsers(){this.$store.dispatch("users/updatePaginationMaxPages")}},beforeCreate(){this.$store.hasModule("users")||this.$store.registerModule("users",ls)},async created(){const e=await this.$http.initialRequest("/users/query");if(!this.$http.isError(e)){this.$store.commit("users/setUsers",e.users);const s=this.$route.query.id;if(s){this.allUsers.findIndex((e=>e.id==s))>=0&&(this.$store.commit("users/setSelectedUserId",s),this.$bs.showModal("extendedInfo"))}}},methods:{showOlder(){this.$store.commit("users/increasePaginationPage")},showNewer(){this.$store.commit("users/decreasePaginationPage")}}});const ds={class:"container card card-body py-3"},cs=["disabled"],ps=[m("i",{class:"fas fa-angle-up me-1"},null,-1),g(" show newer "),m("i",{class:"fas fa-angle-up ms-1"},null,-1)],us={class:"small text-center mx-auto"},ms=["disabled"],hs=[m("i",{class:"fas fa-angle-down me-1"},null,-1),g(" show older "),m("i",{class:"fas fa-angle-down ms-1"},null,-1)];ns.render=function(e,s,t,a,i,o){const r=c("user-page-filters"),l=c("user-card"),n=c("user-info");return p(),u("div",null,[h(r),m("div",ds,[m("button",{disabled:1==e.pagination.page,class:"btn btn-sm btn-primary mx-auto my-2 d-block",type:"button",onClick:s[0]||(s[0]=(...s)=>e.showNewer&&e.showNewer(...s))},ps,8,cs),m("div",null,[h(F,{name:"list",tag:"div",class:"row px-3"},{default:x((()=>[(p(!0),u(M,null,w(e.paginatedUsers,(e=>(p(),v(l,{key:e.id,user:e},null,8,["user"])))),128))])),_:1}),m("div",us,f(0===e.paginatedUsers.length?"0":e.pagination.page)+" of "+f(e.pagination.maxPages),1),m("button",{disabled:e.pagination.page>=e.pagination.maxPages,class:"btn btn-sm btn-primary mx-auto my-2 d-block",type:"button",onClick:s[1]||(s[1]=(...s)=>e.showOlder&&e.showOlder(...s))},hs,8,ms)])]),h(n)])};export{ns as default};
