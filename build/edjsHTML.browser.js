var edjsHTML=function(){"use strict";var e=["left","right","center","justify"],t={delimiter:function(){return"<br/>"},header:function(e){var t=e.data;return"<h"+t.level+">"+t.text+"</h"+t.level+">"},paragraph:function(t){var r=t.data,i=r.alignment||r.align;return void 0!==i&&e.includes(i)?'<p style="text-align:'+i+';">'+r.text+"</p>":"<p>"+r.text+"</p>"},list:function(e){var t=e.data,r="unordered"===t.style?"ul":"ol",i=function(e,t){var r=e.map((function(e){if(!e.content&&!e.items)return"<li>"+e+"</li>";var r="";return e.items&&(r=i(e.items,t)),e.content?"<li> "+e.content+" </li>"+r:void 0}));return"<"+t+">"+r.join("")+"</"+t+">"};return i(t.items,r)},image:function(e){var t=e.data,r=t.caption?t.caption:"Image";return'<img src="'+(t.file&&t.file.url?t.file.url:t.url)+'" alt="'+r+'" />'},quote:function(e){var t=e.data;return"<blockquote>"+t.text+"</blockquote> - "+t.caption},code:function(e){return"<pre><code>"+e.data.code+"</code></pre>"},embed:function(e){var t,r=e.data;switch(r.service){case"t.me":var i=null===(t=r.embed)||void 0===t?void 0:t.match(/^https?:\/\/t\.me\/(\w+)\/(\d+?.*)?$/);return"<div><script async='' src='https://telegram.org/js/telegram-widget.js?21' data-telegram-post='"+(i?i[1]+"/"+i[2]:r.embed)+"' data-width='100%'><\/script><iframe src=\""+r.embed+"\" width='600' height='600' style='margin: 0 auto;' frameborder='0' scrolling='no' allowtransparency='true'></iframe></div>";case"twitter":case"x.com":return'<iframe width="'+r.width+'" src="'+r.embed+'" style="min-height: 630px; max-height: 1000px;" frameborder="0"></iframe>';case"instagram":return'<iframe width="'+r.width+'" src="'+r.embed+'" style="width: 100%; min-height: 630px; max-height: 1000px;" frameborder="0"></iframe>';case"facebook":return'<iframe width="500" src="'+r.embed+'" style="min-height: 500px; max-height: 1000px;" frameborder="0"></iframe>';case"youtube":return'<iframe width="'+r.width+'" height="'+r.height+'" src="'+r.embed+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';default:throw new Error("Only Youtube, Twitter, X.com, Instagram, Facebook Embeds are supported right now.")}}};function r(e){return new Error('[31m The Parser function of type "'+e+'" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m')}var i=function(e){void 0===e&&(e={});var n=Object.assign({},t,e);return{parse:function(e){return e.blocks.map((function(e){return n[e.type]?n[e.type](e):r(e.type)}))},parseBlock:function(e){return n[e.type]?n[e.type](e):r(e.type)},parseStrict:function(e){var t=e.blocks,a=i(n).validate({blocks:t});if(a.length)throw new Error("Parser Functions missing for blocks: "+a.toString());for(var o=[],c=0;c<t.length;c++){if(!n[t[c].type])throw r(t[c].type);o.push(n[t[c].type](t[c]))}return o},validate:function(e){var t=e.blocks.map((function(e){return e.type})).filter((function(e,t,r){return r.indexOf(e)===t})),r=Object.keys(n);return t.filter((function(e){return!r.includes(e)}))}}};return i}();
