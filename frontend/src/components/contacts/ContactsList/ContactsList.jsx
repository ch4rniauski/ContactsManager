import './ContactsList.css'
import { ContactCard } from '../ContactCard/ContactCard'

export function ContactsList({
  contacts,
  loading,
  searchText,
  selectedContactId,
  onSelectContact,
  onCreateContact,
}) {
  const hasSearchText = searchText.trim().length > 0

  return (
    <section className="panel list-panel">
      <div className="panel-header">
        <div>
          <h2>Контакты</h2>
        </div>

        <span className="panel-count">{contacts.length}</span>
      </div>

      {loading ? <div className="empty-state">Загружаем контакты...</div> : null}

      {!loading && contacts.length === 0 ? (
        <div className="empty-state">
          {hasSearchText ? (
            <>
              <h3>Ничего не найдено</h3>
              <p>По запросу «{searchText}» нет совпадений. Попробуйте другое имя или номер.</p>
            </>
          ) : (
            <>
              <h3>Пока нет ни одного контакта</h3>
              <p>Создайте первый контакт, чтобы начать работу с таблицей.</p>
              <button type="button" className="primary-button" onClick={onCreateContact}>
                Добавить контакт
              </button>
            </>
          )}
        </div>
      ) : null}

      {!loading && contacts.length > 0 ? (
        <div className="contact-list" role="list">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onSelect={() => onSelectContact(contact.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
