import { Box, BoxProps } from "@mui/material";
import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<any> {
  sx?: BoxProps["sx"];
}

const Image = ({ ...props }: ImageProps) => {
  return <Box component="img" {...props} />;
};

export default Image;
