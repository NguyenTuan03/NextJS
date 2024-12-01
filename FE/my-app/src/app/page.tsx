"use client";
import Link from "next/link";

export default function Home() {

    return (
        <div className="container mx-auto">            
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
        </div>
    );
}
