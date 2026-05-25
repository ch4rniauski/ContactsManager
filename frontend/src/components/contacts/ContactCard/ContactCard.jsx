import './ContactCard.css'

export function ContactCard({ contact, isSelected, onSelect }) {
  return (
    <article className={`contact-card${isSelected ? ' is-selected' : ''}`}>
      <button type="button" className="contact-card__content" onClick={onSelect}>
        <div className="contact-card__headline">
          <h3>{contact.name}</h3>

          { isSelected
              ? <span className="selected-chip">Выбран</span>
              : null
          }
        </div>
      </button>
    </article>
  )
}
