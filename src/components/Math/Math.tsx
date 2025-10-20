

export default function Math({ children }: { children: React.ReactNode }) {

  //@ts-expect-error This exists.
  return (<math xmlns="http://www.w3.org/1998/Math/MathML">
    {children}
    {/* @ts-expect-error This exists. */}
  </math>);
};
