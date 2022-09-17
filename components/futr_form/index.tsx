import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { createTheme, CssBaseline, Paper, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { useFurtStore } from "../../state/social.store";
import { getDesignTokens } from "../material_ui/theme";
import AddAccordion from "./tabs";

export default function Social_Component() {
  const [themeMode] = useFurtStore((s) => [s.themMode]);

  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          my: "50px",
        }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          component={Paper}
          elevation={6}
          square
          sx={{
            padding: theme.spacing(2),
            borderRadius: "25px",
          }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: theme.palette.primary.main,
              columnGap: theme.spacing(1),
              cursor: "pointer",
              flexDirection: "row-reverse",
            }}></Grid>
          <AddAccordion />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
