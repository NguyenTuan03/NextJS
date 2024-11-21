import Link from "next/link";

export default function Home() {
  return (
    <>
    <ul>
      <li>
        <Link href="/facebook">Facebook</Link>
      </li>
      <li>
        <Link href="/tiktok">tiktok</Link>
      </li>
      <li>
        <Link href="/instagram">instagram</Link>
      </li>
    </ul>    
    </>
  );
}
