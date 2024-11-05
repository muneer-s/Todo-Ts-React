import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import { FaTrash, FaSun, FaMoon } from 'react-icons/fa';

type Items = {
  title: string;
  id: string;
  completed: boolean;
};

function App() {
  const [items, setItems] = useState<Items[]>([]);
  const [inputValues, setInputValues] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((prev) => [...prev, { title: inputValues, id: Date.now().toString(), completed: false }]);
    setInputValues('');
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((data) => data.id !== id));
  };

  const toggleCompletion = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const clearAll = () => setItems([]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`h-[100vh] flex flex-col justify-center items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Todo</h1>
      <div className='w-[350px]'>
        <button onClick={toggleTheme} className="mb-4">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <form className='mb-5' onSubmit={handleSubmit}>
          <Input inputValues={inputValues} setInputValues={setInputValues} darkMode={darkMode} />
          <Button className='bg-gray-700 w-full p-2'>Add</Button>
        </form>
        <Button onClick={clearAll} className="bg-red-500 w-full p-2 mb-4">Clear All</Button>
        <div className='h-52 overflow-y-auto'>
          {items.map((data) => (
            <div
              key={data.id}
              className={`flex justify-between items-center border border-slate-600 pl-2 mb-2 mr-1 py-2 ${data.completed ? 'line-through text-gray-500' : ''}`}
            >
              <p>{data.title}</p>
              <div className="flex items-center">
                <input type="checkbox" checked={data.completed} onChange={() => toggleCompletion(data.id)} />
                <Button onClick={() => handleDelete(data.id)} className="ml-2"><FaTrash /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
