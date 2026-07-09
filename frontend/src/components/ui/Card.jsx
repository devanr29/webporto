/**
 * Card component
 *
 * Props:
 *   title   — renders a card header with the title
 *   actions — renders buttons/controls in the header right side
 *   flush   — removes body padding (useful for tables)
 */
export default function Card({ children, title, actions, flush = false, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || actions) && (
        <div className="card__header">
          {title   && <h3 className="card__title">{title}</h3>}
          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}
      <div className={flush ? 'card__body card__body--flush' : 'card__body'}>
        {children}
      </div>
    </div>
  )
}
