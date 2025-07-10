const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // const res = await fetch(`https://api.example.com/problems/${id}`, {
  //   cache: 'no-store'
  // });
  // const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl">Problem ID: {id}</h1>
    </div>
  );
};

export default Page;
