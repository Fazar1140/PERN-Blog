import './App.css'
import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './UserContext';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

const App = createBrowserRouter([
  {
    path:'/',
    element: <UserContextProvider><Layout/></UserContextProvider> 
  },
  {
    path:'/login',
    element:<UserContextProvider><LoginPage></LoginPage></UserContextProvider> 
  },
  {
    path:'/register',
    element:<RegisterPage></RegisterPage>
  },
  {
    path:'/create',
    element:<CreatePost></CreatePost>
  },{
    path:'/post/:id',
    element:<UserContextProvider><PostPage></PostPage></UserContextProvider>
  },{
    path:'/edit/:id',
    element:<EditPost></EditPost>
  }
])

export default App
