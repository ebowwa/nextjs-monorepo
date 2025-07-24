// app/components/ui/SectionTitle.tsx

interface SectionTitleProps {
    text: string;
  }
  
  export const SectionTitle = ({ text }: SectionTitleProps) => (
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{text}</h2>
  );
  