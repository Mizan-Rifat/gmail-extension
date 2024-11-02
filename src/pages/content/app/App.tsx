import { useRef } from "react";
import MainDrawer from "./components/MainDrawer";
import { EmailDetails } from "./types";

interface AppProps {
  open: boolean;
  handleClose: () => void;
  emailDetails: EmailDetails;
}

const App = ({ open, handleClose, emailDetails }: AppProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      <MainDrawer
        open={open}
        handleClose={handleClose}
        containerRef={ref}
        emailDetails={emailDetails}
      />
    </div>
  );
};

export default App;
