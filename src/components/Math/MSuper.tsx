

type Props = {
  base: React.ReactNode;
  super: React.ReactNode;
};

export default function MSuper({ base, super: superScript }: Props) {
  return (<>
    {/* @ts-expect-error This exists. */}
    <msup>
      {base}
      {superScript}
    {/* @ts-expect-error This exists. */}
    </msup>
  </>);
}