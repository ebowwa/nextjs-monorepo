// app/components/ui/SectionParagraph.tsx

interface SectionParagraphProps {
    text: string;
  }
  
  export const SectionParagraph = ({ text }: SectionParagraphProps) => (
    <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
      {text}
    </p>
  );
  