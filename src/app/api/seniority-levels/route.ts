// app/api/seniority-levels/route.ts (for Next.js 13+/app router)

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase.from('seniority_levels').select('*')
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
