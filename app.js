const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {id:v4(), name: 'Stab User Name', value: '054 776613', marked:false },
    {id:v4(), name: 'Stab User Name', value: '03354 776613', marked:false }
]

app.use(express.json());

//GET
app.get('/api/contacts', (req,res) => {
    setTimeout(()=> {
        res.status(200).json(CONTACTS);
    },2000)
});
//POST
app.post('/api/contacts', (req,res) => {
    const newContact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(newContact)
    console.log('aaa?', CONTACTS)
    res.status(201).json(CONTACTS);

});
//DELETE
app.post('/api/contacts/:id', (req,res) => {

    CONTACTS = CONTACTS.filter((item)=> item.id !== req.params.id)
    console.log('after delete?', CONTACTS)
    res.status(200).json({message:'contact was removed'});

});
app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(3000, () => console.log('server has been started on port 3000 ....'))