import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.40) !important",
            },
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${palette.primary.main} !important`,
            },
          },
        }),

        inputSizeSmall: {
          padding: "4px 10px",
          fontSize: 14,
        },
      },
    },
  },
});

export default theme;
