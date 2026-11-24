import type { ProjectSettings } from './types';
export type ChidabTiles = NonNullable<ProjectSettings['chidabTiles']>;
export const DEFAULT_CHIDAB_TILES: ChidabTiles = { wallWidth:60, wallHeight:120, floorWidth:60, floorHeight:60, groutMm:2, wallColor:'#dedbd4', floorColor:'#a9a7a0', groutColor:'#c2bfb9' };
export function getChidabTiles(settings?: ProjectSettings): ChidabTiles {
  const v={...DEFAULT_CHIDAB_TILES,...settings?.chidabTiles};
  const dim=(n:number, fallback:number)=>Number.isFinite(n)?Math.max(5,Math.min(400,n)):fallback;
  return {...v,wallWidth:dim(v.wallWidth,60),wallHeight:dim(v.wallHeight,120),floorWidth:dim(v.floorWidth,60),floorHeight:dim(v.floorHeight,60),groutMm:Number.isFinite(v.groutMm)?Math.max(0,Math.min(10,v.groutMm)):2};
}
export function tilePitch(sizeCm:number,groutMm:number){return sizeCm+groutMm/10;}
