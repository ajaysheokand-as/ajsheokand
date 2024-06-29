// pages/skills.tsx

const basicSkills = [
  {
    name: 'HTML',
    description: 'Experienced in creating structured web content with HTML.',
  },
  {
    name: 'CSS',
    description: 'Skilled in styling web pages using CSS and pre-processors like SASS.',
  },
  {
    name: 'JavaScript',
    description: 'Proficient in modern JavaScript ES6+ features and concepts.',
  },
  {
    name: 'Git',
    description: 'Experienced in version control using Git.',
  },
];

const advancedSkills = [
  {
    name: 'React',
    description: 'Experienced in building dynamic web applications with React.',
  },
  {
    name: 'Next.js',
    description: 'Skilled in building server-rendered applications with Next.js.',
  },
  {
    name: 'TypeScript',
    description: 'Strong understanding of TypeScript for better code quality and maintainability.',
  },
  {
    name: 'Tailwind CSS',
    description: 'Expert in creating responsive designs with Tailwind CSS.',
  },
  {
    name: 'Node.js',
    description: 'Proficient in building backend services with Node.js and Express.',
  },
  {
    name: 'MongoDB',
    description: 'Experienced in all CRUD operations and different type of reports.',
  },
];

const Skills: React.FC = () => {
  return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-12">
          My Skills
        </h1>
        <div>
          <h2 className="text-3xl font-bold text-teal-600 mb-6">Basic Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {basicSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-700">{skill.name}</h3>
                  <p className="mt-2 text-gray-600">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-teal-600 mb-6">Advanced Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-700">{skill.name}</h3>
                  <p className="mt-2 text-gray-600">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Skills;
