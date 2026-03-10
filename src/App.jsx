import {CreatePost} from "./components/CreatePost.jsx";
import {PostFilter} from "./components/PostFilter.jsx";
import {PostList} from "./components/PostList.jsx";
import {PostSorting} from "./components/PostSorting.jsx";

const posts = [
    {
        title: 'Testing',
        contents: 'This is how to test',
        author: 'Shane Donaghy'
    },
    {
        title: 'Developing',
        contents: 'This is how to build',
        author: 'Shane Donaghy'
    },
    {
        title: 'HR-ing',
        contents: 'This is how to waste time',
        author: 'Not Shane Donaghy'
    },
    {
        title: 'Deploying',
        contents: 'This is how to deploy',
        author: 'Shane Donaghy'
    }
]

export function App() {
    return (
        <div style={{padding: 8}}>
            <CreatePost/>
            <br/>
            <br/>
            Filter By:
            <PostFilter field='author'/>
            <br/>
            <PostSorting fields={['createdAt, updatedAt']}/>
            <br/>
            <PostList posts={posts}/>
        </div>
    )
}