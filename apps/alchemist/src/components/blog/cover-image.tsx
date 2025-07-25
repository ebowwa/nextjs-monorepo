// src/components/blog/cover-image.tsx
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { route } from "@/lib/constants";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link
          as={`${route.baseUrl}/${route.postRoute}/${slug}`}
          href={`${route.baseUrl}/${route.postRoute}/[slug]`}
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;