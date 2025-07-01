/* eslint-disable array-bracket-newline*/

export const menuData = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about-us" },
  { title: "Programs", path: "/programs" },
  { title: "Events", path: "/events" },
  {
    title: "Facilities",
    path: "/facilities",
    submenu: [
      { title: "Step", path: "/facilities" },
      { title: "Nidhi-Prayas", path: "/facilities/nidhi-prayas" },
    ],
  },
  { title: "Internship", path: "/internship" },
  { title: "Resources", path: "/news-blogs" },
  {
    title: "Founder's School",
    path: "/founder-fundamentals",
    submenu: [
      { title: "Founder's Fundamentals", path: "/founder-fundamentals" },
    ],
  },
];
// Footer Data
export const discoverData = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about-us" },
  { title: "Programs", path: "/programs" },
  { title: "Events", path: "/events" },
];
export const exploreData = [
  { title: "Internship", path: "/internship" },
  { title: "Facilities", path: "/facilities" },
  { title: "News & Blogs", path: "/news-blogs", notify: "New" },
];
export const otherLinks = [
  { title: "Terms", path: "/terms-and-condition" },
  { title: "Privacy", path: "/privacy-policy" },
];
