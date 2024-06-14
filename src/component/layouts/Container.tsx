import { ReactNode } from 'react';

interface ContainerProps {
   children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
   return <div className="w-full px-5 sm:px-7 lg:px-10 xl:container">{children}</div>;
};

export default Container;
