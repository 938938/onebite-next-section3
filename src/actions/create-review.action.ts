'use server';

import { API_URL } from '@/components/global';
import { revalidatePath } from 'next/cache';

export const createReviewAction = async (formData: FormData) => {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();
  if (!content || !author) {
    return;
  }
  try {
    const res = await fetch(`${API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({
        bookId,
        content,
        author,
      }),
    });
    console.log(res.status);
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
};
