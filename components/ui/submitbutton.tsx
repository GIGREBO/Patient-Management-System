import React from 'react';
import Image from 'next/image';
import { Button, ButtonProps as UIButtonProps } from '@/components/ui/button';

interface ButtonProps extends UIButtonProps {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const submitbutton: React.FC<ButtonProps> = ({ isLoading, className, children, ...rest }) => {
  return (
    <Button
      type="submit"
      className={className ?? 'shad-primary-btn w-full'}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default submitbutton;