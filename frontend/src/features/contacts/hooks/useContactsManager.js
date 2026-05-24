import { useEffect, useMemo, useState } from 'react'
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '../../../lib/contactsApi'
import { buildContactPayload } from '../contactsHelpers'

export function useContactsManager() {
  const [contacts, setContacts] = useState([])
  const [selectedContactId, setSelectedContactId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [modalError, setModalError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((left, right) => {
      return left.name.localeCompare(right.name, 'ru', {
        sensitivity: 'base',
      })
    })
  }, [contacts])

  const selectedContact = useMemo(() => {
    if (selectedContactId == null) {
      return null
    }

    return contacts.find((contact) => contact.id === selectedContactId) ?? null
  }, [contacts, selectedContactId])

  useEffect(() => {
    const abortController = new AbortController()

    async function loadContacts() {
      setLoading(true)
      setError('')

      try {
        const data = await fetchContacts(abortController.signal)
        setContacts(data)
        setSelectedContactId((currentSelectedId) => {
          if (data.length === 0) {
            return null
          }

          if (
            currentSelectedId != null &&
            data.some((contact) => contact.id === currentSelectedId)
          ) {
            return currentSelectedId
          }

          return data[0].id
        })
      } catch (loadError) {
        if (abortController.signal.aborted) {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Не удалось загрузить контакты',
        )
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadContacts()

    return () => {
      abortController.abort()
    }
  }, [])

  function openCreateModal() {
    setEditingContact(null)
    setModalError('')
    setIsModalOpen(true)
  }

  function openEditModal(contact) {
    setEditingContact(contact)
    setModalError('')
    setSelectedContactId(contact.id)
    setIsModalOpen(true)
  }

  function closeModal() {
    if (isSaving) {
      return
    }

    setIsModalOpen(false)
    setEditingContact(null)
    setModalError('')
  }

  async function handleSubmit(values) {
    setIsSaving(true)
    setModalError('')

    const payload = buildContactPayload(values)

    try {
      const savedContact = editingContact
        ? await updateContact(editingContact.id, payload)
        : await createContact(payload)

      setContacts((currentContacts) => {
        const nextContacts = currentContacts.filter(
          (contact) => contact.id !== savedContact.id,
        )

        return [...nextContacts, savedContact]
      })
      setSelectedContactId(savedContact.id)
      setIsModalOpen(false)
      setEditingContact(null)
    } catch (saveError) {
      setModalError(
        saveError instanceof Error
          ? saveError.message
          : 'Не удалось сохранить контакт',
      )
    } finally {
      setIsSaving(false)
    }
  }

  function askDelete(contact) {
    setContactToDelete(contact)
  }

  function closeDeleteDialog() {
    setContactToDelete(null)
  }

  async function confirmDelete() {
    if (contactToDelete == null) {
      return
    }

    setIsDeleting(true)
    setError('')

    const contactId = contactToDelete.id

    try {
      await deleteContact(contactId)

      setContacts((currentContacts) => {
        const nextContacts = currentContacts.filter(
          (contact) => contact.id !== contactId,
        )

        if (selectedContactId === contactId) {
          setSelectedContactId(nextContacts[0]?.id ?? null)
        }

        return nextContacts
      })
      setContactToDelete(null)
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Не удалось удалить контакт',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  function handleReload() {
    setSelectedContactId(null)
    setLoading(true)
    setError('')

    fetchContacts()
      .then((data) => {
        setContacts(data)
        setSelectedContactId(data[0]?.id ?? null)
      })
      .catch((loadError) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Не удалось загрузить контакты',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    selectedContactId,
    loading,
    error,
    sortedContacts,
    selectedContact,
    isModalOpen,
    editingContact,
    modalError,
    isSaving,
    contactToDelete,
    isDeleting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    askDelete,
    closeDeleteDialog,
    confirmDelete,
    handleReload,
    setSelectedContactId,
  }
}
