const BASE_URL = 'http://localhost:3000'
const CONTACT_API = `${BASE_URL}/contacts`
const USER_API = `${BASE_URL}/api/users`

let currentPage = 1
let editId = null

//register:
async function register() {
  const name = document.getElementById('r_name').value
  const email = document.getElementById('r_email').value
  const password = document.getElementById('r_password').value

  const res = await fetch(`${USER_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  const data = await res.json()
  alert(data.message || 'Registered')
}
//login:
async function login() {
  const email = document.getElementById('l_email').value
  const password = document.getElementById('l_password').value

  const res = await fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()
  if (data.token) {
    localStorage.setItem('token', data.token)
    window.location.href = 'dashboard.html'
  } else {
    alert('Login failed')
  }
}

//loade contact:
async function loadContacts() {
    const token = localStorage.getItem('token')
    const search = document.getElementById('search').value

    const res = await fetch(
        `${CONTACT_API}?page=${currentPage}&limit=5&search=${search}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    const data = await res.json()

    const list = document.getElementById('contactList')
    list.innerHTML = ''

    data.contacts.forEach(c => {
        list.innerHTML += `
            <li>
                ${c.name} - ${c.phone}
                <button onclick="editContact('${c._id}', '${c.name}', '${c.phone}')">✏️</button>
                <button onclick="deleteContact('${c._id}')">❌</button>
            </li>
        `
    })

    renderPagination(data.totalPages)
}
//add contact:
async function addContact() {
    const token = localStorage.getItem('token')

    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value

    await fetch(CONTACT_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone })
    })

    loadContacts()
}
//delete :
async function deleteContact(id) {
    const token = localStorage.getItem('token')

    await fetch(`${CONTACT_API}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    loadContacts()
}

//edit contact:
function editContact(id, name, phone) {
    editId = id

    document.getElementById('editName').value = name
    document.getElementById('editPhone').value = phone

    document.getElementById('editBox').style.display = 'block'
}
//save edit:
async function saveEdit() {
    const token = localStorage.getItem('token')

    await fetch(`${CONTACT_API}/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: document.getElementById('editName').value,
            phone: document.getElementById('editPhone').value
        })
    })

    document.getElementById('editBox').style.display = 'none'
    loadContacts()
}
//pagination:
function renderPagination(totalPages) {
    const container = document.getElementById('pagination')
    container.innerHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `
            <button onclick="changePage(${i})">${i}</button>
        `
    }
}

function changePage(page) {
    currentPage = page
    loadContacts()
}

//logout:
function logout() {
  localStorage.removeItem('token')
  window.location.href = 'index.html'
}

