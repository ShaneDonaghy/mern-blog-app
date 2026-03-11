import {CreatePost} from "./components/CreatePost.jsx";
import {PostFilter} from "./components/PostFilter.jsx";
import {PostList} from "./components/PostList.jsx";
import {PostSorting} from "./components/PostSorting.jsx";
import { useQuery } from '@tanstack/react-query';
import {getPosts} from './api/posts.js';
import {useState} from 'react';

export function Blog() {
    const [author, setAuthor] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('descending');
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
    });
    const posts = postsQuery.data ?? [];
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