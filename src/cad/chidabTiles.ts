import type { ProjectSettings } from './types';
export type ChidabTiles = NonNullable<ProjectSettings['chidabTiles']>;
export const DEFAULT_CHIDAB_TILES: ChidabTiles = { wallWidth:60, wallHeight:120, floorWidth:60, floorHeight:60, groutMm:2, wallColor:'#dedbd4', floorColor:'#a9a7a0', groutColor:'#c2bfb9' };
export function getChidabTiles(settings?: ProjectSettings): ChidabTiles {
  const v={...DEFAULT_CHIDAB_TILES,...settings?.chidabTiles};
  const dim=(n:number, fallback:number)=>Number.isFinite(n)?Math.max(5,Math.min(400,n)):fallback;
  return {...v,wallWidth:dim(v.wallWidth,60),wallHeight:dim(v.wallHeight,120),floorWidth:dim(v.floorWidth,60),floorHeight:dim(v.floorHeight,60),groutMm:Number.isFinite(v.groutMm)?Math.max(0,Math.min(10,v.groutMm)):2};
}
export function tilePitch(sizeCm:number,groutMm:number){return sizeCm+groutMm/10;}

import type { Wall, ChidabWallDesign } from './types';
export function wallDesign(w:Wall,settings?:ProjectSettings):ChidabWallDesign {
 const t=getChidabTiles(settings);
 return {width:t.wallWidth,height:t.wallHeight,groutMm:t.groutMm,color:t.wallColor,decorColor:'#947e62',offsetX:0,offsetY:0,decor:{},...w.tileDesign};
}
export function wallCells(w:Wall,d:ChidabWallDesign){
 const width=Math.max(5,Math.min(400,d.width||60)),height=Math.max(5,Math.min(400,d.height||120)),g=Math.max(0,Math.min(10,d.groutMm||0))/10;
 const px=width+g,py=height+g;const ox=((d.offsetX%px)+px)%px,oy=((d.offsetY%py)+py)%py;
 const cells:{key:string;x:number;y:number;width:number;height:number;decor:boolean}[]=[];
 for(let col=-1;col<Math.ceil(w.length/px)+1;col++) for(let row=-1;row<Math.ceil(w.height/py)+1;row++){
  const ax=ox+col*px+g/2,ay=oy+row*py+g/2;
  const x=Math.max(0,ax),y=Math.max(0,ay),r=Math.min(w.length,ax+width),t=Math.min(w.height,ay+height);
  const key=col+':'+row;
  if(r>x&&t>y)cells.push({key,x,y,width:r-x,height:t-y,decor:!!d.decor[key]});
  if(cells.length>=12000)return cells;
 }return cells;
}

// Style application is explicit and changes finishes/decor only, not room geometry or equipment.
import type { ProjectState } from './types';
const STYLE_FINISHES:Record<string,{wall:string;floor:string;decor:string;grout:string;pattern:string}>={
 modern:{wall:'#e0e3e1',floor:'#929b9c',decor:'#456970',grout:'#bdc2bf',pattern:'vertical'},
 minimal:{wall:'#ece8df',floor:'#c8c2b7',decor:'#ded8cc',grout:'#d4cfc5',pattern:'plain'},
 luxury:{wall:'#e8e3da',floor:'#55514c',decor:'#806c51',grout:'#c7bfb1',pattern:'feature'},
 natural:{wall:'#dfd9cb',floor:'#aa947a',decor:'#8f795e',grout:'#c3b8a9',pattern:'vertical'},
 turkish:{wall:'#e8dfcd',floor:'#bba890',decor:'#367d83',grout:'#c6baa8',pattern:'band'},
 classic:{wall:'#efe8dc',floor:'#8c8172',decor:'#a59a7c',grout:'#d1c5b3',pattern:'band'},
};
export function applyChidabStyle(p:ProjectState,brief:{required:string[];style:string}):ProjectState{
 const v=STYLE_FINISHES[brief.style]||STYLE_FINISHES.modern;
 const t={...getChidabTiles(p.settings),wallColor:v.wall,floorColor:v.floor,groutColor:v.grout};
 const feature=(p.bathItems||[]).find(i=>i.kind==='shower'&&i.wallId)?.wallId||(p.bathItems||[]).find(i=>i.kind==='vanity'&&i.wallId)?.wallId||p.activeWallId||p.walls[0]?.id;
 const walls=p.walls.map(w=>{
  const d=wallDesign(w,p.settings), nd={...d,color:v.wall,decorColor:v.decor,decor:{} as Record<string,boolean>};
  const a=w.angle*Math.PI/180;
  const fixture=(p.bathItems||[]).find(i=>i.wallId===w.id&&(i.kind==='shower'||i.kind==='vanity'));
  const center=fixture?(fixture.xCm-w.x1Cm)*Math.cos(a)+(fixture.yCm-w.y1Cm)*Math.sin(a):w.length/2;
  for(const c of wallCells(w,nd)){
   const x=c.x+c.width/2,y=c.y+c.height/2;
   nd.decor[c.key]=v.pattern==='band'?Math.abs(y-w.height*.48)<nd.height*.48:w.id===feature&&(v.pattern==='feature'||v.pattern==='vertical'&&Math.abs(x-center)<nd.width*.51);
  }
  return {...w,tileDesign:nd};
 });
 return {...p,bathBrief:brief,walls,settings:{...p.settings!,chidabTiles:t}};
}
