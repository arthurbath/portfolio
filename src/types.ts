export type Manifest = {
  header: Header;
  projects: Project[];
}

export type Header = {
  name: string;
  contact: string;
  city?: string;
  email?: string;
  linkedin?: string;
  abilities?: string;
  logline?: string;
  /** @deprecated use abilities/logline */
  statement?: string;
}

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  roles?: string;
  images: ProjectImage[];
  description: string;
}

export type ProjectImage = {
  src: string;
  alt: string;
}


