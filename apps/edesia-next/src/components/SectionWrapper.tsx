// app/SectionWrapper.tsx

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="py-12 md:py-24">{children}</div>
    );
  };
  