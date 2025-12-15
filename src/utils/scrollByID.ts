type Props = {
  id: string;
  yOffset?: number;
  behavior?: 'auto' | 'instant' | 'smooth';
};

export const scrollByID = ({ id, yOffset = 100, behavior = 'smooth' }: Props) => {
  const element = document.getElementById(id);

  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior });
  }
};
