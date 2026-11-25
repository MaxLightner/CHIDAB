import React from 'react';
import {
  AppWindow, MousePointer2,
  BrickWall,
  DoorClosed,
  Droplets,
  Lightbulb,
  Eye,
  EyeOff,
  Flame,
  Frame,
  GripVertical,
  LayoutGrid,
  Paintbrush,
  Palette,
  RectangleHorizontal,
  Refrigerator,
  WashingMachine,
  Utensils,
  Tv,
  PencilLine,
  Wrench,
} from 'lucide-react';
import { BATH_CATALOG } from '../cad/chidabEquipment';
import { BathKind, DiningSeats, FloorFurnitureKind, ToolId } from '../cad/types';

interface BottomDockProps {
  activeTool: ToolId;
  onOpenTiles?: () => void;
  onWallTiles?: () => void;
  onBathCatalog?: () => void;
  wallName?: string;
  bathKind?: BathKind|null;
  onBathKind?: (k:BathKind)=>void;
  diningSeats: DiningSeats;
  diningShape: 'round' | 'rect';
  onDiningShape: (shape: 'round' | 'rect') => void;
  diningRotation: number;
  furnitureKind: FloorFurnitureKind;
  onChooseFurniture: (kind: FloorFurnitureKind) => void;
  onDiningSeats: (seats: DiningSeats) => void;
  onRotateDining: () => void;
  hasAnySelection?: boolean;
  doorsHidden?: boolean;
  onSelectTool: (tool: ToolId) => void;
  onToggleDoorsHidden?: () => void;
  onDeleteSelection?: () => void;
  canToggleUnderLight: boolean;
  lightsOn: boolean;
  onToggleUnderLight: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({ activeTool, onSelectTool, onOpenTiles,onWallTiles,onBathCatalog,wallName,bathKind,onBathKind }) => {
  const tools: { id: ToolId; label: string; Icon: React.ElementType }[] = [
    { id: 'select', label: 'انتخاب', Icon: MousePointer2 },
    { id: 'wall', label: 'دیوار', Icon: BrickWall },
    { id: 'opening', label: 'در / پنجره / ستون', Icon: AppWindow },
  ];
  const entries=[...tools.map(({id,label,Icon})=>({key:id,label: id==='opening'?'بازشو':label,Icon,active:activeTool===id&&!bathKind,action:()=>onSelectTool(id)})),...Object.entries(BATH_CATALOG).map(([key,c])=>({key,label:c.label,Icon:undefined,active:bathKind===key,action:()=>onBathKind?.(key as BathKind)})),...(wallName?[{key:'tiles',label:'طراحی کاشی',Icon:undefined,active:false,action:()=>onWallTiles?.()}]:[])];
  return <div data-testid="bottom-dock" className="shrink-0 z-30 bg-white border-t border-slate-200 px-1 py-1" dir="rtl">
    <nav aria-label="ابزارهای معماری و تجهیزات" className="grid grid-flow-col grid-rows-2 auto-cols-fr gap-1 w-full">
      {entries.map(({key,label,Icon,active,action})=><button key={key} type="button" title={label} aria-pressed={active} onClick={action}
        className={'min-w-0 min-h-8 rounded px-0.5 py-1 leading-tight text-[11px] sm:text-[13px] font-semibold flex items-center justify-center gap-1 text-center '+(active?'bg-indigo-600 text-white':'bg-slate-50 text-slate-800 hover:bg-slate-100')}>
        {Icon&&<Icon className="w-3.5 h-3.5 shrink-0"/>}<span className="min-w-0 break-words">{label}</span>
      </button>)}
    </nav>
  </div>;
};
