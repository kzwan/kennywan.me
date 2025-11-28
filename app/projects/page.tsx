import { allProjects } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata = {
  title: 'Projects',
  description: 'My projects',
}

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 mt-4">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative aspect-square border-4 border-[#3a6e48] rounded-lg p-6 hover:bg-[#3a6e48]/5 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-105"
          >
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#3a6e48] transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {project.description}
              </p>
            </div>
            
            {/* Technologies */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.split(',').slice(0, 3).map(tech => (
                  <span 
                    key={tech}
                    className="text-xs bg-[#3a6e48]/10 text-[#3a6e48] px-2 py-1 rounded-md font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
                {project.technologies.split(',').length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{project.technologies.split(',').length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 text-[#3a6e48] opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}