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
import { DiningSeats, FloorFurnitureKind, ToolId } from '../cad/types';

interface BottomDockProps {
  activeTool: ToolId;
  onOpenTiles?: () => void;
  onWallTiles?: () => void;
  onBathCatalog?: () => void;
  wallName?: string;
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

export const BottomDock: React.FC<BottomDockProps> = ({ activeTool, onSelectTool, onOpenTiles,onWallTiles,onBathCatalog,wallName }) => {
  const tools: { id: ToolId; label: string; Icon: React.ElementType }[] = [
    { id: 'select', label: 'انتخاب', Icon: MousePointer2 },
    { id: 'wall', label: 'دیوار', Icon: BrickWall },
    { id: 'opening', label: 'در / پنجره / ستون', Icon: AppWindow },
  ];
  return <div data-testid="bottom-dock" className="relative shrink-0 z-30 bg-white border-t border-slate-200">
    <nav aria-label="ابزارهای معماری" className="h-12 flex items-center justify-center gap-2 px-2 overflow-x-auto">
      {tools.map(({id,label,Icon}) => <button key={id} type="button" onClick={() => onSelectTool(id)}
        aria-pressed={activeTool === id} className={'h-10 px-3 rounded-lg border font-bold inline-flex items-center gap-2 whitespace-nowrap '+(activeTool===id?'bg-indigo-600 text-white':'bg-white text-slate-800')}>
        <Icon className="w-4 h-4"/><span>{label}</span>
      </button>)}
      <button type="button" onClick={onOpenTiles} className="h-10 px-3 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-800 font-bold inline-flex items-center gap-2 whitespace-nowrap"><LayoutGrid className="w-4 h-4"/>کاشی و سرامیک</button>
      <button type="button" onClick={onBathCatalog} className="h-10 px-3 rounded border font-bold whitespace-nowrap">تجهیزات سرویس</button>
      {wallName&&<button type="button" onClick={onWallTiles} className="h-10 px-3 rounded bg-indigo-600 text-white font-bold whitespace-nowrap">طراحی کاشی · {wallName}</button>}
    </nav>
  </div>;
};
