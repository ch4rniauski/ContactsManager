const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const responseText = await response.text()
    throw new Error(responseText || 'Запрос к серверу завершился ошибкой')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function fetchContacts(signal) {
  const contacts = await request('/Contacts', { signal })

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
  })
}

export async function updateContact(contactId, contact) {
  return request(`/Contacts/${contactId}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  })
}

export async function deleteContact(contactId) {
  return request(`/Contacts/${contactId}`, {
    method: 'DELETE',
  })
}
