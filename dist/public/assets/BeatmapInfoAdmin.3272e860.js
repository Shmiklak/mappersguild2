import{_ as t}from"./ModalDialog.4a9168b4.js";import{_ as a}from"./index.b6199a6d.js";import{d as e,h as s,o,s as d,w as i,b as n,t as p,j as r,f as m,l,v as u,g as c,F as b,H as h,e as k,k as f}from"./vendor.b9ef672a.js";var y=e({name:"BeatmapInfoAdmin",components:{ModalDialog:t,ModesIcons:a},props:{beatmap:{type:Object,required:!0}},data(){return{status:this.beatmap.status,taskId:null,modderId:null,beatmapUrl:this.beatmap.url,storyboardQuality:null,storyboardTaskId:null,packId:this.beatmap.packId,rejectionInput:""}},computed:{sortedTasks(){const t=["Easy","Normal","Hard","Insane","Expert","Storyboard"];return[...this.beatmap.tasks].sort((function(a,e){return t.indexOf(a.name)-t.indexOf(e.name)}))}},watch:{beatmap(){this.findBeatmapInfo()}},mounted(){this.findBeatmapInfo()},methods:{findBeatmapInfo(){this.status=this.beatmap.status,this.taskId=null,this.modderId=null,this.beatmapUrl=this.beatmap.url,this.storyboardQuality=null,this.storyboardTaskId=null,this.packId=this.beatmap.packId,this.beatmap.tasks.forEach((t=>{"Storyboard"==t.name&&(t.sbQuality&&(this.storyboardQuality=t.sbQuality),this.storyboardTaskId=t.id)})),this.rejectionInput=""},findTaskInfo(t){let a=`${t.name} --- `;return a+=t.mappers.map((t=>t.username)).join(", "),"Storyboard"==t.name&&(a+=` --- ${t.sbQuality}`),a},async updateBeatmapStatus(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updateStatus`,{status:this.status},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"updated beatmap status",type:"info"}),this.$store.commit("updateBeatmapStatus",{beatmapId:this.beatmap.id,status:a}))},async deleteTask(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/tasks/${this.taskId}/delete`,{},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"deleted task",type:"info"}),this.$store.commit("deleteTask",{beatmapId:this.beatmap.id,taskId:this.taskId}))},async deleteModder(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/modders/${this.modderId}/delete`,{},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"deleted modder",type:"info"}),this.$store.commit("deleteModder",{beatmapId:this.beatmap.id,modderId:this.modderId}))},async updateUrl(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updateUrl`,{url:this.beatmapUrl},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"updated URL",type:"info"}),this.$store.commit("updateUrl",{beatmapId:this.beatmap.id,url:a}))},async updateStoryboardQuality(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updateStoryboardQuality`,{storyboardQuality:this.storyboardQuality,taskId:this.storyboardTaskId},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"updated storyboard quality",type:"info"}),this.$store.commit("updateStoryboardQuality",{beatmapId:this.beatmap.id,taskId:this.storyboardTaskId,task:a}))},async updatePackId(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updatePackId`,{packId:this.packId},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:"updated pack id",type:"info"}),this.$store.commit("updatePackId",{beatmapId:this.beatmap.id,packId:a}))},async updateIsShowcase(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updateIsShowcase`,{isShowcase:!this.beatmap.isShowcase},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:`updated isShowcase: ${a}`,type:"info"}),this.$store.commit("updateIsShowcase",{beatmapId:this.beatmap.id,isShowcase:a}))},async updateQueuedForRank(t){const a=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/updateQueuedForRank`,{queuedForRank:!this.beatmap.queuedForRank},t);this.$http.isError(a)||(this.$store.dispatch("updateToastMessages",{message:`updated queuedForRank: ${a}`,type:"info"}),this.$store.commit("updateQueuedForRank",{beatmapId:this.beatmap.id,queuedForRank:a}))},async rejectMapset(t,a){if(confirm("Are you sure? THIS ONLY WORKS LOCALLY I DON'T KNOW WHY")){const e=await this.$http.executePost(`/admin/beatmaps/${this.beatmap.id}/rejectMapset`,{messages:this.rejectionInput,isResolvable:a},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"updated beatmap status",type:"info"}),this.$store.commit("updateBeatmapStatus",{beatmapId:this.beatmap.id,status:e}))}}}});const I=["href"],$={key:1},w=f(" | "),g={class:"container"},S={class:"row"},T=[m("option",{value:"WIP"}," WIP ",-1),m("option",{value:"Done"}," Done ",-1),m("option",{value:"Qualified"}," Qualified ",-1),m("option",{value:"Ranked"}," Ranked ",-1)],x={class:"row"},Q=["value"],v={class:"row"},M=["value"],R={class:"row"},U={key:0,class:"row"},j=[m("option",{value:"1"}," 1 ",-1),m("option",{value:"2"}," 2 ",-1),m("option",{value:"3"}," 3 ",-1)],P={class:"row"},E={class:"row"},C={class:"col-sm-6"},F=f(" Featured Artist showcase: "),B={class:"text-danger me-2"},O={key:1},q={class:"row"},D={class:"col-sm-6"},V=f(" Queued for rank: "),L={class:"text-danger me-2"},W={class:"row"};y.render=function(t,a,e,f,y,H){const _=s("user-link"),A=s("modes-icons"),N=s("modal-dialog");return o(),d(N,{id:"editBeatmap",loaded:Boolean(t.beatmap)},{header:i((()=>[t.beatmap.url?(o(),n("a",{key:0,href:t.beatmap.url,target:"_blank"},p(t.beatmap.song.artist)+" - "+p(t.beatmap.song.title),9,I)):(o(),n("span",$,p(t.beatmap.song.artist)+" - "+p(t.beatmap.song.title),1)),w,r(_,{class:"me-1",user:t.beatmap.host},null,8,["user"]),r(A,{modes:[t.beatmap.mode]},null,8,["modes"])])),default:i((()=>[m("div",g,[m("p",S,[l(m("select",{"onUpdate:modelValue":a[0]||(a[0]=a=>t.status=a),class:"form-select form-select-sm w-50 mx-2"},T,512),[[u,t.status]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:a[1]||(a[1]=a=>t.updateBeatmapStatus(a))}," Save status ")]),m("p",x,[l(m("select",{"onUpdate:modelValue":a[2]||(a[2]=a=>t.taskId=a),class:"form-select form-select-sm w-50 mx-2"},[(o(!0),n(b,null,c(t.sortedTasks,(a=>(o(),n("option",{key:a.id,value:a.id},p(t.findTaskInfo(a)),9,Q)))),128))],512),[[u,t.taskId]]),m("button",{class:"btn btn-sm btn-outline-danger w-25",onClick:a[3]||(a[3]=a=>t.deleteTask(a))}," Remove difficulty ")]),m("p",v,[l(m("select",{"onUpdate:modelValue":a[4]||(a[4]=a=>t.modderId=a),class:"form-select form-select-sm w-50 mx-2"},[(o(!0),n(b,null,c(t.beatmap.modders,(t=>(o(),n("option",{key:t.id,value:t.id},p(t.username),9,M)))),128))],512),[[u,t.modderId]]),m("button",{class:"btn btn-sm btn-outline-danger w-25",onClick:a[5]||(a[5]=a=>t.deleteModder(a))}," Remove modder ")]),m("p",R,[l(m("input",{"onUpdate:modelValue":a[6]||(a[6]=a=>t.beatmapUrl=a),class:"form-control form-control-sm mx-2 w-50",type:"text",autocomplete:"off",placeholder:"beatmap url..."},null,512),[[h,t.beatmapUrl]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:a[7]||(a[7]=a=>t.updateUrl(a))}," Save URL ")]),t.storyboardTaskId?(o(),n("p",U,[l(m("select",{"onUpdate:modelValue":a[8]||(a[8]=a=>t.storyboardQuality=a),class:"form-select form-select-sm w-50 mx-2"},j,512),[[u,t.storyboardQuality]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:a[9]||(a[9]=a=>t.updateStoryboardQuality(a))}," Save Storyboard Quality ")])):k("",!0),m("p",P,[l(m("input",{"onUpdate:modelValue":a[10]||(a[10]=a=>t.packId=a),class:"form-control form-control-sm mx-2 w-50",type:"text",autocomplete:"off",placeholder:"osu! beatmap pack ID..."},null,512),[[h,t.packId]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:a[11]||(a[11]=a=>t.updatePackId(a))}," Save pack ID ")]),m("p",E,[m("span",C,[F,m("span",B,p(t.beatmap.isShowcase?"true":"false"),1)]),m("button",{class:"btn btn-sm btn-outline-info ms-3 w-25",onClick:a[12]||(a[12]=a=>t.updateIsShowcase(a))}," Toggle ")]),"Qualified"==t.beatmap.status?(o(),n("span",O,[m("p",q,[m("span",D,[V,m("span",L,p(t.beatmap.queuedForRank?"true":"false"),1)]),m("button",{class:"btn btn-sm btn-outline-info ms-3 w-25",onClick:a[13]||(a[13]=a=>t.updateQueuedForRank(a))}," Toggle ")]),m("p",W,[l(m("textarea",{"onUpdate:modelValue":a[14]||(a[14]=a=>t.rejectionInput=a),class:"form-control form-control-sm w-25",type:"text",autocomplete:"off",placeholder:"messages separated by new lines..."},null,512),[[h,t.rejectionInput]]),m("button",{class:"btn btn-sm btn-outline-info ms-2 w-25",onClick:a[15]||(a[15]=a=>t.rejectMapset(a,!0))}," Reject with resolution option "),m("button",{class:"btn btn-sm btn-outline-danger ms-2 w-25",onClick:a[16]||(a[16]=a=>t.rejectMapset(a,!1))}," Reject WITHOUT resolution ")])])):k("",!0)])])),_:1},8,["loaded"])};export{y as _};
