'use client';

import React, { useEffect, useState } from 'react';
import { ImagePlusIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface Props {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<Props> = ({ disabled, onChange, onRemove, value }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) return null;

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{value.map((url) => (
					<div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
						<div className='z-10 absolute top-2 right-2'>
							<Button variant='destructive' size='icon' type='button' onClick={() => onRemove(url)}>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						<Image fill className='object-cover' alt='Image' src={url} />
					</div>
				))}
			</div>
			<CldUploadWidget onSuccess={onUpload} uploadPreset='ecommerce_admin'>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button type='button' variant='secondary' onClick={onClick} disabled={disabled}>
							<ImagePlusIcon className='h-4 w-4 mr-2' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
