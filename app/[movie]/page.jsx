import Image from 'next/image';

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
  );
  const res = await data.json();
  return res.results.map(movie => ({
    movie: toString(movie.id)
  }));
}

export default async function MovieDetail({ params }) {
  const imagePath = 'https://image.tmdb.org/t/p/original';
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movie}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2>{res.release_date}</h2>
        <h2>{res.runtime} minutes</h2>
        <p>{res.status}</p>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          priority
          alt={res.title}
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
