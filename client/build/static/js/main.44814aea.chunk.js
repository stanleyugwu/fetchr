(this.webpackJsonpfetchr=this.webpackJsonpfetchr||[]).push([[0],[,,,,,,,,,function(e,t){},,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(1),i=a.n(c),n=a(8),r=a.n(n),l=(a(16),a(17),a(18),a.p+"static/media/logo.ff41eedb.svg");function o(e){return Object(s.jsx)("header",{className:"header",id:"header",children:Object(s.jsx)("div",{className:"logo",children:Object(s.jsx)("img",{src:l,alt:"site-logo"})})})}var d=a(10),h=a(3),j=a(4),b=a(2),u=a(6),m=a(5),O=(a(19),a.p+"static/media/search-error-image.bbee82b5.svg");function x(e){return Object(s.jsxs)("div",{className:"error-pane",children:[Object(s.jsx)("div",{className:"error-image",children:Object(s.jsx)("img",{src:O,alt:"error-icon"})}),Object(s.jsxs)("div",{className:"error-text",children:[Object(s.jsx)("h3",{className:"error-title",children:"Network Error!!"}),Object(s.jsx)("p",{className:"error-body",children:"Couldn\u2019f fetch results due to some network issues. please make sure you\u2019re connected to internet..."}),Object(s.jsx)("div",{className:"retry-cta",children:Object(s.jsxs)("button",{onClick:function(t){t.preventDefault(),e.retryFunc(t)},children:[Object(s.jsx)("i",{className:"mdi mdi-refresh"})," Try Again"]})})]})]})}a(20);function v(e){return Object(s.jsxs)("div",{className:"loader-wrapper_"+e.size,children:[Object(s.jsxs)("div",{className:"loader",children:[Object(s.jsx)("div",{className:"circle"}),Object(s.jsx)("div",{className:"circle"}),Object(s.jsx)("div",{className:"circle"})]}),"v-small"!==e.size&&Object(s.jsx)("p",{children:e.progress})]})}a(21);function g(e){var t=e.resultData,a=!!t.imageBlob,c=t.imageBlob?"data:".concat(t.imageBlob.type,";base64,").concat(t.imageBlob.data):t.imageSrc,i=a&&URL.createObjectURL(new Blob([t.imageBlob.data],{type:"text/plain"}));return Object(s.jsxs)("div",{className:"result image-result",children:[Object(s.jsx)("div",{className:"img-wrap",children:Object(s.jsx)("img",{src:c,alt:t.caption})}),Object(s.jsxs)("div",{className:"img-cover",children:[a&&Object(s.jsxs)("div",{children:[Object(s.jsx)("a",{href:c,download:t.caption,children:Object(s.jsxs)("button",{children:[Object(s.jsx)("i",{className:"mdi mdi-cloud-download"})," Download Image"]})}),Object(s.jsx)("a",{href:i,download:t.caption+" (RAW BASE64)",children:Object(s.jsxs)("button",{children:[Object(s.jsx)("i",{className:"mdi mdi-cloud-download"})," Download Binary"]})})]}),Object(s.jsx)("a",{href:t.imageSrc,target:"_blank",rel:"noreferrer",children:Object(s.jsxs)("button",{children:[Object(s.jsx)("i",{className:"mdi mdi-web"})," Visit Site"]})})]})]})}var p=a(9),f=a.n(p),y=(a(22),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={collapsed:!1},s}return Object(j.a)(a,[{key:"render",value:function(){var e=this,t=this.props.setData,a=this.state.collapsed?"none":"block";return Object(s.jsxs)("div",{className:"result-set",children:[Object(s.jsxs)("div",{className:"set-info",children:[Object(s.jsxs)("div",{className:"two-wrap",children:[Object(s.jsx)("div",{className:"search-count",children:t.searchCount}),Object(s.jsxs)("div",{className:"search-query",children:[t.searchType,' for "',t.searchTerm,'"']})]}),Object(s.jsxs)("div",{className:"search-time",children:[this.state.collapsed?Object(s.jsx)("div",{className:"collapse-btn",onClick:function(t){e.setState({collapsed:!1})},children:Object(s.jsx)("i",{className:"mdi mdi-menu-down"})}):Object(s.jsx)("div",{className:"collapse-btn",onClick:function(t){e.setState({collapsed:!0})},children:Object(s.jsx)("i",{className:"mdi mdi-menu-up"})}),Object(s.jsx)("div",{children:new Date(t.timeStamp).toLocaleTimeString()})]})]}),Object(s.jsx)("div",{className:"media-results",style:{display:a},children:"image"===t.mediaType?t.data.map((function(e,t){return Object(s.jsx)(g,{resultData:e},t)})):t.data.map((function(e,t){return Object(s.jsx)(f.a,{resultData:e},t)}))})]})}}]),a}(i.a.Component)),N=(a(23),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).handleQueryEntry=s.handleQueryEntry.bind(Object(b.a)(s)),s.handlePageEntry=s.handlePageEntry.bind(Object(b.a)(s)),s.handleQtyEntry=s.handleQtyEntry.bind(Object(b.a)(s)),s.handleSearch=s.handleSearch.bind(Object(b.a)(s)),s.imageSearch=s.imageSearch.bind(Object(b.a)(s)),s.videoSearch=s.videoSearch.bind(Object(b.a)(s)),s.state={activeBtn:1,searchMode:"Image",searchQuery:"",pageNumber:"",quantity:1,loading:!1,loadState:"Searching ",searchFailed:!1,searchResults:[],searchCount:0},s}return Object(j.a)(a,[{key:"changeSearchMode",value:function(e){var t="image"===e.toLowerCase()?1:2;this.state.loading||this.setState({searchMode:e,activeBtn:t})}},{key:"handleQueryEntry",value:function(e){var t=e.target.value;this.setState({searchQuery:t.startsWith(" ")?t.trim():t})}},{key:"handlePageEntry",value:function(e){var t=Number(e.target.value),a=!!Number(t)&&t>0&&t<=100;this.setState((function(e){return{pageNumber:a?t:t>100?e.pageNumber:""}}))}},{key:"handleQtyEntry",value:function(e){this.setState({quantity:Number(e.target.value)})}},{key:"handleSearch",value:function(e){e.preventDefault(),"Image"===this.state.searchMode?this.imageSearch(e):this.videoSearch(e)}},{key:"imageSearch",value:function(e){var t=this;this.setState({loading:!0,searchFailed:!1});var a=Date.now(),s=this.state,c=s.searchQuery,i=s.pageNumber,n=s.quantity;fetch("/imageSearch/".concat(c,"?offset=").concat(i,"&num=").concat(n,"&getbinary=true"),{method:"GET"}).then((function(e){return t.setState({loadState:"Loading "}),e.json()})).then((function(s){t.setState((function(e){return{searchCount:++e.searchCount}}));var c={searchType:"Image Search",mediaType:"image",timeStamp:a,searchTerm:t.state.searchQuery,searchCount:t.state.searchCount,data:s};t.setState((function(e){return{loading:!1,searchQuery:"",pageNumber:"",quantity:1,loadState:"Searching ",searchFailed:!1,searchResults:[c].concat(Object(d.a)(e.searchResults))}})),"submit"===e.type&&e.target.reset()})).catch((function(e){console.log(e),t.setState({loading:!1,searchFailed:!0})}))}},{key:"videoSearch",value:function(e){alert("Hey!, Hope you're enjoying the app. video search feature would be arriving soon...")}},{key:"render",value:function(){var e=this;return Object(s.jsxs)("main",{className:"main-body",children:[Object(s.jsxs)("div",{className:"search-pane",children:[Object(s.jsxs)("div",{className:"search-mode-toggler",children:[Object(s.jsx)("button",{className:1===this.state.activeBtn?"toggl-btn image active":"toggl-btn image",onClick:this.changeSearchMode.bind(this,"Image"),children:"Image Search"}),Object(s.jsx)("button",{className:2===this.state.activeBtn?"toggl-btn video active":"toggl-btn video",onClick:this.changeSearchMode.bind(this,"Video"),children:"Video Search"})]}),Object(s.jsxs)("form",{id:"search-form",onSubmit:this.handleSearch,disabled:!!this.state.loading,children:[Object(s.jsx)("div",{className:"text-block",children:Object(s.jsxs)("label",{className:"boxLabel",htmlFor:"searchbox",children:[Object(s.jsx)("div",{className:"searchbox-wrapper",children:Object(s.jsx)("input",{id:"searchbox",type:"search",tabIndex:"1",required:!0,onChange:this.handleQueryEntry,value:this.state.searchQuery,placeholder:"Search For "+this.state.searchMode})}),Object(s.jsx)("div",{className:"searchbtn-wrapper",children:Object(s.jsx)("button",{className:"searchbtn",disabled:this.state.loading,tabIndex:"2",type:"submit",children:this.state.loading?Object(s.jsx)(v,{size:"v-small"}):Object(s.jsx)("i",{className:"mdi mdi-magnify"})})})]})}),Object(s.jsxs)("div",{className:"options-block",children:[Object(s.jsx)("div",{className:"field pagination",children:Object(s.jsx)("input",{type:"number",min:"1",max:"100",placeholder:"PAGE",onChange:this.handlePageEntry,value:this.state.pageNumber})}),Object(s.jsxs)("select",{className:"field quantity",ref:this.state.select,onChange:this.handleQtyEntry,children:[Object(s.jsx)("option",{value:"1",children:"QTY"}),Object(s.jsx)("option",{value:"1",children:"\u20021"}),Object(s.jsx)("option",{value:"2",children:"\u20022"}),Object(s.jsx)("option",{value:"3",children:"\u20023"}),Object(s.jsx)("option",{value:"4",children:"\u20024"}),Object(s.jsx)("option",{value:"5",children:"\u20025"}),Object(s.jsx)("option",{value:"6",children:"\u20026"}),Object(s.jsx)("option",{value:"7",children:"\u20027"}),Object(s.jsx)("option",{value:"8",children:"\u20028"}),Object(s.jsx)("option",{value:"9",children:"\u20029"}),Object(s.jsx)("option",{value:"10",children:"\u200210"})]}),Object(s.jsx)("select",{className:"field format",disabled:!0,children:Object(s.jsx)("option",{value:"FORMAT",children:"FORMAT"})}),Object(s.jsx)("select",{className:"field language",disabled:!0,children:Object(s.jsx)("option",{value:"LANG",children:"LANG"})})]})]})]}),Object(s.jsxs)("div",{className:"results-wrapper",children:[this.state.searchResults.length>0&&Object(s.jsx)("div",{className:"title-txt",children:Object(s.jsx)("div",{className:"lefter",children:Object(s.jsx)("p",{children:"SEARCH RESULTS"})})}),this.state.loading&&Object(s.jsxs)("button",{className:"cancel-search",onClick:function(){e.setState({loading:!1})},children:["Cancel ",Object(s.jsx)("i",{className:"mdi mdi-window-close"})]}),this.state.searchFailed&&Object(s.jsx)(x,{retryFunc:this.handleSearch}),this.state.loading&&Object(s.jsx)(v,{progress:this.state.loadState+this.state.searchMode+"s",size:"normal"}),Object(s.jsx)("div",{className:"results-inner",children:this.state.searchResults.map((function(e,t){return Object(s.jsx)(y,{setData:e},t)}))})]})]})}}]),a}(i.a.Component));a(24);function S(e){return Object(s.jsx)("footer",{className:"footer",children:Object(s.jsxs)("p",{className:"devvie",children:["Made With ",Object(s.jsx)("span",{className:"mdi mdi-heart"})," By Stanley"]})})}var w=function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(o,{}),Object(s.jsx)(N,{}),Object(s.jsx)(S,{})]})},k=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,26)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,i=t.getLCP,n=t.getTTFB;a(e),s(e),c(e),i(e),n(e)}))};console.log("App is Running..."),r.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(w,{})}),document.getElementById("root")),k()}],[[25,1,2]]]);
//# sourceMappingURL=main.44814aea.chunk.js.map