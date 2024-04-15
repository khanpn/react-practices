import { Chip } from "@mui/material";

interface Props {
  score: number;
}

function CriticScore({ score }: Props) {
  const color = score >= 90 ? "success" : score >= 80 ? "warning" : "error";
  return <Chip label={score} color={color} variant="filled" />;
}

export default CriticScore;
