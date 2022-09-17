import { Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useFurtStore } from "../state/social.store";
import LightBulb from "@mui/icons-material/LightModeTwoTone";
import DrakMode from "@mui/icons-material/DarkModeTwoTone";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useFurtStore((s) => [
    s.themMode,
    s.setThemeMode,
  ]);
  const { locale: activeLocale } = router;

  return (
    <Grid
      item
      xs={12}
      sm={2}
      md={2}
      sx={{
        display: "flex",
        flexDirection: activeLocale === "fa" ? "row-reverse" : "row",
        justifyContent: "flex-end",
        mr: "30px",
      }}>
      {themeMode === "light" ? (
        <Typography
          component="h5"
          variant="subtitle1"
          onClick={() => setThemeMode("dark")}>
          <DrakMode />
        </Typography>
      ) : (
        <Typography
          component="h5"
          variant="subtitle1"
          onClick={() => setThemeMode("light")}>
          <LightBulb color="primary" />
        </Typography>
      )}
    </Grid>
  );
}
