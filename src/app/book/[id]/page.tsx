import { API_URL } from '@/components/global';
import style from './page.module.css';
import { BookData } from '@/types';

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(`${API_URL}/book/${params.id}`);
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const books: BookData = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    books;
  return (
    <div className={style.container}>
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
    </div>
  );
}
