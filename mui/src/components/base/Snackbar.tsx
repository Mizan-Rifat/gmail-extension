import MuiSnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";

interface SnackbarProps {
  open: boolean;
  handleClose: () => void;
  message?: string;
  severity?: "success" | "error" | "warning" | "info";
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const Snackbar = ({ open, handleClose, message, severity }: SnackbarProps) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
