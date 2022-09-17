import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import {
  createTheme,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  FormControlLabelProps,
  useRadioGroup,
  RadioGroup,
  Radio,
} from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useFurtStore } from "../../state/social.store";
import { getDesignTokens } from "../material_ui/theme";
import LocaleSwitcher from "../locale-switcher";
import axios from "axios";
import { fetchFutrInfo } from "./api";

export default function AddAccordion() {
  const [themeMode, InitialFormData, SetInitialFormData] = useFurtStore((s) => [
    s.themMode,
    s.initialFormData,
    s.setInitialFormData,
  ]);

  useEffect(() => {
    console.log(InitialFormData);
  }, [InitialFormData]);

  const [tabValue, setTabValue] = useState("1");

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/305675c1-5cb0-4ebc-a351-d55a02fb504a")
      .then((res) => {
        SetInitialFormData(res.data);
      });
  }, []);

  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  const validationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const Question = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    textTransform: "capitalize",
  }));

  const SubQuestion = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.disabled,
    fontSize: "12px",
    textTransform: "lowercase",
  }));

  interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
  }

  const StyledFormControlLabel = styled(
    (props: StyledFormControlLabelProps) => <FormControlLabel {...props} />
  )(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  }));

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

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
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleTabsChange} aria-label="lab API tabs example">
          <Tab
            label="General"
            value="1"
            icon={<SettingsIcon />}
            iconPosition="start"
          />
          <Tab
            label="Take Offline"
            value="2"
            icon={<HeadsetOffIcon />}
            iconPosition="start"
          />
          <Tab
            label="Block Users"
            value="3"
            icon={<DoDisturbIcon />}
            iconPosition="start"
          />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Accordion expanded={acorOpen} key="panel1" sx={{}}>
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            sx={{}}>
            <Grid
              item
              xs={12}
              sm={10}
              md={10}
              lg={10}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "ltr",
              }}>
              <Typography>General Settings</Typography>
            </Grid>
            {LocaleSwitcher()}
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              initialValues={{
                email: InitialFormData.conversationTranscripts.emailAddress,
              }}
              onSubmit={(values) => {
                // if (direction === "rtl") {
                //   const enName = socialsInfo.filter((item, index) => {
                //     const theItemFa = socialsInfo[index].name[0];
                //     const theItemEn = socialsInfo[index].name[1];
                //     return item.name[0] === theItemFa ? theItemEn : null;
                //   })[0].name[1];
                //   console.log(enName);
                //   values.type = enName;
                // }
                // axios
                //   .post(`${API_URL}/social`, values)
                //   .then((res) => {
                //     console.log(res);
                //     values.type = "";
                //     values.link = "";
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   })
                //   .finally(() => {
                //     setAcorOpen(!acorOpen);
                //     setAddAccordion(false);
                //     setAddNewSocial(true);
                //   });
              }}
              validate={(values) => {
                // console.log(values);
                // setType(values.type);
              }}
              validationSchema={validationSchema}>
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
                    }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl fullWidth>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "normal",
                            rowGap: "15px",
                            justifyContent: "flex-end",
                            my: 1,
                          }}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={10}
                              md={10}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Allow Users to download their conversations"}
                              </Question>
                              <SubQuestion>{"Web chat only"}</SubQuestion>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              md={2}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Switch
                                {...label}
                                defaultChecked={
                                  InitialFormData.conversationDownloadsEnabled
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={10}
                              md={10}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Allow Users to clear their conversations"}
                              </Question>
                              <SubQuestion>{"Web chat only"}</SubQuestion>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              md={2}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Switch
                                {...label}
                                defaultChecked={
                                  InitialFormData.conversationClearEnabled
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={10}
                              md={10}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Show live chat icon for instant connection"}
                              </Question>
                              <SubQuestion>{"Web chat only"}</SubQuestion>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              md={2}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Switch
                                {...label}
                                defaultChecked={
                                  InitialFormData.showLiveChatIcon
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={10}
                              md={10}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Request user details prior to connection"}
                              </Question>
                              <SubQuestion>
                                {"Name email or contact number , and reason"}
                              </SubQuestion>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              md={2}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Switch
                                {...label}
                                defaultChecked={
                                  InitialFormData.collectUserInfoEnabled
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={10}
                              md={10}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Recieve Transcripts by email"}
                              </Question>
                              <SubQuestion>
                                {
                                  "CVS file containing all conversations held in the selected period"
                                }
                              </SubQuestion>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              md={2}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Switch
                                {...label}
                                defaultChecked={
                                  InitialFormData.conversationTranscripts
                                    .emailEnabled
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>
                                {"Please provide an email address"}
                              </Question>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <ValidationTextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                autoComplete="link"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                pt: "8px",
                              }}>
                              <Question>{"Frequency"}</Question>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <RadioGroup
                                name="use-radio-group"
                                defaultValue={InitialFormData.conversationTranscripts.emailFrequency.toLowerCase()}
                                row>
                                <MyFormControlLabel
                                  value="daily"
                                  label="Daily"
                                  control={<Radio />}
                                />
                                <MyFormControlLabel
                                  value="weekly"
                                  label="Weekly"
                                  control={<Radio />}
                                />
                              </RadioGroup>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: "10px",
                              justifyContent: "flex-end",
                            }}>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                pt: "8px",
                              }}>
                              <Button variant="outlined">Cancel</Button>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                color: theme.palette.primary.main,
                              }}>
                              <Button variant="contained">Save Changes</Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Box>
                );
              }}
            </Formik>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  );
}
