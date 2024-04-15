import { SvgIcon } from "@mui/material";
import AndroidSvg from "../assets/icons/android.svg?react";
import IosSvg from "../assets/icons/ios.svg?react";
import LinuxSvg from "../assets/icons/linux.svg?react";
import MacSvg from "../assets/icons/mac.svg?react";
import NitendoSvg from "../assets/icons/nitendo.svg?react";
import PlaystationSvg from "../assets/icons/playstation.svg?react";
import WebSvg from "../assets/icons/web.svg?react";
import WindowSvg from "../assets/icons/window.svg?react";
import XboxSvg from "../assets/icons/xbox.svg?react";
import { ReactNode } from "react";

interface Props {
  variant: string;
  children?: ReactNode;
}

function PlatformIcon({ variant, children }: Props) {
  return (
    <SvgIcon
      color="primary"
      fontSize="small"
      component={variant === "more" ? "span" : "svg"}
    >
      {(variant === "pc" && <WindowSvg />) ||
        (variant === "playstation" && <PlaystationSvg />) ||
        (variant === "xbox" && <XboxSvg />) ||
        (variant === "nitendo" && <NitendoSvg />) ||
        (variant === "mac" && <MacSvg />) ||
        (variant === "linux" && <LinuxSvg />) ||
        (variant === "android" && <AndroidSvg />) ||
        (variant === "ios" && <IosSvg />) ||
        (variant === "web" && <WebSvg />) ||
        (variant === "more" && children)}
    </SvgIcon>
  );
}

export default PlatformIcon;
