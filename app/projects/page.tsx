import { allProjects } from 'contentlayer/generated'

export const metadata = {
  title: 'Projects',
  description: 'My projects',
}

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-gray-500 mb-8">
        A collection of projects I have worked on
      </p>
      <hr className="border-gray-700 mb-8" />
      
      <div className="grid gap-8">
        {allProjects.map((project) => (
          <div 
            key={project.slug}
            className="border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition"
          >
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-400 mb-4">{project.description}</p>
            
            {project.technologies && (
              <div className="flex gap-2 mb-4">
                {project.technologies.split(',').map(tech => (
                  <span 
                    key={tech}
                    className="text-xs bg-gray-700 px-2 py-1 rounded"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex gap-4">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}