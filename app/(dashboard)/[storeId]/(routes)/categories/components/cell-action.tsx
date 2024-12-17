'use client';

import React, { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

import { CategoryColumn } from './columns';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { onCopy } from '@/lib/utils';
import AlertModal from '@/components/modals/alert-modal';

interface Props {
	data: CategoryColumn;
}

const CellAction: React.FC<Props> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const params = useParams();
	const router = useRouter();

	const handleUpdate = () => {
		router.push(`/${params.storeId}/categories/${data.id}`);
	};

	const handleDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
			router.push(`/${params.storeId}/categories`);
			router.refresh();
			toast.success('Category deleted.');
		} catch (error) {
			toast.error('Make sure you removed all products using this category first.');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={handleDelete} />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className='h-8 w-8 p-0' variant={'ghost'}>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={handleUpdate}>
						<Edit className='h-4 w-4 mr-2' />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => onCopy(data.id, 'ID Copied to the clipboard.')}>
						<Copy className='h-4 w-4 mr-2' />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className='h-4 w-4 mr-2' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CellAction;
