"use client";
import AppTable from "@/components/AppTable";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );    
    const [blogs, setBlogs] = useState(data || []);  
    
    if (data && blogs.length === 0) {  
        setBlogs(data);  
    }  

    if (isLoading) return <div>Loading.......</div>;  
    if (error) return <div>Error loading blogs</div>; // Handle error state  

    return (
        <div className="container mx-auto">
            {data?.length}
            <ul>
                <li className="mb-4">
                    <Link href="/facebook">Facebook</Link>
                </li>
                <li className="mb-4">
                    <Link href="/tiktok">tiktok</Link>
                </li>
                <li className="mb-4">
                    <Link href="/instagram">instagram</Link>
                </li>
            </ul>
            <AppTable blogs={blogs} setBlogs={setBlogs} /> 
        </div>
    );
}
