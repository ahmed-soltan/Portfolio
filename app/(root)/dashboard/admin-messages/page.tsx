import { currentUser } from '@clerk/nextjs/server';
import prisma from '../../../../lib/prismadb'
import { DataTable } from './_components/DataTable';
import { columns } from './_components/columns';

const Messages = async() => {
  const user = await currentUser();

  if (!user || user.emailAddresses[0]?.emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <div>You are not authorized to view this page</div>;
  }

  const messages = await prisma.message.findMany({
  });

  console.log(messages)

  return (
    <DataTable columns={columns} data={messages}/>
  )
}

export default Messages