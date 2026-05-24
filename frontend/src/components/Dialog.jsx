import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Dialog({
  isOpen,
  title,
  description,
  children,
  actions,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-description' : undefined}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <h3 id="dialog-title">{title}</h3>
            {description ? (
              <p id="dialog-description" className="modal-description">
                {description}
              </p>
            ) : null}
          </div>

          <button type="button" className="icon-button" onClick={onClose}>
            ×
          </button>
        </header>

        {children}
        {actions}
      </section>
    </div>,
    document.body,
  )
}
