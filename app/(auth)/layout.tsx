import React from 'react';

interface Props {
	children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
	return <div className='flex items-center justify-center h-full'>{children}</div>;
};

export default AuthLayout;
