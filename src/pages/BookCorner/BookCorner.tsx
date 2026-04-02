
import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Page from '../Page';
import books from './book-data';
import type { BookRecommender } from './book-data';
import './BookCorner.css';
import BookCard from './BookCard/BookCard';

type FilterOption = 'All' | BookRecommender;

export default function BookCorner() {
  const [filter, setFilter] = useState<FilterOption>('All');

  const filterOptions: FilterOption[] = ['All', 'Nic', 'Leslie'];

  const filteredBooks = useMemo(() => {
    if (filter === 'All') return books;
    return books.filter(book => book.recommender.includes(filter));
  }, [filter]);

  return (
    <Page>
      <div className="book-corner-header">
        <h1>Book Corner</h1>
        <p>Books we've read, enjoyed, and wanted to tell someone about.</p>
      </div>

      <div className="book-filters">
        {filterOptions.map(option => (
          <button
            key={option}
            className={`filter-btn${filter === option ? ' active' : ''}`}
            onClick={() => setFilter(option)}
          >
            {option === 'All' ? 'All Books' : option}
          </button>
        ))}
      </div>

      <div className="book-results-info">
        Showing {filteredBooks.length} of {books.length} books
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="no-books">
            <FontAwesomeIcon icon={faBookOpen} />
            <h3>No books here yet</h3>
            <p>Check back soon!</p>
          </div>
        )}
      </div>
    </Page>
  );
}

