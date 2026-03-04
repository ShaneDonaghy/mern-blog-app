import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Post} from './components/Post.jsx'

export function App() {
    return (
        <Post
            title='Full Stack React Projects'
            contents='Lets become full stack engineers'
            author='Shane Donaghy'
        />
    )
}