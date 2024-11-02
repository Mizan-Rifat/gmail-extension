import { Button, ThemeProvider } from "@mui/material";
import theme from "./components/theme/theme";
import { AddIcon } from "./components/base/icons";
import { EmailDetails } from "./types";
import App from "./App";
import { useState } from "react";

const CreateLeadBtn = ({ emailDetails }: { emailDetails: EmailDetails }) => {
  console.log({ emailDetails });
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          zIndex: 1199,
          textTransform: "none",
          borderRadius: "9999px",
        }}
        startIcon={<AddIcon sx={{ mb: "1px" }} />}
        onClick={() => setOpen(true)}
      >
        Add to Onesuite
      </Button>
      <App open={open} emailDetails={emailDetails} handleClose={closeDrawer} />
    </ThemeProvider>
  );
};

export default CreateLeadBtn;
