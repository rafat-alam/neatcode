import Link from "next/link";

export default function RegisterButton() {
  return (
    <Link href={'/signup'}>
      <button
        className={`px-7 py-1.5 border-2 rounded transition text-blue-600 border-blue-600 hover:bg-blue-100`}
      >
        {0 ? 'Registering...' : 'Register'}
      </button>
    </Link>
  );
}
