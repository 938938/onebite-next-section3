import BookItem from '@/components/book-item';
import { API_URL } from '../page';
import { BookData } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const response = await fetch(`${API_URL}/book/search?q=${searchParams.q}`);
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
