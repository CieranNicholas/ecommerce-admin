import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';

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
			<Navbar />
			{children}
		</>
	);
}
