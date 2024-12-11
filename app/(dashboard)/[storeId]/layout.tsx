import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
	children: React.ReactNode;
	params: { storeId: string };
}

export default async function DashboardLayout({ children, params }: Props) {
	const { userId } = await auth();

	if (!userId) return redirect('/sign-in');

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) return redirect('/');

	return (
		<>
			<div>This will be a navbar</div>
			{children}
		</>
	);
}
