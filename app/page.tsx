import Link from 'next/link'
import Image from 'next/image'
import frog from '../content/assets/froggg.png'

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 flex min-h-screen items-center justify-center">
      <main className="">
      <p className="text-[40px] font-bold flex items-center gap-2">
          hey there! i&apos;m kenny 
          <Image 
            src={frog}
            alt={':)'}
            height={60}
            width={60}
            className='pt-[5px]'
          />
        </p>
        <p className="mt-4 text-2xl">a software engineer who loves —</p>
        <p className="text-xl mt-3"><span className="text-gray-400 mx-5">&gt;</span>writing about <Link href="/blog" className="text-[#3a6e48] hover:underline font-semibold">things I&apos;ve learned, self-improvement, and tech</Link></p>
        <p className="text-xl mt-2"><span className="text-gray-400 mx-5">&gt;</span>working on fun <Link href="/projects" className="text-[#3a6e48] hover:underline font-semibold">projects</Link></p>
        <p className="text-xl mt-2"><span className="text-gray-400 mx-5">&gt;</span>meeting new, <Link href="/wall" className="text-[#3a6e48] hover:underline font-semibold">friendly people</Link></p>
        <p className="text-xl mt-2"><span className="text-gray-400 mx-5">&gt;</span>outdoor activities, sports, <a href="https://letterboxd.com/kennywan/" target="_blank"
          rel="noopener noreferrer" className="text-[#3a6e48] hover:underline font-semibold">movies</a>, and <a href="https://open.spotify.com/user/imkennywan/" target="_blank"
          rel="noopener noreferrer" className="text-[#3a6e48] hover:underline font-semibold">music</a></p>
        <p className="mt-8 text-xl mb-6">currently, i&apos;m building financial tools @ <a href="https://robinhood.com/" target="_blank"
          rel="noopener noreferrer" className="text-[#3a6e48] hover:underline font-semibold">robinhood</a></p>
        <div className="flex flex-horizontal justify-start gap-8">
        <Link 
            href="/blog" 
            className="relative w-34 text-lg font-medium text-center py-2 border-2 border-[#3a6e48] text-[#3a6e48] rounded-md inline-block overflow-hidden group cursor-pointer"
          >
            {/* Wave from left */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Wave from right */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-right rounded-tl-full rounded-bl-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Text */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-600">
              blog
            </span>
          </Link>
          <Link 
            href="/projects" 
            className="relative w-34 text-lg font-medium text-center py-2 border-2 border-[#3a6e48] text-[#3a6e48] rounded-md inline-block overflow-hidden group cursor-pointer"
          >
            {/* Wave from left */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Wave from right */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-right rounded-tl-full rounded-bl-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Text */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-600">
              projects
            </span>
          </Link>
          <Link 
            href="/wall" 
            className="relative w-34 text-lg font-medium text-center py-2 border-2 border-[#3a6e48] text-[#3a6e48] rounded-md inline-block overflow-hidden group cursor-pointer"
          >
            {/* Wave from left */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Wave from right */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-right rounded-tl-full rounded-bl-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Text */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-600">
              wall
            </span>
          </Link>
          <Link 
            href="/contact" 
            className="relative w-34 text-lg font-medium text-center py-2 border-2 border-[#3a6e48] text-[#3a6e48] rounded-md inline-block overflow-hidden group cursor-pointer"
          >
            {/* Wave from left */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Wave from right */}
            <span className="absolute inset-0 w-full h-full bg-[#3a6e48] transform scale-x-0 origin-right rounded-tl-full rounded-bl-full group-hover:scale-x-100 transition-transform duration-600 ease-in-out z-0"></span>
            
            {/* Text */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-600">
              reach out
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
