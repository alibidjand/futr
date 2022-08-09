import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  createTheme,
  CssBaseline,
  Paper,
  SelectChangeEvent,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Add from "@mui/icons-material/Add";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useSocialStore } from "../../state/social.store";
import { getDesignTokens } from "../material_ui/theme";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LocaleSwitcher from "../locale-switcher";
import AddAccordion from "./add-social";
import EditAccordion from "./edit-social";

export default function Social_Component() {
  const [themeMode, addAccordion, setAddAccordion] = useSocialStore((s) => [
    s.themMode,
    s.addAccordion,
    s.setAddAccordion,
  ]);
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [direction, setDirection] = useState<"ltr" | "rtl">(
    activeLocale === "fa" ? "rtl" : "ltr"
  );

  const { t } = useTranslation("common");

  useEffect(() => {
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode, direction)),
    [themeMode]
  );
  const [age, setAge] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const matches1110 = useMediaQuery("(max-width:1110px)");
  const matches666 = useMediaQuery("(max-width:666px)");

  const handleChangeSelect = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 6 characters")
      .max(16, "Password must be less than 20 characters")
      .required("Password is required"),
  });

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      // expandIcon={<Twitter sx={{ fontSize: "1.3rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(360deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const [expanded, setExpanded] = useState<string>();
  const [acorOpen, setAcorOpen] = useState<boolean>(false);

  // const handleChangeAcordion = (event: SyntheticEvent) => {
  //   const id = event.currentTarget.id as string;
  //   const panel = id.slice(0, id.length - 3) as string;
  //   const condition = id.slice(-3) as string;
  //   if (condition === "opn") {
  //     setAcorOpen(!acorOpen);
  //     setExpanded(panel);
  //   }
  //   if (condition === "cls") {
  //     setAcorOpen(false);
  //     setExpanded("");
  //   }
  // };

  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: theme.palette.success.main,
      borderWidth: 1,
      borderRadius: 5,
    },
    "& input:invalid + fieldset": {
      borderColor: theme.palette.grey[400],
      borderWidth: 1,
      borderRadius: 5,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important",
      borderRadius: 5,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <CssBaseline />
        {LocaleSwitcher()}
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          component={Paper}
          elevation={6}
          square
          sx={{
            padding: matches666 ? theme.spacing(2) : theme.spacing(2, 6),
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              py: theme.spacing(1),
              display: "flex",
              flexDirection: direction === "rtl" ? "row-reverse" : "row",
            }}
          >
            <Typography variant="caption" gutterBottom>
              {capitalizeFirstLetter(t("social.socials"))}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              py: theme.spacing(2),
              color: theme.palette.primary.main,
              columnGap: theme.spacing(1),
              cursor: "pointer",
              flexDirection: direction === "rtl" ? "row-reverse" : "row",
            }}
          >
            <Add
              style={{
                color: theme.palette.primary.main,
              }}
              onClick={() => {
                setAddAccordion(true);
              }}
            />
            <Typography
              variant="caption"
              onClick={() => {
                setAddAccordion(true);
              }}
            >
              {capitalizeFirstLetter(t("social.addSocial"))}
            </Typography>
          </Grid>
          {addAccordion ? <AddAccordion /> : ""}
          <EditAccordion />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
