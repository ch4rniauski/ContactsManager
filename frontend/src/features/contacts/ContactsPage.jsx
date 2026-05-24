import { ConfirmDialog } from '../../components/ConfirmDialog'
import { ContactModal } from '../../components/ContactModal'
import { getInitialFormValues, formatBirthDate } from './contactsHelpers'
import { ContactsHero } from './components/ContactsHero'
import { ContactsList } from './components/ContactsList'
import { ContactDetails } from './components/ContactDetails'
import { useContactsManager } from './hooks/useContactsManager'

export function ContactsPage() {
  const manager = useContactsManager()

  const contactsWithLabels = manager.sortedContacts.map((contact) => ({
    ...contact,
    birthDateLabel: formatBirthDate(contact.birthDate),
  }))

  const selectedContact =
    manager.selectedContact == null
      ? null
      : {
          ...manager.selectedContact,
          birthDateLabel: formatBirthDate(manager.selectedContact.birthDate),
        }

  return (
    <main className="app-shell">
      <ContactsHero
        stats={manager.stats}
        onAdd={manager.openCreateModal}
        onReload={manager.handleReload}
      />

      {manager.error.length > 0 ? (
        <div className="banner error">{manager.error}</div>
      ) : null}

      <section className="workspace-grid">
        <ContactsList
          contacts={contactsWithLabels}
          loading={manager.loading}
          selectedContactId={manager.selectedContactId}
          onSelectContact={manager.setSelectedContactId}
          onEditContact={manager.openEditModal}
          onDeleteContact={manager.askDelete}
          onCreateContact={manager.openCreateModal}
        />

        <ContactDetails
          contact={selectedContact}
          onEdit={() => {
            if (selectedContact != null) {
              manager.openEditModal(selectedContact)
            }
          }}
          onDelete={() => {
            if (selectedContact != null) {
              manager.askDelete(selectedContact)
            }
          }}
        />
      </section>

      <ContactModal
        key={`${manager.editingContact?.id ?? 'new'}-${manager.isModalOpen ? 'open' : 'closed'}`}
        isOpen={manager.isModalOpen}
        mode={manager.editingContact == null ? 'create' : 'edit'}
        initialValues={getInitialFormValues(manager.editingContact)}
        errorMessage={manager.modalError}
        isSaving={manager.isSaving}
        onClose={manager.closeModal}
        onSubmit={manager.handleSubmit}
      />

      <ConfirmDialog
        isOpen={manager.contactToDelete != null}
        title="Удалить контакт"
        description={
          manager.contactToDelete != null
            ? `Вы действительно хотите удалить «${manager.contactToDelete.name}»?`
            : ''
        }
        confirmLabel="Удалить"
        isConfirming={manager.isDeleting}
        onClose={manager.closeDeleteDialog}
        onConfirm={manager.confirmDelete}
      />
    </main>
  )
}
