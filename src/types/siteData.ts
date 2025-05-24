export interface Company {
  name: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
}

export interface AboutStat {
  number: string;
  label: string;
}

export interface About {
  title: string;
  subtitle: string;
  description: string;
  stats: AboutStat[];
  image: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface Services {
  title: string;
  items: ServiceItem[];
}

export interface ProjectItem {
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Projects {
  title: string;
  items: ProjectItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Team {
  title: string;
  members: TeamMember[];
}

export interface Footer {
  quickLinks: NavigationItem[];
  services: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface Contact {
  title: string;
  form: {
    fields: FormField[];
    submitButton: {
      text: string;
    };
  };
}

export interface Metadata {
  title: string;
  description: string;
}

export interface SiteData {
  company: Company;
  navigation: NavigationItem[];
  hero: Hero;
  about: About;
  services: Services;
  projects: Projects;
  team: Team;
  footer: Footer;
  contact: Contact;
  metadata: Metadata;
}

export default SiteData; 