
type Props = {
  children?: React.ReactNode;
};

export default function MOp({ children }: Props) {
  return (<>
    {/* @ts-expect-error This exists. */}
    <mo>{children}</mo>
  </>);
}
