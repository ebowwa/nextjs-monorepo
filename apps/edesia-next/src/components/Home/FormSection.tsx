import { Input } from "@/components/ui/common/input";
import { Button } from "@/components/ui/common/button";

interface FormSectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <section className="py-12 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="max-w-[600px] mx-auto text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {description}
            </p>
          </div>
          <form className="mx-auto max-w-sm space-y-4">
            <div className="grid sm:grid-cols-2 sm:gap-4">
              <Input placeholder="Enter your email" required type="email" />
              <Button type="submit">{buttonText}</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
