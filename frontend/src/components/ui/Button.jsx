/**
 * Button component
 *
 * Props:
 *   variant  — 'primary' | 'secondary' | 'ghost' | 'danger'
 *   size     — 'sm' | 'md' | 'lg'
 *   loading  — show spinner and disable
 *   fullWidth
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  fullWidth = false,
  type     = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    fullWidth ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}
