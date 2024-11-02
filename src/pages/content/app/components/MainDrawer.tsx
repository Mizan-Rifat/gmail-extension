import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CircularProgress, Stack, Toolbar } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useCreateLead from "../services/apiHooks/useCreateLead";
import TopToolbar from "./TopToolbar";
import ProfileCard from "./ProfileCard";
import AttributesFormCard from "./AttributesFormCard";
import SignInForm from "./SignInForm";
import { LogoutIcon } from "./base/icons";
import Backdrop from "./base/Backdrop";
import Snackbar from "./base/Snackbar";
import useFetchLeadAttributes from "../services/apiHooks/useFetchLeadAttributes";
import { removeStorageValue } from "../services/utils";
import { EmailDetails } from "../types";

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

interface MainDrawerProps {
  open: boolean;
  handleClose: () => void;
  containerRef: React.MutableRefObject<HTMLDivElement>;
  emailDetails: EmailDetails;
}

const MainDrawer = ({
  open,
  handleClose,
  emailDetails,
  containerRef,
}: MainDrawerProps) => {
  console.log({ containerRef });

  const [snackbarOptions, setSnackbarOptions] = useState<{
    message: string;
    severity: "success" | "error" | "warning" | "info";
  } | null>(null);
  const { data, isLoading, mutate } = useFetchLeadAttributes(true, {
    onError: (error) => {
      if (error.status === 403) {
        setSnackbarOptions({
          message: error.data.message,
          severity: "error",
        });
      }
      console.log(error);
    },
  });

  const { trigger, isMutating } = useCreateLead();

  const methods = useForm<FormValues>({
    defaultValues: {
      profileImg: `https:${emailDetails.avatar}`,
      name: emailDetails.name,
      email: emailDetails.email,
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const nameSplit = data.name.split(" ");

    data.firstName = nameSplit[0];
    data.lastName = nameSplit.slice(1).join(" ");
    const { name, ...formValues } = data;

    try {
      await trigger({ data: formValues });

      setSnackbarOptions({
        message: "Successfully added.",
        severity: "success",
      });

      reset();
      handleClose();
    } catch (error: any) {
      setSnackbarOptions({ message: error?.data?.message, severity: "error" });
    }
  };

  return (
    <FormProvider {...methods}>
      <Drawer
        hideBackdrop
        open={open}
        onClose={handleClose}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: 385,
            boxShadow: 3,
            borderRadius: 0,
          },
        }}
        ModalProps={{
          // container: document.querySelector("#lead-creator"),
          container: containerRef.current,
        }}
      >
        <TopToolbar handleClose={handleClose} />
        {isLoading ? (
          <Stack
            sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <>
            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              gap={2}
              sx={[
                { p: 3, flex: 1 },
                !data && {
                  justifyContent: "space-between",
                },
              ]}
            >
              <ProfileCard />

              {data ? (
                <>
                  <AttributesFormCard />
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disableElevation
                  >
                    Save Contact
                  </Button>
                </>
              ) : (
                <>
                  <SignInForm />
                  <div />
                </>
              )}
            </Stack>
            {data && (
              <Toolbar sx={{ justifyContent: "flex-end", px: 3 }}>
                <Button
                  variant="text"
                  disableElevation
                  startIcon={
                    <LogoutIcon sx={{ fontSize: "14px !important" }} />
                  }
                  onClick={async () => {
                    mutate(null, false);
                    removeStorageValue("api_key");
                  }}
                >
                  Logout
                </Button>
              </Toolbar>
            )}
            <Backdrop open={isMutating} />
            <Snackbar
              open={!!snackbarOptions}
              handleClose={() => setSnackbarOptions(null)}
              {...snackbarOptions}
            />
          </>
        )}
      </Drawer>
    </FormProvider>
  );
};

export default MainDrawer;
