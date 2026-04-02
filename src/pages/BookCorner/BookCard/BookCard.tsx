import type { Book } from "../book-data";
import './BookCard.css';

export default function BookCard({ book }: { book: Book }) {
  const badgeClass = `book-recommender-badge recommender-${book.recommender.toLowerCase()}`;

  return (
    <article className="book-card">
      <div className="book-card-top">

        <div className='book-title-row'>
          <h3>{book.title}</h3>
          <span className={badgeClass}>
            {book.recommender}
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
