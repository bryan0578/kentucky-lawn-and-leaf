'use client'

import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  CONTACT_METHODS,
  PROPERTY_TYPES,
  QUOTE_SERVICES,
  quoteRequestDefaultValues,
  quoteRequestSchema,
  type QuoteRequestValues,
} from '@/lib/quote-form-schema'
import { submitQuoteRequest } from '@/lib/submit-quote-request'
import { COMPANY, QUOTE_FORM } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const inputClassName =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50'

const errorInputClassName =
  'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20'

type FormStatus = 'idle' | 'submitting' | 'error'

interface QuoteRequestFormProps {
  showTitle?: boolean
  className?: string
}

export function QuoteRequestForm({
  showTitle = true,
  className,
}: QuoteRequestFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const successAlertRef = useRef<HTMLDivElement>(null)
  const errorAlertRef = useRef<HTMLDivElement>(null)
  const formTopRef = useRef<HTMLDivElement>(null)
  const isSubmittingRef = useRef(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm<QuoteRequestValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: quoteRequestDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  })

  const preferredContactMethod = watch('preferredContactMethod')
  const phoneRequired =
    preferredContactMethod === 'Phone' || preferredContactMethod === 'Text'
  const emailRequired = preferredContactMethod === 'Email'
  const isSubmitting = status === 'submitting'
  const hasClientErrors = Object.keys(errors).length > 0

  function scrollToAlert(element: HTMLElement | null) {
    requestAnimationFrame(() => {
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      element?.focus()
    })
  }

  function clearAlerts() {
    setErrorMessage('')
    setSuccessMessage('')
    if (status === 'error') {
      setStatus('idle')
    }
  }

  async function onSubmit(values: QuoteRequestValues) {
    if (isSubmittingRef.current) return

    isSubmittingRef.current = true
    setStatus('submitting')
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const result = await submitQuoteRequest({
        ...values,
        message: values.message?.trim() || undefined,
      })

      if (result.success) {
        reset(quoteRequestDefaultValues)
        setSuccessMessage(result.message)
        setStatus('idle')
        scrollToAlert(successAlertRef.current)
        return
      }

      setStatus('error')
      setErrorMessage(result.error)
      scrollToAlert(errorAlertRef.current)
    } finally {
      isSubmittingRef.current = false
    }
  }

  function onInvalidSubmit() {
    setStatus('idle')
    setErrorMessage('')
    setSuccessMessage('')

    requestAnimationFrame(() => {
      const firstInvalid = document.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      )
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstInvalid?.focus()
    })
  }

  return (
    <div ref={formTopRef} className={cn('relative', className)}>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        noValidate
        aria-busy={isSubmitting}
        className="flex flex-col gap-4"
      >
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {isSubmitting && QUOTE_FORM.submittingLabel}
          {successMessage &&
            `${QUOTE_FORM.successTitle} ${successMessage}`}
          {status === 'error' && errorMessage}
        </div>

        {showTitle && (
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {QUOTE_FORM.title}
          </h3>
        )}

        {successMessage && (
          <div
            ref={successAlertRef}
            id="quote-form-success"
            role="status"
            tabIndex={-1}
            className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-4 text-sm shadow-sm outline-none ring-1 ring-primary/10"
          >
            <CheckCircle2
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">
                {QUOTE_FORM.successTitle}
              </p>
              <p className="mt-1 text-pretty leading-relaxed text-muted-foreground">
                {successMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage('')}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss success message"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        )}

        {status === 'error' && errorMessage && (
          <div
            ref={errorAlertRef}
            role="alert"
            tabIndex={-1}
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-4 text-sm shadow-sm outline-none ring-1 ring-destructive/10"
          >
            <AlertCircle
              className="mt-0.5 size-5 shrink-0 text-destructive"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-destructive">
                {QUOTE_FORM.errorTitle}
              </p>
              <p className="mt-1 text-pretty leading-relaxed text-destructive/90">
                {errorMessage}
              </p>
              <p className="mt-2 text-pretty text-destructive/80">
                {QUOTE_FORM.errorHelpText}{' '}
                <a
                  href={COMPANY.phoneHref}
                  className="font-semibold underline underline-offset-2 hover:text-destructive"
                >
                  {COMPANY.phone}
                </a>
              </p>
            </div>
            <button
              type="button"
              onClick={clearAlerts}
              className="shrink-0 rounded-md p-1 text-destructive/70 transition-colors hover:text-destructive"
              aria-label="Dismiss error message"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        )}

        {hasClientErrors && !isSubmitting && status !== 'error' && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            Please fix the highlighted fields before submitting.
          </div>
        )}

        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-4 border-0 p-0 disabled:pointer-events-none disabled:opacity-60"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={QUOTE_FORM.fields.name.label}
              htmlFor="name"
              error={errors.name?.message}
              required
            >
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={QUOTE_FORM.fields.name.placeholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={cn(
                  inputClassName,
                  errors.name && errorInputClassName,
                )}
                {...register('name', { onChange: clearAlerts })}
              />
            </Field>

            <Field
              label={QUOTE_FORM.fields.phone.label}
              htmlFor="phone"
              error={errors.phone?.message}
              errorId="phone-error"
              required={phoneRequired}
            >
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder={QUOTE_FORM.fields.phone.placeholder}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={cn(
                  inputClassName,
                  errors.phone && errorInputClassName,
                )}
                {...register('phone', { onChange: clearAlerts })}
              />
            </Field>
          </div>

          <Field
            label={QUOTE_FORM.fields.email.label}
            htmlFor="email"
            error={errors.email?.message}
            errorId="email-error"
            required={emailRequired}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={QUOTE_FORM.fields.email.placeholder}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={cn(inputClassName, errors.email && errorInputClassName)}
              {...register('email', { onChange: clearAlerts })}
            />
          </Field>

          <Field
            label={QUOTE_FORM.fields.addressOrZip.label}
            htmlFor="addressOrZip"
            error={errors.addressOrZip?.message}
            errorId="addressOrZip-error"
            required
          >
            <input
              id="addressOrZip"
              type="text"
              autoComplete="street-address"
              placeholder={QUOTE_FORM.fields.addressOrZip.placeholder}
              aria-invalid={Boolean(errors.addressOrZip)}
              aria-describedby={
                errors.addressOrZip ? 'addressOrZip-error' : undefined
              }
              className={cn(
                inputClassName,
                errors.addressOrZip && errorInputClassName,
              )}
              {...register('addressOrZip', { onChange: clearAlerts })}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={QUOTE_FORM.fields.serviceNeeded.label}
              htmlFor="serviceNeeded"
              error={errors.serviceNeeded?.message}
              errorId="serviceNeeded-error"
              required
            >
              <select
                id="serviceNeeded"
                aria-invalid={Boolean(errors.serviceNeeded)}
                aria-describedby={
                  errors.serviceNeeded ? 'serviceNeeded-error' : undefined
                }
                className={cn(
                  inputClassName,
                  errors.serviceNeeded && errorInputClassName,
                )}
                {...register('serviceNeeded', { onChange: clearAlerts })}
              >
                {QUOTE_SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label={QUOTE_FORM.fields.propertyType.label}
              htmlFor="propertyType"
            >
              <select
                id="propertyType"
                className={inputClassName}
                {...register('propertyType', { onChange: clearAlerts })}
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label={QUOTE_FORM.fields.preferredContactMethod.label}
            error={errors.preferredContactMethod?.message}
            errorId="preferredContactMethod-error"
            required
          >
            <Controller
              name="preferredContactMethod"
              control={control}
              render={({ field }) => (
                <div
                  className={cn(
                    'flex flex-wrap gap-2 rounded-lg',
                    errors.preferredContactMethod &&
                      'rounded-lg ring-2 ring-destructive/30',
                  )}
                  role="group"
                  aria-label={QUOTE_FORM.fields.preferredContactMethod.label}
                  aria-invalid={Boolean(errors.preferredContactMethod)}
                  aria-describedby={
                    errors.preferredContactMethod
                      ? 'preferredContactMethod-error'
                      : undefined
                  }
                >
                  {CONTACT_METHODS.map((method) => {
                    const isActive = field.value === method

                    return (
                      <button
                        key={method}
                        type="button"
                        aria-pressed={isActive}
                        disabled={isSubmitting}
                        onClick={() => {
                          clearAlerts()
                          field.onChange(method)
                          void trigger(['phone', 'email'])
                        }}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground',
                          errors.preferredContactMethod &&
                            !isActive &&
                            'border-destructive/40',
                        )}
                      >
                        {method}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </Field>

          <Field
            label={QUOTE_FORM.fields.message.label}
            htmlFor="message"
            error={errors.message?.message}
            errorId="message-error"
          >
            <textarea
              id="message"
              rows={4}
              placeholder={QUOTE_FORM.fields.message.placeholder}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={cn(
                'w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
                errors.message && errorInputClassName,
              )}
              {...register('message', { onChange: clearAlerts })}
            />
          </Field>
        </fieldset>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            'mt-1 h-12 w-full text-base',
            isSubmitting && 'pointer-events-none',
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {QUOTE_FORM.submittingLabel}
            </>
          ) : (
            QUOTE_FORM.submitLabel
          )}
        </Button>

        {isSubmitting && (
          <p
            className="text-center text-sm font-medium text-muted-foreground"
            aria-hidden
          >
            {QUOTE_FORM.submittingLabel}
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          {QUOTE_FORM.disclaimer}
        </p>
      </form>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  required = false,
  children,
}: {
  label: string
  htmlFor?: string
  error?: string
  errorId?: string
  required?: boolean
  children: React.ReactNode
}) {
  const messageId = errorId ?? (htmlFor ? `${htmlFor}-error` : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {error && messageId && (
        <p
          id={messageId}
          className="text-xs font-medium text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
