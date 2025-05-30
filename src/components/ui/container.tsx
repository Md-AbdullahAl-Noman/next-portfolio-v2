export const Container = ({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return <div className={`mx-auto max-w-6xl px-8 ${className}`}>{children}</div>
}
