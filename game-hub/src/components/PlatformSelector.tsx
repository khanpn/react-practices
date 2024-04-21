import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFetchPlatforms } from "../hooks/useFetchPlatforms";
import { Platform } from "../models/platform";
import { useState } from "react";

interface Props {
  onSelectPlatform: (platform?: Platform) => void;
}

function PlatformSelector({ onSelectPlatform }: Props) {
  const [selectedValue, setSelectedValue] = useState("");
  const { data, error } = useFetchPlatforms([]);

  const platforms = data?.results;

  const mapValueToPlatform = (value: string) => {
    if (!platforms) return undefined;
    const index = platforms.findIndex((platform) => {
      return platform.slug === value;
    });
    if (index === -1) return undefined;

    return platforms[index];
  };

  return (
    <FormControl
      sx={{
        width: {
          xs: "100%",
          md: 290,
        },
      }}
      variant="standard"
      error={!!error}
    >
      <InputLabel id="platform-select-label">Platform</InputLabel>
      <Select
        labelId="platform-select-label"
        id="platform-select"
        value={selectedValue}
        label="Platform"
        onChange={(e) => {
          const selectedValue = e.target.value;
          onSelectPlatform(mapValueToPlatform(selectedValue));
          setSelectedValue(selectedValue);
        }}
      >
        <MenuItem key={-1} value="">
          <em>All Platforms</em>
        </MenuItem>
        {platforms?.map((platform) => (
          <MenuItem key={platform.id} value={platform.slug}>
            {platform.name}
          </MenuItem>
        ))}
      </Select>
      {!!error && (
        <FormHelperText color="error">{error.message}</FormHelperText>
      )}
    </FormControl>
  );
}

export default PlatformSelector;
