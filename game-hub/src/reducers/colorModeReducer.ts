export enum ColorMode {
  DARK = "dark",
  LIGHT = "light",
}

interface Action {
  type: "TOGGLE";
}

const colorModeReducer = (state: ColorMode, action: Action): ColorMode => {
  if (action.type === "TOGGLE") {
    const newState =
      state === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK;
    localStorage.setItem("colorMode", newState);
    return newState;
  }
  return state;
};

export default colorModeReducer;
