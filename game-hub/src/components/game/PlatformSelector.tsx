import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFetchPlatforms } from "../../hooks/useFetchPlatforms";
import { useGameQueryStore } from "../../store";

function PlatformSelector() {
  const { data: platforms, error } = useFetchPlatforms([]);
  const selectedPlatforms = useGameQueryStore(
    (state) => state.gameQuery.platforms
  );
  const setSelectedPlatforms = useGameQueryStore((state) => state.setPlatforms);

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
        value={selectedPlatforms ? selectedPlatforms[0] : ""}
        label="Platform"
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedPlatforms(selectedValue ? [selectedValue] : undefined);
        }}
      >
        <MenuItem key={-1} value="">
          <em>All Platforms</em>
        </MenuItem>
        {platforms?.map((platform) => (
          <MenuItem key={platform.id} value={platform.id}>
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
