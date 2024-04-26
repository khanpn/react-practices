import { Box, Button, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  limit?: number;
  variant?: Variant;
}

function ExpandableText({ children, limit = 250, variant = "body1" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const text = children?.toString() || "";

  const overflow = text.length >= limit;
  const displayText = overflow && !expanded ? text.slice(0, limit) : text;

  return (
    <Box>
      <Typography variant={variant} component="span">
        {displayText}
        {expanded ? "" : "..."}
        {overflow && (
          <Button
            onClick={() => setExpanded((previous) => !previous)}
            variant="text"
            sx={{ textTransform: "none", display: "inline" }}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        )}
      </Typography>
    </Box>
  );
}

export default ExpandableText;
