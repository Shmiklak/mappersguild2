var t=Object.defineProperty,e=Object.defineProperties,s=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,d=(e,s,a)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a;import{d as r,i as n,o as u,u as l,w as c,b as p,t as f,l as h,f as m,q as g,O as A,J as b,g as y,F as S,j as I,e as $,m as w}from"./vendor.8b5721c7.js";import{_ as v}from"./ModalDialog.2c18b0dc.js";import{C as x}from"./CopyPaste.7cb4b414.js";import{_ as k}from"./DataTable.63fe7b68.js";var O=r({name:"FeaturedArtistInfo",components:{ModalDialog:v},props:{featuredArtist:{type:Object,default:null}},data:()=>({osuId:0,name:"",status:"",selectedSong:null,artist:"",title:""}),computed:{alphabeticalSongs(){return[...this.featuredArtist.songs].sort(((t,e)=>t.title.toLowerCase()>e.title.toLowerCase()?1:e.title.toLowerCase()>t.title.toLowerCase()?-1:0))}},watch:{featuredArtist(){this.osuId=this.featuredArtist.osuId,this.name=this.featuredArtist.label,this.status=this.featuredArtist.status,this.title=""},selectedSong(){this.selectedSong&&(this.artist=this.selectedSong.artist,this.title=this.selectedSong.title)}},methods:{async updateOsuId(t){const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/updateOsuId`,{osuId:this.osuId},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"updated osu id",type:"info"}),this.$store.commit("updateOsuId",{featuredArtistId:this.featuredArtist.id,osuId:e})),await this.$http.executePost("/artists/toggleIsUpToDate/"+this.featuredArtist.id,{value:!0})},async updateName(t){const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/updateName`,{name:this.name},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"updated name",type:"info"}),this.$store.commit("updateName",{featuredArtistId:this.featuredArtist.id,name:e}))},async updateStatus(t){const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/updateStatus`,{status:this.status},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"updated status",type:"info"}),this.$store.commit("updateStatus",{featuredArtistId:this.featuredArtist.id,status:e}))},async addSong(t){const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/songs/create`,{artist:this.artist,title:this.title},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"added song",type:"info"}),this.$store.commit("addSong",{featuredArtistId:this.featuredArtist.id,song:e}))},async editSong(t){if(!this.selectedSong)return void this.$store.dispatch("updateToastMessages",{message:"Select a song"});const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/songs/${this.selectedSong.id}/update`,{artist:this.artist,title:this.title},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"updated song",type:"info"}),this.$store.commit("updateSong",{featuredArtistId:this.featuredArtist.id,song:e}))},async deleteSong(t){if(!this.selectedSong)return void this.$store.dispatch("updateToastMessages",{message:"Select a song"});const e=await this.$http.executePost(`/admin/featuredArtists/${this.featuredArtist.id}/songs/${this.selectedSong.id}/delete`,{},t);this.$http.isError(e)||(this.$store.dispatch("updateToastMessages",{message:"deleted song",type:"info"}),this.$store.commit("deleteSong",{featuredArtistId:this.featuredArtist.id,songId:this.selectedSong.id}))}}});const P=["href"],C={key:1},M={class:"container"},j={class:"row"},T={class:"row"},F={class:"row"},L=[m("option",{value:"public"}," Public ",-1),m("option",{value:"private"}," Private ",-1),m("option",{value:"showcase"}," Showcase ",-1)],E=m("hr",null,null,-1),U={class:"row"},D=["value"],_={class:"row"},R={class:"row"};O.render=function(t,e,s,a,i,o){const d=n("modal-dialog");return u(),l(d,{id:"edit",loaded:Boolean(t.featuredArtist)},{header:c((()=>[t.featuredArtist.osuId?(u(),p("a",{key:0,href:"https://osu.ppy.sh/beatmaps/artists/"+t.featuredArtist.osuId,target:"_blank"},f(t.featuredArtist.label),9,P)):(u(),p("span",C,f(t.featuredArtist.label),1)),h(" ("+f(t.featuredArtist.songs.length)+") ",1)])),default:c((()=>[m("div",M,[m("p",j,[g(m("input",{"onUpdate:modelValue":e[0]||(e[0]=e=>t.osuId=e),class:"form-control form-control-sm mx-2 w-50",type:"text",autocomplete:"off",placeholder:"osu id..."},null,512),[[A,t.osuId]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:e[1]||(e[1]=e=>t.updateOsuId(e))}," Save osu! ID ")]),m("p",T,[g(m("input",{"onUpdate:modelValue":e[2]||(e[2]=e=>t.name=e),class:"form-control form-control-sm mx-2 w-50",type:"text",autocomplete:"off",placeholder:"artist name..."},null,512),[[A,t.name]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:e[3]||(e[3]=e=>t.updateName(e))}," Save name ")]),m("p",F,[g(m("select",{"onUpdate:modelValue":e[4]||(e[4]=e=>t.status=e),class:"form-select form-select-sm w-50 mx-2"},L,512),[[b,t.status]]),m("button",{class:"btn btn-sm btn-outline-info w-25",onClick:e[5]||(e[5]=e=>t.updateStatus(e))}," Save status ")]),E,m("p",U,[g(m("select",{id:"editSongSelection","onUpdate:modelValue":e[6]||(e[6]=e=>t.selectedSong=e),class:"form-select form-select-sm"},[(u(!0),p(S,null,y(t.alphabeticalSongs,(t=>(u(),p("option",{key:t.id,value:t},f(t.title)+" --- ("+f(t.artist)+") ",9,D)))),128))],512),[[b,t.selectedSong]])]),m("p",_,[g(m("input",{"onUpdate:modelValue":e[7]||(e[7]=e=>t.artist=e),class:"form-control form-control-sm mx-2 w-75",type:"text",autocomplete:"off",placeholder:"artist..."},null,512),[[A,t.artist]])]),m("p",R,[g(m("input",{"onUpdate:modelValue":e[8]||(e[8]=e=>t.title=e),class:"form-control form-control-sm mx-2 w-75",type:"text",autocomplete:"off",placeholder:"title..."},null,512),[[A,t.title]])]),m("p",null,[m("button",{class:"btn btn-sm btn-outline-info mx-1",onClick:e[9]||(e[9]=e=>t.addSong(e))}," Add song "),m("button",{class:"btn btn-sm btn-outline-info mx-1",onClick:e[10]||(e[10]=e=>t.editSong(e))}," Edit song "),m("button",{class:"btn btn-sm btn-outline-danger mx-1",onClick:e[11]||(e[11]=e=>t.deleteSong(e))}," Delete song ")])])])),_:1},8,["loaded"])};var V=r({name:"ShowcaseUserList",components:{CopyPaste:x},data:()=>({songs:[]}),methods:{async findRecentlyLicensedSongs(t){const e=await this.$http.executeGet("/admin/featuredArtists/findRecentlyLicensedSongs",t);e&&!e.error&&(this.songs=e.songs)}}});const N={class:"container card card-body py-1 my-2"},q={key:0};V.render=function(t,e,s,a,i,o){const d=n("copy-paste");return u(),p("div",N,[m("button",{class:"btn btn-sm w-50 btn-outline-info mb-3",onClick:e[0]||(e[0]=e=>t.findRecentlyLicensedSongs(e))}," Load recently licensed songs "),t.songs.length?(u(),p("div",q,[I(d,{distinct:"songs"},{default:c((()=>[(u(!0),p(S,null,y(t.songs,((t,e)=>(u(),p("div",{key:e},f(t.artist)+" - "+f(t.title),1)))),128))])),_:1})])):$("",!0)])};var B,G,J={state:{featuredArtists:[]},mutations:{setFeaturedArtists(t,e){t.featuredArtists=e},updateOsuId(t,e){const s=t.featuredArtists.find((t=>t.id==e.featuredArtistId));s&&(s.osuId=e.osuId)},updateName(t,e){const s=t.featuredArtists.find((t=>t.id==e.featuredArtistId));s&&(s.label=e.name)},addSong(t,e){const s=t.featuredArtists.find((t=>t.id==e.featuredArtistId));s&&s.songs.push(e.song)},updateSong(t,e){const s=t.featuredArtists.find((t=>t.id==e.featuredArtistId));if(s){const t=s.songs.findIndex((t=>t.id==e.song.id));-1!==t&&(s.songs[t]=e.song)}},deleteSong(t,e){const s=t.featuredArtists.find((t=>t.id==e.featuredArtistId));if(s){const t=s.songs.findIndex((t=>t.id==e.songId));-1!==t&&s.songs.splice(t,1)}}}},z=r({components:{DataTable:k,FeaturedArtistInfo:O,RecentLicensedSongs:V},data:()=>({selectedFeaturedArtistId:""}),computed:(B=((t,e)=>{for(var s in e||(e={}))i.call(e,s)&&d(t,s,e[s]);if(a)for(var s of a(e))o.call(e,s)&&d(t,s,e[s]);return t})({},w({featuredArtists:t=>t.artistsAdmin.featuredArtists})),G={selectedFeaturedArtist(){return this.featuredArtists.find((t=>t.id===this.selectedFeaturedArtistId))}},e(B,s(G))),beforeCreate(){this.$store.hasModule("artistsAdmin")||this.$store.registerModule("artistsAdmin",J)},unmounted(){this.$store.hasModule("artistsAdmin")&&this.$store.unregisterModule("artistsAdmin")},async created(){const t=await this.$http.initialRequest("/admin/featuredArtists/load");this.$http.isError(t)||this.$store.commit("setFeaturedArtists",t)}});const H={class:"container card card-body py-1"},K={class:"row"},Q={class:"col-sm"},W=["href"],X={key:1};z.render=function(t,e,s,a,i,o){const d=n("data-table"),r=n("recent-licensed-songs"),l=n("featured-artist-info");return u(),p("div",null,[m("div",H,[m("div",K,[m("div",Q,[I(d,{data:t.featuredArtists,headers:["ARTIST"],"onUpdate:selectedId":e[0]||(e[0]=e=>t.selectedFeaturedArtistId=e)},{default:c((({obj:t})=>[m("td",null,[t.osuId?(u(),p("a",{key:0,href:"https://osu.ppy.sh/beatmaps/artists/"+t.osuId,target:"_blank"},f(t.label),9,W)):(u(),p("span",X,f(t.label),1))])])),_:1},8,["data"])])])]),I(r),I(l,{"featured-artist":t.selectedFeaturedArtist},null,8,["featured-artist"])])};export{z as default};
