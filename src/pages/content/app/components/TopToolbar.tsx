import { IconButton, Link, Toolbar } from "@mui/material";
import logo from "../assets/images/logo.png";
import Image from "./base/Image";
import { CloseIcon } from "./base/icons";

const TopToolbar = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
      <Link href="hhttps://app.onesuite.io" target="_blank" rel="noreferrer">
        <Image src={chrome.runtime.getURL(logo)} width={150} />
      </Link>
      <IconButton onClick={handleClose}>
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Toolbar>
  );
};

export default TopToolbar;
