import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="items-center min-h-screen p-2 mx-auto text-green-300 md:max-w-3xl md:p-24 ">
      <h1 className="my-8 text-2xl text-center sm:text-3xl md:text-4xl">
        404_Not_Found_Page
      </h1>
      <div className="flex justify-center mx-auto">
        <Link
          href="/"
          className="p-3 bg-green-800 rounded-sm hover:bg-green-300 hover:text-white"
        >
          Back to Main
        </Link>
      </div>
    </div>
  );
}
