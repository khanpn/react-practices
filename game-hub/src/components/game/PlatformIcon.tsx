import { SvgIcon, Typography, useTheme } from "@mui/material";
import AndroidSvg from "../../assets/icons/android.svg?react";
import IosSvg from "../../assets/icons/ios.svg?react";
import LinuxSvg from "../../assets/icons/linux.svg?react";
import MacSvg from "../../assets/icons/mac.svg?react";
import NitendoSvg from "../../assets/icons/nitendo.svg?react";
import PlaystationSvg from "../../assets/icons/playstation.svg?react";
import WebSvg from "../../assets/icons/web.svg?react";
import WindowSvg from "../../assets/icons/window.svg?react";
import XboxSvg from "../../assets/icons/xbox.svg?react";
import { ReactNode } from "react";

interface Props {
  variant: string;
  children?: ReactNode;
}

function PlatformIcon({ variant, children }: Props) {
  const {
    palette: {
      background: { paper: bgcolor },
      text: { primary: textColor },
    },
  } = useTheme();
  return (
    <SvgIcon
      sx={{ fontSize: 16 }}
      component={variant === "more" ? "span" : "svg"}
    >
      {(variant === "pc" && <WindowSvg fill={textColor} stroke={bgcolor} />) ||
        (variant === "playstation" && (
          <PlaystationSvg fill={textColor} stroke={bgcolor} />
        )) ||
        (variant === "xbox" && <XboxSvg fill={textColor} stroke={bgcolor} />) ||
        (variant === "nintendo" && (
          <NitendoSvg fill={textColor} stroke={bgcolor} />
        )) ||
        (variant === "mac" && <MacSvg fill={textColor} stroke={bgcolor} />) ||
        (variant === "linux" && (
          <LinuxSvg fill={bgcolor} stroke={textColor} />
        )) ||
        (variant === "android" && (
          <AndroidSvg fill={textColor} stroke={bgcolor} />
        )) ||
        (variant === "ios" && <IosSvg fill={bgcolor} stroke={textColor} />) ||
        (variant === "web" && <WebSvg fill={textColor} stroke={textColor} />) ||
        (variant === "more" && (
          <Typography color={textColor} variant="body2">
            {children}
          </Typography>
        ))}
    </SvgIcon>
  );
}

export default PlatformIcon;
