import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { FOOTER_COMPANY_LINKS, ROUTES, serviceRoute } from '@/lib/constants'
import { COMPANY, FOOTER, SERVICES } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              {FOOTER.contactNote}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={serviceRoute(service.slug)}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/75">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Get in touch
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/75">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 text-gold" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-gold" />
                {COMPANY.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>{FOOTER.legalLine}</p>
        </div>
      </div>
    </footer>
  )
}
