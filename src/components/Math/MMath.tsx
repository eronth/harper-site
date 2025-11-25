
type Props = {
  
  children: React.ReactNode;
  noWrap?: boolean;
};
export default function Math({ children, noWrap }: Props) {

  //@ts-expect-error This exists.
  return (<math style={{ whiteSpace: noWrap ? 'nowrap' : 'normal' }} xmlns="http://www.w3.org/1998/Math/MathML">
    {children}
    {/* @ts-expect-error This exists. */}
  </math>);
};
