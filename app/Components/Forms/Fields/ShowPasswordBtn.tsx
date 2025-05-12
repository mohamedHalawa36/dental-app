import EyeClose from "~/Components/icons/EyeClose";
import EyeOpen from "~/Components/icons/EyeOpen";
import { cn } from "~/lib/utils";

type ShowPassBtnProps = {
  isShown: boolean;
  handleClick: () => void;
  disabled?: boolean;
};

const ShowPasswordBtn = ({
  isShown,
  handleClick,
  disabled,
}: ShowPassBtnProps) => {
  return (
    <button
      type="button"
      className="show-pass-btn order-2"
      onClick={handleClick}
      disabled={disabled}
    >
      {isShown ? (
        <EyeClose
          className={cn("h-5 w-6", {
            "stroke-gray-300": disabled,
          })}
        />
      ) : (
        <EyeOpen
          className={cn("h-5 w-6", {
            "stroke-gray-300": disabled,
          })}
        />
      )}
    </button>
  );
};

export default ShowPasswordBtn;
