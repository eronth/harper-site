
type Props = {
  children?: React.ReactNode;
};

export default function MVar({ children }: Props) {
  return (<>
    {/* @ts-expect-error This exists. */}
    <mi>{children}</mi>
  </>);
}
