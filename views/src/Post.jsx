import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

export default function Post({id,cover,title,username,description,User,createdAt}){
     
    return( 
    <div className="post" key={id}>
       <div className="image">
            <Link to={`/post/${id}`}>
                <img src={'http://localhost:5000/'+cover}></img>
            </Link>
       </div>
        <div className="texts">
            <Link to={`/post/${id}`}>
                <h2>{title}</h2>
            </Link>
            <p className="info"><a className="author">{User.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
            
            <p className="summary">{description}</p>
        </div>

       
    </div>
    )
}