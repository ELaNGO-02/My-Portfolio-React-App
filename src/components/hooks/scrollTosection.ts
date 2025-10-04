   export const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    section?.scrollIntoView({ behavior: 'smooth' });
  };