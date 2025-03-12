import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants/index";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "Scheduled",
        "bg-blue-600": status === "Pending",
        "bg-red-600": status === "Cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-white-500": status === "Scheduled",
          "text-blue-500": status === "Pending",
          "text-black-500": status === "Cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};