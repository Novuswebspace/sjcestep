export const generateUrlEndpoint = (location) => {
  if (location === "All") return "internship-courses?populate=*";

  return `internship-courses?filters[InternshipData][place][$eq]=${location}&populate=*`;
};
