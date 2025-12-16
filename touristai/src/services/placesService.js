import { supabase } from '../lib/supabaseClient'

// Fetch all places from Supabase
export const fetchPlaces = async () => {
    try {
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .order('rating', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching places:', error)
        return []
    }
}

// Fetch places by category
export const fetchPlacesByCategory = async (category) => {
    try {
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .eq('category', category)
            .order('rating', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching places by category:', error)
        return []
    }
}

// Fetch single place by ID
export const fetchPlaceById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching place:', error)
        return null
    }
}

// Search places by query
export const searchPlaces = async (query) => {
    try {
        const { data, error } = await supabase
            .from('places')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error searching places:', error)
        return []
    }
}
