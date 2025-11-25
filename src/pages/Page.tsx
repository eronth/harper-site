import './Page.css';

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;
export default function Page(props: Props) {
  return (<main className='page-content' {...props} />);
}
