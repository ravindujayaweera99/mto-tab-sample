/* MTO Tab – single-page app (hash routing) */
(function(){
const $=id=>document.getElementById(id);
const RT=['#/notification?f=Admitted','#/notification?f=Discharged','#/notification','#/notification?f=Rejected','#/notification','#/notification','#/claim-payment'];
const C=[['New admission jobs',12,'Awaiting review','📋'],['New discharge jobs',8,'Ready for processing','⎋'],['Accepted jobs',24,'In the active queue','✔'],['Rejected jobs',3,'Review required','✖','alert'],['Re-assigned jobs',5,'Recently transferred','⇄'],['Complete jobs',46,'Processing complete','✅'],['Over payment claims',2,'Payment review required','💲','alert wide']];
function draw(anim){$('g').innerHTML=C.map((c,i)=>`<a class="c ${c[4]||''}" href="${RT[i]}" data-i="${i}" aria-label="${c[0]}: ${c[1]}"><span class="ic" aria-hidden="true">${c[3]}</span><div class="l">${c[0]}</div><div class="v" data-n="${c[1]}">${anim?'00':String(c[1]).padStart(2,'0')}</div><div class="h">${c[2]}</div></a>`).join('');
 if(anim)document.querySelectorAll('.v').forEach(e=>{const n=+e.dataset.n,t=performance.now();(function s(now){const k=Math.min(1,(now-t)/500);e.textContent=String(Math.round(n*k)).padStart(2,'0');if(k<1)requestAnimationFrame(s)})(t)})}

$('drf').onclick=()=>{draw(true);toast('Dashboard refreshed')};
function toast(m){const t=$('toast');t.textContent=m;t.className='s';setTimeout(()=>t.className='',2200)}

const h=new Date().getHours();$('hello').textContent=(h<12?'Good morning':h<17?'Good afternoon':'Good evening')+', Nimali — '+(C[3][1]+C[6][1])+' items need your attention.';
draw(true);
})();
(function(){
const $=id=>document.getElementById(id);
const base=[['Claim','268829','Dilshan Pushpakumara','Nawaloka Hospitals Plc','Today · 10:18'],['Admitted','268829','Dilshan Pushpakumara','Nawaloka Hospitals Plc','Today · 10:18'],['Discharged','268829','Dilshan Pushpakumara','Nawaloka Hospitals Plc','Today · 10:18'],['Discharged','268827','Dilshan Pushpakumara','New Philip Hospitals (Pvt) Ltd','Today · 09:36'],['Admitted','268827','Dilshan Pushpakumara','New Philip Hospitals (Pvt) Ltd','Today · 09:05'],['Rejected','268827','Dilshan Pushpakumara','New Philip Hospitals (Pvt) Ltd','Today · 09:05'],['Admitted','268827','Dilshan Pushpakumara','New Philip Hospitals (Pvt) Ltd','Today · 09:05'],['Discharged','268827','Dilshan Pushpakumara','New Philip Hospitals (Pvt) Ltd','Today · 09:05'],['Discharged','268822','M.S. Lakshan','Central Hospital Limited','Yesterday · 16:24'],['Discharged','268819','Wickramasinghe','Family Care Hospital (Pvt) Ltd','Yesterday · 11:12'],['Claim','268819','Wickramasinghe','Family Care Hospital (Pvt) Ltd','Yesterday · 11:12']];
const ty=['Admitted','Discharged','Claim','Rejected'],names=['Nuwan Perera','S. Fernando','K. Jayasuriya','A. Silva','R. Wijesinghe'],hs=['Asiri Central Hospital','Lanka Hospitals PLC','Durdans Hospital','Hemas Hospital'];
let D=base.map((x,i)=>({t:x[0],m:x[1],p:x[2],h:x[3],r:x[4],u:i<8}));
for(let i=0;i<29;i++)D.push({t:ty[i%4],m:String(268818-Math.floor(i/2)),p:names[i%5],h:hs[i%4],r:i<10?'Yesterday · '+String(15-(i>>1)).padStart(2,'0')+':'+(10+i*3)%60:(2+(i>>2))+' days ago',u:false});
const lbl={Admitted:'Admitted',Discharged:'Discharged',Claim:'Discharge',Rejected:'Rejected'};
let F='All',Q='',pg=1;const PS=10;
const fl=()=>D.filter(d=>(F=='All'||d.t==F)&&(!Q||(d.m+d.p+d.h).toLowerCase().includes(Q)));
function chips(){const c=t=>t=='All'?D.length:D.filter(d=>d.t==t).length,ls={All:'All',Admitted:'Admitted',Discharged:'Discharged',Claim:'Claim Reject',Rejected:'Rejected'};
$('chips').innerHTML=Object.keys(ls).map(t=>`<button class="chip ${F==t?'on':''}" role="tab" data-t="${t}">${ls[t]} (${c(t)})</button>`).join('')}
function draw(){const L=fl(),pc=Math.max(1,Math.ceil(L.length/PS));if(pg>pc)pg=pc;const s=(pg-1)*PS;
$('tb').innerHTML=L.slice(s,s+PS).map(d=>`<tr tabindex="0" class="${d.u?'':'read'}" data-m="${d.m}"><td class="c-n"><div class="n"><span class="st s-${d.t}">${lbl[d.t]}${d.t=='Claim'?' <small>(Claim Reject)</small>':''}</span><span class="mcn"><span class="dot"></span>MCN ${d.m}</span></div></td><td class="c-p pt">${d.p}</td><td class="c-h mu">${d.h}</td><td class="c-r rc">${d.r}</td><td class="c-x chev">›</td></tr>`).join('')||'<tr><td colspan=5 class="empty">No notifications match your search.</td></tr>';
let b='';for(let i=1;i<=pc;i++)b+=`<button class="${i==pg?'on':''}" data-p="${i}">${i}</button>`;
$('foot').innerHTML=`<span class="info">${L.length?s+1:0}–${Math.min(s+PS,L.length)} of ${L.length}</span><span class="sp"></span><button data-p="${pg-1}" ${pg==1?'disabled':''}>‹</button>${b}<button data-p="${pg+1}" ${pg==pc?'disabled':''}>Next ›</button>`;
$('bd').textContent=D.filter(d=>d.u).length;$('bd').style.display=D.some(d=>d.u)?'':'none';chips()}
$('chips').onclick=e=>{const t=e.target.dataset.t;if(t){F=t;pg=1;draw()}};
$('foot').onclick=e=>{const p=+e.target.dataset.p;if(p){pg=p;draw();window.scrollTo({top:0,behavior:'smooth'})}};
$('q').oninput=e=>{Q=e.target.value.trim().toLowerCase();pg=1;draw()};
$('mark').onclick=()=>{D.forEach(d=>d.u=false);draw();toast('All marked as read')};
function openRow(tr){const d=D.find(x=>x.m==tr.dataset.m);d.u=false;location.hash='#/claim-payment?mcn='+encodeURIComponent(d.m)+'&patient='+encodeURIComponent(d.p)+'&hospital='+encodeURIComponent(d.h)}
$('tb').onclick=e=>{const tr=e.target.closest('tr[data-m]');if(tr)openRow(tr)};
$('tb').onkeydown=e=>{if(e.key=='Enter'){const tr=e.target.closest('tr[data-m]');if(tr)openRow(tr)}};
function toast(m){const t=$('toast');t.textContent=m;t.className='s';setTimeout(()=>t.className='',2200)}

draw();

window.NotifApp={setFilter(f){F=f;pg=1;Q='';$('q').value='';draw()},refreshBadge:draw};
})();
(function(){
const $=id=>document.getElementById(id),f=n=>(+n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const num=id=>+$(id).value||0;
function toast(m){const t=$('toast');t.textContent=m;t.className='s';setTimeout(()=>t.className='',2600)}
document.querySelectorAll('.card>h2').forEach(h=>h.onclick=()=>h.parentNode.classList.toggle('c'));
$('tabs').onclick=e=>{if(e.target.tagName=='BUTTON'){[...$('tabs').children].forEach(b=>b.classList.remove('on'));e.target.classList.add('on')}};

// room
let rooms=[{t:'ICU',r:10000,d:2,h:0},{t:'Normal',r:5000,d:4,h:0},{t:'Normal',r:3000,d:4,h:0}];
const calc=(r,d,h)=>r*d+r/24*h,vp=()=>num('vp')/100;
function cur(){$('rtot').value=f(calc(num('rf'),num('rd'),num('rh')));const c=calc(num('rf'),num('rd'),num('rh'));$('vat').value=f(c*vp());$('rwv').value=f(c*(1+vp()))}
function drawRooms(){let T=[0,0,0];$('rooms').tBodies[0].innerHTML=rooms.map((x,i)=>{const c=calc(x.r,x.d,x.h),v=c*vp();T[0]+=c;T[1]+=v;T[2]+=c+v;
return`<tr><td>${x.t}</td><td class="n">${f(x.r)}</td><td class="n">${x.d}</td><td class="n">${x.h}</td><td class="n">${f(c)}</td><td class="n">${f(v)}</td><td class="n">${f(c+v)}</td><td><button class="ico" onclick="ed(${i})" aria-label="Edit">✎</button> <button class="ico d" onclick="rm(${i})" aria-label="Delete">🗑</button></td></tr>`}).join('')||'<tr><td colspan=8 style="text-align:center;color:var(--mu)">No rooms added</td></tr>';
$('rooms').tFoot.innerHTML=`<tr class="grp"><td colspan=4 class="n">Total</td><td class="n">${f(T[0])}</td><td class="n">${f(T[1])}</td><td class="n">${f(T[2])}</td><td></td></tr>`}
window.rm=i=>{rooms.splice(i,1);drawRooms();toast('Room entry removed')};
window.ed=i=>{const x=rooms[i];$('rf').value=x.r;$('rd').value=x.d;$('rh').value=x.h;document.querySelectorAll('[name=rt]').forEach(c=>c.checked=c.value==x.t);rooms.splice(i,1);drawRooms();cur();$('rf').focus()};
$('addr').onclick=()=>{const t=[...document.querySelectorAll('[name=rt]:checked')].map(c=>c.value);if(!t.length)return toast('Select a room type');if(!num('rf')||(!num('rd')&&!num('rh')))return toast('Enter fee and duration');
rooms.push({t:t.join('/'),r:num('rf'),d:num('rd'),h:num('rh')});drawRooms();toast('Room entry added')};
['rf','rd','rh','vp'].forEach(i=>$(i).oninput=()=>{cur();drawRooms()});
document.querySelectorAll('[name=rt]').forEach(c=>c.onchange=()=>{if(c.checked)document.querySelectorAll('[name=rt]').forEach(o=>{if(o!==c)o.checked=false})});
function adm(){$('at').value=f(num('af')*num('ad')+num('af')/24*num('ah'))}['af','ad','ah'].forEach(i=>$(i).oninput=adm);
// billing
let B=[['g','Room Charges'],['Admission',258900,238860],['Linen',30000,30000],['Room Charges',57000,60000],['VAT',9960,9960],['g','Doctor Fee'],['Doctor Fee',120000,6000],['g','Investigation'],['Testing',30000,30000],['g','Transport'],['Transport',30000,20000],['g','Hospital Charges'],['Administration fee',8000,8500],['Hospital Charges',30000,22000]];
let R=0,P=0,N=0;
const I=(i,k,v)=>`<input class="bi" type="number" inputmode="decimal" enterkeyhint="next" min="0" step="0.01" data-i="${i}" data-k="${k}" value="${v}" onfocus="this.select()">`;
function drawB(){$('bt').tBodies[0].innerHTML=B.map((x,i)=>x[0]=='g'?`<tr class="grp"><td colspan=4>${x[1]}</td></tr>`:
`<tr class="ln"><td>${x[3]?`<input class="nm" data-i="${i}" data-k="0" value="${x[0]}" placeholder="Item name"> <button class="ico d" data-del="${i}" aria-label="Remove">✕</button>`:`<span class="dot" id="d${i}"></span>${x[0]}`}</td><td data-l="Bill amount">${I(i,1,x[1])}</td><td data-l="Payable">${I(i,2,x[2])}</td><td data-l="Not paid" class="n" id="np${i}"></td></tr>`).join('');totB()}
function totB(){R=P=0;B.forEach((x,i)=>{if(x[0]=='g')return;const pay=Math.min(x[1],x[2]),np=Math.max(0,x[1]-x[2]);R+=x[1];P+=pay;
const c=$('np'+i);if(c){c.textContent=f(np);c.className='n '+(np?'bad':'');}const d=$('d'+i);if(d)d.className='dot '+(np?'w':'ok');
const pi=document.querySelector(`[data-i="${i}"][data-k="2"]`);if(pi)pi.classList.toggle('err',x[2]>x[1])});
N=R-P;['sr','s1'].forEach(i=>$(i).textContent=f(R));['sp','s2'].forEach(i=>$(i).textContent=f(P));['sn','s3'].forEach(i=>$(i).textContent=f(N));$('fn').value=f(N)}
$('bt').addEventListener('input',e=>{const t=e.target,i=t.dataset.i;if(i==null)return;B[i][t.dataset.k]=t.dataset.k=='0'?t.value:(+t.value||0);totB()});
$('bt').addEventListener('click',e=>{const d=e.target.dataset.del;if(d!=null){B.splice(d,1);if(!B.some(x=>x[3]))B=B.filter(x=>x[1]!='Other charges'||x[0]!='g');drawB()}});
$('addb').onclick=()=>{if(!B.some(x=>x[0]=='g'&&x[1]=='Other charges'))B.push(['g','Other charges']);B.push(['',0,0,true]);drawB();const n=document.querySelectorAll('.nm');n[n.length-1].focus()};
drawB();
$('rs').innerHTML=[0,1,2].map(()=>`<tr><td style="width:40%"><input value="0.00" type="number"></td><td><select><option>Reason</option><option>Over limit</option><option>Not covered</option><option>Excess</option></select></td></tr>`).join('');
const D=[['Bill',1000],['Presc',0],['Bill',1000]];
$('docs').innerHTML=D.map((d,i)=>`<div class="doc ${i?'':'on'}" tabindex=0><span style="color:var(--bad)">▤</span>${d[0]}<b>${f(d[1])}</b><span>👁</span></div>`).join('');
$('docs').onclick=e=>{const d=e.target.closest('.doc');if(!d)return;document.querySelectorAll('.doc').forEach(x=>x.classList.remove('on'));d.classList.add('on');$('prev').querySelector('h4').textContent=d.firstChild.nextSibling.textContent.toUpperCase()};
$('zm').onclick=()=>$('prev').classList.toggle('z');
// validate dates + submit
$('dis').onchange=$('adm').onchange=()=>{const bad=$('dis').value<$('adm').value;$('dis').classList.toggle('err',bad);if(bad)toast('Discharge date is before admission')};
$('sub').onclick=()=>{if(!$('fr').value.trim()){$('fr').classList.add('err');$('fr').scrollIntoView({behavior:'smooth',block:'center'});$('fr').focus();return toast('Please enter a remark')}$('fr').classList.remove('err');toast('Claim submitted successfully ✓')};
cur();drawRooms();adm();

window.ClaimApp={load(m,p,h){const sec=[...document.querySelectorAll('#page-claim section.card')].find(s=>s.querySelector('h2').textContent.trim()=='Claim Details');const i=sec.querySelectorAll('input');i[0].value='MCN '+m;if(p)i[5].value=p;if(h)i[3].value=h}};
})();

(function(){
const $=id=>document.getElementById(id);
window.toast=m=>{const t=$('toast');t.textContent=m;t.className='s';setTimeout(()=>t.className='',2200)};
const T={dashboard:['page-dash','Dashboard'],notification:['page-notif','Notification'],'claim-payment':['page-claim','Claim Payment','Details'],inquiry:['page-inquiry','Inquiry'],history:['page-history','Claim history']};
function route(){
 const [path,qs]=(location.hash.replace(/^#\/?/,'')||'dashboard').split('?'),key=T[path]?path:'dashboard',p=new URLSearchParams(qs||''),t=T[key];
 document.querySelectorAll('.page').forEach(s=>s.hidden=s.id!==t[0]);
 document.querySelectorAll('aside a').forEach(a=>{const on=a.dataset.r===key;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
 $('bc').innerHTML='Workspace'+t.slice(1).map((x,i,a)=>' › '+(i==a.length-1?'<b style="color:var(--tx)">'+x+'</b>':x)).join('');
 document.title=t[1]+' – MTO Tab';
 if(key==='notification')NotifApp.setFilter(p.get('f')||'All');
 if(key==='claim-payment'&&p.get('mcn'))ClaimApp.load(p.get('mcn'),p.get('patient'),p.get('hospital'));
 window.scrollTo(0,0)}
$('th').onclick=()=>{const r=document.documentElement,d=getComputedStyle(r).getPropertyValue('--bg').trim()=='#0b1220';r.dataset.theme=d?'light':'dark'};
addEventListener('hashchange',route);route();
})();
