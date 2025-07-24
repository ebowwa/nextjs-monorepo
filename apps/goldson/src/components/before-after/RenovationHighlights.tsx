// app/before-after/RenovationHighlights.tsx
export function RenovationHighlights() {
    return (
      <div className="grid gap-6 md:gap-8 lg:gap-10">
        {/* Each highlight item could potentially be further componentized if needed */}
        <HighlightItem title="Kitchen Renovation" description="Brighter, more functional, and beautifully designed." />
        <HighlightItem title="Bathroom Remodel" description="Spa-like luxury and modern elegance." />
        <HighlightItem title="Exterior Makeover" description="Curb appeal transformation with style and charm." />
      </div>
    );
  }
  
  function HighlightItem({ title, description }: { title: string; description: string }) {
    return (
      <div className="grid gap-2 md:gap-4">
        <h3 className="text-lg font-bold tracking-tighter md:text-base">{title}</h3>
        <p className="text-sm text-gray-500 md:text-base/relaxed dark:text-gray-400">
          {description}
        </p>
      </div>
    );
  }
  