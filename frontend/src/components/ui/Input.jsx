/**
 * Input component — wraps a labelled, validated form field.
 *
 * Works for <input>, <select>, and <textarea> via the `as` prop.
 */
export default function Input({
  label,
  error,
  hint,
  id,
  as: Tag = 'input',
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="field field--full">
      {label && (
        <label className="field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <Tag
        id={inputId}
        className={`field__input ${error ? 'field__input--error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="field__error" role="alert">{error}</span>}
      {hint && !error && <span className="field__hint">{hint}</span>}
    </div>
  )
}
