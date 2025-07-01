import { PiCirclesThreeBold } from "react-icons/pi";
import { FaFlask } from "react-icons/fa6";
import { IoCafeOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";

export const facilities = [
  {
    title: "INCUBATION",
    description: "Tailored support nurturing startup success",
    icon: <PiCirclesThreeBold className="text-light-dark-gray" />,
    imageUrl: "/images/facilities/facility/incubation.png",
  },
  {
    title: "LABORATORY",
    description: "Advanced tools for research and testing.",
    icon: <FaFlask className="text-light-dark-gray" />,
    imageUrl: "/images/facilities/facility/labaratory.png",
  },
  {
    title: "CAFETERIA",
    description: "Fresh, nutritious meals for energy",
    icon: <IoCafeOutline className="text-light-dark-gray" />,
    imageUrl: "/images/facilities/facility/cafeteria.png",
  },
  {
    title: "WiFi",
    description: "Reliable, high-speed internet access",
    icon: <FaWifi className="text-light-dark-gray" />,
    imageUrl: "/images/facilities/facility/wifi.png",
  },
  {
    title: "Conference room",
    description: "Equipped for strategic meetings and presentations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M500-780q0 33-23.5 56.5T420-700q-13 0-24-3.5T374-715q-24 8-38.5 29T321-640h519l-40 280H604v-80h127q5-30 8.5-60t8.5-60H212q5 30 8.5 60t8.5 60h127v80H160l-40-280h120q0-49 27-89t73-59q3-31 26-51.5t54-20.5q33 0 56.5 23.5T500-780ZM391-200h178l23-240H368l23 240Zm-71 80-30-312q-4-35 20-61.5t59-26.5h222q35 0 59 26.5t20 61.5l-30 312H320Z" />
      </svg>
    ),
    imageUrl: "/images/facilities/facility/labaratory.png",
  },
  {
    title: "Product Development",
    description: "Creative space for innovation and design",
    icon: <IoCubeOutline className="text-light-dark-gray" />,
    imageUrl: "/images/facilities/facility/cafeteria.png",
  },
];

export const featurePlans = [
  {
    title: "10 Acre",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis amet lorem suscipit erat morbi nibh sit diam. Nunc dolor enim pharetra.",
  },
  {
    title: "12 Floors",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis amet lorem suscipit erat morbi nibh sit diam. Nunc dolor enim pharetra.",
  },
  {
    title: "19 CR PROJRCT",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis amet lorem suscipit erat morbi nibh sit diam. Nunc dolor enim pharetra.",
  },
];
