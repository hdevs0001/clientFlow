type WelcomeCardProps = {
  title: string;
  description: string;
};

export default function Headingcard({ title, description }: WelcomeCardProps) {
  return (
    <div className="text-start my-2">
      <h1 className="pt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}
