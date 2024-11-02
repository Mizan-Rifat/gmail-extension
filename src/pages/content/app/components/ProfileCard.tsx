import {
  Avatar,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import { EditIcon, SaveIcon } from "./base/icons";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./MainDrawer";

const ProfileCard = () => {
  const { watch } = useFormContext<FormValues>();

  const { name, email, profileImg } = watch();

  return (
    <Paper>
      <Stack direction="row" spacing={1} sx={{ p: 2, alignItems: "center" }}>
        <Avatar src={profileImg} sx={{ height: 48, width: 48 }} />
        <Stack sx={{ flex: 1 }}>
          <InputField defaultValue={name} name="name" />
          <InputField
            defaultValue={email}
            tooltipPlacement="bottom"
            name="email"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

interface InputFieldProps {
  defaultValue: string;
  tooltipPlacement?: TooltipProps["placement"];
  name: "name" | "email";
}

const InputField = ({
  defaultValue,
  tooltipPlacement = "top",
  name,
}: InputFieldProps) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { register } = useFormContext<FormValues>();

  return (
    <TextField
      id="name"
      size="small"
      defaultValue={defaultValue}
      inputRef={inputRef}
      slotProps={{
        input: {
          endAdornment: (
            <Tooltip
              title={editMode ? "Save" : "Edit"}
              placement={tooltipPlacement}
            >
              <IconButton
                size="small"
                onClick={() => {
                  setEditMode(!editMode);
                  inputRef.current?.focus();
                }}
              >
                {editMode ? (
                  <SaveIcon sx={{ fontSize: 14 }} />
                ) : (
                  <EditIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
            </Tooltip>
          ),
        },
      }}
      sx={{
        pointerEvents: editMode ? "auto" : "none",
        "& .MuiIconButton-root": {
          pointerEvents: "auto",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          display: editMode ? "block" : "none",
        },
      }}
      {...register(name, {
        onBlur: () => {
          setEditMode(false);
        },
      })}
    />
  );
};

export default ProfileCard;
