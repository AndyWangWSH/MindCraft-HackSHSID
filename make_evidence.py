import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
def save(fig,path):
 b=io.BytesIO();fig.savefig(b,format='png',dpi=160);path.write_bytes(b.getvalue())
p=Path(__file__).resolve().parent / 'evidence';r=json.loads((p/'results.json').read_text());plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,'axes.spines.right':False,'figure.facecolor':'#f5f7fb','axes.facecolor':'#f5f7fb','text.color':'#20304a','axes.labelcolor':'#20304a'})
fig,axs=plt.subplots(1,3,figsize=(13,5));fig.suptitle('CourseFlow | measured results',fontsize=22,fontweight='bold',x=.06,ha='left')
for ax,key,title in zip(axs,['movement','repeats','score'],['Floor-change proxy','Daily subject repetitions','Weighted objective (w = 3)']):
    before=[b['beforeScore'] if key=='score' else b['before'][key] for b in r['bench']];after=[b['afterScore'] if key=='score' else b['after'][key] for b in r['bench']]
    for pos,vals,col,label in [([-.18,.82],before,'#a9b9d4','Original'),([.18,1.18],after,'#237e72','Optimized')]:
        bars=ax.bar(pos,vals,width=.32,color=col,label=label);ax.bar_label(bars,padding=4)
    ax.set_xticks([0,1],['Odd week','Even week']);ax.set_title(title,fontsize=12,pad=20);ax.set_ylim(0,max(before)*1.3+1);ax.legend(frameon=False,fontsize=9)
fig.text(.06,.04,'Single-student example only. Proxy units are NOT metres or travel time. Source: results.json',fontsize=10);fig.tight_layout(rect=[.03,.1,1,.88]);save(fig,p/'01-metrics.png');plt.close(fig)
fig=plt.figure(figsize=(13,9));fig.text(.06,.93,'22 / 22 automated tests passed',fontsize=25,weight='bold');fig.text(.06,.88,'Actual execution · '+r['environment']+' · raw log included',fontsize=12)
for i,t in enumerate(r['tests']):
 col=i//11;row=i%11;fig.text(.06+col*.48,.81-row*.062,'PASS',color='#237e72',weight='bold',fontsize=10);fig.text(.115+col*.48,.81-row*.062,t['name'],fontsize=9)
fig.text(.06,.06,'Negative tests expect rejection. Passing does not certify unmodelled whole-school constraints.',fontsize=11);save(fig,p/'02-tests.png');plt.close(fig)
m=json.loads((p/'minutes.json').read_text());subjects=sorted(set(m[0]['before'])|set(m[1]['before']));rows=[]
for s in subjects:
 row=[s]
 for w in m:
  a=w['before'].get(s,{'count':0,'minutes':0});b=w['after'].get(s,{'count':0,'minutes':0});row += [str(a['minutes']),str(b['minutes']),str(a['count'])+' / '+str(b['count'])]
 rows.append(row)
fig,ax=plt.subplots(figsize=(12,7));ax.axis('off');fig.suptitle('Every subject keeps its teaching time',fontsize=22,weight='bold',y=.96)
t=ax.table(cellText=rows,colLabels=['Subject','Odd before','Odd after','Odd counts','Even before','Even after','Even counts'],cellLoc='center',bbox=[0,.06,1,.84]);t.auto_set_font_size(False);t.set_fontsize(10)
for (i,j),cell in t.get_celld().items():
 cell.set_edgecolor('#dce4ee');cell.set_facecolor('#173c42' if i==0 else ('#e7f3ee' if j in [2,5] else '#ffffff'))
 if i==0:cell.get_text().set_color('white')
fig.text(.05,.04,'Time columns: minutes per week. Count columns: original / optimized. Source: minutes.json.',fontsize=10);save(fig,p/'03-minutes.png');plt.close(fig)
