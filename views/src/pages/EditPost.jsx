import { useEffect,useState } from "react";
import { Form, useNavigate,useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const navigate = useNavigate(); 

    useEffect(()=>{
        fetch(`http://localhost:5000/${id}`)
        .then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title)
                setDescription(postInfo.description)
                setContent(postInfo.content)
                console.log(postInfo)
            })
        })
    },[])

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('description',description);
        data.set('content',content);
        if(files?.[0]){
            data.set('file',files?.[0])
        }
        const response = await fetch(`http://localhost:5000/${id}`,{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        if(response.ok){
            navigate('/')
        }

    }
    return(
        <Form onSubmit={updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)}></input>
            <input type="description" placeholder={'Description'} value={description} onChange={ev => setDescription(ev.target.value)}></input>
            <input type="file" onChange={ev => setFiles(ev.target.files)}></input>
            <Editor value={content} onChange={setContent}></Editor>
            <button style={{marginTop:'5px'}}>Update post</button>
        </Form>
    )
}