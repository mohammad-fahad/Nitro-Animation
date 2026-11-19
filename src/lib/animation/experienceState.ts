export interface CanVisualState {
  positionX: number;
  positionY: number;
  positionZ: number;
  scale: number;
  orientationZ: number;
  spin: number;
}

export interface ExperienceState extends CanVisualState {
  cameraZ: number;
}

export const HORIZONTAL_ORIENTATION = -Math.PI / 2;
export const VERTICAL_ORIENTATION = 0;

export const defaultExperienceState: ExperienceState = {
  positionX: 0,
  positionY: 0.16,
  positionZ: 0,
  scale: 0.8,
  orientationZ: HORIZONTAL_ORIENTATION,
  spin: 0,
  cameraZ: 7.6,
};

export const experienceState: ExperienceState = {
  ...defaultExperienceState,
};

export const lineupState = {
  progress: 0,
};

export function resetExperienceState() {
  Object.assign(experienceState, defaultExperienceState);
  lineupState.progress = 0;
}
