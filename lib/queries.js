export const allEventsQuery = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    status,
    location,
    description,
    image,
    gallery
  }
`;

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    status,
    location,
    description,
    image,
    gallery
  }
`;

export const allTestimonialsQuery = `
  *[_type == "testimonial"] {
    _id,
    name,
    quote,
    image
  }
`;
