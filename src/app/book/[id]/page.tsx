import { API_URL } from '@/components/global';
import style from './page.module.css';
import { BookData } from '@/types';
import { notFound } from 'next/navigation';
import { createReviewAction } from '@/actions/create-review.action';

// export const dynamicParams = false;

export function generateStaticParams() {
  // 정적인 파라미터 생성
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${API_URL}/book/${bookId}`);
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
        <img src={coverImgUrl} />
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

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input name='bookId' value={bookId} hidden />
        <input name='content' placeholder='리뷰 내용' required />
        <input name='author' placeholder='작성자' required />
        <button type='submit'>작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
    </div>
  );
}
