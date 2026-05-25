import { Dialog } from './Dialog'

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  isConfirming,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      actions={
        <footer className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={isConfirming}
          >
            Отмена
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            { isConfirming ? 'Удаление...' : confirmLabel }
          </button>
        </footer>
      }
    >
    </Dialog>
  )
}
