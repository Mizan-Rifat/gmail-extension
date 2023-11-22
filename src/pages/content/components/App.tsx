import { useState } from "react";
import { EmailDetails } from ".";
import Offcanvas from "./Offcanvas";

export default function App({ emailDetails }: { emailDetails: EmailDetails }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-20 right-20 h-10 w-10  z-[1000] inline-flex justify-center items-center rounded-full border bg-blue-500 text-gray-200 hover:bg-blue-600 text-3xl "
        onClick={() => setOpen(true)}
      >
        +
      </button>

      <Offcanvas emailDetails={emailDetails} open={open} setOpen={setOpen} />
    </>
  );
}
