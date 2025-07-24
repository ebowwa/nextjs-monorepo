// LogoCloud.tsx
import { LogoItem, logoList } from './logoList';
import Image from 'next/image';


export default function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
        Brought to you by
      </p>
      <div className="grid grid-cols-1 place-items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
        {logoList.map((logo: LogoItem, index: number) => (
          <div key={index} className="flex items-center justify-start h-12">
            <a href={logo.url} aria-label={logo.label}>
              <Image
                src={logo.imageSrc}
                alt={logo.imageAlt}
                className={logo.imageClassName}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}