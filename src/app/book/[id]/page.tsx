import { API_URL } from '@/components/global';
import style from './page.module.css';
import { BookData, ReviewData } from '@/types';
import { notFound } from 'next/navigation';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams() {
  // 정적인 파라미터 생성
  const res = await fetch(`${API_URL}/book`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const books: BookData[] = await res.json();
  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${API_URL}/book/${bookId}`, {
    next: { tags: [`review-${bookId}`] },
  });
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }
  const books: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    books;
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const res = await fetch(`${API_URL}/review/book/${bookId}`);
  if (!res.ok) {
    throw new Error(`Review fetch failed :${res.statusText}`);
  }
  const reviews: ReviewData[] = await res.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | null> {
  const response = await fetch(`${API_URL}/book/${params.id}`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const book: BookData = await response.json();
  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
