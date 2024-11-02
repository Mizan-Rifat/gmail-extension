import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Stack, ThemeProvider, Toolbar } from "@mui/material";
import { LogoutIcon } from "./components/base/icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TopToolbar from "./components/TopToolbar";
import theme from "./components/theme/theme";
import ProfileCard from "./components/ProfileCard";
import AttributesFormCard from "./components/AttributesFormCard";
import SignInForm from "./components/SignInForm";
import { useState } from "react";
import useCreateLead from "./services/apiHooks/useCreateLead";
import { SWRConfig } from "swr";
import MainDrawer from "./components/MainDrawer";

export interface FormValues {
  name: string;
  firstName: string;
  lastName?: string;
  email: string;
  profileImg?: string;
  opportunityStageId?: string;
  industry?: string;
  source?: string;
  priority?: string;
  tags?: { key: string }[];
}

const App = () => {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <MainDrawer open={open} handleClose={closeDrawer} />
    </ThemeProvider>
  );
};

export default App;
