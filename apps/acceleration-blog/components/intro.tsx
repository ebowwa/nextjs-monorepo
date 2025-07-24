import { CMS_NAME } from '../lib/constants';
import Link from 'next/link'; // Import Link from next/link

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        A  * CELL* ERATION.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        a mission to learn, build, and grow together with {' '}
        <Link href="https://ebowwa.vercel.app"> {/* Update this line */}
          <a className="underline hover:text-blue-600 duration-200 transition-colors">
            Elijah
          </a>
        </Link>
      </h4>
    </section>
  )
}

export default Intro;
