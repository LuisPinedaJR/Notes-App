'use strict'

// DOM - document object model

// Query and remove
// const p = document.querySelector('p')
// p.remove()

// Query all and remove
let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderedNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) =>{
    const id =  uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) =>{
    filters.searchText = e.target.value
    renderedNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) =>{
    filters.sortBy = e.target.value
    renderedNotes(notes, filters)
})

window.addEventListener('storage', (e) =>{
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderedNotes(notes, filters)
    }
})
