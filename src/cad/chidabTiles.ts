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
