import Link from 'next/link';
import styles from './styles.module.scss';

interface ButtonPreviewProps {
  exit: boolean;
}

export default function ButtonPreview({
  exit = false,
}: ButtonPreviewProps): JSX.Element {
  return (
    exit && (
      <Link href="/api/exit-preview">
        <a className={styles.container}>Sair do modo Preview</a>
      </Link>
    )
  );
}
