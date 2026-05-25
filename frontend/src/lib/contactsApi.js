import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

async function request(path, options = {}) {
  try {
    const response = await apiClient.request({
      url: path,
      ...options,
    })

    return response.data ?? null
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data
        ?? error.message
        ?? 'Запрос к серверу завершился ошибкой',
        { cause: error },
      )
    }

    throw new Error('Запрос к серверу завершился ошибкой', { cause: error })
  }
}

export async function fetchContacts(searchText = '', signal) {
  const normalizedSearchText = searchText.trim()
  const path = normalizedSearchText.length > 0 ? '/Contacts/search' : '/Contacts'
  const config =
    normalizedSearchText.length > 0
      ? {
          params: {
            searchText: normalizedSearchText,
          },
          signal,
        }
      : { signal }

  const contacts = await request(path, config)

  return contacts.map((contact) => ({
    ...contact,
    name: contact.name ?? '',
    mobilePhone: contact.mobilePhone ?? '',
    jobTitle: contact.jobTitle ?? '',
    birthDate: contact.birthDate ?? '',
  }))
}

export async function createContact(contact) {
  return request('/Contacts', {
    method: 'POST',
    body: JSON.stringify(contact),
    data: contact,
  })
}

export async function updateContact(contactId, contact) {
  return request(`/Contacts/${contactId}`, {
    method: 'PUT',
    data: contact,
  })
}

export async function deleteContact(contactId) {
  return request(`/Contacts/${contactId}`, {
    method: 'DELETE',
  })
}
