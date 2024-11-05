"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/logout`)
    .catch(err => {
      console.log(err);
    }).finally(() => {
      router.push('/');
    });
  }, [router]);

  return <div>Redirecting...</div>;
}