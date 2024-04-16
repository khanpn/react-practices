import { Stack } from "@mui/material";
import { Platform } from "../models/platform";
import PlatformIcon from "./PlatformIcon";

interface Props {
  platforms: Platform[];
  maxLength?: number;
}

function PlatformIconList({ platforms, maxLength = 4 }: Props) {
  const displayItems = platforms.slice(0, maxLength);
  const remainingCount = platforms.length - maxLength;
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {displayItems.map((platform: Platform) => (
        <PlatformIcon key={platform.id} variant={platform.slug} />
      ))}
      {remainingCount > 0 && (
        <PlatformIcon key={-1} variant="more">
          +{remainingCount}
        </PlatformIcon>
      )}
    </Stack>
  );
}

export default PlatformIconList;
