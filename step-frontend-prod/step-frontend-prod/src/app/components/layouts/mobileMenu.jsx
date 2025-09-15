/* eslint-disable no-extra-parens */
/* eslint-disable multiline-ternary */

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { menuData } from "./data";
import { PropTypes } from "prop-types";

// eslint-disable-next-line react/prop-types
const MobileMenu = ({ sidebarOpen, setSidebarOpen, item }) => {
  const pathName = usePathname();
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const activePaths = [
    "/news-blogs",
    "/events",
    "/programs",
    "/internship",
    "/facilities",
    "/founder-fundamentals",
  ];

  // Toggle mobile dropdown visibility
  const handleMobileDropdownToggle = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  return (
    <Dialog
      open={sidebarOpen}
      onClose={setSidebarOpen}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                <div className="flex items-center justify-between px-4 pb-4">
                  <Link href="/">
                    <img
                      src={item?.attributes?.companyLogo?.data?.attributes?.url}
                      alt="step-icon"
                      className="h-20 object-cover"
                    />
                  </Link>
                  <MdClose
                    className="h-6 w-6 text-black cursor-pointer"
                    onClick={() => setSidebarOpen(false)}
                  />
                </div>
                <div className="mt-3 sm:mt-5 pb-6">
                  <ul className="flex flex-col gap-5">
                    {menuData.map((each, index) => (
                      <li key={index} className="relative">
                        <div
                          className={`flex items-center justify-between font-semibold px-4 py-3 text-primary-black text-lg cursor-pointer ${
                            pathName === each.path ||
                            (pathName.includes(each.path) &&
                              activePaths.includes(each.path))
                              ? "bg-light-gray-sky"
                              : ""
                          }`}
                          onClick={() =>
                            each.submenu
                              ? handleMobileDropdownToggle(index)
                              : setSidebarOpen(false)
                          }
                        >
                          {/* Remove Link for Facilities */}
                          {each.submenu ? (
                            <span>{each.title}</span>
                          ) : (
                            <Link
                              href={each?.path || "#"}
                              {...(each?.target ? { target: each.target } : {})}
                              {...(each?.target === "_blank"
                                ? { rel: "noopener noreferrer" }
                                : {})}
                            >
                              <span>{each.title}</span>
                            </Link>
                          )}
                          {each.submenu && (
                            <FaChevronDown
                              className={`ml-2 transform transition-transform ${
                                activeMobileDropdown === index
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          )}
                        </div>

                        {/* Submenu */}
                        {each.submenu && activeMobileDropdown === index && (
                          <ul className="pl-8 py-1 bg-gray-50">
                            {each.submenu.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                href={sub.path}
                                {...(sub?.target ? { target: sub.target } : {})}
                                {...(sub?.target === "_blank"
                                  ? { rel: "noopener noreferrer" }
                                  : {})}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <li className="py-1.5 text-gray-700 hover:text-black text-xm cursor-pointer">
                                  {sub.title}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MobileMenu;

MobileMenu.propTypes = {
  setSidebarOpen: PropTypes.func,
  open: PropTypes.boolean,
  item: PropTypes.object,
};
