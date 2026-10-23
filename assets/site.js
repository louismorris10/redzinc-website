(function(){
  // mobile menu
  var btn=document.querySelector(".menu-btn"),nav=document.getElementById("mainnav");
  if(btn&&nav){btn.addEventListener("click",function(){var s=nav.classList.toggle("show");btn.setAttribute("aria-expanded",s?"true":"false");});}
  // dropdowns (click/keyboard)
  document.querySelectorAll("nav.main li.has-sub>button").forEach(function(b){
    b.addEventListener("click",function(e){
      var li=b.parentNode,o=li.classList.toggle("open");
      b.setAttribute("aria-expanded",o?"true":"false");
      document.querySelectorAll("nav.main li.open").forEach(function(x){if(x!==li){x.classList.remove("open");x.firstElementChild.setAttribute("aria-expanded","false");}});
      e.stopPropagation();
    });
  });
  document.addEventListener("click",function(){document.querySelectorAll("nav.main li.open").forEach(function(x){x.classList.remove("open");x.firstElementChild.setAttribute("aria-expanded","false");});});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){document.querySelectorAll("nav.main li.open").forEach(function(x){x.classList.remove("open");});}});

  // ECG demo (home)
  var path=document.getElementById("ecgPath");
  if(path){
    var beat=function(x){return "L"+(x+14)+" 30 Q"+(x+20)+" 22 "+(x+26)+" 30 L"+(x+40)+" 30 L"+(x+44)+" 36 L"+(x+49)+" 4 L"+(x+54)+" 48 L"+(x+58)+" 30 L"+(x+72)+" 30 Q"+(x+82)+" 18 "+(x+92)+" 30 L"+(x+120)+" 30 ";};
    var d="M0 30 ";for(var x=0;x<2400;x+=120){d+=beat(x);}path.setAttribute("d",d);
    var data=[{hr:72,spo:"97",bp:"124/78",t:"36.8",review:false,beat:"6s",flag:[]},
              {hr:88,spo:"94",bp:"131/84",t:"36.9",review:false,beat:"4.8s",flag:[]},
              {hr:112,spo:"90",bp:"138/90",t:"37.9",review:true,beat:"3.4s",flag:["spo","t"]}];
    var btns=document.querySelectorAll(".patient"),trace=document.getElementById("trace");
    btns.forEach(function(b){b.addEventListener("click",function(){
      var p=data[+b.dataset.i];
      btns.forEach(function(o){o.setAttribute("aria-pressed",o===b?"true":"false");});
      document.getElementById("v-hr").textContent=p.hr;
      document.getElementById("v-spo").textContent=p.spo;
      document.getElementById("v-bp").textContent=p.bp;
      document.getElementById("v-t").textContent=p.t;
      ["spo","t"].forEach(function(k){document.getElementById("v-"+k).parentNode.classList.toggle("flag",p.flag.indexOf(k)>-1);});
      document.getElementById("v-hr").parentNode.classList.toggle("flag",p.review);
      trace.classList.toggle("review",p.review);
      trace.querySelector("svg").style.setProperty("--beat",p.beat);
    });});
  }

  // audience tabs
  var tabs=Array.prototype.slice.call(document.querySelectorAll(".tab"));
  if(tabs.length){
    var select=function(i){tabs.forEach(function(t,j){var on=i===j;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;document.getElementById("p"+j).hidden=!on;});};
    tabs.forEach(function(t,i){
      t.addEventListener("click",function(){select(i);});
      t.addEventListener("keydown",function(e){
        var n=null;
        if(e.key==="ArrowDown"||e.key==="ArrowRight")n=(i+1)%tabs.length;
        if(e.key==="ArrowUp"||e.key==="ArrowLeft")n=(i-1+tabs.length)%tabs.length;
        if(n!==null){e.preventDefault();select(n);tabs[n].focus();}
      });
    });
  }
})();
