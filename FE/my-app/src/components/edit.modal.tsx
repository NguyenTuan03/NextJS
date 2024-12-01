import React, { useState, useEffect } from 'react';  
import { toast } from 'react-toastify';  

interface EditModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    blog: { id: number; title: string; author: string; content: string } | null;  
    onUpdate: (updatedBlog: { id: number; title: string; author: string; content: string }) => void;  
}  

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, blog, onUpdate }) => {  
    const [title, setTitle] = useState('');  
    const [author, setAuthor] = useState('');  
    const [content, setContent] = useState('');  

    useEffect(() => {  
        if (blog) {  
            setTitle(blog.title);  
            setAuthor(blog.author);  
            setContent(blog.content);  
        }  
    }, [blog]);  

    const handleSubmit = (e: React.FormEvent) => {  
        e.preventDefault();  
        if (blog) {  
            const updatedBlog = { id: blog.id, title, author, content };  
            fetch(`http://localhost:8000/blogs/${blog.id}`, {  
                method: 'PUT',  
                headers: {  
                    'Accept': 'application/json, text/plain, */*',  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify(updatedBlog),  
            })  
                .then(res => {  
                    if (!res.ok) {  
                        throw new Error('Network response was not ok');  
                    }  
                    return res.json();  
                })  
                .then(data => {  
                    toast.success("Blog updated successfully!");  
                    onUpdate(data); // Pass the updated blog data back to the parent  
                    onClose(); // Close the modal  
                })  
                .catch(error => {  
                    console.error('Error updating blog:', error);  
                    toast.error("Update failed, please try again.");  
                });  
        }  
    };  

    return (  
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'} flex items-center justify-center`}>  
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">  
                <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>  
                <form onSubmit={handleSubmit}>  
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700">Title</label>  
                        <input  
                            type="text"  
                            value={title}  
                            onChange={(e) => setTitle(e.target.value)}  
                            required  
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700">Author</label>  
                        <input  
                            type="text"  
                            value={author}  
                            onChange={(e) => setAuthor(e.target.value)}  
                            required  
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label className="block text-sm font-medium text-gray-700">Content</label>  
                        <textarea  
                            value={content}  
                            onChange={(e) => setContent(e.target.value)}  
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"  
                        />  
                    </div>  
                    <div className="flex justify-end">  
                        <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Blog</button>  
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default EditModal; 