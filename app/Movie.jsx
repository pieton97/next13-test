'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Movie({ title, id, poster_path, release_date, res }) {
	// console.log(res);
  const imagePath = 'https://image.tmdb.org/t/p/original';
  return (
    <div>
      <h1>{title}</h1>
      <h2>Release date: {release_date}</h2>
      <Link href={`/${id}`}>
        <Image src={imagePath + poster_path} width={600} height={600} alt={title} />
      </Link>
    </div>
  );
}
