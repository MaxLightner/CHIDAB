import React from 'react';
import { ArrowLeft, Camera, FolderOpen, Layers, Palette } from 'lucide-react';
import { PresetMode } from '../cad/presets';
import { SavedProjectRecord } from '../cad/projectStorage';

interface WelcomeScreenProps {
  arAvailable?: boolean;
  projectsCount: number;
  latestProject: SavedProjectRecord | null;
  onStartMode: (mode: '2d' | '3d' | 'ar', preset?: PresetMode) => void;
  onContinueLatest: (mode: '2d' | '3d' | 'ar') => void;
  onNewProject: () => void;
  onOpenProjects: () => void;
  onOpenStyles: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  arAvailable = false,
  projectsCount,
  latestProject,
  onStartMode,
  onContinueLatest,
  onOpenProjects,
  onNewProject,
  onOpenStyles,
}) => {
  return (
    <div className="kichiyar-safe-root min-h-screen w-screen bg-slate-50 text-slate-900 flex flex-col overflow-y-auto">
      <header className="h-14 px-4 sm:px-8 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white font-black text-base flex items-center justify-center">
            چ
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 leading-tight">چیداب</div>
            <div className="text-[13px] font-semibold text-slate-500">استودیو طراحی حمام و سرویس بهداشتی</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenProjects}
            className="h-10 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold inline-flex items-center gap-1.5"
          >
            <FolderOpen className="w-4 h-4" />
            <span>پروژه‌های من ({projectsCount})</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center justify-center gap-5">
        <div className="text-center space-y-1.5">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            CHIDAB
          </h1>

          <p className="text-base sm:text-lg font-semibold text-slate-600 leading-relaxed">
            محیط طراحی دوبعدی و سه‌بعدی سرویس بهداشتی
          </p>
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center"><div className="text-4xl font-black tracking-widest text-indigo-700">CHIDAB</div><p className="mt-2 text-slate-500">Studio 0.22 · 2D / 3D / AR</p></div>

        <div className="w-full max-w-3xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              data-testid="welcome-primary-start"
              onClick={() => (latestProject ? onContinueLatest('2d') : onStartMode('2d'))}
              className="h-14 px-4 rounded-xl border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black inline-flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>{latestProject ? 'ادامه آخرین پروژه' : 'شروع طراحی جدید'}</span>
            </button>
            {latestProject && (
              <button type="button" data-testid="welcome-new-project" onClick={onNewProject}
                className="flex h-12 items-center justify-center rounded-xl border border-indigo-300 bg-indigo-50 px-4 font-bold text-indigo-800 hover:bg-indigo-100">
                پروژهٔ جدید
              </button>
            )}

            <button
              type="button"
              data-testid="welcome-projects-btn"
              onClick={onOpenProjects}
              className="h-14 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100/80 text-slate-800 text-sm font-black inline-flex items-center justify-center gap-2 transition active:scale-95"
            >
              <FolderOpen className="w-4 h-4 text-slate-600" />
              <span>مدیریت پروژه‌ها ({projectsCount})</span>
            </button>

            

            <button
              type="button"
              data-testid="welcome-ar-btn"
              onClick={() => onStartMode('ar')}
              disabled={!arAvailable}
              title={!arAvailable ? 'AR روی این دستگاه در دسترس نیست' : 'اسکن کف با دوربین'}
              className="h-14 px-4 rounded-xl border border-emerald-200/80 bg-emerald-50/50 hover:bg-emerald-50 text-slate-800 text-sm font-black inline-flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>اسکن کف AR</span>
            </button>
          </div>

          {latestProject && (
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[13px] font-bold text-slate-400">آخرین پروژه ذخیره‌شده</div>
                <div className="text-[14px] font-black text-slate-900 mt-0.5">{latestProject.name}</div>
                <div className="text-[13px] text-slate-500 mt-0.5">
                  {latestProject.wallCount} دیوار
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onContinueLatest('3d')}
                  className="h-11 px-3.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[13px] font-extrabold inline-flex items-center gap-1"
                >
                  <span>باز کردن در 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => onContinueLatest('2d')}
                  className="h-11 px-3.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[13px] font-extrabold inline-flex items-center gap-1"
                >
                  <span>ادامه طراحی 2D</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

