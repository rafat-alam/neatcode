import { authOptions } from '@/app/api/auth/[...nextauth]/authoptions';
import { getServerSession } from 'next-auth';

type Props = {
  params: { username: string };
};

export default async function UserProfile(props: Props) {
  const session = await getServerSession(authOptions);

  const { username } = await props.params;

  if (session && session.user.username === username) {
    return (
      <div>
        <h1>Profile for: {username}</h1>
        <button>Setting</button>
        <p>You are logged in as: {session.user.username}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Profile for: {username}</h1>
      </div>
    );
  }
}
