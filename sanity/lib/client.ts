import { createClient } from 'next-sanity'

// PENTING: Import variabel dari file '../env' yang sudah kita hardcode
import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})