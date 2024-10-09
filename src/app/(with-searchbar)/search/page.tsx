import BookItem from '@/components/book-item';
import { API_URL } from '@/components/global';
import { BookData } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(`${API_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  });
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

type Props = {
  searchParams: {
    q?: string;
  };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 한입북스 검색`,
    description: `${searchParams.q} 검색 결과입니다.`,
    openGraph: {
      title: `${searchParams.q} : 한입북스 검색`,
      description: `${searchParams.q} 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <Suspense key={searchParams.q || ''} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
