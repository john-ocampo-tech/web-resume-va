export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface Education {
  school: string;
  degree: string;
  status?: string;
  years?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
}

export interface Resume {
  name: string;
  title: string;
  summary: string;
  contact?: Contact;
  education?: Education;
  experience?: ExperienceItem[];
  skills?: string[];
}