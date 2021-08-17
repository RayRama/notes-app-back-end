/* eslint-disable new-cap */
/* eslint-disable spaced-comment */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */

/*{
  id: string,
  title: string,
  createdAt: string,
  updatedAt: string,
  tags: array of string,
  body: string,
 }*/

const {nanoid} = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  //menentukan apakah newNote sudah masuk ke dalam array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })

    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({ //Fungsi handler mendapatkan semua notes yang dibuat
  status: 'success',
  data: {
    notes
  }
})

const getNoteByIdHandler = (request, h) => { //Fungsi handler untuk mendapatkan notes melalui ID
  const { id } = request.params

  const note = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

const editNoteByIdHandler = (request, h) => {
  const {id} = request.params

  //Metodenya hampir mirip seperti 'addNoteHandler'
  const {title, tags, body} = request.payload

  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id) //Dapatkan index array pd object note sesuai id

  //Jika index ditemukan, maka nilai arraynya = array index dari object itu sendiri
  //Jika index tdk ditemukan, maka nilainya = -1
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1) //Untuk menghapus data pd array berdasarkan index dg cara menggunakan method splice()

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
} //Object literal
//untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript
