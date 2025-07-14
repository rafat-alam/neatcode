import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import { getServerSession } from "next-auth";

const Page = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params;
  console.log(username)

  const session = await getServerSession(authOptions);

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

};

export default Page;