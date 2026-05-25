import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [modalError, setModalError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadContacts = useCallback(
    async (queryText = '', preferredContactId = null, signal) => {
      setLoading(true)
      setError('')

      const normalizedSearchText = queryText.trim()

      try {
        const data = await fetchContacts(normalizedSearchText, signal)

        setContacts(data)
        setSelectedContactId((currentSelectedId) => {
          if (data.length === 0) {
            return null
          }

          if (
            preferredContactId != null &&
            data.some((contact) => contact.id === preferredContactId)
          ) {
            return preferredContactId
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
        if (signal?.aborted) {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Не удалось загрузить контакты',
        )
      } finally {
        if (!signal?.aborted) {
          setLoading(false)
        }
      }
    },
    [],
  )

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
    const isInitialLoad = searchText.trim().length === 0
    const timerId = window.setTimeout(
      () => {
        void loadContacts(searchText, null, abortController.signal)
      },
      isInitialLoad ? 0 : 250,
    )

    return () => {
      window.clearTimeout(timerId)
      abortController.abort()
    }
  }, [loadContacts, searchText])

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

      await loadContacts(searchText, savedContact.id)
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

      await loadContacts(searchText)
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
    void loadContacts(searchText)
  }

  function handleSearchTextChange(value) {
    setSearchText(value)
  }

  return {
    selectedContactId,
    loading,
    error,
    searchText,
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
    handleSearchTextChange,
    setSelectedContactId,
  }
}
