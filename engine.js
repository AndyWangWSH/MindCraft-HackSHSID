/* CourseFlow: zero-dependency, duration-preserving local search. */
(function(root){
'use strict';
const minutes=[60,40,40,45,55,40,40];
const names={Art:'Arts',Chinese:'Chinese',History:'Honors History',English:'Honors English',Football:'Football',Math:'Honors Geometry',Spanish:'Spanish Language',Physics:'Honors Physics',CS:'Programming Methodology',Finance:'Finance',Chemistry:'Chemistry',CAS:'CAS'};
const rooms={Art:'115',Chinese:'317',History:'408',English:'413',Football:'319',Math:'409',Spanish:'413',Physics:'309',CS:'319',Finance:'115',Chemistry:'318',CAS:'405'};
const rows=[['Art','Chinese','History','English','Football','Math','Chemistry'],['Math','Spanish','Physics','English','CS','Chemistry','Chinese'],['CS','History','History','Finance','Math','CAS','CAS'],['English','CS','Math','Art','Football','Chemistry','Physics'],['English','History','Chinese','Chemistry','Physics',null,null]];
function baseline(week='odd'){return rows.flatMap((row,d)=>row.map((sub,p)=>{if(week==='even'){if(d===2&&p===5)sub='Physics';if(d===2&&p===6)sub='English';if(d===3&&p===3)sub='Math';}return sub?{id:`${week}-${d}-${p}`,subject:sub,room:rooms[sub],teacher:'T-'+sub,group:'G9-demo',origin:d*7+p,locked:sub==='CAS'||sub==='Football'}:null;}));}
function totals(s){let out={};s.forEach((x,i)=>{if(x){out[x.subject]??={count:0,minutes:0};out[x.subject].count++;out[x.subject].minutes+=minutes[i%7];}});return Object.fromEntries(Object.entries(out).sort());}
function metrics(s){let movement=0,repeats=0,changes=0;for(let d=0;d<5;d++){let seen={};for(let p=0;p<7;p++){let i=d*7+p,x=s[i];if(!x)continue;changes+=x.origin!==i?1:0;seen[x.subject]=(seen[x.subject]||0)+1;if(p<6&&p!==3&&s[i+1])movement+=Math.abs(Number(x.room[0])-Number(s[i+1].room[0]));}repeats+=Object.values(seen).reduce((a,n)=>a+Math.max(0,n-1),0);}return {movement,repeats,changes};}
function score(s,w=3){let m=metrics(s);return m.movement+w*m.repeats;}
function validate(s,base,blocked=[]){let errors=[];if(!Array.isArray(s)||s.length!==35)return ['课表必须包含35个时段'];const ids=s.filter(Boolean).map(x=>x.id),expected=base.filter(Boolean).map(x=>x.id);if(ids.length!==expected.length||new Set(ids).size!==ids.length||expected.some(id=>!ids.includes(id)))errors.push('课程实例缺失、重复或未知');if(JSON.stringify(totals(s))!==JSON.stringify(totals(base)))errors.push('科目节数或教学分钟数改变');base.forEach((x,i)=>{if((!x||x.locked)&&s[i]?.id!==x?.id)errors.push('固定课程或空白时段改变');});s.forEach((x,i)=>{if(!x)return;let orig=base.find(z=>z?.id===x.id);if(!orig||['subject','room','teacher','group'].some(k=>x[k]!==orig[k]))errors.push('课程资源信息改变');if(blocked.some(b=>b.slot===i&&(b.teacher===x.teacher||b.room===x.room)))errors.push(`时段${i+1}教师/教室不可用`);});return [...new Set(errors)];}
function optimize(base,w=3,blocked=[]){let s=base.map(x=>x?{...x}:null),rounds=0; // repair/optimization by best improving swaps
const cost=a=>validate(a,base,blocked).length*100000+score(a,w);
while(rounds<80){let best=cost(s),pair=null;for(let i=0;i<35;i++)for(let j=i+1;j<35;j++){if(!s[i]||!s[j]||s[i].locked||s[j].locked||minutes[i%7]!==minutes[j%7])continue;[s[i],s[j]]=[s[j],s[i]];let c=cost(s);if(c<best){best=c;pair=[i,j];}[s[i],s[j]]=[s[j],s[i]];}if(!pair)break;let [i,j]=pair;[s[i],s[j]]=[s[j],s[i]];rounds++;}
return {schedule:s,rounds,errors:validate(s,base,blocked)};}
const api={minutes,names,rooms,baseline,totals,metrics,score,validate,optimize};if(typeof module!=='undefined')module.exports=api;root.CourseFlow=api;
})(typeof globalThis!=='undefined'?globalThis:this);
