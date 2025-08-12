import QuestionPage from '@/Components/problems/QuestionPage';

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  return <QuestionPage _id={parseInt(id)}/>;
};

export default Page;