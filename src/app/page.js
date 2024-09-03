import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Animations</h1>
      <Link href="/task1">
        <p className="text-xl text-blue-500 mb-4">Semi-Circle Animation</p>
      </Link>
      <Link href="/task2">
        <p className="text-xl text-blue-500">Bouncing Icons Animation</p>
      </Link>
    </div>
  );
}
