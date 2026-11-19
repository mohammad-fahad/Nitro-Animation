export interface ExperienceState {
  positionX: number;
  positionY: number;
  scale: number;
  orientationZ: number;
  spin: number;
  cameraZ: number;
}

export const HORIZONTAL_ORIENTATION = Math.PI / 2;
export const VERTICAL_ORIENTATION = 0;

export const defaultExperienceState: ExperienceState = {
  positionX: 0,
  positionY: 0.16,
  scale: 0.9,
  orientationZ: HORIZONTAL_ORIENTATION,
  spin: 0,
  cameraZ: 7.6,
};

export const experienceState: ExperienceState = {
  ...defaultExperienceState,
};

export function resetExperienceState() {
  Object.assign(experienceState, defaultExperienceState);
}
