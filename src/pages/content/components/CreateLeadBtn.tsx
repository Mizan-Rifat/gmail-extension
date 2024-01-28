import { useState } from "react";
import { EmailDetails } from ".";
import Offcanvas from "./Offcanvas";
import { PlusIcon } from "./icons";

const CreateLeadBtn = ({ emailDetails }: { emailDetails: EmailDetails }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-20 right-20 h-10 p-4 z-[1000] inline-flex justify-center items-center rounded-full border bg-blue-500 text-white hover:bg-blue-600 text-sm"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="w-4 h-4 mr-1" />
        Add New Lead
      </button>

      <Offcanvas emailDetails={emailDetails} open={open} setOpen={setOpen} />
    </>
  );
};
export default CreateLeadBtn;
