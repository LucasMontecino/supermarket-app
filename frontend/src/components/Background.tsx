import Image from 'next/image';
import myImage from '../../public/landing-bg.png';

export default function Background() {
  return (
    <div className="absolute inset-0">
      <Image
        src={myImage}
        alt="Landing background"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}
