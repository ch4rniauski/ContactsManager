export function ContactsHero({ stats, onAdd, onReload }) {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Contacts Manager</p>
        <h1>Контакты, CRUD и модальные формы в одном экране</h1>
        <p className="lead">
          Список берется из локальной базы данных через backend API.
          Добавление и редактирование открываются в попапах, а удаление
          подтверждается отдельным диалогом.
        </p>

        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={onAdd}>
            Добавить контакт
          </button>
          <button type="button" className="secondary-button" onClick={onReload}>
            Обновить список
          </button>
        </div>
      </div>

      <div className="stats-grid" aria-label="Сводка по контактам">
        <article className="stat-card">
          <span className="stat-label">Всего контактов</span>
          <strong className="stat-value">{stats.total}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">С датой рождения</span>
          <strong className="stat-value">{stats.withBirthDate}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">Должностей</span>
          <strong className="stat-value">{stats.uniqueRoles}</strong>
        </article>
      </div>
    </section>
  )
}
