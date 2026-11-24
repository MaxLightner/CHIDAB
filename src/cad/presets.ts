import { DEFAULT_PROJECT_SETTINGS } from './constants';
import { createWall, uid } from './doorRules';
import { ProjectState } from './types';
export type PresetMode = 'single' | 'L' | 'U' | 'closet';
export function buildPresetProject(_mode: PresetMode): ProjectState {
  const walls = [
    createWall('دیوار ۱', -100, -100, 100, -100, 1, 220),
    createWall('دیوار ۲', 100, -100, 100, 100, 1, 220),
    createWall('دیوار ۳', 100, 100, -100, 100, 1, 220),
    createWall('دیوار ۴', -100, 100, -100, -100, 1, 220),
  ];
  walls[2].openings.push({ id: uid('opening'), kind: 'door', offsetX: 60, width: 80, elevY: 0, height: 205, swingDir: 'right-out' });
  return { walls, cornerOwners: {}, activeWallId: walls[0].id, activeBoxId: null,
    selectedDoorId: null, selectedOpeningId: null, selectedApplianceId: null,
    selectedShelfId: null, selectedHandleId: null, selectedFrameId: null, doorsLocked: false,
    skipStylePrompt: true, settings: { ...DEFAULT_PROJECT_SETTINGS } };
}
