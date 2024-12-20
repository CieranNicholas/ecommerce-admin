'use client';

import React from 'react';
import { CopyIcon, ServerIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { onCopy } from '@/lib/utils';

interface Props {
	title: string;
	description: string;
	variant: 'public' | 'admin';
}

const textMap: Record<Props['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
};
const variantMap: Record<Props['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive',
};

const ApiAlert: React.FC<Props> = ({ title, description, variant = 'public' }) => {
	return (
		<Alert>
			<ServerIcon className='h-4 w-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='mt-4 flex items-center justify-between'>
				<code className='relative roudned bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>{description}</code>
				<Button variant='outline' size='icon' onClick={() => onCopy(description, 'API Route Copied to the clipboard.')}>
					<CopyIcon className='h-4 w-4' />
				</Button>
			</AlertDescription>
		</Alert>
	);
};

export default ApiAlert;
