import { createClient } from '@supabase/supabase-js'

// استخدمي أسماء متغيرات البيئة الخاصة بـ React
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

// إنشاء client
export const supabase = createClient(supabaseUrl, supabaseKey)
