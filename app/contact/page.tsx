import { BouncingLogos } from '../components/bouncing-logos'
import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description: 'Contact Me',
}

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-5xl font-semibold mb-10 mt-4">Contact Me</h1>
      <div className="text-2xl text-black font-normal mb-8">
        <div className='mb-7'>Hi!! Nice to meet you 👋</div>
        <div className='mb-7'>First and foremost, thanks for visiting my page! Out of all the websites, you landed on this one which is pretty dang cool.</div>
        <div className='mb-7'>Whether you —
            <div className='mt-1'><span className="text-gray-400 mx-5">&gt;</span>read one of my blog posts</div>
            <div className='mb-1'><span className="text-gray-400 mx-5">&gt;</span>learned about a project I worked on</div>
            <div className='mb-1'><span className="text-gray-400 mx-5">&gt;</span>have quesions about my <Link href="/KennethWan_Resume_2026_Updated.pdf" className="text-[#3a6e48] underline font-bold">experiences or places I&apos;ve worked</Link></div>
            <div className='mb-1'><span className="text-gray-400 mx-5">&gt;</span>want a referral</div>
            <div><span className="text-gray-400 mx-5">&gt;</span>need someone to talk to</div> 
            <div className="mt-7">You can always reach out to me by <Link href="mailto:kennethwan@ucla.edu" className="text-[#3a6e48] underline font-bold">email</Link> or any of the platforms below.</div></div>
        <div>I love meeting people and helping people out so please do not hesitate to reach out! ◡̈</div>
      </div>
      
      <BouncingLogos />
    </div>
  )
}
