import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import axios from "axios";
import {
  createTheme,
  FormControl,
  InputLabel,
  Select,
  Typography,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MuiMenuItem from "@mui/material/MenuItem";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Web from "@mui/icons-material/web";
import Telegram from "@mui/icons-material/Telegram";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useSocialStore } from "../../state/social.store";
import { getDesignTokens } from "../material_ui/theme";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function AddAccordion() {
  const [themeMode, setAddAccordion, setAddNewSocial] = useSocialStore((s) => [
    s.themMode,
    s.setAddAccordion,
    s.setAddNewSocial,
  ]);
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [direction] = useState<"ltr" | "rtl">(
    activeLocale === "fa" ? "rtl" : "ltr"
  );
  const { t } = useTranslation("common");

  const [API_URL, setAPI_URL] = useState<string>("http://localhost:5001");

  const socialsInfo = [
    {
      name: [`${capitalizeFirstLetter(t("social.twitter"))}`, "twitter"],
      icon: <Twitter sx={{ fontSize: "1.3rem" }} key="twitter" />,
    },
    {
      name: [`${capitalizeFirstLetter(t("social.facebook"))}`, "facebook"],
      icon: <Facebook sx={{ fontSize: "1.3rem" }} key="facebook" />,
    },
    {
      name: [`${capitalizeFirstLetter(t("social.instagram"))}`, "instagram"],
      icon: <Instagram sx={{ fontSize: "1.3rem" }} key="instagram" />,
    },
    {
      name: [`${capitalizeFirstLetter(t("social.linkedin"))}`, "linkedin"],
      icon: <LinkedIn sx={{ fontSize: "1.3rem" }} key="linkedin" />,
    },
    {
      name: [`${capitalizeFirstLetter(t("social.website"))}`, "website"],
      icon: <Web sx={{ fontSize: "1.3rem" }} key="website" />,
    },
    {
      name: [`${capitalizeFirstLetter(t("social.telegram"))}`, "telegram"],
      icon: <Telegram sx={{ fontSize: "1.3rem" }} key="telegram" />,
    },
  ];

  const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  }));

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
  const [type, setType] = useState<string>("");
  const [open, setOpen] = useState(false);
  //   const matches1110 = useMediaQuery("(max-width:1110px)");
  //   const matches666 = useMediaQuery("(max-width:666px)");

  // const handleChangeSelect = (event: SelectChangeEvent<typeof type>) => {
  //   // console.log(event.target.name);
  //   setType(event.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeAcordion = () => {
    setAcorOpen(!acorOpen);
    setAddAccordion(false);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validationSchema = yup.object({
    type: yup.string().required("choice one of them it's mandetory"),
    link: yup
      .string()
      .min(16, capitalizeFirstLetter(t("social.min")))
      .max(40, capitalizeFirstLetter(t("social.max")))
      .url(capitalizeFirstLetter(t("social.valLink")))
      .required(capitalizeFirstLetter(t("social.linkReq"))),
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
    <MuiAccordionSummary {...props} />
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

  //   const [expanded, setExpanded] = useState<string>();
  const [acorOpen, setAcorOpen] = useState<boolean>(true);

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
    <Accordion expanded={acorOpen} key="panel1">
      <AccordionSummary
        aria-controls="panel2d-content"
        id="panel2d-header"
        // onClick={handleChangeAcordion}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: direction === "ltr" ? "flex-start" : "flex-end",
            flexDirection: direction === "ltr" ? "row" : "row",
          }}
        >
          <Typography>
            {capitalizeFirstLetter(t("social.addSocial"))}
          </Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Formik
          initialValues={{ type, link: "" }}
          onSubmit={(values) => {
            if (direction === "rtl") {
              const enName = socialsInfo.filter((item, index) => {
                const theItemFa = socialsInfo[index].name[0];
                const theItemEn = socialsInfo[index].name[1];
                return item.name[0] === theItemFa ? theItemEn : null;
              })[0].name[1];
              console.log(enName);
              values.type = enName;
            }
            axios
              .post(`${API_URL}/social`, values)
              .then((res) => {
                console.log(res);
                values.type = "";
                values.link = "";
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setAcorOpen(!acorOpen);
                setAddAccordion(false);
                setAddNewSocial(true);
              });
          }}
          validate={(values) => {
            console.log(values);
            setType(values.type);
          }}
          // validator={(values) => {}}
          // validateOnBlur={false}
          // validateOnChange={false}
          validationSchema={validationSchema}
        >
          {(props: {
            values: any;
            touched: any;
            errors: any;
            dirty: any;
            isSubmitting: any;
            handleChange: any;
            handleBlur: any;
            handleSubmit: any;
            handleReset: any;
          }) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Box
                sx={{
                  my: 1,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "flex-start",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{
                    display: "flex",
                    flexDirection: direction === "rtl" ? "row-reverse" : "row",
                  }}
                >
                  <Typography component="p" variant="inherit" mb="10px">
                    {capitalizeFirstLetter(t("social.editSocial"))}{" "}
                    {t("social.twitter")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl fullWidth>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: theme.palette.primary.main,
                        py: "8px",
                      }}
                    >
                      {direction === "rtl" ? (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            color: theme.palette.primary.main,
                            columnGap: "10px",
                            pt: "8px",
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={8}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              color: theme.palette.primary.main,
                            }}
                          >
                            <ValidationTextField
                              margin="dense"
                              label={capitalizeFirstLetter(t("social.link"))}
                              required
                              variant="outlined"
                              fullWidth
                              id="link"
                              name="link"
                              autoComplete="link"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.link}
                              error={touched.link && Boolean(errors.link)}
                              helperText={touched.link && errors.link}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // autoFocus={false}
                              // autoFocus
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={4}
                            sx={{
                              pt: "8px",
                            }}
                          >
                            <Select
                              open={open}
                              name="type"
                              id="type"
                              autoComplete="type"
                              onClose={handleClose}
                              onOpen={handleOpen}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.type}
                              error={touched.type && Boolean(errors.type)}
                              fullWidth
                              style={{
                                borderRadius: "5px",
                              }}
                              input={
                                <OutlinedInput
                                  label={capitalizeFirstLetter(
                                    t("social.type")
                                  )}
                                  id="demo-controlled-open-select-input"
                                />
                              }
                              renderValue={(selected) => selected.toString()}
                            >
                              {socialsInfo.map((social) => (
                                <MenuItem
                                  value={social.name[0]}
                                  key={social.name[1]}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    textAlign: "right",
                                  }}
                                >
                                  <ListItemIcon>{social.icon}</ListItemIcon>
                                  <ListItemText>{social.name[0]}</ListItemText>
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            color: theme.palette.primary.main,
                            columnGap: "10px",
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{
                              pt: "8px",
                            }}
                          >
                            <InputLabel id="demo-controlled-open-select-label">
                              {capitalizeFirstLetter(t("social.type"))}
                            </InputLabel>
                            <Select
                              name="type"
                              id="type"
                              autoComplete="type"
                              open={open}
                              onClose={handleClose}
                              onOpen={handleOpen}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.type}
                              error={touched.type && Boolean(errors.type)}
                              fullWidth
                              style={{
                                borderRadius: "5px",
                              }}
                              input={
                                <OutlinedInput
                                  label={capitalizeFirstLetter(
                                    t("social.type")
                                  )}
                                  id="demo-controlled-open-select-input"
                                />
                              }
                              renderValue={(selected) => selected.toString()}
                            >
                              {socialsInfo.map((social) => (
                                <MenuItem
                                  value={social.name[0].toLowerCase()}
                                  key={social.name[1]}
                                >
                                  <ListItemIcon>{social.icon}</ListItemIcon>
                                  <ListItemText>{social.name[0]}</ListItemText>
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={8}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              color: theme.palette.primary.main,
                            }}
                          >
                            <ValidationTextField
                              margin="dense"
                              label={capitalizeFirstLetter(t("social.link"))}
                              required
                              variant="outlined"
                              fullWidth
                              name="link"
                              id="link"
                              autoComplete="link"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.link}
                              error={touched.link && Boolean(errors.link)}
                              helperText={touched.link && errors.link}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      sx={{
                        display: "flex",
                        flexDirection:
                          direction === "rtl" ? "row-reverse" : "row",
                        alignItems: "center",
                        columnGap: "10px",
                        justifyContent:
                          direction === "rtl" ? "flex-end" : "flex-end",
                        my: 1,
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        sm={1}
                        md={3}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent:
                            direction === "ltr" ? "flex-end" : "flex-start",
                        }}
                      >
                        <Button
                          variant="outlined"
                          style={{ fontSize: "10px", width: "45px" }}
                          onClick={handleChangeAcordion}
                          id="panel1cls"
                          color="error"
                        >
                          {capitalizeFirstLetter(t("social.cancel"))}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          variant="contained"
                          style={{
                            fontSize: "10px",
                            width: "100%",
                            backgroundColor: theme.palette.primary.main,
                            color:
                              themeMode === "dark"
                                ? theme.palette.text.primary
                                : "white",
                          }}
                        >
                          {capitalizeFirstLetter(t("social.addSocial"))}{" "}
                          {t("social.twitter")}
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                {/* <Button
                  type="submit"
                  variant="contained"
                  style={{
                    fontSize: "10px",
                    width: "100%",
                    backgroundColor: theme.palette.primary.main,
                    color:
                      themeMode === "dark"
                        ? theme.palette.text.primary
                        : "white",
                  }}
                >
                  {capitalizeFirstLetter(t("social.addSocial"))}
                  {t("social.twitter")}
                </Button> */}
              </Box>
            );
          }}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
}