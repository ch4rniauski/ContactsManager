import './ContactDetails.css'

export function ContactDetails({ contact, onEdit, onDelete }) {
  return (
    <aside className="panel detail-panel">
      <div className="panel-header">
        <div>
          <h2>Выбранный контакт</h2>
        </div>
      </div>

      { contact != null ? (
        <div className="selected-contact">
          <div className="avatar">{contact.name.slice(0, 1)}</div>
          <div className="selected-contact__body">
            <h2>{contact.name}</h2>
            <p>{contact.jobTitle}</p>
          </div>

          <dl className="detail-grid">
            <div>
              <dt>Номер телефона</dt>
              <dd>{contact.mobilePhone}</dd>
            </div>
            <div>
              <dt>Дата рождения</dt>
              <dd>{contact.birthDateLabel}</dd>
            </div>
          </dl>

          <div className="detail-actions">
            <button type="button" className="primary-button" onClick={onEdit}>
              Редактировать
            </button>
            <button type="button" className="danger-button" onClick={onDelete}>
              Удалить
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state compact">
          <h3>Контакт не выбран</h3>
          <p>Выберите запись в списке слева, чтобы увидеть подробности.</p>
        </div>
      )}
    </aside>
  )
}
