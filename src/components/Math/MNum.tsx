
type Props = {
  children?: React.ReactNode;
};

export default function MNum({ children }: Props) {
  return (<>
    {/* @ts-expect-error This exists. */}
    <mn>{children}</mn>
  </>);
}
