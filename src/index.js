import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// step-1 : รู้ว่า user กดปุ่มไหน ?
// step-2 : Make HTTP Request , after setState

function App() {
  const [category, setCategory] = useState('');
  const [count, setCount] = useState(0);

  // DEFINE
  // url : https://jsonplaceholder.typicode.com/<categories>
  async function fetchLists() {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    try {
      let response = await fetch(`${BASE_URL}/${category}`, { method: 'GET' });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Syntax : useEffect(setUp,dependenciesArray)

  // ### 1  After  render, rerender
  // useEffect(() => {
  //   console.log('## 1 Effect Hook - Every render, rerender');
  // });

  // ### 2  After firstRender
  useEffect(() => {
    console.log('Only First Render');
  }, []);

  // ### 3 : firstRender , Rerender wih category change
  useEffect(() => {
    console.log('## 2 Effect Hook - Category - MAKE HTTP with', category);
    if (category !== '') fetchLists();
  }, [category]);

  useEffect(() => {
    console.log('## 3 : Effect Hook - Count');
  }, [count]);

  useEffect(() => {
    console.log('## 4 : Effect Hook - All');
  }, [count, category]);

  console.log('render, rerender');

  return (
    <div>
      <h1>useEffect : {category || 'not-select'}</h1>
      <div className='button__group'>
        <button onClick={() => setCategory('posts')}>posts</button>
        <button onClick={() => setCategory('photos')}>photos</button>
        <button onClick={() => setCategory('todos')}>todos</button>
        <button onClick={() => setCategory('users')}>users</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <div>{count}</div>
        <button onClick={() => setCount((c) => c - 1)}>-</button>
      </div>

      <ul className='lists'>
        <li className='lists__item'>item-1</li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);