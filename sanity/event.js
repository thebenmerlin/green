export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'date', title: 'Date', type: 'date', validation: Rule => Rule.required() },
    { name: 'location', title: 'Location', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', validation: Rule => Rule.required() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Upcoming', value: 'Upcoming' }, { title: 'Past', value: 'Past' }] } },
  ],
};