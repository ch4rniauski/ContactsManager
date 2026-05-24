export function ContactCard({ contact, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <article className={`contact-card${isSelected ? ' is-selected' : ''}`}>
      <button
        type="button"
        className="contact-card__content"
        onClick={onSelect}
      >
        <div className="contact-card__headline">
          <div>
            <h3>{contact.name}</h3>
            <p>{contact.jobTitle}</p>
          </div>

          {isSelected ? <span className="selected-chip">Выбран</span> : null}
        </div>

        <dl className="contact-meta">
          <div>
            <dt>MobilePhone</dt>
            <dd>{contact.mobilePhone}</dd>
          </div>
          <div>
            <dt>BirthDate</dt>
            <dd>{contact.birthDateLabel}</dd>
          </div>
        </dl>
      </button>

      <div className="contact-card__actions">
        <button type="button" className="ghost-button" onClick={onEdit}>
          Изменить
        </button>
        <button type="button" className="danger-button" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </article>
  )
}
