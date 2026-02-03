import { NextRequest, NextResponse } from 'next/server'
import { InstagramService } from '@/lib/integrations/instagram'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=instagram_auth_failed`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=no_auth_code`)
    }

    // Generate access token
    const tokenResult = await InstagramService.generateAccessToken(code)
    
    if (tokenResult.error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=token_generation_failed`)
    }

    // Redirect back to dashboard with success
    const redirectUrl = new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000')
    redirectUrl.searchParams.set('instagram_connected', 'true')
    redirectUrl.searchParams.set('access_token', tokenResult.access_token || '')
    
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('Instagram callback error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=callback_failed`)
  }
}