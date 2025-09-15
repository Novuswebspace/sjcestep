/* eslint-disable react/display-name */
/* eslint-disable no-extra-parens */
/* eslint-disable multiline-ternary */

"use client";
import { memo, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { PropTypes } from "prop-types";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import { menuData } from "./data";

const Header = memo(({ className, item }) => {
  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const activePaths = [
    "/news-blogs",
    "/events",
    "/programs",
    "/internship",
    "/facilities",
    "/founder-fundamentals",
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRefs.current.some((ref) => ref?.contains(event.target)))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white w-full max-w-8xl flex justify-between items-center px-4 lg:px-10 mx-auto mt-2 ${className}`}
    >
      <nav className="flex items-center gap-12 lg:gap-7">
        <Link href="/">
          <img
            src={item?.attributes?.companyLogo?.data?.attributes?.url}
            alt="step-icon"
            className="h-20 object-cover"
          />
        </Link>
        <ul className="hidden m-xl:flex items-center gap-7">
          {menuData.map((each, index) => (
            <li
              key={index}
              className={`relative group font-medium hover:text-black transition-all duration-300 ease-in-out text-base ${
                pathName === each.path ||
                (pathName.includes(each.path) &&
                  activePaths.includes(each.path))
                  ? "text-black"
                  : "text-extra-light-gray"
              }`}
              ref={(el) => (dropdownRefs.current[index] = el)}
              onMouseEnter={() => each.submenu && setActiveDropdown(index)}
              onMouseLeave={() =>
                activeDropdown === index && setActiveDropdown(null)
              }
            >
              <div className="flex items-center cursor-pointer">
                {each.submenu ? (
                  <span onClick={(e) => e.preventDefault()}>{each.title}</span>
                ) : (
                  <Link
                    href={each.path}
                    {...(each?.target ? { target: each.target } : {})}
                    {...(each?.target === "_blank"
                      ? { rel: "noopener noreferrer" }
                      : {})}
                  >
                    {each.title}
                  </Link>
                )}
                {each.submenu && (
                  <FaChevronDown className="ml-2 text-sm group-hover:text-black" />
                )}
              </div>

              {/* Submenu */}
              {each.submenu && (
                <ul
                  className={`absolute top-full left-0 mt-3 w-56 bg-white shadow-lg rounded-md border border-gray-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out ${
                    activeDropdown === index ? "opacity-100 visible" : ""
                  }`}
                >
                  {each.submenu.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      href={sub.path}
                      {...(sub?.target ? { target: sub.target } : {})}
                      {...(sub?.target === "_blank"
                        ? { rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <li className="px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out">
                        {sub.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href="/contact"
        type="button"
        className="font-semibold hover:bg-black/[0.8] hover:shadow-lg bg-black hidden m-xl:flex items-center h-11 px-4 text-white"
      >
        Book a visit
      </Link>
      <RxHamburgerMenu
        onClick={() => setSidebarOpen(true)}
        className="inline m-xl:hidden text-2xl cursor-pointer"
      />
      <MobileMenu
        item={item}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </header>
  );
});

export default Header;

Header.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
