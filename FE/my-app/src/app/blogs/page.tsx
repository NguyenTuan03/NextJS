"use client";
import AppTable from "@/components/AppTable";
import React, { useState } from "react";
import useSWR from "swr";

export default function page() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    const [blogs, setBlogs] = useState(data || []);

    if (data && blogs.length === 0) {
        setBlogs(data);
    }

    if (isLoading) return <div>Loading.......</div>;
    if (error) return <div>Error loading blogs</div>;
    return (
      <>
      {data.length}
        <AppTable
            blogs={blogs?.sort((a: any, b: any) => b.id - a.id)}
            setBlogs={setBlogs}
        />
      </>            
    );
}
