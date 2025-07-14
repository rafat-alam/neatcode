import QuestionPage from '@/Components/QuestionPage';

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  console.log(id);

  return <QuestionPage />;
};

export default Page;