import type {BathKind,BathItem,Wall} from './types';
import {deriveFloorPolygon} from './floorPolygon';
export const BATH_CATALOG:Record<BathKind,{label:string;width:number;depth:number;height:number;elevY:number;color:string;wall:boolean}>={
 vanity:{label:'روشویی',width:60,depth:45,height:20,elevY:65,color:'#eeeae3',wall:true},
 toilet:{label:'فرنگی',width:38,depth:68,height:75,elevY:0,color:'#f8fafc',wall:true},
 squat:{label:'توالت ایرانی',width:48,depth:65,height:4,elevY:0,color:'#f8fafc',wall:false},
 shower:{label:'دوش',width:85,depth:85,height:210,elevY:0,color:'#b8dbe7',wall:true},
 tub:{label:'وان',width:150,depth:75,height:55,elevY:0,color:'#f8fafc',wall:true},
 glass:{label:'پارتیشن شیشه‌ای',width:90,depth:3,height:195,elevY:0,color:'#a9d6df',wall:false},
 mirror:{label:'آینه',width:60,depth:3,height:65,elevY:110,color:'#b8c8d1',wall:true},
 cabinet:{label:'کمد',width:40,depth:35,height:100,elevY:25,color:'#aa8b6f',wall:true},
 washer:{label:'لباسشویی',width:60,depth:60,height:85,elevY:0,color:'#d5d8dc',wall:true},
 drain:{label:'کف‌شور',width:15,depth:15,height:2,elevY:0,color:'#9ca3af',wall:false},
 towel:{label:'حوله‌خشک‌کن',width:50,depth:10,height:90,elevY:60,color:'#c6cbd1',wall:true},
 jacuzzi:{label:'جکوزی',width:140,depth:140,height:60,elevY:0,color:'#e1e7e9',wall:false},
};
export function pointInRoom(x:number,y:number,walls:Wall[]){
 const p=deriveFloorPolygon(walls);if(p.length<3)return false;
 let inside=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;
}
export function locateBathItem(item:BathItem,x:number,y:number,walls:Wall[]):BathItem {
 const snap=(v:number)=>Math.round(v/5)*5;
 if(!BATH_CATALOG[item.kind].wall)return {...item,wallId:undefined,xCm:snap(x),yCm:snap(y)};
 let best:{score:number;item:BathItem}|undefined;
 for(const w of walls){const a=w.angle*Math.PI/180,ux=Math.cos(a),uy=Math.sin(a);
  const t=Math.max(item.width/2,Math.min(w.length-item.width/2,(x-w.x1Cm)*ux+(y-w.y1Cm)*uy));
  if(w.length<item.width)continue;
  const bx=w.x1Cm+t*ux,by=w.y1Cm+t*uy;
  const side=pointInRoom(bx-uy*5,by+ux*5,walls)?1:-1;
  const dist=item.depth/2+1;const nx=-uy*side,ny=ux*side;
  const xx=bx+nx*dist,yy=by+ny*dist;
  const score=Math.hypot(x-xx,y-yy);
  if(!best||score<best.score)best={score,item:{...item,wallId:w.id,xCm:xx,yCm:yy,rotation:w.angle+(side===1?0:180)}};
 }return best?best.item:{...item,wallId:undefined,xCm:snap(x),yCm:snap(y)};
}
export function bathFits(i:BathItem,walls:Wall[]){
 const a=i.rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
 return [-1,1].every(x=>[-1,1].every(y=>pointInRoom(i.xCm+x*Math.max(0,i.width/2-0.5)*c-y*Math.max(0,i.depth/2-0.5)*s,i.yCm+x*Math.max(0,i.width/2-0.5)*s+y*Math.max(0,i.depth/2-0.5)*c,walls)));
}

export function bathModel(kind:BathKind,index:number){
 const base=BATH_CATALOG[kind], n=((index%3)+3)%3;
 const factors=[1,.82,1.18];
 const width=Math.round(base.width*factors[n]),depth=Math.round(base.depth*(kind==='mirror'||kind==='glass'?1:factors[n]));
 return {...base,width,depth,model:n};
}
