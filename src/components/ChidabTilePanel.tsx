import React, {useState} from 'react';
import {getChidabTiles, type ChidabTiles} from '../cad/chidabTiles';
import type {ProjectSettings} from '../cad/types';
export function ChidabTilePanel({settings,onApply,onClose}:{settings?:ProjectSettings;onApply:(v:ChidabTiles)=>void;onClose:()=>void}){
 const [v,setV]=useState(()=>getChidabTiles(settings));
 const fields=[['wallWidth','عرض کاشی دیوار'],['wallHeight','ارتفاع کاشی دیوار'],['floorWidth','عرض سرامیک کف'],['floorHeight','طول سرامیک کف'],['groutMm','بندکشی (میلی‌متر)']] as const;
 return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3" dir="rtl"><section className="w-full max-w-sm max-h-[85dvh] overflow-auto rounded-xl bg-white shadow-xl p-4 space-y-3">
 <h2 className="font-black text-lg">کاشی و سرامیک</h2><p className="text-xs text-slate-500">ابعاد واقعی قطعات (سانتی‌متر)، از گوشه دیوار و کف. فعلاً الگوی ساده.</p>
 <div className="grid grid-cols-2 gap-3">{fields.map(([k,label])=><label key={k} className="text-sm font-bold">{label}<input type="number" dir="ltr" min={k==='groutMm'?0:5} max={k==='groutMm'?10:400} step={0.1} value={v[k]} onChange={e=>setV(p=>({...p,[k]:Number(e.target.value)}))} className="block w-full border rounded p-2 mt-1"/></label>)}</div>
 <div className="grid grid-cols-3 gap-2">{([['wallColor','دیوار'],['floorColor','کف'],['groutColor','بند']] as const).map(([k,label])=><label key={k} className="text-sm">{label}<input type="color" value={v[k]} onChange={e=>setV(p=>({...p,[k]:e.target.value}))} className="block w-full h-9"/></label>)}</div>
 <div className="flex gap-2"><button type="button" className="flex-1 bg-indigo-600 text-white rounded-lg p-2 font-bold" onClick={()=>onApply(getChidabTiles({...settings!,chidabTiles:v}))}>اعمال روی دیوار و کف</button><button type="button" className="border rounded-lg p-2" onClick={onClose}>بستن</button></div></section></div>;
}
