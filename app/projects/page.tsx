import { allProjects } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Projects',
  description: 'My projects',
}

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8 mt-4">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative aspect-square border-3 border-[#3a6e48] rounded-lg px-4 py-3 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-103"
          >
            {/* Logo in the middle
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 relative opacity-20 group-hover:opacity-80 transition-opacity">
                <Image
                  src={project.coverImage || '/default-project-logo.svg'}
                  alt={project.title}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div> */}
            
            {/* Title and description */}
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2 group-hover:text-[#3a6e48] transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {project.description}
              </p>
            </div>
            
            {/* Technologies at bottom */}
            {project.technologies && (
              <div className="relative z-10 flex flex-wrap gap-2 mt-4">
                {project.technologies.split(',').slice(0, 3).map(tech => (
                  <span 
                    key={tech}
                    className="text-[10px] bg-[#3a6e48]/10 text-[#3a6e48] px-2 py-1 rounded-md font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
                {project.technologies.split(',').length > 3 && (
                  <span className="text-[10px] text-gray-500">
                    +{project.technologies.split(',').length - 3}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}