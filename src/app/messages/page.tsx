import Messages from '@/Components/Messages';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authoptions';

const Page = async () => {
  
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
        <Messages username={session!.user.username} />
      </div>
    </>
  )
}

export default Page