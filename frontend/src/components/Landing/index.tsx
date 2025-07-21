'use client';

import Link from 'next/link';
import AvailableProducts from './AvailableProducts';
import Button from '../Button';
import Title from '../Title';
import Text from '../Text';
import useProducts from '@/hooks/useProducts';

export default function Landing({
  isBackendReady,
}: {
  isBackendReady: boolean;
}) {
  const { products } = useProducts();

  return (
    isBackendReady && (
      <>
        <div className="relative z-10 max-w-md w-full px-4 py-12 flex flex-col items-center">
          <div className="bg-white/60 backdrop-blur-xs rounded-lg shadow-md p-6 w-full mb-8 flex flex-col">
            <Title title={'Bienvenido a Supermarket App!'} />
            <Text
              text={
                'Organiza tus compras, rastrea precios y administra tus listas de compras con facilidad.'
              }
            />
            <Link href="/lists" className="self-center">
              <Button label={'Ir a la Lista de Compras'} />
            </Link>
            <AvailableProducts products={products} />
          </div>
        </div>
      </>
    )
  );
}
