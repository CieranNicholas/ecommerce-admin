import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const onCopy = (input: string, toastMessage?: string) => {
	navigator.clipboard.writeText(input);

	if (toastMessage) {
		toast.success(toastMessage);
	}
};
