import { createTheme, Paper, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSocialStore } from "../state/social.store";
import { getDesignTokens } from "./material_ui/theme";
import LightBulb from "@mui/icons-material/LightModeTwoTone";
import DrakMode from "@mui/icons-material/DarkModeTwoTone";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useSocialStore((s) => [
    s.themMode,
    s.setThemeMode,
  ]);
  const { locales, locale: activeLocale } = router;
  const [direction, setDirection] = useState<"ltr" | "rtl">(
    activeLocale === "fa" ? "rtl" : "ltr"
  );
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode, direction)),
    [themeMode]
  );

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={8}
      component={Paper}
      elevation={6}
      square
      sx={{
        padding: theme.spacing(2, 6),
        display: "flex",
        flexDirection: activeLocale === "fa" ? "row-reverse" : "row",
        columnGap: theme.spacing(2),
        justifyContent: "flex-start",
      }}
    >
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span key={"locale-" + locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a>
                {locale === "en" ? "English" : locale === "fa" ? "فارسی" : null}
              </a>
            </Link>
          </span>
        );
      })}
      {themeMode === "light" ? (
        <Typography
          component="h5"
          variant="subtitle1"
          onClick={() => setThemeMode("dark")}
        >
          <DrakMode />
        </Typography>
      ) : (
        <Typography
          component="h5"
          variant="subtitle1"
          onClick={() => setThemeMode("light")}
        >
          <LightBulb color="primary" />
        </Typography>
      )}
    </Grid>
  );
}
