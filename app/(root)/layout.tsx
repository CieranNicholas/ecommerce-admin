import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface Params {
	children: React.ReactNode;
}

export default async function SetupLayout({ children }: Params) {
	const { userId } = await auth();

	if (!userId) return redirect('/sign-in');

	const store = await prismadb.store.findFirst({
		where: {
			userId,
		},
	});

	if (store) {
		return redirect(`/${store.id}`);
	}

	return <>{children}</>;
}
