import './ContactsHero.css'

export function ContactsHero({
  searchText,
  onSearchTextChange,
  onAdd,
  onReload,
}) {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Contacts Manager</p>

        <label className="search-field" htmlFor="contacts-search">
          <span className="search-label">Поиск по имени или номеру</span>
          <input
            id="contacts-search"
            className="search-input"
            type="search"
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="Введите имя или телефон"
          />
        </label>
      </div>

      <div className="hero-actions">
        <button type="button" className="secondary-button" onClick={onReload}>
          Обновить список
        </button>

        <button type="button" className="primary-button" onClick={onAdd}>
          Добавить контакт
        </button>
      </div>
    </section>
  )
}
