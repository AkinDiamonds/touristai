/**
 * Migration script to populate Supabase with places data
 * 
 * This script takes the existing static places data and inserts it into Supabase.
 * 
 * 
 * Run with: node migrate_to_supabase.js
 */

import { createClient } from '@supabase/supabase-js'
import { places } from './src/data/places.js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error(' Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migratePlaces() {
    console.log(' Starting migration...')
    console.log(` Found ${places.length} places to migrate`)

    // Transform places data for Supabase
    const transformedPlaces = places.map(place => ({
        id: place.id,
        title: place.title,
        type: place.type,
        image_url: null, // You'll need to upload images separately
        category: place.category,
        rating: place.rating,
        reviews: place.reviews,
        description: place.description,
        location: place.location,
        hours: place.hours,
        price: place.price,
        tips: place.tips
    }))

    try {
        // Insert data
        const { data, error } = await supabase
            .from('places')
            .upsert(transformedPlaces, { onConflict: 'id' })

        if (error) {
            console.error(' Migration failed:', error)
            return
        }

        console.log(' Migration successful!')
        console.log(`Inserted/Updated ${transformedPlaces.length} places`)

        // Note about images
        console.log('\n IMAGES NOTE:')
        console.log('The image_url field is set to null for all places.')
        console.log('You should:')
        console.log('1. Upload images to Supabase Storage')
        console.log('2. Get the public URLs')
        console.log('3. Update the image_url field in the database')

    } catch (err) {
        console.error(' Unexpected error:', err)
    }
}

migratePlaces()
