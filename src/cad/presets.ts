import { DEFAULT_PROJECT_SETTINGS } from './constants';
import { createWall } from './doorRules';
import { ProjectState } from './types';
export type PresetMode = 'single' | 'L' | 'U' | 'closet';
export function buildPresetProject(_mode: PresetMode): ProjectState {
  const walls = [
    createWall('دیوار ۱', -140, -125, 140, -125, 1),
    createWall('دیوار ۲', 140, -125, 140, 125, 1),
    createWall('دیوار ۳', 140, 125, -140, 125, 1),
    createWall('دیوار ۴', -140, 125, -140, -125, 1),
  ];
  return { walls, cornerOwners: {}, activeWallId: walls[0].id, activeBoxId: null,
    selectedDoorId: null, selectedOpeningId: null, selectedApplianceId: null,
    selectedShelfId: null, selectedHandleId: null, selectedFrameId: null, doorsLocked: false,
    skipStylePrompt: true, settings: { ...DEFAULT_PROJECT_SETTINGS } };
}
