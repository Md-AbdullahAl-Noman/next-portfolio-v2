'use client'

import { useState } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const schema = yup.object({
  name: yup.string().required('Your name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Your email is required'),
  subject: yup.string().required('A subject is required'),
  message: yup.string().required('A message is required'),
})

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder-slate-500 outline-none backdrop-blur-sm transition-all duration-300 focus:bg-white/[0.05] ${
    hasError
      ? 'border-rose-500/60 focus:border-rose-400'
      : 'border-[var(--border)] focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.1)]'
  }`

const Field = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div className="space-y-1.5">
    <label className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-rose-400">{error}</p>}
  </div>
)

const ContactForm = () => {
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')

      toast.success('Message sent — I’ll get back to you soon!')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register('name')}
            placeholder="Jane Doe"
            type="text"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register('email')}
            placeholder="jane@company.com"
            type="email"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <input
          {...register('subject')}
          placeholder="Let's talk about..."
          type="text"
          className={inputClass(!!errors.subject)}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          placeholder="Tell me about your project, idea, or opportunity..."
          rows={5}
          className={`${inputClass(!!errors.message)} max-h-[280px] min-h-[120px] resize-y`}
        />
      </Field>

      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        {sending ? 'Sending...' : 'Send message'}
        <PaperAirplaneIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
      </Button>
    </form>
  )
}

export default ContactForm
