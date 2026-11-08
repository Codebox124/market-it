// schemaTypes/post.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    // Language Field (Core logic for localization)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'French', value: 'fr' },
          { title: 'Portuguese', value: 'pt' },
          { title: 'Spanish', value: 'es' },
          { title: 'Mandarin', value: 'zh' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array', // Rich Text (Block Content)
      of: [{ type: 'block' }],
    }),

    // --- NEW: SEO FIELDS ---
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'The title that appears in Google search results. If left empty, the main Title will be used.',
      validation: (Rule) => Rule.max(60).warning('Google typically truncates titles longer than 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3, 
      description: 'A short description appearing below the title in Google search results.',
      validation: (Rule) => Rule.max(160).warning('Google typically truncates descriptions longer than 160 characters.'),
    }),
  ],
})