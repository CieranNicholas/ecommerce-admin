import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

import SizeClient from './components/client';
import { SizeColumn } from './components/columns';

interface Props {
	params: {
		storeId: string;
	};
}

const SizesPage = async ({ params }: Props) => {
	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedSizes: SizeColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeClient data={formattedSizes} />
			</div>
		</div>
	);
};

export default SizesPage;
