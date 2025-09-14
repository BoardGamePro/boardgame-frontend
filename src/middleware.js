import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing, {
  localeDetection: true,
  cookies: {
    locale: 'NEXT_LOCALE',
  },
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
