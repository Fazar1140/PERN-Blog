import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Editor from '../Editor'

export default function CreatePost(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [published,setPublished] = useState(true)
    const [files,setFiles] = useState('')
    const [content,setContent] = useState('')
    const navigate = useNavigate();
    async function createNewPost(ev){
        const data = new FormData()
        data.set('title',title)
        data.set('description',description)
        data.set('published',published)
        data.set('content',content)
        data.set('file',files[0])
        ev.preventDefault();

        const response = await fetch('http://localhost:5000/',{
            method:'POST',
            body: data,
            credentials: 'include'
        })
        if(response.ok){
            navigate('/')
        }
    }
    return(
        <form onSubmit={createNewPost}>
            <input type='title' placeholder='title' value={title} onChange={ev=>setTitle(ev.target.value)}>
            </input>
            <input type='description' placeholder='description' value={description} onChange={ev=>setDescription(ev.target.value)}>
            </input>
            <input type='file' onChange={ev=>setFiles(ev.target.files)}></input>
            <Editor value={content} onChange={setContent}></Editor>
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    )
}