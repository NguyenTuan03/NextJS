import React, { useState } from "react";
import CreateModal from "./create.modal";
import { toast } from "react-toastify";
import { mutate } from "swr";
import EditModal from "./edit.modal";
import Link from "next/link";
interface IBlog {
    id: number;
    title: string;
    author: string;
    content?: string;
}

interface IProps {
    blogs: IBlog[];
    setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>; // Add a setter for blogs
}
export default function AppTable(props: IProps) {
    const { blogs, setBlogs } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    console.log(blogs);
    const handleAddBlog = (newBlog: {
        title: string;
        author: string;
        content: string;
    }) => {
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBlog), // Pass the blog data directly
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                // Log the successfully added blog entry
                console.log("Blog added successfully:", res);
                if (res) {
                    toast.success("Create success....!");
                    setBlogs((prevBlogs) => [...prevBlogs, res]); // Assuming 'res' contains the complete blog entry with the ID
                    mutate("http://localhost:8000/blogs");
                } else {
                    toast.error("Create Fail....!");
                }

                // Update the local state with the new blog entry, using the ID from the response
            })
            .catch((error) => {
                console.error("Error adding blog:", error);
                // Handle the error appropriately here (e.g., show a notification)
            });
    };
    const handleEditBlog = (blog) => {
        setSelectedBlog(blog);
        setIsEditModalOpen(true);
    };

    const handleUpdateBlog = (updatedBlog) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
        );
    };
    return (
        <>
            <div className="flex justify-between mb-2">
                <div className="text-xl font-semibold">Table blogs</div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 py-2 px-4 bg-green-200"
                >
                    Add
                </button>
            </div>
            <table className="w-full border-collapse border border-slate-500 ...">
                <thead>
                    <tr>
                        <th className="border border-slate-600 ...">No</th>
                        <th className="border border-slate-600 ...">Title</th>
                        <th className="border border-slate-600 ...">Author</th>
                        <th className="border border-slate-600 ...">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((blog, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="border border-slate-700 ...">
                                        {blog.id}
                                    </td>
                                    <td className="border border-slate-700 ...">
                                        {blog.title}
                                    </td>
                                    <td className="border border-slate-700 ...">
                                        {blog.author}
                                    </td>
                                    <td className="border border-slate-700 flex gap-3">
                                        <button className="border-0 text-blue-400">
                                            <Link href={`/blogs/${blog.id}`}>View</Link>
                                        </button>
                                        <button
                                            className="border-0 text-yellow-400"
                                            onClick={() => handleEditBlog(blog)}
                                        >
                                            Edit
                                        </button>
                                        <button className="border-0 text-red-500">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false)}}
                onSubmit={handleAddBlog}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                blog={selectedBlog}
                onUpdate={handleUpdateBlog}
            />
        </>
    );
}
