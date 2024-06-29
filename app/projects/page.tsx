// pages/projects.tsx
import Link from 'next/link';
import Image from 'next/image'

const projects = [
  {
    title: 'Project One',
    description: 'This is a description for project one.',
    imageUrl: 'https://via.placeholder.com/300',
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'This is a description for project two.',
    imageUrl: 'https://via.placeholder.com/300',
    link: '#',
  },
  {
    title: 'Project Three',
    description: 'This is a description for project three.',
    imageUrl: 'https://via.placeholder.com/300',
    link: '#',
  },
  // Add more projects as needed
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold text-center text-teal-600 mb-12">
      My Projects
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
        >
          {/* <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover"
          /> */}
           <Image
            src="https://via.placeholder.com/256x256"
            alt={project.title}
            className="w-full h-48 object-cover"
            />

          <div className="p-4">
            <h2 className="text-2xl font-bold text-teal-700">{project.title}</h2>
            <p className="mt-2 text-gray-600">{project.description}</p>
            <Link href={project.link}>
              <div className="mt-4 inline-block bg-gradient-to-r from-teal-400 to-purple-600 text-white px-6 py-2 rounded-full hover:from-teal-500 hover:to-purple-700 transition duration-300 cursor-pointer">
                Visit Project
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Projects;
