import Image from 'next/image';
import myGif from '../../public/pointer.gif';

export default function InitialLoading({
  isBackendReady,
}: {
  isBackendReady: boolean;
}) {
  return (
    !isBackendReady && (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40">
        <Image
          src={myGif}
          alt="Loading..."
          className="w-fit h-fit object-contain rounded-lg"
        />
      </div>
    )
  );
}
