import MuiBackdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Backdrop = ({ open }: { open: boolean }) => {
  return (
    <MuiBackdrop
      sx={(theme) => ({
        position: "absolute",
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
