import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useFetchLeadAttributes from "../services/apiHooks/useFetchLeadAttributes";
import { setStorageValue } from "../services/utils";

interface FormValues {
  apiKey: string;
}

const SignInForm = () => {
  const { mutate, isLoading, isValidating } = useFetchLeadAttributes();

  const loading = isLoading || isValidating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setStorageValue({ api_key: data.apiKey });
    mutate();
  };

  return (
    <Stack spacing={2} sx={{ mb: 12 }}>
      <Alert severity="error" sx={{ mb: "40px !important" }}>
        <AlertTitle>You need to sign in to OneSuite.</AlertTitle>
        <Stack justifyContent="flex-end">
          <Link
            color="primary"
            href="https://onesuite.io/docs/installing-and-using-onesuite-lead-grabber/"
            target="_blank"
          >
            Learn How
          </Link>
        </Stack>
      </Alert>
      <TextField
        id="name"
        fullWidth
        placeholder="Enter your API key"
        error={!!errors.apiKey}
        helperText={errors.apiKey ? String(errors.apiKey.message) : ""}
        sx={[
          {
            "& .MuiInputBase-input": {
              padding: "7px 14px",
            },
          },
          loading && {
            opacity: 0.5,
            pointerEvents: "none",
          },
        ]}
        {...register("apiKey", {
          required: "API Key is required",
        })}
      />
      <Button
        variant="contained"
        type="button"
        fullWidth
        disableElevation
        sx={{
          textTransform: "none",
        }}
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        endIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        Sign in to OneSuite
      </Button>
    </Stack>
  );
};

export default SignInForm;
