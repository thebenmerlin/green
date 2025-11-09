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