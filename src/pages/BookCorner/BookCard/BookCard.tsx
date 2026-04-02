import type { Book } from "../book-data";
import './BookCard.css';

export default function BookCard({ book }: { book: Book }) {
  const badgeClasses = [
    'book-recommender-badge', 
    ...book.recommender
      .map(r => `recommender-${r.toLowerCase()}`)
  ].join(' ');

  return (
    <article className="book-card">
      <div className="book-card-top">

        <div className='book-title-row'>
          <h3>{book.title}</h3>
          <span className={badgeClasses}>
            {book.recommender.join(' ')}
          </span>
        </div>
        
        <div className="book-author-row">
          <p className="book-author">{book.author}</p>
          {book.genre && (
            <span className="book-genre-tag">{book.genre}</span>
          )}
        </div>
      </div>

      <div className="book-card-body">
        <p className="book-blurb">{book.blurb}</p>
      </div>
    </article>
  );
}
