import { SvgIcon, Typography, useTheme } from "@mui/material";
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
  const {
    palette: { background, text },
  } = useTheme();
  return (
    <SvgIcon
      sx={{ fontSize: 16 }}
      component={variant === "more" ? "span" : "svg"}
    >
      {(variant === "pc" && (
        <WindowSvg fill={text.primary} stroke={background.default} />
      )) ||
        (variant === "playstation" && (
          <PlaystationSvg fill={text.primary} stroke={background.default} />
        )) ||
        (variant === "xbox" && (
          <XboxSvg fill={text.primary} stroke={background.default} />
        )) ||
        (variant === "nintendo" && (
          <NitendoSvg fill={text.primary} stroke={text.primary} />
        )) ||
        (variant === "mac" && (
          <MacSvg fill={text.primary} stroke={background.default} />
        )) ||
        (variant === "linux" && (
          <LinuxSvg fill={background.default} stroke={text.primary} />
        )) ||
        (variant === "android" && (
          <AndroidSvg fill={text.primary} stroke={background.default} />
        )) ||
        (variant === "ios" && (
          <IosSvg fill={background.default} stroke={text.primary} />
        )) ||
        (variant === "web" && (
          <WebSvg fill={text.primary} stroke={text.primary} />
        )) ||
        (variant === "more" && (
          <Typography color={text.primary} variant="body2">
            {children}
          </Typography>
        ))}
    </SvgIcon>
  );
}

export default PlatformIcon;
