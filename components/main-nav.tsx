'use client';

import React from 'react';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}`,
			label: 'Dashboard',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`,
		},
	];

	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{routes.map((route, i) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'test-sm font-medium transition-colors hover:text-primary',
						route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
};

export default MainNav;
