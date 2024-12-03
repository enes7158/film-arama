"use client";
export interface Movie {
    title: string;
    year: string;
    poster: string;
    imdbRating?: string;
    actors?: string;
    language?: string;
    plot?: string;
  }
  
  const MovieCard: React.FC<Movie> = ({
    title,
    year,
    poster,
    imdbRating = 'N/A',
    actors = 'N/A',
    language = 'N/A',
    plot = 'N/A',
  }) => {
    return (
      <div className="flex bg-white border border-black rounded-lg shadow-md p-4 gap-4 hover:shadow-lg transition-shadow">
        <div className="flex-shrink-0 w-32 h-48 overflow-hidden rounded-lg">
          <img
            src={poster !== 'N/A' ? poster : '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-1">Çıkış Yılı: {year}</p>
          <p className="text-sm text-gray-600 mb-1">IMDb Puanı: {imdbRating}</p>
          <p className="text-sm text-gray-600 mb-1">Oyuncular: {actors}</p>
          <p className="text-sm text-gray-600 mb-1">Dil: {language}</p>
          <p className="text-sm text-gray-600">Açıklama: {plot}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
  