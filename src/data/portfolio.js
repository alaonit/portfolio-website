const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  firstName: 'Alhagie',
  displayName: 'Alhagie Saikou Ceesay',
  fullName: 'Alhagie Saikou Ceesay',
  rolePrimary: 'Software Engineer',
  roleSecondary: 'Web Developer',
  email: 'alagiesaikou77@gmail.com',
  github: 'https://github.com/alaonit',
  linkedin: 'https://www.linkedin.com/in/alhagie-saikou-ceesay-939062353',
  portrait: assetUrl('portrait.png'),
  portraitAlt: 'Portrait of Alhagie Saikou Ceesay',
}

export const navigation = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const featuredProject = {
  year: '2026',
  title: 'SalesDesk',
  description: 'A focused sales tracker that turns daily business activity into clear, useful decisions.',
  technologies: ['React', 'JavaScript', 'Firebase'],
  href: 'https://sales-tracker-rose.vercel.app/',
  image: assetUrl('assets/screenshots/salesdesk-dashboard.png'),
  imageAlt: 'SalesDesk dashboard showing revenue and sales performance',
}

export const skillIndex = [
  { name: 'JavaScript', focus: 'Interaction and application logic', use: 'Product interfaces' },
  { name: 'React', focus: 'Reusable interface systems', use: 'Frontend architecture' },
  { name: 'Java', focus: 'Structured software foundations', use: 'Application logic' },
  { name: 'MySQL', focus: 'Relational data and queries', use: 'Data modelling' },
]

export const capabilityGroups = [
  ['Interface direction', 'Responsive systems'],
  ['Component architecture', 'API integration'],
  ['Data modelling', 'Accessible interaction'],
]
