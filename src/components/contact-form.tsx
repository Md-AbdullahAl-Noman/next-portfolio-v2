'use client'

import { useState } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'

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

/* --------------------------- floating field --------------------------- */

interface FloatingFieldProps {
  id: string
  label: string
  type?: string
  textarea?: boolean
  error?: string
  register: UseFormRegisterReturn
}

const FloatingField = ({
  id,
  label,
  type = 'text',
  textarea = false,
  error,
  register,
}: FloatingFieldProps) => {
  const shared =
    'peer w-full border-b bg-transparent pt-6 pb-2.5 text-base text-foreground outline-none transition-colors duration-300 placeholder-transparent'
  const border = error
    ? 'border-rose-400/60'
    : 'border-[var(--border-strong)]'

  const labelClass = `pointer-events-none absolute left-0 top-6 origin-left text-base text-muted transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-[var(--primary)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] ${
    error ? 'peer-[:not(:placeholder-shown)]:text-rose-400/80' : 'peer-[:not(:placeholder-shown)]:text-muted'
  }`

  return (
    <div className="group relative">
      {textarea ? (
        <textarea
          {...register}
          id={id}
          placeholder=" "
          rows={4}
          className={`${shared} ${border} max-h-[260px] min-h-[110px] resize-y`}
        />
      ) : (
        <input
          {...register}
          id={id}
          type={type}
          placeholder=" "
          className={`${shared} ${border}`}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {/* gold underline that draws in on focus */}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--primary)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100" />
      {error && (
        <p className="mt-2 font-mono text-[11px] tracking-wide text-rose-400/90">
          {error}
        </p>
      )}
    </div>
  )
}

/* ------------------------------- form ------------------------------- */

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <FloatingField
          id="name"
          label="Your name"
          error={errors.name?.message}
          register={register('name')}
        />
        <FloatingField
          id="email"
          label="Email address"
          type="email"
          error={errors.email?.message}
          register={register('email')}
        />
      </div>

      <FloatingField
        id="subject"
        label="Subject"
        error={errors.subject?.message}
        register={register('subject')}
      />

      <FloatingField
        id="message"
        label="Tell me about your project or idea"
        textarea
        error={errors.message?.message}
        register={register('message')}
      />

      <Magnetic strength={0.25} className="inline-block">
        <Button type="submit" disabled={sending} className="w-full sm:w-auto">
          {sending ? 'Sending...' : 'Send message'}
          <ArrowUpRightIcon className="size-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Button>
      </Magnetic>
    </form>
  )
}

export default ContactForm
