import React, { useState } from 'react'
interface CreateModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    onSubmit: (newBlog: { title: string; author: string; content: string }) => void;  
}  
export default function CreateModal({ isOpen, onClose, onSubmit }: CreateModalProps) {  
    const [title, setTitle] = useState('');  
    const [author, setAuthor] = useState('');  
    const [content, setContent] = useState('');      
    const handleSubmit = (e: React.FormEvent) => {  
        e.preventDefault();  
        onSubmit({ title, author, content });  
        onClose(); 
        setTitle('')
        setAuthor('')
        setContent('')        
    };  

    if (!isOpen) return null;  

    return (  
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">  
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">  
                <h2 className="text-lg font-semibold mb-4">Create New Blog</h2>  
                <form onSubmit={handleSubmit}>  
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>  
                        <input   
                            type="text"   
                            value={title}   
                            onChange={(e) => setTitle(e.target.value)}   
                            required   
                            className="border border-gray-300 rounded-md p-2 w-full"   
                        />  
                    </div>  
                    
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author:</label>  
                        <input   
                            type="text"   
                            value={author}   
                            onChange={(e) => setAuthor(e.target.value)}   
                            required   
                            className="border border-gray-300 rounded-md p-2 w-full"   
                        />  
                    </div>  
                    
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content:</label>  
                        <textarea   
                            value={content}   
                            onChange={(e) => setContent(e.target.value)}   
                            required   
                            className="border border-gray-300 rounded-md p-2 w-full h-32"   
                        />  
                    </div>  

                    <div className="flex justify-between">  
                        <button   
                            type="submit"   
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"  
                        >  
                            Submit  
                        </button>  
                        <button   
                            type="button"   
                            onClick={onClose}   
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-200"  
                        >  
                            Cancel  
                        </button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    );  
}