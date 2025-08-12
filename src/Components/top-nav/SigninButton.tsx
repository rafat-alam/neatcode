import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={'/login'}>
      <button
        className={`px-7 py-1.5 border-2 rounded transition bg-blue-600 text-white border-blue-600 hover:bg-blue-100 hover:text-blue-600`}
      >
        {0 ? 'Signing In...' : 'SignIn'}
      </button>
    </Link>
  );
}
