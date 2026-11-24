import React from 'react';
import type {BathItem,BathKind} from '../cad/types';
import {BATH_CATALOG} from '../cad/chidabEquipment';
export function ChidabBathControls({kind,item,moving,onKind,onEdit,onMove,onDelete,onCancel}:{kind:BathKind|null;item:BathItem|undefined;moving:boolean;onKind:(k:BathKind)=>void;onEdit:(p:Partial<BathItem>)=>void;onMove:()=>void;onDelete:()=>void;onCancel:()=>void}){
 return <div dir="rtl" className="shrink-0 border-t bg-white px-2 py-2 space-y-2">
 <div className="flex justify-end"><button onClick={onCancel} className="border rounded px-2 py-1 text-xs">لغو / بستن</button></div>
 {kind&&<p className="text-xs text-indigo-700">برای جانمایی {BATH_CATALOG[kind].label} روی پلان کلیک کنید.</p>}
 {moving&&<p className="text-xs text-indigo-700">محل جدید را روی پلان انتخاب کنید.</p>}
 {item&&<div className="flex items-center flex-wrap gap-2 text-xs"><b>{BATH_CATALOG[item.kind].label}</b>{([['width','عرض'],['depth','عمق'],['height','ارتفاع'],['elevY','از کف'],['rotation','زاویه']] as const).map(([k,l])=><label key={k}>{l}<input type="number" key={item.id+':'+item[k]} defaultValue={Math.round(item[k])} onBlur={e=>{const v=Number(e.target.value);if(Number.isFinite(v))onEdit({[k]:k==='rotation'?v:Math.max(k==='elevY'?0:1,Math.min(400,v))})}} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur()}} className="w-16 border rounded mx-1 p-1" dir="ltr"/></label>)}<button onClick={onMove} className="border rounded p-1">جابجایی</button><button onClick={()=>onEdit({rotation:(item.rotation+90)%360})} className="border rounded p-1">چرخش</button><button onClick={onDelete} className="border text-red-700 rounded p-1">حذف</button></div>}
 </div>;
}
