export function ContactsHero({ onAdd, onReload }) {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Contacts Manager</p>

        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={onAdd}>
            Добавить контакт
          </button>
          <button type="button" className="secondary-button" onClick={onReload}>
            Обновить список
          </button>
        </div>
      </div>
    </section>
  )
}
